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
      id: i.mbid
    }
  })
}

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

const cleanTracks = data => {
  console.log(data)
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
      id: i.mbid
    }
  })
  return data
}

export { cleanRecent, cleanArtists, cleanTracks }
