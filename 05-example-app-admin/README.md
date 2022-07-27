# uiの実装の練習

React.js で Admin LTE を使ってみる

![image](../doc/adminTLE-sample.gif)

参考にしたサイト
https://www.creative-tim.com/product/material-dashboard-react
https://www.youtube.com/watch?v=ohbF14IK6hI
https://www.prishusoft.com/blog/integrate-adminlte-theme-to-reactjs-project.html

## install

vs code ext
```
ES7+ React/Redux/React-Native snippets
html to JSX
```

admin-lte
```
npm install admin-lte --save
````

## 手順
1. AdminLTE-master.zipをダウンロードしておく
1. AdminLTE-master.zip の dist, plugin フォルダ を public へコピーする
1. AdminLTE-master.zip/index.htmlを参考に public/index.html へ \<link\> と \<script\> を追加する
1. appHeader.tsx, appMenu.tsx, appDashboard.tsx, appFooter.tsx を作成する
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
npm run build
```
