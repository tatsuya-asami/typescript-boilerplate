const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: "./src/ts/index.ts",
  devtool: "inline-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // ここの順番は重要。下から順番に実行される
          // ここの順番は重要。下から順番に実行される
          // cssファイルを作成する
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // プレフィックスを自動で付与する
          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif|ttf|woff2?)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets",
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    // どのブラウザを自動で開くか指定出来る。falseにすると自動起動をオフに出来る。
    // open: "Google Chrome",
    open: false,
    host: "localhost",
    compress: true,
    port: 8080,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
