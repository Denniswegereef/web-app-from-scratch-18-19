import { Router } from './router.js'

// Import all pages
import { index } from './pages/index.js'
import { artists } from './pages/artists.js'
import { tracks } from './pages/tracks.js'
import { error } from './pages/error.js'

import { virtualdom } from './pages/virtualdom.js'
import { vdynamic } from './pages/vdynamic.js'

// Functionallity
import { changeBackground } from './changeBackground.js'

// Define router
const router = new Router()

router.add('#', index)
router.add('#artists', artists)
router.add('#tracks', tracks)
router.add('#page/:id', index)
// router.add('#vdynamic/:id', vdynamic)
//router.add('#virtualdom', virtualdom)
router.add('#error', error)

router.init()

// select the target node
const routerView = document.querySelector('#router-view')
const config = { attributes: true, childList: true, characterData: true }

const observer = new MutationObserver(changeBackground)
observer.observe(routerView, config)

// configuration of the observer:
