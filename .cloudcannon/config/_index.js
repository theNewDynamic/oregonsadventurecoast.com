
const collections_config = (keys) => {
  let collections = {}
  keys.forEach(key => {
    collections[key] = require(`./collections/${key}`)
  })
  return collections
}

module.exports = {
  collections_config_override: true,
  timezone: "America/Los_Angeles",
  _enabled_editors: [
    "content",
    "data",
    "source",
  ],
  paths: {
    data: "data",
    uploads: 'img'
    //dam_uploads: '[filename]'
  },
  data_config: {
    states: true
  },
  _inputs: require('./inputs'),
  _structures: require('./structures'),
  _select_data: require('./select'),
  _editables: require('./editables'),
  _snippets: require('./snippets'),
  _snippets_imports: {
    hugo: {
      include: [
        "hugo_youtube",
        "hugo_vimeo"
      ]
    }
  },
  collection_groups: [
    {
      heading: "Landing Pages",
      collections: [
        "main_pages",
        "regular_pages"
      ]
    },
    {
      heading: "Other",
      collections: [
        "adventures",
        "posts",
        "events",
        "trip_ideas",
        "stores",
        "lodgings",
        "tour_equipments",
        "products"
      ],
    },
    {
      heading: "General",
      collections: [
        "general"
      ]
    }
  ],
  collections_config: collections_config([
    "main_pages",
    "regular_pages",
    "adventures",
    "posts",
    "events",
    "trip_ideas",
    "stores",
    "lodgings",
    "tour_equipments",
    "products",
    "general"
  ])
}