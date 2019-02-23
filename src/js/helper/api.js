'use strict'
// Get recent tracks, possible to switch user and the limit
function getLastFm(
  currentPage = 1,
  method = 'user.getrecenttracks',
  additional = ''
) {
  const key = '558413ce30002869acf1d2e2d9c2047b',
    url = 'https://ws.audioscrobbler.com/2.0/',
    user = 'denniswegereef',
    limit = 19

  const totalRequest = `${url}?method=${method}&user=${user}&api_key=${key}&format=json&page=${currentPage}&extended=1&limit=${limit}${additional}`
  console.log(totalRequest)
  return fetch(totalRequest)
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.error)
}

export { getLastFm }
