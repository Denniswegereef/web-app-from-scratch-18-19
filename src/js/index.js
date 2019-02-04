'use strict'

const key = '558413ce30002869acf1d2e2d9c2047b',
  url = 'http://ws.audioscrobbler.com/2.0/'

let pageNumber = 1

const main = document.getElementsByTagName('main')[0]
const nextButton = document.getElementById('next-page')
const previousButton = document.getElementById('previous-page')

previousButton.addEventListener('click', () => nextPage('previous'))
nextButton.addEventListener('click', () => nextPage('next'))

function getRecentTracks(user = 'denniswegereef', limit = 19) {
  const totalRequest = `${url}?method=user.getrecenttracks&user=${user}&api_key=${key}&format=json&page=${pageNumber}&extended=1&limit=${limit}`

  let promise = new Promise((resolve, reject) => {
    fetch(totalRequest)
      .then(res => res.json())
      .then(res => resolve(res))
  })
  return promise
}

getRecentTracks()
  .then(res => {
    console.log(res)
    render(res.recenttracks.track)
  })
  .catch(err => {
    console.error(err)
  })

function render(data) {
  localStorage.setItem('musicData', JSON.stringify(data))

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
        <h3>${d.artist.name}</h3>
        <p>${d['@attr'] ? 'Now playing' : d.date['#text']}
      </div>
    </li>`
    )
    .join('')}
  </ul>`

  main.innerHTML = markup
}

function nextPage(direction) {
  direction === 'next' ? pageNumber++ : pageNumber--

  parent.location.hash = pageNumber

  direction === 'next'
    ? (nextButton.innerHTML = 'Loading...')
    : (previousButton.innerHTML = 'Loading...')

  getRecentTracks()
    .then(res => {
      render(res.recenttracks.track)
    })
    .then(res => {
      if (pageNumber > 1) {
        previousButton.style.display = 'inline-block'
      } else {
        previousButton.style.display = 'none'
      }
      return res
    })
    .then(res => {
      nextButton.innerHTML = 'Next page'
      previousButton.innerHTML = 'Previous page'
    })
    .catch(err => {
      console.error(err)
    })
}

// Request every 60 seconds
setInterval(function() {
  getRecentTracks()
    .then(res => {
      //console.log(res)
      render(res.recenttracks.track)
    })
    .catch(err => {
      console.error(err)
    })
}, 30 * 1000)
