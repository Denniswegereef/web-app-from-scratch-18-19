import { getRecentTracks } from '../helper/api.js'
import { cleanTracks } from '../helper/cleanData.js'

async function tracks(number = 1) {
  let data = await getRecentTracks(number, 'user.getTopTracks').then(res => {
    return cleanTracks(res)
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

        <h2>${d.song}</h2>
        <h3>${d.artist}</h3>
        <p>Played: ${d.playcount}

    </li>`
    )
    .join('')}
  </ul>`

  return markup
}

export { tracks }
