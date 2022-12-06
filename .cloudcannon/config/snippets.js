module.exports = {
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