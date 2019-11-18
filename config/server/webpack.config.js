const Paths = require("./Paths");
const NodemonPlugin = require("nodemon-webpack-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: Paths.entry,
  output: {
    filename: "server.bundle.js",
    path: Paths.output
  },
  devtool: !isProduction && "source-map",
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        loader: "ts-loader",
        options: {
          configFile: Paths.tsconfig
        }
      }
    ]
  },
  mode: isProduction ? "production" : "development",
  watch: !isProduction,
  target: "node",
  plugins: isProduction
    ? [
        new WebpackCleanupPlugin({
          exclude: ["client/**/*"]
        }),
        new CompressionPlugin()
      ]
    : [new WebpackCleanupPlugin(), new NodemonPlugin()]
};
