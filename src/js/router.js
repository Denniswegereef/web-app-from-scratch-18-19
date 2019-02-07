import { home } from './pages/home.js'
import { detail } from './pages/detail.js'
import { random } from './pages/random.js'

class Router {
  constructor(routes, options) {
    this.routes = routes
    this.options = options
    this.routerView = document.getElementById('router-view')
    this.history = []
  }

  handlePageLoad() {
    let subUrl = window.location.pathname

    if (subUrl === this.options.baseUrl) {
      console.log('the same')
      this.changeRoute('/')
      return
    }

    let newUrl = subUrl.substring(0, subUrl.length - 1)
    this.changeRoute(newUrl)
  }

  changeRoute(route) {
    // Change url
    let currentRoute = this.routes.find(obj => obj.path == route)
    this.routerView.innerHTML = currentRoute.render
  }
}

// First array the routes, second options
let router = new Router(
  [
    {
      path: '/',
      render: home()
    },
    {
      path: '/change',
      render: detail()
    },
    {
      path: '/random',
      render: random()
    }
  ],
  {
    baseUrl: '/src/'
  }
)

router.handlePageLoad()

// FOR LINKS
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault()

    let goLink = this.href.slice(
      window.location.origin.length,
      this.href.length
    )
    history.replaceState(null, '', router.options.baseUrl + goLink)
    router.changeRoute(goLink)
  })
})

export { Router }
