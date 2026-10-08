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
    return r.ok;
  } catch (e) { return false; }
}
module.exports = { saveGame };
