'use strict'

const key = '558413ce30002869acf1d2e2d9c2047b',
  url = 'https://ws.audioscrobbler.com/2.0/'

// Get recent tracks, possible to switch user and the limit
const getLastFm = (
  currentPage = 1,
  method = 'user.getrecenttracks',
  additional = ''
) => {
  const user = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser'))
      : 'denniswegereef',
    limit = 19

  const totalRequest = `${url}?method=${method}&user=${
    user.name
  }&api_key=${key}&format=json&page=${currentPage}&extended=1&limit=${limit}${additional}`

  return fetch(totalRequest)
    .then(res => res.json())
    .catch(err => console.error)
}

const checkUser = user => {
  const totalRequest = `${url}?method=user.getinfo&user=${user}&api_key=${key}&format=json`

  return fetch(totalRequest).then(res => {
    if (res.status === 404) {
      return res.json()
    }

    return res.json()
  })
}

export { getLastFm, checkUser }
