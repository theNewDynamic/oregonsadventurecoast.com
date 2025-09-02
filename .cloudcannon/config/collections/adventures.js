const { inputs, options } = require('../commons.js')

module.exports = {
  path: "content/adventure",
  name: "Adventures",
  icon: "hiking",
  sort_options: options.sort_options,
  schemas: {
    default: {
      ...options.base_schema,
      path: ".cloudcannon/schemas/adventure.md"
    }
  }
}