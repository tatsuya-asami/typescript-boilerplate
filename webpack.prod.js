const path = require("path");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const outputFile = "[name].[chunkhash]";
const assetFile = "[name].[contenthash]";
const assetPath = "../";

module.exports = (env) => {
  // package.jsonのscriptで --env.envFile=で指定されたパスのenvFileを使用する。
  // 指定されていない場合は.env.productionを使用する
  const envFilePath = env ? `./env/.env.${env.file}` : "./env/.env.production";

  return webpackMerge(
    commonConfig({ outputFile, assetFile, envFilePath, assetPath }),
    {
      mode: "production",
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "src/pages/index.html"),
          filename: "index.html",
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
          chunks: ["index"],
        }),
        // new HtmlWebpackPlugin({
        //   template: path.resolve(__dirname, "src/pages/sample.html"),
        //   filename: "pages/sample.html",
        //   inject: "body",
        //   minify: {
        //     collapseWhitespace: true,
        //     removeComments: true,
        //     removeRedundantAttributes: true,
        //     removeScriptTypeAttributes: true,
        //     removeStyleLinkTypeAttributes: true,
        //     useShortDoctype: true,
        //   },
        //   chunks: ["sample"],
        // }),
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
    }
  );
};
