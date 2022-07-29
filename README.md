# react-learn

![img](./doc/logo192.png)

reactはじめます。※期間の目安は2-3週間くらい

前提：javascript, vue, angular, css, html 少しわかる人

Javescript再入門はある程度わかる。
https://developer.mozilla.org/ja/docs/Web/JavaScript/A_re-introduction_to_JavaScript

チュートリアルはVisual Studioコードで行う。

## 公式ドキュメント

できるだけ手を動かしながら読む。

| コース | セクション数 | 備考 |
| --- | :---: | --- |
| Getting Started | 4 ||
| Main Concepts | 12 ||
| Advanced Guides | 21 ||
| API Reference | 10 ||
| Hooks | 8 | フックは React をクラスなしに使うための機能<br>useState, useEffect<br>他にもいろいろ追加のフックがある useReducer  |
| テスト概要 | 3 ||
| Contributing | 4 ||
| FAQ | 8 ||


React Router
React Redux

# 環境
## version
```
node -v
v14.18.2
npm -v
6.14.15
npx -v 
6.14.15
```

npm : パッケージ管理ツール  
npx : パッケージランナーツール (インストールしていないNodeパッケージもターミナルで実行可能)  

windowsの方が動作が軽いのでwindowsで作業しています。
typescriptで実施

## プロジェクトの作成・開始

### JavaScript
```
npx create-react-app my-app
```

### TypeScript
```
npx create-react-app my-app --template typescript
```

### ローカル実行とビルド
```
npm start
npm run build
```

## version(package.json)
```
:
    "react": "^18.2.0",
    "typescript": "^4.7.4",
:
```

## Azure Storageへデプロイ

azureリソースの作成
```
az group create -n az-react-example -l japaneast
az storage account create -n myreactstorage001 -g az-react-example -l japaneast --sku Standard_LRS

# 静的な Web サイトのホスティングを有効
az storage blob service-properties update --account-name myreactstorage001 --static-website --404-document 404.html --index-document index.html
```

ビルドしてコンテンツを$webへUpload
```
# ビルド
npm run build

# $webへUpload
az storage blob upload-batch -s ./build -d $web --account-name myreactstorage001 --overwrite
```

urlを取得
```
az storage account show -n myreactstorage001 -g az-react-example --query "primaryEndpoints.web" --output tsv
```
ブラウザでアクセスして確認  

storage の $web にファイルが確認できます。
![image](./doc/az-storage-web.PNG)

## chrome の拡張

chromeの拡張を入れておくとComponentの内容が確認できます。
![image](./doc/devtools-full.gif)

## vs code の拡張 (おすすめ)


## (余談) N--t.js 名前が似ているフレームワーク 

### Next.js
Reactをベースに開発されたJavaScriptフレームワーク  
Reactが Viewライブラリ なのに対して、サーバーとして動かすことが可能  
SSR(サーバーサイドレンダリング)を行う為に利用  

### Nest.js
Node.jsサーバーサイドアプリケーション  
内部的にはDefaultでExpressを利用している。※Fastifyに変更可能  

### Nuxt.js (ナクスト)
これは Vue のフレームワーク  
SSR(サーバーサイドレンダリング)を行う為に利用

## 利用できそうなUI Template
https://mui.com/store/
https://adminlte.io/themes/v3/

## ファイル構成

ポイント
```
ネストのしすぎを避ける, 考えすぎない
完全に詰まった場合は、すべて 1 フォルダに入れるところから始めましょう。
実際にはしばしば両方の方法が組み合わされて使用されます。ですので、「正しい」方法を最初から選択することはさほど重要ではありません。
```

機能別
```
common/
  Avatar.js
  Avatar.css
  APIUtils.js
  APIUtils.test.js
feed/
  index.js
  Feed.js
  Feed.css
  FeedStory.js
  FeedStory.test.js
  FeedAPI.js
profile/
  index.js
  Profile.js
  ProfileHeader.js
  ProfileHeader.css
  ProfileAPI.js
```
ファイルタイプ別
```
api/
  APIUtils.js
  APIUtils.test.js
  ProfileAPI.js
  UserAPI.js
components/
  Avatar.js
  Avatar.css
  Feed.js
  Feed.css
  FeedStory.js
  FeedStory.test.js
  Profile.js
  ProfileHeader.js
  ProfileHeader.css
```