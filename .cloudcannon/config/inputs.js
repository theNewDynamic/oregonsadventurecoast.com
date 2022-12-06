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
    type: "multiselect",
    options: {
      values: [
        "/blog/a-well-formated-url-example"
      ],
      allow_create: true
    }
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
    label: "Box Animation Title",
    comment: "Title displayed on Event box animation"
  },
  photo: {
    type: "image",
    label: "Page Hero Image",
    comment: "Image Size 2048px x 530px"
  },
  photo_mobile: "input-image",
  mobilephoto: {
    ...inputs.image,
    label: "Mobile Photo"
  },
  desktopphoto: {
    ...inputs.image,
    label: "Desktop Photo"
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
  hoverdescription: {
    type: "textarea",
    label: "Box Animation Description",
    comment: "Description displayed on Event Box animation"
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
            street: null,
            city: null,
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
  }
}