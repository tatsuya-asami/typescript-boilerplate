const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = ({ outputFile, assetFile, envFilePath, assetPath }) => {
  return {
    entry: {
      index: "./src/pages/index.ts",
      sample: "./src/pages/sample/index.ts",
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `./css/${outputFile}.css`,
      }),
      new Dotenv({ path: envFilePath }),
    ],
    output: {
      filename: `./js/${outputFile}.js`,
      path: path.resolve(__dirname, "dist"),
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
                name: `${assetFile}.[ext]`,
                // name: `[name].[ext]`,
                // name: "[name].[contentHash].[ext]",
                outputPath: "/assets/img",
                // ファイルのパスを指定する。
                publicPath: `${assetPath}assets/img`,
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
      // 絶対パスでインポートできるようにする。
      alias: {
        "@ts": path.resolve(__dirname, "src/ts"),
        "@scss": path.resolve(__dirname, "src/scss"),
        "@assets": path.resolve(__dirname, "src/assets"),
      },
      extensions: [".ts", ".js"],
    },
  };
};
