import { getLastFm } from '../helper/api.js'
import { cleanSingleTrack } from '../helper/cleanData.js'

async function singleTrack(slug) {
  let data = await getLastFm(1, 'track.getInfo', slug).then(res => {
    return cleanSingleTrack(res)
  })

  console.log(data)

  return `
    <div class="singleContent">
    <img class='single-image' src="${
      data.album.image.big
        ? data.album.image.big
        : 'https://via.placeholder.com/500'
    }" alt="" />
    <div>
      <h2>${data.song}</h2>
      <h3>${data.artist.name}</h3>
    </div>
    </div>
  `
}

export { singleTrack }
