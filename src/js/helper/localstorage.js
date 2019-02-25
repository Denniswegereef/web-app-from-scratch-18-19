import { checkUser } from '../helper/api.js'
import { debounce } from '../helper/debounce.js'

class localStorageHandler {
  constructor(router) {
    this.availableCharacters = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
    this.input = document.getElementById('userInput')
    this.currentLocal = null
    this.router = router
  }

  // Pageload check for local user
  pageLoad(username) {
    if (!localStorage.getItem('currentUser')) {
      console.log(username + ' dont exist yet')

      this.checkMarkup(username)
      return
    }

    this.currentLocal = JSON.parse(localStorage.getItem('currentUser'))

    this.updateScreen(this.currentLocal)
  }

  async getUserApi(username) {
    let data = await checkUser(username)

    if (data.error) {
      this.handleError('User not found')
      return
    }
    this.currentLocal = data.user
    localStorage.setItem('currentUser', JSON.stringify(data.user))
    this.changed()

    this.updateScreen(data.user)
  }

  updateScreen(userObject) {
    this.input.value = userObject.name
    console.log('Updated screen with ' + userObject.name)
  }

  checkMarkup(username) {
    let currentLocal = JSON.parse(localStorage.getItem('currentUser'))

    // Check if value box in empty
    if (username < 1) {
      console.log('This input is empty')
      return
    }

    // Check if characters are avaliable
    if (!this.availableCharacters.exec(username)) {
      console.log('Wrong characters used for ' + username)
      return
    }

    if (!currentLocal === null) {
      if (currentLocal.name.toLowerCase() == username.toLowerCase()) {
        console.log('Local and typed username are the same')
        this.updateScreen(currentLocal)

        return
      }
    }

    this.getUserApi(username)
  }

  keyStroke() {
    this.checkMarkup(this.input.value)
  }

  resizeInput() {
    this.input.style.width = this.input.value.length + 3 + 'ch'
  }

  handleError(text) {
    this.input.value = text
    let self = this
    setTimeout(() => {
      self.input.value = self.currentLocal.name
      self.resizeInput()
    }, 2000)
  }

  changed() {
    this.router.reload()
  }

  // Init eventlisteners
  init(name) {
    this.pageLoad(name)

    this.resizeInput()

    this.input.addEventListener(
      'keyup',
      debounce(() => this.keyStroke(this), 600)
    )

    this.input.addEventListener('keyup', () => this.resizeInput(this))
  }
}

export { localStorageHandler }
