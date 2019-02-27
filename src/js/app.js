import { Router } from './router.js'

// Import all pages
import { index } from './pages/index.js'
import { artists } from './pages/artists.js'
import { tracks } from './pages/tracks.js'
import { singleTrack } from './pages/singleTrack.js'
import { error } from './pages/error.js'

import { virtualdom } from './pages/virtualdom.js'
//import { vdynamic } from './pages/vdynamic.js'

// Functionallity
import { changeBackground } from './changeBackground.js'
import { localStorageHandler } from './helper/localstorage.js'

// Define router
const router = new Router()

router.add('#', index)
router.add('#artists', artists)
router.add('#tracks', tracks)
router.add('#track/:id', singleTrack)

// router.add('#vdynamic/:id', vdynamic)
router.add('#virtualdom', virtualdom)

router.add('#error', error)

router.init()

// Set localstorage
const local = new localStorageHandler(router)
local.init('Denniswegereef')

// select the target node
const routerView = document.querySelector('#router-view')
const config = { attributes: true, childList: true, characterData: true }

const observer = new MutationObserver(changeBackground).observe(
  routerView,
  config
)
// configuration of the observer:
