module.exports = {
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
          editor_key: "copy",
          source_key: "alt",
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
        { key: "copy"},
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
        options: [
          "left",
          "right"
        ]
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
          type: "number"
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
        type: "number",
        comment: "Only multiples of 5",
        options: {
          step: 5,
          max: 100
        }
      }
    }
  }
}