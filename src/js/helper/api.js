'use strict'
// Get recent tracks, possible to switch user and the limit
function getRecentTracks(
  currentPage = 1,
  method = 'user.getrecenttracks',
  user = 'denniswegereef',
  limit = 19
) {
  const key = '558413ce30002869acf1d2e2d9c2047b',
    url = 'https://ws.audioscrobbler.com/2.0/'

  const totalRequest = `${url}?method=${method}&user=${user}&api_key=${key}&format=json&page=${currentPage}&extended=1&limit=${limit}`

  return fetch(totalRequest)
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.error)
}

export { getRecentTracks }
