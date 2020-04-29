const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/ts/index.ts",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new CleanWebpackPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contentHash].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
