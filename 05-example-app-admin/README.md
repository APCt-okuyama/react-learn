# React.js(TypeScript) + Admin LTE 3

最近、React.js の調査を行っていて、画面回りで Admin LTE 3 というテンプレートが割と簡単に導入できたのでブログにしておきます。

画面の設計はシステムの中でも利用者の目に入るもっとも重要な部分なのですが、なかなか時間がかけれないことが多いと思います。今回紹介するようなテンプレートを活用することで開発工数をかけずに一定の品質のものが作成できます。

![image](../doc/adminTLE-sample.gif)

参考にしたサイト
https://www.creative-tim.com/product/material-dashboard-react
https://www.youtube.com/watch?v=ohbF14IK6hI
https://www.prishusoft.com/blog/integrate-adminlte-theme-to-reactjs-project.html

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

## 手順

簡単に記載します。

1. AdminLTE-master.zipをダウンロードする
1. AdminLTE-master.zip の dist, plugin フォルダ を public へコピーする
1. AdminLTE-master.zip/index.htmlを参考に src/public/index.html へ \<link\> と \<script\> を追加する  
  \<link\>はヘッダーに追加
  \<script\>はBodyの一番最後に追加
1. appHeader.tsx, appMenu.tsx, appDashboard.tsx, appFooter.tsx を作成し、AdminLTE-master.zip/index.htmlの内容をコピーします。
AdminLTE-master.zip/index.htmlの
　\<nav\>の部分 を appHeader へ
　\<aside\>の部分 を appMenu　へ
　\<div class="content-wrapper"\>の部分 を appDashboard へ
  \<footer\>の部分を appFooter へ
  それぞれコピーします。  
  このときコピーした内容はHTMLなのでJSXへ変換します。  
  変換にはvscodeの拡張機能 html to JSXを利用します。
1. src/public/index.html の<body> に以下のクラスを指定 
```
cat src/public/index.html
:
  <body class="hold-transition sidebar-mini layout-fixed">
:
```
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
