# material-ui

https://mui.com/

今回検証する material-ui は マテリアルデザイン の react 向けの実装(Library) になります。
マテリアルデザインに沿った画面(UI)を工数を抑えながら実現できるようになっています。

wikiより
```
マテリアルデザイン（英語: Material Design）は、Googleが提唱したデザインシステム（設計体系）の一種[1]、および、それを実現する開発技術や手法、デザイン、試みなどの総称である[2]。
```

## env
```
node -v 
v14.18.2
```

## プロジェクト作成 (typescript)

typescriptでプロジェクト作成
```
npx create-react-app my-mui-app --template typescript
```

muiライブラリのインストール
```
npm install @mui/material @emotion/react @emotion/styled
```

その他に必要なモノ(icon,rechartsなど)があれば別途インストールする必要がある
```
npm install @mui/icons-material
npm install recharts
```
rechartsはDashbourdのサンプルが利用

### ローカル実行とビルド
```
npm start
npm run build
```

### テンプレートを利用する

https://github.com/mui/material-ui  

github から material-ui を clone して、いくつかのテンプレートを表示してみます。  

```
tree docs/data/material/getting-started/templates  -L 1
docs/data/material/getting-started/templates
├── Templates.js
├── album
├── blog
├── checkout
├── dashboard　★今回試してみる
├── pricing
├── sign-in　★今回試してみる
├── sign-in-side　★今回試してみる
├── sign-up
├── sticky-footer
├── templates-pt.md
├── templates-zh.md
└── templates.md
```

手順としてはローカルにファイルをコピーしてきて App.tsx で読み込むだけです。  

## src/App.tsx
```
import React from 'react';

//
//import SignIn from './mui-templates/sign-in/SignIn';
//import SignInSide from './mui-templates/sign-in-side/SignInSide';
import Dashboard from './mui-templates/dashboard/Dashboard';

function App() {
  return (
    <div>
      <Dashboard></Dashboard>
    </div>

  )
}

export default App;
```

テンプレートを利用したログイン画面、ダッシュボードが表示できることが確認できます。あとはこれをベースに開発を進めていけば良さそうですね。
※もちろんMUIの細かい利用方法を調べる必要があります。
