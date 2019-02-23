function setBackground(background) {
  let backgroundOne = document.getElementById('background-one')

  backgroundOne.style.backgroundImage = `url('${background}')`
}

const changeBackground = record => {
  let elements = document.getElementsByClassName('single-item')

  // Init background when page loads
  elements[0] !== undefined
    ? setBackground(elements[0].dataset.image, 1)
    : setBackground('', 1)

  for (let el of elements) {
    el.addEventListener('mouseover', change)
  }
}

function change(e) {
  setBackground(this.dataset.image)
}

export { changeBackground }
