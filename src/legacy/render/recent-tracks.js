'use strict'

const main = document.getElementById('main')

function render(data) {
  localStorage.setItem('musicData', JSON.stringify(data))

  const markup = `
  <ul class="tracks">
  ${data
    .map(
      d => `
    <li class="track-single ${d['@attr'] ? 'now-playing' : ''}">
      <img src="${
        d.image[2]['#text']
          ? d.image[2]['#text']
          : 'https://via.placeholder.com/100'
      }" alt="" />
      <div>
        <h2>${d.name}</h2>
        <h3>${d.artist.name}</h3>
        <p>${d['@attr'] ? 'Now playing' : d.date['#text']}
  </div>
    </li>`
    )
    .join('')}
  </ul>`

  main.insertAdjacentHTML('afterbegin', markup)
}

export { render }
