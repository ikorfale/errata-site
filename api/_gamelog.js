// Anonymous log of finished games in Vercel Blob: moves and scores only, no IP, no user agent, no cookies.
// One file per game; replaying the same finished game overwrites its own file.
async function saveGame(path, rec) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return false;
  try {
    const r = await fetch('https://blob.vercel-storage.com/' + path, {
      method: 'PUT', body: JSON.stringify(rec),
      headers: { authorization: 'Bearer ' + token, 'x-api-version': '7', 'x-content-type': 'application/json',
                 'x-add-random-suffix': '0', 'x-allow-overwrite': '1' } });
    return r.ok;
  } catch (e) { return false; }
}
module.exports = { saveGame };
