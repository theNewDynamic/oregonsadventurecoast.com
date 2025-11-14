import cleanHtml from '../cleanHtml.js'
import parseObject from '../parseObject.js'

export default {
  deserialize(el, next, block) {
    if (typeof el.tagName == "undefined") {
      return undefined
    }
    if (el.id !== 'shortcode') {
      return undefined
    }
    const processedHtml = cleanHtml(el.innerHTML)
    let parameters = JSON.parse(processedHtml)
    if (parameters.size && parameters._type == "pt.spacer") {
      parameters.size = Math.floor(parameters.size / 10)
    }
    if(parameters) {
      parameters = parseObject(parameters)
    }
    return block(parameters)
  }
}