class Router {
  constructor() {
    this.routes = []
    ;(this.routerView = document.getElementById('router-view')),
      (this.menuItems = document.getElementsByClassName('menu-item'))
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
    console.log(fragment)
    console.log('change active')

    for (let el of this.menuItems) {
      el.classList.remove('active')
      if (fragment == el.dataset.active) {
        el.classList.add('active')
      }

      //console.log('hi' + el.dataset.active)
      if (el.dataset.active === '#' && fragment < 2) {
        el.classList.add('active')
      }
      // if (el.data === '#' || fragment === ' ') {
      //   console.log('hello')
      //   el.classList.add('active')
      //   return
      // }
    }
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
    this.changeActive(fragment)

    let self = this
    self.routerView.classList.add('hide')

    if (fragment === '' || this.getRoute(fragment)) {
      self.routerView.classList.remove('show')
      self.routerView.classList.add('hide')

      await setTimeout(function() {
        self.routerView.classList.remove('hide')
        self.routerView.classList.add('show')
      }, 1000)

      const result = await this.getRoute(
        fragment === '' ? '#' : fragment
      ).page()

      this.routerView.innerHTML = result
      return
    }

    // Render dynamic route
    if (fragmentNumber) {
      self.routerView.classList.remove('hide')

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
