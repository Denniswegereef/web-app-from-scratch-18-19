import { createElement } from './vdom/createElement.js'
import { render } from './vdom/render.js'
import { mount } from './vdom/mount.js'
import { diff } from './vdom/diff.js'

import { getRecentTracks } from './helper/api.js'

let lol = [1, 3, , 5]
let vApp
let $rootEl
let $app

function createTrackList(data) {
  return createElement('ul', {
    attrs: {
      class: 'app'
    },
    children: [
      createElement('h1', {
        children: ['Listened tracks']
      }),
      ...Array.from(data, track =>
        createElement('li', {
          attrs: {
            class: 'track-single'
          },
          children: [
            createElement('img', {
              attrs: {
                src: track.image[2]['#text']
                  ? track.image[2]['#text']
                  : 'https://via.placeholder.com/100'
              }
            }),
            createElement('div', {
              children: [
                createElement('h2', {
                  children: [track.name]
                }),
                createElement('h3', {
                  children: [track.artist.name]
                })
              ]
            })
          ]
        })
      )
    ]
  })
}

getRecentTracks()
  .then(res => {
    return res.recenttracks.track
  })
  .then(res => {
    // First mount
    vApp = createTrackList(res)
    $app = render(vApp)
    $rootEl = mount($app, document.getElementById('app'))
  })

// Interval every 10 seconds for a update
setInterval(function() {
  getRecentTracks()
    .then(res => {
      return res.recenttracks.track
    })
    .then(res => {
      // Recreate with new data the tracklist
      const vNewApp = createTrackList(res)

      // Check for difference in our app
      const patch = diff(vApp, vNewApp)

      // Patch the elements when sometning is different
      $rootEl = patch($rootEl)

      // Set new created app as default
      vApp = vNewApp
    })
}, 10000)
