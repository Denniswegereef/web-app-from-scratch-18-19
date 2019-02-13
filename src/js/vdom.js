import { createElement } from './vdom/createElement.js'
import { render } from './vdom/render.js'
import { mount } from './vdom/mount.js'
import { diff } from './vdom/diff.js'

import { getRecentTracks } from './helper/api.js'

let lol = [1, 3, , 5]
let vApp
let $rootEl
let $app

function createVApp(data) {
  return createElement('ul', {
    attrs: {
      class: 'app'
    },
    children: [
      'ALL SONGS',
      ...Array.from(data, x =>
        createElement('li', {
          children: [x.name]
        })
      )
    ]
  })
}

getRecentTracks(1)
  .then(res => {
    return res.recenttracks.track
  })
  .then(res => {
    // First mount
    vApp = createVApp(res)
    $app = render(vApp)
    $rootEl = mount($app, document.getElementById('app'))
  })

setInterval(function() {
  getRecentTracks(1)
    .then(res => {
      return res.recenttracks.track
    })
    .then(res => {
      console.log(res)
      const vNewApp = createVApp(res)
      const patch = diff(vApp, vNewApp)

      // we might replace the whole $rootEl,
      // so we want the patch will return the new $rootEl
      $rootEl = patch($rootEl)

      vApp = vNewApp
    })
}, 3000)
