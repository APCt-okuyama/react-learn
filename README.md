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

## (補足情報) N--t.js 名前が似ているフレームワーク 

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
