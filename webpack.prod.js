const path = require("path");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");

const outputFile = "[name].[chunkhash]";
const assetFile = "[name].[contenthash]";
// 静的ファイルを保存する場所によって変える。インフラ担当者と要相談。
const assetPath = "../";

module.exports = (env) => {
  // package.jsonのscriptで --env.envFile=で指定されたパスのenvFileを使用する。
  // 指定されていない場合は.env.productionを使用する
  const envFilePath = env ? `./env/.env.${env.file}` : "./env/.env.production";

  // webpack.common.jsのentryで追加したhtmlファイルを動的に生成する。
  const createHtmlPlugins = (entry) => {
    const htmpPlugins = [];
    Object.keys(entry).forEach((key) => {
      htmpPlugins.push(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, `./src/pages/${key}.html`),
          // 出力されるファイル名
          filename: `${key}.html`,
          // headにjsファイルを入れたい場合はheadを指定
          inject: "body",
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
          },
          // 読み込むjsファイルを指定
          chunks: [key],
        })
      );
    });
    return htmpPlugins;
  };
  return webpackMerge(
    commonConfig({ outputFile, assetFile, envFilePath, assetPath }),
    {
      mode: "production",
      plugins: createHtmlPlugins(
        commonConfig({ outputFile, assetFile, envFilePath, assetPath }).entry
      ),
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
    }
  );
};
