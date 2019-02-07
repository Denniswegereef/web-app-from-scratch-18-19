'use strict'

import { getRecentTracks } from './helper/api-module.js'
import { nextPageTest } from './components/next-page.js'
import { render } from './render/recent-tracks.js'
import { autoUpdate } from './render/auto-update.js'

// import { Router } from './router.js'

const main = document.getElementById('main')
const nextButton = document.getElementById('next-page')
const previousButton = document.getElementById('previous-page')
const currentUser = document.getElementById('current-user')

let currentUrlNumber

if (window.location.href.match(/\d+$/)) {
  currentUrlNumber = window.location.href.match(/\d+$/)[0]
} else {
  currentUrlNumber = 1
}

// First pageload render
getRecentTracks(currentUrlNumber)
  .then(res => {
    // console.log(res)
    render(res.recenttracks.track)
  })
  .catch(err => {
    console.error(err)
  })

// Active update page functionality
autoUpdate()

// Event listeners for the menu
previousButton.addEventListener('click', () =>
  nextPageTest('previous', nextButton, previousButton)
)
nextButton.addEventListener('click', () =>
  nextPageTest('next', nextButton, previousButton)
)
