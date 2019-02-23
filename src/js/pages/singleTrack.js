import { getLastFm } from '../helper/api.js'
import { cleanSingleTrack } from '../helper/cleanData.js'

async function singleTrack(slug) {
  let data = await getLastFm(1, 'track.getInfo', slug).then(res => {
    console.log(res)
    return cleanSingleTrack(res)
  })

  console.log(data)

  return `
    <div class="singleContent">
      <h1>this is gonne be single content ${slug}</h1>
    </div>
  `
}

export { singleTrack }
