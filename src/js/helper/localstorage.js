import { checkUser } from '../helper/api.js'
import { debounce } from '../helper/debounce.js'

const userInput = document.getElementById('userInput')

const setLocal = name => {
  if (localStorage.getItem('user')) {
    console.log('local bestaat al')

    // If typed user is the same
    if (localStorage.getItem('user') != 'denniswegereef') {
      console.log()
      userInput.placeholder = name
      return
    }

    // Change the user
    localStorage.setItem('user', name)
    userInput.placeholder = localStorage.getItem('user')
    return
  }

  // Set local if it doesn't exist
  localStorage.setItem('user', name)
  userInput.placeholder = name
}

const changeLocal = () => {
  checkUser(userInput.value).then(res => {
    if (res.error) {
      console.log('ERROR')
    }
    setLocal(userInput.value)
  })
}

userInput.addEventListener('keyup', debounce(changeLocal, 400))

export { setLocal }
