const { inputs, options } = require('../commons.js')

module.exports = {
  path: "content/sitepages",
  name: "Regular Pages",
  icon: "tour",
  sort_options: options.sort_options,
  filter: {
    exclude: [
      "_index.md"
    ]
  },
  schemas: {
    default: {
      ...options.base_schema,
      path: ".cloudcannon/schemas/regular-page.md"
    }
  }
}