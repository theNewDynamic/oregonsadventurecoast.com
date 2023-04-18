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
  _inputs: {
    desktoptitle: {
      title: 'Desktop Title',
      comment: 'Title displayed on desktop'
    },
    mobiletitle: {
      title: 'Mobile Title',
      comment: 'Title displayed on mobile',
    },
    hovertitle: {
      type: "text",
      label: "Box Animation Title",
      comment: "Title displayed on Event box animation"
    },
    hoverdescription: {
      title: 'Box Animation Description',
      comment: 'Description displays on Event Box animation.'
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