const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin"); // installed via npm
const devMode = process.env.NODE_ENV === "development";
const SriPlugin = require("webpack-subresource-integrity"); // installed via npm

module.exports = {
  //NOTE: IF input is src/index.js we don't have to specify it.
  entry: {
    // main: './src/index.js'
    //MAY NEED VENDOR
    app: ["./js/app"],
    main: ["./js/main"],
    lodging: ["./js/lodging"],
    tourcharters: ["./js/tourcharters"],
    equipment: ["./js/equipment"],
    events: ["./js/events"],
    calendar: ["./js/calendar"],
    instagram: ["./js/instagram"],
    search: ["./js/search"],
    dining: ["./js/dining"]
	},
  output: {
    path: path.join(__dirname, "./static/dist/"),
    filename: devMode ? "[name].js" : "[name].[contenthash].js",
    publicPath: "/dist", // DO WE NEED THIS?,
    crossOriginLoading: "anonymous"
  },
  module: {
    rules: [      
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              context: "fonts",
              name: "[name].[ext]",
              // “publicPath” is used by several Webpack’s plugins to update the URLs inside CSS, HTML files when generating production builds.
              publicPath: "/dist/Fonts",
              // “path” tells  Webpack where it should store the result
              outputPath: "Fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[contenthash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css"
    }),
    new SriPlugin({
      hashFuncNames: ["sha256"],
      enabled: process.env.NODE_ENV === "production"
    }),
    new AssetsPlugin({
      filename: "assets.json",
      //metadata: { version: 123 },
      path: path.join(__dirname, "./data"),
      prettyPrint: true,
      integrity: true,
      entrypoints: false
    })
  ]
};
