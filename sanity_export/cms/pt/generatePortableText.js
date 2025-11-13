import { JSDOM } from "jsdom";
import { Schema } from '@sanity/schema';
import { htmlToBlocks } from '@sanity/block-tools';
import imageRule from './rules/image.js'
import shortcodeRule from './rules/shortcode.js'
//import figureRule from './rules/figure'
import htmlRule from './rules/html.js'
import highlight from "./rules/highlight.js";
import pureHtml from "./rules/pureHtml.js";
export default (html) => {
  // Start with compiling a schema we can work against
  const defaultSchema = Schema.compile({
    name: 'myBlog',
    types: [
      {
        type: 'object',
        name: 'blogPost',
        fields: [
          {
            title: 'Body',
            name: 'body',
            type: 'array',
            of: [
              {type: 'block'},
              {type: 'image'}
            ],
          },
        ],
      },
    ],
  })

  const blockContentType = defaultSchema
    .get('blogPost')
    .fields.find((field) => field.name === 'body').type

  const wrappedHTML = `<html><body>${html}</body></html>`
  const blocks = htmlToBlocks(
    wrappedHTML,
    blockContentType,
    {
      parseHtml: (html) => new JSDOM(html).window.document,
      rules: [
        imageRule,
        highlight,
        shortcodeRule,
        htmlRule,
        pureHtml,
        //figureRule
      ]
    }
  )

  return blocks
}