[f:id:mountain1415:20220729134842p:plain]

# はじめに
こんにちは、ACS事業部の奥山です。  
フロントエンド回りの検証をおこなっていて、React.js に Admin LTE 3 というテンプレートが簡単に導入でき利用しやすそうだったのでブログにしておきます。

[f:id:mountain1415:20220729133231g:plain]

アプリのUIはシステムの中で唯一利用者が直接触れるもっとも重要な部分です。最近は異なる画面サイズ(PC/スマートフォン)の両方に対応することが一般的になっていますが、Bootstrap(CSSのフレームワーク)などを利用してもデザイン性などを考えるとナカナカ大変です。
今回、紹介するようなテンプレートを活用することで工数をかけずに一定の品質のものが作成できます。

オフィシャルサイトはこちら
[https://adminlte.io/themes/v3/:title]


## 検証した環境・必要なもの

node js
```
node -v
v14.18.2
```

vs code extension をインストール
```
ES7+ React/Redux/React-Native snippets
html to JSX
```

admin-lteライブラリのインストール
```
npm install admin-lte --save
```

Reactのプロジェクト を TypeScript で新規作成
```
npx create-react-app my-admin-console --template typescript
```

## 手順

参考にしたサイト  
https://www.youtube.com/watch?v=ohbF14IK6hI   
https://www.prishusoft.com/blog/integrate-adminlte-theme-to-reactjs-project.html   

基本的には参考サイトの手順通りなのですが、簡単に日本語で纏めておきます。

(a) AdminLTE-master.zipをダウンロードする  
(b) AdminLTE-master.zip の dist, plugin フォルダ を public へコピーする  
(c) AdminLTE-master.zip/index.htmlを参考に src/public/index.htmlを編集  
```
  \<link\> と \<script\> を追加する  
  \<link\>はヘッダーに追加
  \<script\>はBodyの一番最後に追加
```  
(d) appHeader.tsx, appMenu.tsx, appDashboard.tsx, appFooter.tsx を新規に作成する  
```
AdminLTE-master.zip/index.htmlの
　\<nav\>の部分 を appHeader へ
　\<aside\>の部分 を appMenu　へ
　\<div class="content-wrapper"\>の部分 を appDashboard へ
  \<footer\>の部分を appFooter へ  
  それぞれコピーします。  

  このときコピーした内容はHTMLなのでJSXへ変換します。  
  変換にはvscodeの拡張機能 `html to JSX` を利用します。
```
(e) public/index.html の <body> に以下のクラスを指定  
```
cat public/index.html
:
  <body class="hold-transition sidebar-mini layout-fixed">
:
```

(f) App.tsxで作成したコンポーネントを読み込む  
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

(補足) 今回は下記のように４つのコンポーネントファイルを追加しましたが、実際に開発する場合はフォルダ分けなどをしてコンポーネント単位で整理します。

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

## 動作確認
```
npm start
```
ローカルで実行してブラウザで確認 (http://localhost:3000)

## まとめ
今回試してみた Admin LTE 3 は感じの良い管理画面のテンプレートとして利用できそうであることが分かりました。世の中には有料・無料を含めてテンプレートが多数あります。上手く利用することで工数を抑えて品質を上げていきたいですね。

# 最後に
私達のチームでは、Azure・AKSを活用したシステムのSIや内製化のお手伝いをさせていただいております。 Azureやコンテナ技術の知見を持つエンジニアが対応いたします。ご相談等ありましたらぜひご連絡ください。
