module.exports = {
  deserialize(el, next, block) {
    if(typeof el.tagName == "undefined") {
      return undefined
    }
    const tagName = el.tagName.toLowerCase()
    if(!["div", "script"].includes(tagName)) {
      return undefined
    }

    if(el.style || tagName == "script") {
      const html = el.outerHTML
      return block({
        _type: 'pt.codeHtml',
        code:html,
        language: 'html',
      })
    }
    return undefined
  },
}