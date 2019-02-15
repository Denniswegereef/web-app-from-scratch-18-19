//Rennder elements and childeren correctly
function renderElem({ tagName, attrs, children }) {
  const $el = document.createElement(tagName)

  // Set attributes
  for (const [k, v] of Object.entries(attrs)) {
    $el.setAttribute(k, v)
  }
  // Set childeren
  for (const child of children) {
    const $child = render(child)
    $el.appendChild($child)
  }

  return $el
}

function render(vNode) {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode)
  }

  //
  return renderElem(vNode)
}

export { render }
