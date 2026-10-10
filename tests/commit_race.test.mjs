// Regression for the async verdict race in /commit/ (theone, board #82568).
// Runs the page's own <script> from _src/commit.html against a fake DOM, with sha256 digests that can be held
// and released by hand, then checks that an obsolete verify() never overwrites the verdict for the latest inputs.
// Run: node tests/commit_race.test.mjs
import fs from 'node:fs'; import vm from 'node:vm'; import { webcrypto } from 'node:crypto';
const html = fs.readFileSync(new URL('../_src/commit.html', import.meta.url), 'utf8');
const script = html.slice(html.lastIndexOf('<script>') + 8, html.lastIndexOf('</script>'));
const hex = async s => [...new Uint8Array(await webcrypto.subtle.digest('SHA-256', new TextEncoder().encode(s)))].map(x => x.toString(16).padStart(2, '0')).join('');

function page() {
  const el = {}, get = id => el[id] ??= { value: '', textContent: '', className: '', disabled: false, h: {}, addEventListener(e, f) { this.h[e] = f; } };
  get('tv').textContent = 'x'; get('tvbom').textContent = 'y';
  let hold = false; const held = [];
  const subtle = { digest: (alg, data) => { const p = webcrypto.subtle.digest(alg, data);
      if (!hold) return p; return new Promise(r => held.push(() => r(p))); } };
  const ctx = { document: { getElementById: get }, crypto: { subtle, getRandomValues: a => webcrypto.getRandomValues(a) },
    TextEncoder, navigator: {}, console };
  vm.createContext(ctx); vm.runInContext(script, ctx);
  const tick = () => new Promise(r => setTimeout(r, 5));
  return { el: get, tick, holdOn() { hold = true; }, holdOff() { hold = false; },
    async releaseAll() { while (held.length) { held.shift()(); await tick(); } },
    async releaseNewestFirst() { while (held.length) { held.pop()(); await tick(); } },
    async typeTxt(v) { get('txt').value = v; get('txt').h.input(); await tick(); },
    async typeClaim(v) { get('claim').value = v; get('claim').h.input(); await tick(); } };
}
let fails = 0; const check = (name, ok, got) => { console.log((ok ? 'ok   ' : 'FAIL ') + name + (ok ? '' : ' -> ' + got)); if (!ok) fails++; };
const A = await hex('a'), AN = await hex('a\n'), B = await hex('b');

// theone's interleaving: old verify (claim = sha("a\n")) is held mid-diagnosis, claim changes to sha("a"), old call is released.
{ const p = page(); await p.tick(); await p.typeTxt('a'); await p.tick();
  p.holdOn(); await p.typeClaim(AN);            // old verify starts and waits on the raw digest
  p.holdOff(); await p.typeClaim(A);            // new verify: canonical match at once
  check('claim change: new MATCH survives old diagnosis', p.el('verdict').className === 'ok', p.el('verdict').className);
  await p.releaseAll(); await p.tick();
  check('claim change: after release still MATCH', p.el('verdict').className === 'ok', p.el('verdict').textContent); }

// Clearing the claim while the old call is pending.
{ const p = page(); await p.tick(); await p.typeTxt('a'); await p.tick();
  p.holdOn(); await p.typeClaim(AN); p.holdOff(); await p.typeClaim('');
  await p.releaseAll(); await p.tick();
  check('claim cleared: verdict stays empty', p.el('verdict').textContent === '', p.el('verdict').textContent); }

// Invalid claim while the old call is pending.
{ const p = page(); await p.tick(); await p.typeTxt('a'); await p.tick();
  p.holdOn(); await p.typeClaim(AN); p.holdOff(); await p.typeClaim('zz');
  await p.releaseAll(); await p.tick();
  check('claim invalid: verdict stays "not a sha256"', /not a sha256/.test(p.el('verdict').textContent), p.el('verdict').textContent); }

// Text change while the old call is pending: verdict cleared at once, final verdict is for the new text.
{ const p = page(); await p.tick(); await p.typeTxt('a'); await p.tick();
  p.holdOn(); await p.typeClaim(AN);
  await p.typeTxt('b');                          // held too: its digest is pending
  check('text change: old verdict cleared immediately', p.el('verdict').className !== 'warn', p.el('verdict').textContent);
  await p.releaseAll(); await p.tick(); await p.releaseAll(); await p.tick();
  check('text change: final verdict is a plain no-match for "b"', p.el('verdict').className === 'no', p.el('verdict').textContent);
  p.holdOff(); await p.typeClaim(B); await p.tick();
  check('text change: claim sha("b") then matches', p.el('verdict').className === 'ok', p.el('verdict').textContent); }

// Text change, newer work released first: the old call for "a" finishes last and must not write.
{ const p = page(); await p.tick(); await p.typeTxt('a'); await p.tick();
  p.holdOn(); await p.typeClaim(AN); await p.typeTxt('b');
  for (let i = 0; i < 20; i++) await p.releaseNewestFirst();
  check('text change, LIFO release: no stale "a" diagnosis', p.el('verdict').className === 'no', p.el('verdict').textContent); }

// Lone surrogate warning (zenith #82574); a joined pair is a normal character.
{ const p = page(); await p.tick(); await p.typeTxt('x' + String.fromCharCode(0xD83D) + 'y'); await p.tick();
  check('lone surrogate: warning shown', /unpaired surrogate/.test(p.el('info').textContent), p.el('info').textContent);
  await p.typeTxt(String.fromCharCode(0xD83D, 0xDE80)); await p.tick();
  check('surrogate pair: no warning', !/unpaired/.test(p.el('info').textContent), p.el('info').textContent); }

// Unheld baseline: diagnosis still works.
{ const p = page(); await p.tick(); await p.typeTxt('a'); await p.tick(); await p.typeClaim(AN); await p.tick(); await p.tick();
  check('baseline: final-newline diagnosis', /final newline/.test(p.el('verdict').textContent), p.el('verdict').textContent); }

console.log(fails ? `${fails} FAILED` : 'all passed'); process.exit(fails ? 1 : 0);
