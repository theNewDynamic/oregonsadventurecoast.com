const masonry = {
  values: {
    text_key: "desktoptitle",
    value: {
      desktoptitle: null,
      desktopphoto: null,
      hovertitle: null,
      hoverdescription: null,
      mobiletitle: null,
      url: null
    }
  }
}

module.exports = {
  accordion_sections: {
    values: {
      value: {
        title: null,
        accordions: null
      }
    }
  },
  accordions: {
    values: {
      _inputs: {
        content: {
          label: "Accordion Content"
        }
      },
      value: {
        title: null,
        content: null
      }
    }
  },
  ctas: {
    values: {
      _inputs: {
        title: "The text on the button"
      },
      value: {
        title: null,
        url: null,
        action: null,
        image: null
      }
    }
  },
  masonry,
  boxes: masonry,
  home_splashes: {
    values: {
      _inputs: {
        img: {
          type: "image"
        }
      },
      value: {
        url: null,
        img: null,
        alt: null
      }
    }
  },
  slideshow: {
    values: {
      _inputs: {
        title: {
          comment: "The title of the slide"
        },
        photo: {
          comment: "The image of the slide"
        },
        title_mobile: {
          comment: "The text to be displayed on mobile"
        },
        photo_mobile: {
          comment: "The image used on mobile"
        },
        url: {
          comment: "The URL of the page opened when the slide is clicked"
        },
        video: {
          type: "object",
          options: {
            structures: "_structures.videos"
          }
        }
      },
      value: {
        title: null,
        photo: null,
        title_mobile: null,
        photo_mobile: null,
        url: null,
        video: null
      }
    }
  },
  videos: {
    values: {
      _inputs: {
        cover: {
          type: "file"
        },
        source: {
          type: "file"
        }
      },
      value: {
        cover: null,
        source: null
      }
    }
  },
  custom_fields: {
    style: "modal",
    id_key: "id",
    values: [
      {
        label: "Product Field Size",
        _inputs: {
          id: {
            hidden: true
          },
          options: {
            type: "array"
          }
        },
        value: {
          id: "size",
          name: "Size",
          options: [
            "S",
            "M",
            "L"
          ]
        }
      }
    ]
  },
  products: {
    values: {
      _inputs: {
        id: {
          comment: "Will be used as product ID in the store back office"
        },
        price: {
          type: "number"
        },
        weight: {
          type: "number",
          comment: "The weight of the product in ounces"
        },
        description: {
          comment: ""
        }
      },
      value: {
        id: null,
        price: null,
        weight: null,
        description: null,
        custom_fields: null
      }
    }
  }
}