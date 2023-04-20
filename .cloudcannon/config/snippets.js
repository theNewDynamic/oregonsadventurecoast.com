const dev_only = (name, args = []) => ({
  template: "hugo_shortcode_positional_args",
  definitions: {
    shortcode_name: name,
    positional_args: args
  },
  preview: {
    icon: "do_not_disturb_alt",
    text: name,
    subtext: "Please ignore this snippet"
  }
})

module.exports = {
  iframe: dev_only("iframe", [
    { 
      editor_key: "name",
      type: "string"
    }
  ]),
  link: {
    template: "hugo_paired_shortcode_named_args",
    inline: true,
    definitions: {
      shortcode_name: "link",
      content_key: "copy",
      named_args: [
        {
          editor_key: "url",
          type: "string",
        }
      ]
    },
    preview: {
      icon: "link",
      text: "Link",
      subtext: [
        {key: 'copy'},
        "Link copy"
      ],
      metadata: [
        {
          icon: "link",
          text: [
            { key: "url" }
          ]
        }
      ]
    }
  },
  colortext: {
    template: "hugo_paired_markdown_shortcode_named_args",
    inline: true,
    definitions: {
      shortcode_name: "colortext",
      content_key: "copy",
      named_args: [
        {
          editor_key: "color",
          type: "string",
        }
      ]
    },

    preview: {
      icon: "format_color_text",
      text: "Color Text",
      subtext: [
        { key: "copy" },
        "Colorize text"
      ],
      metadata: [
        {
          icon: "palette",
          text: [
            { key: "color" }
          ]
        }
      ]
    },
    picker_preview: {
      metadata: false
    },
    _inputs: {
      copy: {
        options: {
          height: 135
        }
      }
    }
  },
  accordions: {
    template: "hugo_shortcode_positional_args",
    definitions: {
      shortcode_name: "accordions"
    },
    preview: {
      icon: "expand_circle_down",
      text: "Accordions",
      subtext: "Display the accordions if any defined in the page's Accordion Sections"
    }
  },
  ctas: {
    template: 'hugo_shortcode_positional_args',
    definitions: {
      shortcode_name: 'ctas'
    },
    preview: {
      icon: "smart_button",
      text: "CTAs",
      subtext: "Display the CTAs from the Front Matter"
    }
  },
  floatimage: {
    template:  "hugo_shortcode_named_args",
    definitions: {
      shortcode_name: "floatimage",
      named_args: [
        {
          editor_key: "image",
          source_key: "src",
          type: "string"
        },
        {
          editor_key: "float",
          type: "string"
        },
        {
          editor_key: "alt",
          type: "string"
        },
        {
          editor_key: "size",
          type: "string"
        },
      ]
    },
    preview: {
      text: "Float Image",
      icon: "art_track",
      image: [
        { key: "image" }
      ],
      subtext: [
        { key: "alt"},
        "Adds a floating image"
      ]
    },
    picker_preview: {
      image: false,
    },
    _inputs: {
      float: {
        type: "select",
        comment: "On which side of the text, should the image float",
        options: {
          values: [
            "left",
            "right"
          ]
        }
      }
    }
  },
  spacer: {
    template: "hugo_shortcode_positional_args",
    definitions: {
      shortcode_name: "spacer",
      positional_args: [
        {
          editor_key: "spacer_size",
          type: "string"
        }
      ]
    },
    preview: {
      text: "Spacer",
      icon: "vertical_align_center",
      subtext: [
        { key: "spacer_size"},
        "Create vertical space"
      ]
    },
    _inputs: {
      spacer_size: {
        type: "text",
        comment: "Only multiples of 5",
        options: {
          step: 5,
          max: 100
        }
      }
    }
  },
  columns: {
    template: "hugo_paired_shortcode_named_args",
    definitions: {
      content_key: "copy_full_editor",
      shortcode_name: "columns",
      named_args: [
        {
          editor_key: "number_columns",
          source_key: "number",
          type: "string"
        },
      ]
    },
    preview: {
      text: "Columns",
      subtext: [
        { key: "copy" },
        "Split copy into columns using the `divider` keyword"
      ]
    },
    _inputs: {
      number_columns: {
        type: "select",
        options: {
          values: [
            "1",
            "2",
            "3"
          ]
        }
      }
    }
  }
}