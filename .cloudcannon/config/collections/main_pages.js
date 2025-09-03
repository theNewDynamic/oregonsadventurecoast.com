const { inputs, options } = require('../commons.js')

module.exports = {
  path: "content",
  name: "Main Pages",
  icon: "sim_card",
  description: "This is where site's main pages go. Sections and homepages.",
  sort_options: options.sort_options,
  schemas: {
    default: {
      ...options.base_schema,
      path: ".cloudcannon/schemas/regular-page.md"
    },
    home: {
      ...options.base_schema,
      icon: "home",
      path: ".cloudcannon/schemas/home.md"
    },
    gallery: {
      ...options.base_schema,
      icon: "collections",
      path: ".cloudcannon/schemas/gallery.md"
    }
  },
  _inputs: {
    welcomeheadline: {
      label: "Welcome Headline",
      comment: "Headline displayed below the slideshow"
    },
  },
  filter: {
    base: "none",
    include: [
      "_index.md",
      "index-es.md",
      "adventures.md",
      "calendar.md",
      "dining.md",
      "equipment-rent-and-buy.md",
      "events.md",
      "gallery.md",
      "lodging.md",
      "search.md",
      "tour-guides-and-charters.md"
    ]
  }
}