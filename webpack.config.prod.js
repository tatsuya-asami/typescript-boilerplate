const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
  // package.jsonのscriptで --env.envFile=で指定されたパスのenvFileを使用する。
  const envFilePath = env ? `./env/.env.${env.file}` : "./env/.env.production";

  return {
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
      new Dotenv({ path: envFilePath }),
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
    resolve: {
      extensions: [".ts", ".js"],
    },
  };
};
