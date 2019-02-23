// DEBOUNCE https://gist.github.com/nmsdvid/8807205
const debounce = (callback, time) => {
  let interval
  return (...args) => {
    clearTimeout(interval)
    interval = setTimeout(() => {
      interval = null
      callback(...args)
    }, time)
  }
}

export { debounce }
