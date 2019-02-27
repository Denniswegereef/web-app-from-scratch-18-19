import { getLastFm } from '../helper/api.js'
import { cleanRecent } from '../helper/cleanData.js'

async function index(number = 1) {
  let data = await getLastFm(number).then(res => {
    console.log(res)
    return cleanRecent(res)
  })

  const markup = `
  <ul class="recent-tracks" id="vertical-scroll">
  ${data
    .map(
      d => `
    <li class="single-item ${
      d.date === 'Currently playing' ? 'currently-playing' : ''
    }" data-image='${d.image.big}'>
    <a href='#track/${d.slug}'>
      <img class='image' src="${
        d.image.big ? d.image.big : 'https://via.placeholder.com/600'
      }" alt="" />

        <h2>${d.song}</h2>
        <h3>${d.artist}</h3>
        <p>${d.date}
      </a>
    </li>`
    )
    .join('')}
  </ul>`

  return markup
}

export { index }
