const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = ({ outputFile, assetFile, envFilePath, assetPath }) => {
  return {
    entry: {
      // htmlが増える毎にここに追記
      // htmlページ名:そのhtmlの親となるtsファイル
      index: './src/pages/index.ts',
      'sample/index': './src/pages/sample/index.ts',
    },
    output: {
      filename: `./js/${outputFile}.js`,
      path: path.resolve(__dirname, 'dist'),
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
    ],
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
          // tsからjsの変換はbabel-loaderで行う
          // 型チェックはForkTsCheckerWebpackPluginで行う
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // ここの順番は重要。下から順番に実行される
            // jsにバンドルせずcssファイルとして出力する
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            'css-loader',
            // プレフィックスを自動で付与する
            'postcss-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          test: /\.css$/i,
          use: [
            // ここの順番は重要。下から順番に実行される
            // jsにバンドルせずcssファイルとして出力する
            MiniCssExtractPlugin.loader,
            // cssをcommonJSに変換する
            'css-loader',
            // プレフィックスを自動で付与する
            'postcss-loader',
          ],
        },
        {
          // 他の種類の静的ファイルを使用する場合は同様の記述で追加する。
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: `${assetFile}.[ext]`,
                outputPath: 'assets/images/',
                // 画像の保存先によってパスを変更する。
                publicPath: `${assetPath}assets/images/`,
              },
            },
          ],
        },
        {
          test: /\.(ttf|woff2?)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: `${assetFile}.[ext]`,
                outputPath: 'assets/fonts/',
                // 画像の保存先によってパスを変更する。
                publicPath: `${assetPath}assets/fonts/`,
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
