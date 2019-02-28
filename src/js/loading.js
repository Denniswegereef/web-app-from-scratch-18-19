'use strict'

class loader {
  constructor() {
    this.loadingEl = document.getElementById('loading')
    this.routerView = document.getElementById('vertical-scroll')
  }
  start() {
    this.loadingEl.classList.add('loading-show')
  }

  done() {
    this.loadingEl.classList.remove('loading-show')
  }
}

export { loader }
