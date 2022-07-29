# Typescript, React の基礎

Typescript関連のトピック

# install
```
npm init
npm install typescript
npx tsc -v 
Version 4.7.4
```

## 文法で特徴的なもの
https://future-architect.github.io/typescript-guide/

### 構造的部分型
```
構造体のプロパティの互換性
独立した２つの構造体のプロパティーを比較したときに一致する項目がある場合、互換性があるとみなす


例:
A{a:string; b:string} と B{a:string; c:string} a:string　が一致しているので互換性がある
```

### ジェネリクス
型パラメーターです。
```
class List<T> {}
```

### アロー関数式
```
() => console.log('test')
```

### アンビエント宣言 (JavaScriptライブラリの利用の定義)
```
<filename>.d.ts
```

### 「...」はスプレッド演算子
配列の展開
```
function foo(x, y, z) { }
var args = [0, 1, 2];
foo(...args); //foo(args[0], args[1], args[2])
```
```
var list = [1, 2];
list = [0, ...list, 4];
console.log(list); // [0,1,2,4]
```
## tsc コマンド
typescriptをjavascriptへ変換

typescriptの実行
```
プロジェクト作成
npx tsc --init

コンパイル(ts -> js)
npx tsc 1.sample.ts

実行
node 1.sample.js
```

設定(tsconfig.json) javascriptのバージョンやTypeScriptの型チェックのレベルを設定
```
{
  "compilerOptions": {
:
    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
:
    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
:
  }
}

```

## JSX 
