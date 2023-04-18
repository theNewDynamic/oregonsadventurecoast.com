const { inputs, options } = require ('./commons.js')

module.exports = {
  copy: inputs.markdown,
  content: inputs.markdown,
  description: inputs.markdown,
  template: inputs.hidden,
  draft: {
    type: "switch"
  },
  units: {
    type: "number"
  },
  tags: {
    type: "multiselect",
    comment: "Options are suggestions only, to add a tag, simply type it in the field.",
    options: {
      values: "_select_data.tags",
      allow_create: true
    }
  },
  aliases: {
    type: "array",
  },
  'aliases[*]': {
    type: 'text'
  },
  warning: {
    type: "switch",
    comment: "Should the post display the Blog's warning?"
  },
  warning_copy: {
    type: "markdown",
    hidden: "warning"
  },
  url: {
    type: "text"
  },
  layout: {
    label: "Layout",
    comment: "Choose Layout/Sidebar for Your Page"
  },
  startdate: {
    type: "text",
    label: "Start Date",
    comment: "IMPORTANT: Date must be entered YYYY-MM-DD (NO Time)"
  },
  enddate: {
    type: "text",
    label: "End Date",
    comment: "IMPORTANT: Date must be entered YYYY-MM-DD (NO Time)"
  },
  ctas: {
    type: "array",
    label: "CTAs",
    comment: "Add CTAs to be invoked with the 'ctas' shortcode or else."
  },
  property_category: {
    type: "multiselect",
    options: {
      values: "_select_data.property_categories"
    }
  },
  street2: {
    label: "Street 2"
  },
  website: {
    type: "url",
    comment: "Website's URL. Must include protocole (https://)"
  },
  boxes: {
    label: "Masonry Items",
    type: "array"
  },
  desktoptitle: {
    type: "text",
    label: "Title for Desktop"
  },
  mobiletitle: {
    ...inputs.responsive_title,
    label: "Title for Mobile"
  },
  hovertitle: {
    ...inputs.responsive_title,
    label: "Hover Title",
    comment: "The title displayed on mouse hover"
  },
  hoverdescription: {
    type: "textarea",
    label: "Hover Description",
    comment: "The text displayed on mouse hover"
  },
  photo: {
    type: "image",
    label: "Page Hero Image",
    comment: "Image Size 2048px x 530px"
  },
  photo_mobile: "input-image",
  mobilephoto: {
    ...inputs.image,
    label: "Image for Mobile"
  },
  desktopphoto: {
    ...inputs.image,
    label: "Image for Desktop"
  },
  photo_name: {
    ...inputs.image,
    label: "Image"
  },
  photo_alt: {
    label: "Image Alternate Attribute"
  },
  largeboxphoto: {
    ...inputs.image,
    label: "Large",
    comment: "Image Size 1024px x 395px"
  },
  mediumboxphoto: {
    ...inputs.image,
    label: "Medium",
    comment: "Image Size 667px x 355px"
  },
  smallboxphoto: {
    ...inputs.image,
    label: "Small",
    comment: "Image Size 340px x 214px"
  },
  slideshow: {
    type: "array",
    options: {
      image_key: "photo",
      structures: "_structures.slideshow"
    }
  },
  home_slashes: {
    type: "array",
    options: {
      structures: "_structures.home_slashes"
    }
  },
  masonry1: inputs.masonry,
  masonry2: inputs.masonry,
  masonry3: inputs.masonry,
  masonry4: inputs.masonry,
  masonry5: inputs.masonry,
  masonry6: inputs.masonry,
  masonry7: inputs.masonry,
  gallery: {
    type: "array",
    options: {
      structures: {
        values: {
          value: {
            title: null,
            image: null
          }
        }
      }
    }
  },
  seo: {
    type: "object",
    options: {
      structures: {
        values: {
          _inputs: {
            imgalt: {
              label: "Image Alternative Text"
            },
            description: "input-minimal-markdown"
          },
          value: {
            title: null,
            description: null,
            imgalt: null,
            image: null
          }
        }
      }
    }
  },
  address: {
    type: "object",
    options: {
      structures: {
        values: {
          value: {
            city: null,
            state: null,
            street: null,
            street2: null,
            zip: null
          }
        }
      }
    }
  },
  coordinates: {
    type: "object",
    options: {
      structures: {
        values: {
          _inputs: {
            lat: {
              label: "Latitude"
            },
            lng: {
              label: "Longitude"
            }
          },
          value: {
            lat: null,
            lng: null
          }
        }
      }
    }
  },
}