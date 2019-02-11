import { Router } from './router.js'

// Import all pages
import { index } from './pages/index.js'
import { change } from './pages/change.js'
import { random } from './pages/random.js'
import { error } from './pages/error.js'

// Define router
const router = new Router()

router.add('#', index())
router.add('#random', random())
router.add('#change', change())
router.add('#error', error())

router.init()
