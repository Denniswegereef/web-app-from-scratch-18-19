## The LastFM experience

### Nice image here

A single page application based on the Last.fm API. Created without the help of any libaries. It is possible can view it online[ here](https://denniswegereef.github.io/web-app-from-scratch-18-19/src).

### Table of contents

- [Install](#install)
- [Features](#features)
- [API](#api)
- [diagrams](#diagrams)
- [extra](#extra)
- [To-do](#todo)
- [Links](#links)

### Install

This project can be run without necessary dependencies. Currently if you install it with npm you can start the live server from there.

```bash
git clone https://github.com/Denniswegereef/web-app-from-scratch-18-19
npm install
```

To start the application:

```bash
npm run watch
```

### Features

- Fetch data from a individual users
- Detail pages for tracks
- It was a virtual dom **(currently opted out)**
- A simple hash router
- Basic rendering from the `pages` folder

### API

The data that is used in the application from the [Last.fm API](https://www.last.fm/api). It is possible with the module `api` to specify what you wanna grab. All the different endpoints can be found [here](https://www.last.fm/api/intro) to use.

To change your API key, it can be done in the `src/helper/api.js` on top of page (currently this project still holds my key, oops).

To make a request from your page:
as you can see the `user.getTopTracks` can be changed to a different endpoint. The third argument that you can pass can be anything and will just be added to the API request.

```js
async function getTopTracks() {
  let data = await getLastFm(number, 'user.getTopTracks').then(res => {
    return cleanTracks(res)
  })
}
console.log(getTopTracks())
```

Also there a functionality to get a single user.

```js
async function getUser() {
  let userInfo = await checkUser(username)

  if (userInfo.error) {
    console.error(userInfo.error)
  }

  console.log(userInfo)
}
```

### Diagrams

![diagram](diagram.png)

### Extra

- Created a hash router
- LocalStorage
- Implemented a virtualDOM (but it was way to complicated to create the diff functionality by myself) hence why I did choose not to implement it in my final version.

### Todo

- [x] Making modules
- [x] Diffent last FM users
- [x] Dynamic routes
- [x] Implement localStorage
- [x] Data cleaning
- [x] Loader spinner
- [x] VirtualDOM with differ
- [x] Made the router the brain of the application
- [ ] Load more content when user scrolls to the endpoint
- [ ] Making a more usefull router
- [ ] Make the time previous correctly not (4 feb. 18:39) but something like (5 minutes ago) etc.
- [ ] Lyrics from songs on the detailpage (different API)
- [ ] Multilanguage

### Links

[Creating a virtual DOM](https://dev.to/ycmjason/building-a-simple-virtual-dom-from-scratch-3d05)
[Last.fm API](https://www.last.fm/api/show/user.getRecentTracks)
[Tagged template literals](https://wesbos.com/tagged-template-literals/)

### License

MIT
