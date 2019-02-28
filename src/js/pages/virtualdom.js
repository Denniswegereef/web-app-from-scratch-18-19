'use strict'

import { createElement } from '../vdom/createElement.js'
import { render } from '../vdom/render.js'
import { mount } from '../vdom/mount.js'
import { diff } from '../vdom/diff.js'

import { getLastFm } from '../helper/api.js'

let vApp
let $rootEl
let $app

const createTrackList = data => {
  return createElement('ul', {
    attrs: {
      class: 'app'
    },
    children: [
      createElement('h1', {
        children: ['Listened tracks from the virtualdom']
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

const virtualdom = (page = 1) => {
  getLastFm(page)
    .then(res => {
      return res.recenttracks.track
    })
    .then(res => {
      // First mount
      vApp = createTrackList(res)
      $app = render(vApp)
      $rootEl = mount($app, document.getElementById('vdom'))
    })
  return '<div id="vdom"></div>'
}
//
// setInterval(function() {
//   getLastFm(1)
//     .then(res => {
//       return res.recenttracks.track
//     })
//     .then(res => {
//       const vNewApp = createTrackList(res)
//       const patch = diff(vApp, vNewApp)
//
//       // we might replace the whole $rootEl,
//       // so we want the patch will return the new $rootEl
//       $rootEl = patch($rootEl)
//
//       vApp = vNewApp
//     })
// }, 3000)

export { virtualdom }
