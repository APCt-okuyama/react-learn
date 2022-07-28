# React.js(TypeScript) + Admin LTE 3

フロントエンド回りの検証をおこなっていて、React.js に Admin LTE 3 というテンプレートが簡単に導入できて利用しやすそうだったのでブログにしておきます。

アプリのUIはシステムの中で唯一利用者が直接触れるもっとも重要な部分です。最近は異なる画面サイズ(PC/スマートフォン)の両方に対応することが一般的になっていますが、Bootstrap(CSSのフレームワーク)などを利用してもデザイン性などを考えるとナカナカ大変です。
今回、紹介するようなテンプレートを活用することで工数をかけずに一定の品質のものが作成できます。

![image](../doc/adminTLE-sample.gif)

オフィシャルサイト
1. https://www.creative-tim.com/product/material-dashboard-react

## 検証した環境・必要なもの

node js
```
node -v
v14.18.2
```

vs code extension をインストール (option)
```
ES7+ React/Redux/React-Native snippets
html to JSX
```

admin-lteライブラリのインストール
```
npm install admin-lte --save
````

Reactのプロジェクト を TypeScript で新規作成
```
npx create-react-app my-admin-console --template typescript
```

## 手順

参考にしたサイト
1. https://www.youtube.com/watch?v=ohbF14IK6hI
1. https://www.prishusoft.com/blog/integrate-adminlte-theme-to-reactjs-project.html

基本的には参考サイトの手順通りすすめれば問題ないですが、簡単に纏めておきます。

1. AdminLTE-master.zipをダウンロードする
1. AdminLTE-master.zip の dist, plugin フォルダ を public へコピーする
1. AdminLTE-master.zip/index.htmlを参考に src/public/index.html へ \<link\> と \<script\> を追加する  
  \<link\>はヘッダーに追加
  \<script\>はBodyの一番最後に追加
1. appHeader.tsx, appMenu.tsx, appDashboard.tsx, appFooter.tsx を新規に作成し、AdminLTE-master.zip/index.htmlの内容をコピーします。
AdminLTE-master.zip/index.htmlの
　\<nav\>の部分 を appHeader へ
　\<aside\>の部分 を appMenu　へ
　\<div class="content-wrapper"\>の部分 を appDashboard へ
  \<footer\>の部分を appFooter へ
  それぞれコピーします。  
  このときコピーした内容はHTMLなのでJSXへ変換します。  
  変換にはvscodeの拡張機能 html to JSXを利用します。
1. public/index.html の<body> に以下のクラスを指定 
```
cat public/index.html
:
  <body class="hold-transition sidebar-mini layout-fixed">
:
```
adminlte.cssのclass

1. App.tsxで作成したコンポーネントを読み込む
```
function App() {
  return (
    <div className="wrapper">
      <AppHeader></AppHeader>
      <AppMenu></AppMenu>
      <AppDashboard></AppDashboard>      
      <AppFooter></AppFooter>
    </div>
  );
}
```
手順は以上です。

## 動作確認
```
npm start
```
ローカルで実行してブラウザで確認 (http://localhost:3000)

## まとめ
今回試してみた Admin LTE 3 は感じの良い管理画面のテンプレートとして利用できそうであることが分かりました。  

今回は簡単に検証ということで簡単に下記のように４つのコンポーネントファイルを追加しましたが、実際に開発する場合はフォルダ分けなどをして整理すると良いと思います。

```
$ tree -L 1 src
src
├── App.css
├── App.test.tsx
├── App.tsx
├── appDashboard.tsx  ★追加
├── appFooter.tsx     ★追加
├── appHeader.tsx     ★追加
├── appMenu.tsx       ★追加
├── index.css
├── index.tsx
├── logo.svg
├── react-app-env.d.ts
├── reportWebVitals.ts
└── setupTests.ts
```
