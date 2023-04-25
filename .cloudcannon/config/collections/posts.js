const { inputs, options } = require('../commons.js')

module.exports = {
  path: "content/blog",
  name: "Blog Post",
  icon: "article",
  // sort_options: options.sort_options,
  sort_options: [
    {
      key: "date",
      order: "desc",
      label: "Date (Newest First)"
    },
    {
      key: "date",
      order: "asc",
      label: "Date (Oldest First)"
    },
    {
      key: "title",
      order: "asc"
    },
    {
      key: "title",
      order: "desc"
    }
  ],
  filter: {
    exclude: [
      "_index.md"
    ]
  },
  _inputs: {
    date: {
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