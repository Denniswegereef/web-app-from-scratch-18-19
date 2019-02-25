import { getLastFm } from '../helper/api.js'
import { cleanArtists } from '../helper/cleanData.js'

async function artists(number = 1) {
  let data = await getLastFm(number, 'user.getTopArtists').then(res => {
    return cleanArtists(res)
  })

  const markup = `
  <ul class="recent-tracks">
  ${data
    .map(
      d => `
    <li class="single-item" data-image='${d.image.big}'>
      <img class='image' src="${
        d.image.big ? d.image.big : 'https://via.placeholder.com/100'
      }" alt="" />

        <h2>${d.artist}</h2>
        <h3>${d.playcount}</h3>

    </li>`
    )
    .join('')}
  </ul>`

  return markup
}

export { artists }
