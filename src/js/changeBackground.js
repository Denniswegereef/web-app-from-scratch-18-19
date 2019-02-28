'use strict'

let active
let backgroundOne = document.getElementById('background-one')
let backgroundTwo = document.getElementById('background-two')

const setBackground = background => {
  localStorage.setItem('background', background)

  active ? (active = false) : (active = true)

  if (active) {
    backgroundOne.classList.remove('hide')
    backgroundOne.src = background
    backgroundTwo.classList.add('hide')
  }

  if (!active) {
    backgroundTwo.classList.remove('hide')
    backgroundTwo.src = background
    backgroundOne.classList.add('hide')
  }
}

const changeBackground = record => {
  let elements = document.getElementsByClassName('single-item')

  // Init background when page loads
  elements[0] !== undefined
    ? setBackground(elements[0].dataset.image, 1)
    : setBackground(localStorage.getItem('background'), 1)

  for (let el of elements) {
    el.addEventListener('mouseover', change)
  }
}

function change(e) {
  setBackground(this.dataset.image)
}

export { changeBackground }
