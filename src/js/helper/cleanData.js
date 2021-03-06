'use strict'
// Clean recent tracks
const cleanRecent = data => {
  return data.recenttracks.track.map(i => {
    return {
      playing: i['@attr'] ? 'true' : 'false',
      song: i.name,
      artist: i.artist.name,
      image: {
        small: i.image[2]['#text'],
        big: i.image[3]['#text']
      },
      date: i['@attr'] ? 'Currently playing' : i.date['#text'],
      formatArtist: format(i.artist.name),
      formatSong: format(i.name),
      slug: `&artist=${format(i.artist.name)}&track=${format(i.name)}`
    }
  })
}

// Clean list of artists
const cleanArtists = data => {
  return data.topartists.artist.map(i => {
    return {
      rank: i['@attr'].rank,
      artist: i.name,
      image: {
        small: i.image[3]['#text'],
        big: i.image[4]['#text']
      },
      playcount: i.playcount
    }
  })
}

// Clean list of tracks
const cleanTracks = data => {
  return data.toptracks.track.map(i => {
    return {
      rank: i['@attr'].rank,
      song: i.name,
      artist: i.artist.name,
      image: {
        small: i.image[2]['#text'],
        big: i.image[3]['#text']
      },
      playcount: i.playcount,
      formatArtist: format(i.artist.name),
      formatSong: format(i.name),
      slug: `&artist=${format(i.artist.name)}&track=${format(i.name)}`
    }
  })
  return data
}

// Some magic for building up the data for a single track
const cleanSingleTrack = data => {
  let i = data.track
  return {
    track: i.name ? i.name : '',
    artist: i.artist.name,
    playcount: i.playcount,
    listeners: i.listeners,
    tags: i.toptags.tag.map(tag => tag.name)
  }
}

const format = text => {
  return text.replace(/\s/g, '+').toLowerCase()
}

export { cleanRecent, cleanArtists, cleanTracks, cleanSingleTrack }
