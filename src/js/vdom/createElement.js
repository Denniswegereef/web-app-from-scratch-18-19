// Create virtual element in objects
function createElement(tagName, { attrs = {}, children = [] } = {}) {
  const vElem = Object.create(null)

  Object.assign(vElem, {
    tagName,
    attrs,
    children
  })

  return vElem
}

export { createElement }
