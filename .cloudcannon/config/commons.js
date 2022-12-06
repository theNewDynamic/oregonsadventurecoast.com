module.exports ={
  inputs: {
    hidden: {
      hidden: true
    },
    markdown: {
      type: 'markdown'
    },
    array: {
      type: 'array'
    },
    image: {
      type: 'image'
    },
    checkbox: {
      type: 'checkbox'
    },
    switch: {
      type: 'switch'
    },
    number: {
      type: 'number'
    },
    responsive_title: {
      type: "text",
      label: "Title for Desktop"
    },
    masonry: {
      type: "object",
      text_key: "desktoptitle",
      options: {
        structures: "_structures.masonry"
      }
    },
    seo_default: {
      type: "object",
      options: {
        structures: {
          values: {
            value: {
              title: null,
              description: null,
            }
          }
        }
      }
    },
    slug(url) {
      return `This will be used as permalink slug. Ex: if value is \`my-page\` then the page will live at ${url}`
    },
    collection_array(item_singular) {
      let output = {}
      const item_plural = item_singular + 's'
      output[item_singular] = {
        type: 'select',
        options: {
          values: `collections.${item_plural}`,
          value_key: 'content_path',
        }
      }
      output[item_plural] = {
        type: 'array'
      }
      output[`${item_plural}[*]`] = output[item_singular]
      return output
    }
  },
  options: {
    section_sort_options: [
      {
        key: "_schema",
        label: "Landing first",
        order: "asc"
      },
      {
        key: "title",
        order: "asc"
      },
      {
        key: "title",
        order: "desc"
      }
    ],
    sort_options: [
      {
        key: "title",
        order: "asc"
      },
      {
        key: "title",
        order: "desc"
      }
    ],
    base_schema: {
      hide_extra_inputs: true,
      remove_empty_inputs: true,
      remove_extra_inputs: false
    },
    section_schema: {
      default: {
        hide_extra_inputs: true,
        remove_empty_inputs: true,
        remove_extra_inputs: false,
        path: ".cloudcannon/schemas/main-page__section.md"
      },
      accordion: {
        hide_extra_inputs: true,
        remove_empty_inputs: true,
        remove_extra_inputs: false,
        icon: "expand_more",
        path: ".cloudcannon/schemas/main-page__section--accordion.md"
      },
      intro: {
        hide_extra_inputs: true,
        remove_empty_inputs: true,
        remove_extra_inputs: false,
        icon: "flag",
        path: ".cloudcannon/schemas/main-page__section--intro.md"
      },
      landing: {
        hide_extra_inputs: true,
        remove_empty_inputs: true,
        remove_extra_inputs: false,
        icon: "home",
        path: ".cloudcannon/schemas/main-page__landing.md"
      }
    },
    editable_base: {
      image_size_attributes: false,
      blockquote: true,
      link: true,
      bold: true,
      format: "p h1 h2 h3",
      italic: true,
      strike: false,
      subscript: false,
      superscript: false,
      underline: true,
      bulletedlist: true,
      indent: false,
      numberedlist: true,
      outdent: false,
      code: false,
      embed: true,
      horizontalrule: false,
      image: true,
      table: true,
      undo: true,
      redo: true,
      removeformat: true,
      copyformatting: true,
      center: "text-center",
      left: "text-left",
      right: "text-right",
      snippet: true,
    }
  }
}