import { createElement } from './vdom/createElement.js'
import { render } from './vdom/render.js'
import { mount } from './vdom/mount.js'
import { diff } from './vdom/diff.js'

const items = [1, 2, 3]

// const createVApp = count =>
//   createElement('div', {
//     attrs: {
//       id: 'app',
//       dataCount: count // we use the count here
//     },
//     children: [
//       'The current count is: ',
//       String(count), // and here
//       ...Array.from({ length: count }, () =>
//         createElement('div', {
//           attrs: {
//             class: 'test'
//           }
//         })
//       ),
//       createElement('img', {
//         attrs: {
//           src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif'
//         }
//       })
//     ]
//   })
let test = ['One', 'Two', 'Three']

function createVApp(data) {
  return createElement('div', {
    attrs: {
      class: 'holder'
    },
    children: [
      'current count',
      createElement('h1', {
        attrs: {
          class: 'test'
        },
        children: [
          `${data.map(item => {
            return item
          })}`,
          createElement('h2', {
            children: ['element 2']
          })
        ]
      })
    ]
  })
}

// First mount
let vApp = createVApp(test)
const $app = render(vApp)
let $rootEl = mount($app, document.getElementById('app'))

function updateDom(data) {
  const vNewApp = createVApp(data)
  const patch = diff(vApp, vNewApp)

  // we might replace the whole $rootEl,
  // so we want the patch will return the new $rootEl
  $rootEl = patch($rootEl)

  vApp = vNewApp
}

setTimeout(function() {
  test = [1, 34, 5, 6]
  updateDom(test)
}, 2000)
