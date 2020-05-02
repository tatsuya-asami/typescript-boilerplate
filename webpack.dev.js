const path = require("path");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const outputFile = "[name]";
const assetFile = "[name]";

module.exports = (env) => {
  // package.jsonのscriptで --env.envFile=で指定されたパスのenvFileを使用する。
  // 指定されていない場合は.env.developmentを使用する
  const envFilePath = env ? `./env/.env.${env.file}` : "./env/.env.development";

  return webpackMerge(commonConfig({ outputFile, assetFile, envFilePath }), {
    mode: "development",
    devtool: "source-map",
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      // どのブラウザを自動で開くか指定出来る。falseにすると自動起動をオフに出来る。
      // open: "Google Chrome",
      open: false,
      host: "localhost",
      compress: true,
      // port番号はデフォルトで8080, 既に使用されている場合は自動で8181になる。指定したい場合はここでする。
      // port: 3000,
    },
  });
};
