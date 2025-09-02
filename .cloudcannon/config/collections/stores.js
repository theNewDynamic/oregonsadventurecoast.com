const { options } = require("../commons");

module.exports = {
  path: "content/store",
  name: "Shopping",
  icon: "store",
  image_key: "photo_name",
  subtext_key: "property_description",
  sort_options: options.sort_options,
  schemas: {
    default: {
      ...options.base_schema,
      path: ".cloudcannon/schemas/store.md"
    }
  },
  _enabled_editors: [
    "data"
  ],
  filter: {
    exclude: [
      "_index.md"
    ]
  }
}