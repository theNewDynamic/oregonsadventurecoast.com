const { inputs, options } = require('../commons.js')

module.exports = {
  path: "content/blog",
  name: "Blog Post",
  icon: "article",
  sort_options: options.sort_options,
  filter: {
    exclude: [
      "_index.md"
    ]
  },
  schemas: {
    default: {
      ...options.base_schema,
      path: ".cloudcannon/schemas/post.md"
    }
  }
}