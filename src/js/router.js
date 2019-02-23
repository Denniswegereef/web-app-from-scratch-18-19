class Router {
  constructor() {
    this.routes = []
    this.routerView = document.getElementById('router-view')
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

  navigate(fragment) {
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
    let self = this
    self.routerView.classList.remove('show')
    self.routerView.classList.add('hide')

    setTimeout(function() {
      self.routerView.classList.remove('hide')
      self.routerView.classList.add('show')
    }, 1000)

    // Still to do, use something else than innerHTML
    if (fragment === '' || this.getRoute(fragment)) {
      const result = await this.getRoute(
        fragment === '' ? '#' : fragment
      ).page()

      this.routerView.innerHTML = result
      return
    }

    // Render dynamic route
    if (fragmentNumber) {
      const result = await this.routes[3].page(fragmentNumber)
      this.routerView.innerHTML = result
      return
    }
  }

  error() {
    // Render 404 error
    this.routerView.innerHTML = this.getRoute('#error').page()
  }

  init() {
    // Init when page loads
    this.navigate(window.location.hash)

    // Set listener for router changes
    window.addEventListener('hashchange', () => {
      this.navigate(window.location.hash)
    })
  }
}

export { Router }
