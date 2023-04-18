const { options } = require("../commons");

module.exports = {
  path: "content/products",
  name: "Products",
  icon: "local_offer",
  image_key: "image",
  sort_options: options.sort_options,
  schemas: {
    default: {
      ...options.base_schema,
      path: ".cloudcannon/schemas/product.md"
    }
  },
  filter: {
    exclude: [
      "_index.md"
    ]
  },
  _enabled_editors: [
    "data"
  ],
  _inputs: {
    description: {
      comment: "Description of the product to be displayed on the web site"
    },
    product: {
      type: "object",
      options: {
        structures: "_structures.products"
      }
    }
  }
}