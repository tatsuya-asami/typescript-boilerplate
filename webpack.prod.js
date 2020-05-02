const path = require("path");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
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
        // headにjsファイルを入れたい場合はheadを指定
        inject: "body",
        // optimizationを指定するとproductionモードのデフォルト設定が解除されるので、ここで指定
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true,
        },
      }),
      new CleanWebpackPlugin(),
    ],
    optimization: {
      minimizer: [
        // javascriptの最適化
        new TerserWebpackPlugin({
          terserOptions: {
            // consoleを削除する
            compress: { drop_console: true },
          },
        }),
        // cssの最適化
        new OptimizeCssPlugin(),
      ],
    },
  });
};
