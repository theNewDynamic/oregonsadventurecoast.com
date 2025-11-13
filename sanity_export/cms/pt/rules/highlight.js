export default {
  deserialize(el, next, block) {
    if(typeof el.tagName == "undefined") {
      return undefined
    }
    if (el.tagName !== 'span') {
      return undefined
    }
    if(el.style.color) {
      return {
        _type: 'span',
        marks: [
          "highlight"
        ],
        text: el.textContent
      }
    }
    return block(parameters)
  },
}