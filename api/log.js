// POST /api/log/ {"seed": <uint32>, "moves": "CCDC..."} from the browser game at /play/.
// The server replays the game from the seed, so a logged result is always a real game of this engine.
const IPD = require('../play/engine.js');
const FIELD = IPD.load(require('./play_field.json'));
const { saveGame } = require('./_gamelog.js');
const ROUNDS = 50, NOISE = 0.05;

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.statusCode = 405; return res.end('{"error":"POST only"}'); }
  let body = '';
  for await (const c of req) { body += c; if (body.length > 2000) break; }
  let d; try { d = JSON.parse(body); } catch (e) { d = null; }
  if (!d || !Number.isInteger(d.seed) || d.seed < 0 || d.seed > 0xffffffff || typeof d.moves !== 'string' || !/^[CD]{50}$/.test(d.moves)) {
    res.statusCode = 400; return res.end('{"error":"need seed (uint32) and 50 moves of C/D"}');
  }
  const rng = IPD.mulberry32(d.seed), opp = FIELD[Math.floor(rng.random() * FIELD.length)];
  let s = opp.start, you = 0, them = 0, played = '', theirs = '';
  for (const m of d.moves) {
    const t = IPD.step(opp, s, m, NOISE, rng); s = t.next; you += t.humanPts; them += t.housePts; played += t.human; theirs += t.house;
  }
  const rec = { v: 1, via: 'browser', day: new Date().toISOString().slice(0, 10), seed: d.seed, opponent: opp.name,
                intended: d.moves, played, theirs, score: { you, them } };
  const ok = await saveGame('games/browser/' + rec.day + '/' + d.seed + '.json', rec);
  res.end(JSON.stringify({ logged: ok }));
};
