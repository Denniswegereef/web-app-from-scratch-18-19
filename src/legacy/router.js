class Router {
  constructor() {
    this.routes = []
    this.root = `/src`
    this.routerView = document.getElementById('router-view')
  }

  add(url, page) {
    // For future make it avaliable for sub routes
    this.routes.push({ url, page })
  }

  navigate(fragment) {
    // For future check if slashes is used to use a sub router and use than the history api to force it
    this.render(fragment)
  }

  getRoute(fragment) {
    return this.routes.find(route => {
      if (route.url === fragment) {
        return route
      }
    })
  }

  render(fragment) {
    // Still to do, use something else than innerHTML
    // Render index
    if (fragment === '') {
      this.routerView.innerHTML = this.getRoute('#').page
      return
    }

    // Render existing subpage
    if (this.getRoute(fragment)) {
      this.routerView.innerHTML = this.getRoute(fragment).page
      return
    }

    // Render 404 error
    this.routerView.innerHTML = this.getRoute('#error').page
  }

  init() {
    // Init when page loads
    this.render(window.location.hash)

    // Set listener for router changes
    window.addEventListener('hashchange', () => {
      this.navigate(window.location.hash)
    })
  }
}

export { Router }
