const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = ({ outputFile, assetFile, envFilePath }) => {
  return {
    // mode: "production",
    entry: "./src/ts/index.ts",
    plugins: [
      new MiniCssExtractPlugin({
        filename: `${outputFile}.css`,
      }),
      new Dotenv({ path: envFilePath }),
    ],
    output: {
      filename: `${outputFile}.js`,
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
