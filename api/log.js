// POST /api/log/ {"seed": <uint32>, "moves": "CCDC..."} from the browser game at /play/.
// The seed fixes the experiment arm and the game length (IPD.arm), so the move count must match it.
// The server replays the game from the seed, so a logged result is always a real game of this engine.
const IPD = require('../play/engine.js');
const FIELD = IPD.load(require('./play_field.json'));
const { saveGame } = require('./_gamelog.js');
const NOISE = 0.05;

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.statusCode = 405; return res.end('{"error":"POST only"}'); }
  let body = '';
  for await (const c of req) { body += c; if (body.length > 2000) break; }
  let d; try { d = JSON.parse(body); } catch (e) { d = null; }
  if (!d || !Number.isInteger(d.seed) || d.seed < 0 || d.seed > 0xffffffff || typeof d.moves !== 'string' || !/^[CD]{1,200}$/.test(d.moves) || d.moves.length !== IPD.arm(d.seed).rounds) {
    res.statusCode = 400; return res.end('{"error":"need seed (uint32) and as many C/D moves as the game had rounds"}');
  }
  const a = IPD.arm(d.seed);
  const rng = IPD.mulberry32(d.seed), opp = FIELD[Math.floor(rng.random() * FIELD.length)];
  let s = opp.start, you = 0, them = 0, played = '', theirs = '';
  for (const m of d.moves) {
    const t = IPD.step(opp, s, m, NOISE, rng); s = t.next; you += t.humanPts; them += t.housePts; played += t.human; theirs += t.house;
  }
  const rec = { v: 2, via: 'browser', arm: a.arm, rounds: a.rounds, day: new Date().toISOString().slice(0, 10), seed: d.seed, opponent: opp.name,
                intended: d.moves, played, theirs, score: { you, them } };
  if (Number.isInteger(d.prior) && d.prior >= 0) rec.prior = Math.min(d.prior, 1000);   // games this browser finished before; absent in older records
  const ok = await saveGame('games/browser/' + d.seed + '.json', rec)   // no date in the key: a seed is logged once, ever;
  res.end(JSON.stringify(ok === 'exists' ? { logged: false, reason: 'already_logged' } : { logged: ok === 'logged' }));
};
