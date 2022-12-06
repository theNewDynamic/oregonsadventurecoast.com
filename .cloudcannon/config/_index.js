
const collections_config = (keys) => {
  let collections = {}
  keys.forEach(key => {
    collections[key] = require(`./collections/${key}`)
  })
  return collections
}

module.exports = {
  collections_config_override: true,
  timezone: "America/New_York",
  _enabled_editors: [
    "data"
  ],
  paths: {
    data: "data",
    //dam_uploads: '[filename]'
  },
  data_config: {
    states: true
  },
  _inputs: require('./inputs'),
  _structures: require('./structures'),
  _select_data: require('./select'),
  _editables: require('./editables'),
  _snipets: require('./snippets'),
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
    "products"]
  )
}