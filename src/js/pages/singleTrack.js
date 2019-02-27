import { getLastFm } from '../helper/api.js'
import { cleanSingleTrack } from '../helper/cleanData.js'

async function singleTrack(slug) {
  console.log(slug)

  let data = await getLastFm(1, 'track.getInfo', slug)

  console.log(data)

  if (data.error) {
    return `<div class="singleContent"><h1>${data.message}</h1></div>`
  }
  console.log(data)
  let cleanData = cleanSingleTrack(data)

  console.log(cleanData)
  let localBackground = localStorage.getItem('background')

  return `
  <div class="singleContent">
  <img class='image' src="${
    localBackground ? localBackground : 'https://via.placeholder.com/600'
  }" alt="" />
    <div class="misc">
      <h1>${cleanData.track}</h1>
      <h2>${cleanData.artist}</h2>
      <h3>Monthly listeners ${cleanData.listeners}</h3>
      <h3>Times played this month ${cleanData.playcount}</h3>

      ${cleanData.tags > 1 ? '<ul>' : ''}
      ${cleanData.tags.map(i => `<li>${i}</li>`).join('')}
      ${cleanData.tags > 1 ? '</ul>' : ''}
    </div>
  </div>
  `
}

export { singleTrack }
