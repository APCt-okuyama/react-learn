# Progressive Web Application

Nativeアプリのように動くWebアプリケーション
特にスマートフォンでアプリの登録なしに活用できるので有効に利用できるのでは？
一般ユーザーに周知するのが大変という問題がある。

・アプリとして登録(manifest.json)
・キャッシュ機能
・通知機能

##　create /w --template cra-template-pwa-typescript
```
npx create-react-app my-app --template cra-template-pwa-typescript
```

以下のようにmanifest.json, service-worker.ts, serviceWorkerRegistration.ts が作成されます。
```
tree public src
public
├── favicon.ico
├── index.html
├── logo192.png
├── logo512.png
├── manifest.json ★
└── robots.txt
src
├── App.css
├── App.test.tsx
├── App.tsx
├── index.css
├── index.tsx
├── logo.svg
├── react-app-env.d.ts
├── reportWebVitals.ts
├── service-worker.ts ★ サービスワーカーの実態　通常のJSとは別のスレッドで動きます。
├── serviceWorkerRegistration.ts ★ サービスワーカーの登録
└── setupTests.ts
```
## local PC での実行

```
npm install -g serve
serve -s build
```

### (解説) manifest.json
利用者がインストールした場合に表示されるアプリ名やiconを登録します。

### (解説) serviceWorkerRegistration.ts

### (解説) service-worker.js
※ 通常のJSとは別のスレッドで動きます。

