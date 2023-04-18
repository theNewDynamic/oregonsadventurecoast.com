const { options } = require('./commons')

module.exports = {
  content: options.editable_base,
  block: options.editable_base,
  text: {
    italic: true,
    bold: true,
  }
}