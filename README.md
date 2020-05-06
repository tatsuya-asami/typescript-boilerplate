# Type-script-boilerplate

# コンセプト

- とりあえず TypeScript のコードだけを書き進められる環境を構築。
- ファイルの変更を検知し、ブラウザが自動でリロードされる。
- .env ファイルの設定をしているので、環境毎に値を変える必要がある部分は env ディレクトリ配下の各.env ファイルを使用する。
- API が用意出来ていない場合は用意している json-sever を使用すれば手戻りの少ない開発ができる。
- セーブ時にオートフォーマットをする前提で環境を構築しているので、IDE のオートセーブはオフにする。

# 推奨環境

- Visual Studio Code Version: 1.44.2
- node 12.16.3

# 開発環境構築

1. Visual Studio Code Version: 1.44.2 をインストール
2. Visual Studio Code の拡張機能を追加

```
ESLint
Prettier - Code formatter
styleLint
Live Server(ビルド後の動作確認で使用)
```

3. パッケージインストール

- node が入っているか確認。下記のようになれば OK。

```
node -v
v12.16.3
```

- 各種パッケージをインストール

```
npm i
```

4. ローカル開発環境の立ち上げ

- json-server と webpack-server を立ち上げる
- ローカル開発環境では`env/.env.development`のファイルを読むように設定している

```
npm run dev
```

5. ビルド

- ビルドコマンドを下記の 3 種類。

```
npm run build:development
npm run build:staging
npm run build:production
```

- 読み込みむ env ファイルがそれぞれ異なる。それ以外の違いはない。
- また、ビルド時に console を消去する設定を`webpack.prod.js`の optimizer で行なっている。
- ビルド後のソースは`dist`ディレクトリに保存される。また、`live-server`で起動すればビルド後のソースの動作確認ができる。

6. html ページを追加する。

- `pages`ディレクトリの配下に html ファイルを追加し、`webpack.common.js`の`entry`に追記する。
  詳しくは[src/ディレクトリの説明.md](https://github.com/astatsuya/TypeScript-boilerplate/blob/master/src/%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E3%81%AE%E8%AA%AC%E6%98%8E.md)参照

7. IDE の設定

- オートセーブはオフにする。

```
セーブコマンド実行時に合わせて実行されるオートフォーマットが効かない
ESLintのエラーが出ている状態ではビルドに失敗する
文字を入力するたびにブラウザが際レンダリングされてしまう
```

等がある。

- オートフォーマットのために`.vscode`の`settings.json`も共有するようにしている。
- Visual Studio Code 以外でも動作するが、セーブ時に eslint, stylelint, prettier を使用してフォーマットをかける用に設定し、他の開発者とフォーマットの差が出ないようにして欲しい。

8. 対応ブラウザについて

- `.browserslistrc`で設定する。大抵のブラウザをカバーするように設定している。
- `babel`(JavaScript)、と`postcss-loader`(css)が`.browserslistrc`の設定を見てコンバートしている。

9. scss, css について

- `.browserlistrc`の設定を見て自動でベンダープレフィクスを付与する設定にしているので、ベンダープレフィクスは書く必要はない。
- どちらも利用可能だが、scss を書いたことがない人も scss ファイルを使用することを推奨。
  css そのままの記法もできるので、小さく始められる。
- stylelint に scss をする順番をチェックしている。こちらも保存時にオートフォーマットされるが、順番を修正するために 2 度保存する必要がある。

10. TypeScript について

- 設定は主に`tsconfig.json`で行っている。
- 変更する際は ESLint や webpack の設定も行わないといけない可能性がある。
- TypeScript から JavaScript への変換、ブラウザがサポートしていない記法のトランスパイルは babel で行っており、`fork-ts-checker-webpack-plugin`で型チェックを行なっている。

11. フォーマットについて

- フォーマットはコマンドでも実行できる。

```
- eslintとstylelintを実行
npm run format

- eslintのみを実行
npm run eslint

- stylelintのみを実行
npm run stylelint
```
