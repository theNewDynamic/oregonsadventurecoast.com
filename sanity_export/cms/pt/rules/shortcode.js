module.exports = {
  deserialize(el, next, block) {
    if(typeof el.tagName == "undefined") {
      return undefined
    }
    if (el.id !== 'shortcode') {
      return undefined
    }
    const processedHtml = el.innerHTML.replace('<strong>', '').replace('</strong>', '')
    parameters = JSON.parse(processedHtml)
    if(parameters.size && parameters._type == "pt.spacer") {
      parameters.size = Math.floor(parameters.size / 10)
    }
    return block(parameters)
  },
}