import cleanHtml from '../cleanHtml.js'
import parseObject from '../parseObject.js'

export default {
  deserialize(el, next, block) {
    if (typeof el.tagName == "undefined") {
      return undefined
    }
    if (el.id !== 'float-image') {
      return undefined
    }
    const processedHtml = cleanHtml(el.innerHTML)
    let parameters = JSON.parse(processedHtml)
    if(parameters) {
      parameters = parseObject(parameters)
    }
    return block(parameters)
  }
}