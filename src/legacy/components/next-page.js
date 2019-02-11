'use strict'

// Next page module
import { getRecentTracks } from '../helper/api-module.js'
import { render } from '../render/recent-tracks.js'

let pageNumber = 1

function nextPageTest(direction, nextButton, previousButton) {
  direction === 'next' ? pageNumber++ : pageNumber--

  direction === 'next'
    ? (nextButton.innerHTML = 'Loading...')
    : (previousButton.innerHTML = 'Loading...')

  getRecentTracks(pageNumber)
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
      parent.location.hash = pageNumber

      nextButton.innerHTML = 'Next page'
      previousButton.innerHTML = 'Previous page'
    })
    .catch(err => {
      console.error(err)
    })
}

export { nextPageTest }
