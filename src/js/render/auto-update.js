'use strict'

import { getRecentTracks } from '../helper/api-module.js'
import { render } from '../render/recent-tracks.js'

// Request every 30 seconds
function autoUpdate() {
  setInterval(function() {
    let currentUrlNumber = window.location.href.match(/\d+$/)[0]

    getRecentTracks(currentUrlNumber)
      .then(res => {
        //console.log(res)
        render(res.recenttracks.track)
      })
      .catch(err => {
        console.error(err)
      })
  }, 4 * 1000)
}

export { autoUpdate }
