const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/ts/index.ts",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
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
      {
        test: /\.s[ac]ss$/i,
        use: [
          // ここの順番は重要。下から順番に実行される
          // cssファイルを作成する
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // プレフィックスを自動でつけてくれる
          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
