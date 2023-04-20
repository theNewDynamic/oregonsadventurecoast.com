const { options } = require("../commons");

module.exports = {
  path: "content/tripideas",
  name: "Trip Ideas",
  icon: "tips_and_updates",
  schemas: {
    default: {
      ...options.base_schema,
      path: ".cloudcannon/schemas/trip-idea.md"
    }
  },
  _inputs: {
    photo: {
      label: "Header Photo",
      comment: "Choose a header image - size to 2048px by 530px"
    },
    towns: {
      type: "multiselect",
      options: {
        values: "_select_data.towns"
      }
    },
    adventures: {
      type: "multiselect",
      options: {
        values: "_select_data.adventures"
      }
    },
    durations: {
      type: "multiselect",
      options: {
        values: "_select_data.durations"
      }
    }
  }
}