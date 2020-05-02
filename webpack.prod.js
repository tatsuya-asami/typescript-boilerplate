const path = require("path");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const outputFile = "[name].[chunkhash]";
const assetFile = "[name].[contenthash]";

module.exports = (env) => {
  // package.jsonのscriptで --env.envFile=で指定されたパスのenvFileを使用する。
  // 指定されていない場合は.env.productionを使用する
  const envFilePath = env ? `./env/.env.${env.file}` : "./env/.env.production";

  return webpackMerge(commonConfig({ outputFile, assetFile, envFilePath }), {
    mode: "production",
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
      new CleanWebpackPlugin(),
    ],
  });
};
