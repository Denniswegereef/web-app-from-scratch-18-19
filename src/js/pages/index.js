import { getRecentTracks } from '../helper/api.js'

async function index(number = 1) {
  let data = await getRecentTracks(number)

  const markup = `
  <ul class="tracks">
  ${data.recenttracks.track
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

  return markup
}

export { index }
