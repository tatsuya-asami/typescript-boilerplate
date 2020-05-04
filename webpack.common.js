const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = ({ outputFile, assetFile, envFilePath, assetPath }) => {
  return {
    entry: {
      // htmlが増える毎にここに追記
      // htmlページ名:そのhtmlの親となるtsファイル
      index: './src/pages/index.ts',
      'sample/index': './src/pages/sample/index.ts',
    },
    plugins: [
      // 型チェック
      new ForkTsCheckerWebpackPlugin(),
      // cssをcssファイルとして抽出する
      new MiniCssExtractPlugin({
        filename: `./css/${outputFile}.css`,
      }),
      // .envファイルを使えるようにする
      new Dotenv({ path: envFilePath }),
      // distディレクトリを空にする
      new CleanWebpackPlugin(),
    ],
    output: {
      filename: `./js/${outputFile}.js`,
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(ts|js)$/,
          use: 'eslint-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|js)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // ここの順番は重要。下から順番に実行される
            // cssファイルを作成する
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            'css-loader',
            // プレフィックスを自動でつけてくれる
            'postcss-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpe?g|gif|ttf|woff2?)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                // limit: 51200,
                name: `${assetFile}.[ext]`,
                outputPath: 'assets/img',
                // 画像保存先が違う場合はパスを指定する。
                // publicPath: `${assetPath}assets/img`,
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: ['html-loader'],
        },
      ],
    },
    resolve: {
      // 絶対パスでインポートできるようにする。
      alias: {
        '@ts': path.resolve(__dirname, 'src/ts'),
        '@scss': path.resolve(__dirname, 'src/scss'),
        '@assets': path.resolve(__dirname, 'src/assets'),
      },
      extensions: ['.ts', '.js'],
    },
  };
};
