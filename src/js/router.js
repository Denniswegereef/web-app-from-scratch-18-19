import { loader } from './loading.js'

class Router {
  constructor() {
    this.routes = []
    this.routerView = document.getElementById('router-view')
    this.menuItems = document.getElementsByClassName('menu-item')
    this.loader = new loader()
  }

  checkDynamicUrl(url) {
    if (url.indexOf('/') !== -1) {
      return true
    }
  }

  add(url, page, dynamic = false) {
    if (this.checkDynamicUrl(url)) {
      dynamic = true
    }
    this.routes.push({ url, page, dynamic })
  }

  changeActive(fragment) {
    for (let el of this.menuItems) {
      el.classList.remove('active')
      if (fragment == el.dataset.active) {
        el.classList.add('active')
      }

      if (el.dataset.active === '#' && fragment < 2) {
        el.classList.add('active')
      }
    }
  }

  navigate(fragment) {
    this.loader.start()
    // Check if normal route
    if (fragment === '' || this.getRoute(fragment)) {
      this.render(false, fragment)
      return
    }

    // Check if fragment is possible dynamic
    if (this.checkDynamicUrl(fragment)) {
      let fragmentNumber = fragment.substr(fragment.lastIndexOf('/') + 1)
      let urlHash = fragment.substr(0, fragment.lastIndexOf('/'))

      if (this.getRoute(urlHash + '/:id')) {
        this.render(fragmentNumber, fragment)
        return
      }
    }

    // Throw error
    this.error()
  }

  getRoute(fragment) {
    // Find route in all possible defined routes
    return this.routes.find(route => {
      if (route.url === fragment) {
        return route
      }
    })
  }

  async render(fragmentNumber, fragment) {
    this.changeActive(fragment)

    let self = this

    if (fragment === '' || this.getRoute(fragment)) {
      const result = await this.getRoute(
        fragment === '' ? '#' : fragment
      ).page()

      this.routerView.innerHTML = result
      this.loader.done(result)

      return
    }

    // Render dynamic route
    if (fragmentNumber) {
      const result = await this.routes[3].page(fragmentNumber)

      this.routerView.innerHTML = result
      this.loader.done(result)

      return
    }
  }

  error() {
    // Render 404 error
    this.routerView.innerHTML = this.getRoute('#error').page()
  }

  interval() {
    setInterval(() => {
      this.reload()
    }, 60000)
  }

  reload() {
    this.navigate(window.location.hash)
  }

  init() {
    this.interval()
    // Init when page loads
    this.navigate(window.location.hash)

    // Set listener for router changes
    window.addEventListener('hashchange', () => {
      this.navigate(window.location.hash)
    })
  }
}

export { Router }
