'use strict'

const user = 'denniswegereef'
const key = '558413ce30002869acf1d2e2d9c2047b'
const url = 'http://ws.audioscrobbler.com/2.0/'
const pageNumber = 1

const totalRequest = `${url}?method=user.getrecenttracks&user=${user}&api_key=${key}&format=json&page=${pageNumber}`
const main = document.getElementsByTagName('main')[0]

fetch(totalRequest)
  .then(res => res.json())
  .then(res => {
    localStorage.setItem('musicData', JSON.stringify(res))
    return res
  })
  .then(res => {
    console.log(res)
    render(res.recenttracks.track)
  })
  .catch(err => {
    console.error(err)
  })

function render(data) {
  const markup = `
  <ul class="tracks">
  ${data
    .map(
      d => `
    <li class="track-single">
      <img src="${
        d.image[2]['#text']
          ? d.image[2]['#text']
          : 'https://via.placeholder.com/100'
      }" alt="" />
      <div>
        <h2>${d.name}</h2>
        <h3>${d.artist['#text']}</h3>
        <p>${d.date['#text']}</p>
      </div>
    </li>`
    )
    .join('')}
  </ul>`

  main.innerHTML = markup
}
