const { options } = require("../commons");

module.exports = {
  path: "content/event",
  name: "Events",
  icon: "calendar_month",
  subtext_key: "startdate",
  filter: {
    exclude: [
      "_index.md"
    ]
  },
  schemas: {
    default: {
      ...options.base_schema,
      path: ".cloudcannon/schemas/event.md"
    }
  },
  sort_options: [
    {
      key: "startdate",
      order: "desc",
      label: "Start Date (Newest First)"
    },
    {
      key: "startdate",
      order: "asc",
      label: "Start Date"
    },
    {
      key: "title",
      order: "asc"
    }
  ]
}