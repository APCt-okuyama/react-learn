# Typescript, React の基礎

Typescript関連のトピック

# install
```
npm init
npm install typescript
npx tsc -v 
Version 4.7.4
```

typescript hello world
```
プロジェクト作成
npx tsc --init

コンパイル(ts -> js)
npx tsc 1.sample.ts

実行
node 1.sample.js
```
## 文法で特徴的なもの
https://future-architect.github.io/typescript-guide/

構造的部分型
```
構造体のプロパティの互換性
独立した２つの構造体のプロパティーを比較したときに一致する項目がある場合、互換性があるとみなす


例:
A{a:string; b:string} と B{a:string; c:string} a:string　が一致しているので互換性がある
```

ジェネリクス
```
型パラメーター
class List<T> {}
```

アロー関数式
```
a => console.log('これです');
```

アンビエント宣言 (JavaScriptのライブラリの利用)
```
<filename>.d.ts
```

## tsc コマンド
typescriptをjavascriptへ変換

## JSX 
