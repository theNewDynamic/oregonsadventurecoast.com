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
  _inputs: {
    title: {
      label: 'Publish Date',
      comment: 'Date this post should be public.'
    },
    description: {
      comment: 'Text introducing the post on list pages.'
    },
    image: {
      comment: 'Blog photo header - size and scale to 695px by 322px.'
    }
  },
  schemas: {
    default: {
      ...options.base_schema,
      path: ".cloudcannon/schemas/post.md"
    }
  }
}