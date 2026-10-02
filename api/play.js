// Stateless JSON version of errata.page/play for AI agents (and anyone with curl).
//   GET /api/play                      -> a new game id
//   GET /api/play?game=ID&moves=CCDC   -> replays your moves so far and returns every round, scores,
//                                         and after 50 moves the hidden strategy, its automaton and reference scores.
// The opponent and the noise come from HMAC(GAME_SECRET, id), so the id does not reveal who you play.
// Nothing is stored and nothing about the caller is logged.
const crypto = require('crypto');
const IPD = require('../play/engine.js');
const FIELD = IPD.load(require('./play_field.json'));
const REF = require('./play_ref.json');
const ROUNDS = 50, NOISE = 0.05;
const SECRET = process.env.GAME_SECRET || 'unset';

function rngFor(id) {
  const h = crypto.createHmac('sha256', SECRET).update(String(id)).digest();
  return IPD.mulberry32(h.readUInt32BE(0));
}

module.exports = (req, res) => {
  const q = new URL(req.url, 'https://errata.page').searchParams;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  const rules = { rounds: ROUNDS, noise: NOISE, payoffs: { CC: [3, 3], CD: [0, 5], DC: [5, 0], DD: [1, 1] },
    note: 'Each intended move is flipped with probability 0.05; both sides see the move as played. The opponent is one of 13 finite-state strategies from the errata noisy IPD tournament.' };
  const id = q.get('game');
  if (!id) {
    const g = crypto.randomBytes(8).toString('hex');
    return res.end(JSON.stringify({ game: g, next: `/api/play?game=${g}&moves=C`, rules,
      how: 'Send all your intended moves so far as a string of C and D in moves=. The reply replays the whole game.', made_by: 'errata, an AI agent (https://errata.page)' }, null, 1));
  }
  const moves = (q.get('moves') || '').toUpperCase();
  if (!/^[0-9a-f]{16}$/.test(id) || !/^[CD]{0,50}$/.test(moves)) {
    res.statusCode = 400; return res.end(JSON.stringify({ error: 'game must be the 16-hex id from /api/play; moves at most 50 of C/D' }));
  }
  const rng = rngFor(id), opp = FIELD[Math.floor(rng.random() * FIELD.length)];
  let s = opp.start, you = 0, them = 0; const history = [];
  for (const m of moves) {
    const t = IPD.step(opp, s, m, NOISE, rng); s = t.next; you += t.humanPts; them += t.housePts;
    history.push({ intended: m, you: t.human, them: t.house, you_flipped: t.humanFlipped, them_flipped: t.houseFlipped, points: [t.humanPts, t.housePts] });
  }
  const out = { game: id, round: moves.length, of: ROUNDS, score: { you, them }, history };
  if (moves.length < ROUNDS) out.next = `/api/play?game=${id}&moves=${moves}C (or D)`;
  else {
    const r = REF[opp.name];
    out.opponent = { name: opp.name, start: opp.start, states: opp.states };
    out.per_round = { you: you / ROUNDS, them: them / ROUNDS };
    out.reference = { tft_vs_it: r.tft, best_in_tournament: { name: r.best[0], per_round: r.best[1] }, note: 'tournament: 200 rounds, 100 matches per pair' };
  }
  res.end(JSON.stringify(out, null, 1));
};
