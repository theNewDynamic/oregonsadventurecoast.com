const { options } = require("../commons");

module.exports = {
  path: "content/lodgingitems",
  name: "Lodging",
  icon: "hotel",
  image_key: "photo_name",
  subtext_key: "property_description",
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
      path: ".cloudcannon/schemas/lodging.md"
    }
  },
  _inputs: {
    cost: {
      type: "select",
      options: {
        values: [
          "1 - $",
          "2 - $$",
          "3 - $$$"
        ]
      }
    },
    property_category: {
      type: "select",
      label: "Category",
      options: {
        values: [
          "1 - Hotels, Motels & Inns",
          "2 - RV Parks & Camping",
          "3 - Bed & Breakfasts",
          "4 - Vacation Rental Homes"
        ]
      }
    },
    cost: {
      type: "select",
      label: "Cost",
      options: {
        values: [
          "1 - $",
          "2 - $$",
          "3 - $$$"
        ]
      }
    },
    amenityList: {
      type: "select",
      label: "Amenities",
      options: {
        values: [
          "1 - Restaurant/Bar/Rm Service",
          "2 - Continental or Full Bkfst",
          "3 - Fitness Center",
          "4 - Pool/Hot Tub",
          "5 - Pet Friendly",
          "6 - WiFi Available",
          "7 - Kitchens Available",
          "8 - Meeting Facilities",
          "9 - Handicap Accessible",
          "10 - Chamber Member"
        ]
      }
    }
  }
}