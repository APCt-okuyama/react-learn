# react-learn

reactのはじめかた

# env

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

### javascript
```
npx create-react-app my-app
npm start
```

### typescript
```
npx create-react-app my-app --template typescript
npm start
```

## Azure Storageへデプロイ

azureリソースの作成
```
az group create -n az-react-example -l japaneast
az storage account create -n myreactstorage001 -g az-react-example -l westus --sku Standard_LRS

# 静的な Web サイトのホスティングを有効
az storage blob service-properties update --account-name myreactstorage001 --static-website --404-document 404.html --index-document index.html
```

コンテンツを$webへUpload
```
az storage blob upload-batch -s ./build -d $web --account-name myreactstorage001
```

urlを取得してブラウザでアクセスして確認
```
az storage account show -n myreactstorage001 -g az-react-example --query "primaryEndpoints.web" --output tsv
```

storage の $web にファイルが確認できます。
![image](./doc/az-storage-web.PNG)

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
