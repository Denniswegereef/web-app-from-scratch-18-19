import { checkUser } from '../helper/api.js'
import { debounce } from '../helper/debounce.js'

const userInput = document.getElementById('userInput')

const setLocal = name => {
  console.log('SET LOCALS')
  // if (localStorage.getItem('user')) {
  //   console.log('local bestaat al')
  //
  //   // If typed user is the same
  //   if (localStorage.getItem('user') != 'denniswegereef') {
  //     console.log()
  //     userInput.placeholder = name
  //     return
  //   }
  //
  //   // Change the user
  //   localStorage.setItem('user', name)
  //   userInput.placeholder = localStorage.getItem('user')
  //   return
  // }
  //
  // // Set local if it doesn't exist
  // localStorage.setItem('user', name)
  // userInput.placeholder = name
}

const changeLocal = () => {
  checkUser(userInput.value).then(res => {
    if (res.error) {
      userInput.value = 'User not found'
      userInput.style.color = 'red'
      resizeInput()
      setTimeout(() => {
        userInput.value = 'Denniswegereef'
        userInput.style.color = 'white'
        resizeInput()
      }, 2000)
      return
    }
    console.log(res)

    window.location.hash = 'welcome'
    setLocal(userInput.value)
  })
}

const resizeInput = () => {
  userInput.style.width = userInput.value.length + 1 + 'ch'
}

resizeInput()

userInput.addEventListener('keyup', debounce(changeLocal, 400))
userInput.addEventListener('keyup', resizeInput)

export { setLocal }
