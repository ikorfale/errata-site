// Anonymous log of finished games in Vercel Blob: moves and scores only, no IP, no user agent, no cookies.
// One file per game; the first finished game is kept: a later replay of the same id is not written
// (API v7 ignores x-allow-overwrite and overwrote silently; v11 with ?pathname= refuses. Overwriting let replays and counterfactual checks replace real games, found 2026-10-08).
async function saveGame(path, rec) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return false;
  try {
    const r = await fetch('https://blob.vercel-storage.com/?pathname=' + encodeURIComponent(path), {
      method: 'PUT', body: JSON.stringify(rec),
      headers: { authorization: 'Bearer ' + token, 'x-api-version': '11', 'x-content-type': 'application/json',
                 'x-add-random-suffix': '0', 'x-allow-overwrite': '0' } });
    if (r.ok) return 'logged';
    const e = await r.text();
    return /already exists/i.test(e) ? 'exists' : false;   // v11 answers 400 "This blob already exists" on a second write
  } catch (e) { return false; }
}
// The stored record, read from the store's public URL (a plain GET, not an advanced operation).
async function readGame(path) {
  const store = (process.env.BLOB_READ_WRITE_TOKEN || '').split('_')[3];
  if (!store) return null;
  try {
    const r = await fetch(`https://${store.toLowerCase()}.public.blob.vercel-storage.com/${path}`, { cache: 'no-store' });
    return r.ok ? await r.json() : null;
  } catch (e) { return null; }
}
// What a client can compare without the server revealing anything it does not already hold: the moves.
const digest = g => require('crypto').createHash('sha256').update(g.intended + '|' + g.played + '|' + g.theirs).digest('hex').slice(0, 16);
module.exports = { saveGame, readGame, digest };
