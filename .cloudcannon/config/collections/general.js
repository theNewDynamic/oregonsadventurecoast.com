const { inputs, options } = require('../commons.js')

module.exports = {
  path: "data",
  name: "Redirects",
  filter: {
    base: "none",
    include: [
      "redirects.yaml"
    ],
  }
}