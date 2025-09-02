const { options } = require("../commons");

module.exports = {
  path: "content/tourandequipment",
  name: "Tour & Equipments",
  icon: "festival",
  sort_options: options.sort_options,
  _enabled_editors: [
    "data"
  ],
  filter: {
    exclude: [
      "_index.md"
    ]
  },
  schemas: {
    default: {
      ...options.base_schema,
      path: ".cloudcannon/schemas/tour_equipment.md"
    }
  },
  _inputs: {
    property_name: {
      label: "Business Name for Sorting",
      comment: "This text will determine the alpha sort."
    },
    property_description: {
      label: 'Description'
    },
    equip_type: {
      type: "multiselect",
      label: "Type",
      comment: "Please select if this entry provides Tours, Equipment or both.",
      options: {
        values: [
          "Tour",
          "Equipment"
        ]
      }
    }
  }
}