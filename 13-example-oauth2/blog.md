[f:id:mountain1415:20220810104954p:plain]
# はじめに
こんにちは、ACS事業部の奥山です。

Azureでの認証・認可について、Azure Active Directory(Azure AD) を使った「認可コードフロー」の実装を検証しましたのでブログとして纏めておきます。

※ 認可コードフローとは [RFC 6749](https://tex2e.github.io/rfc-translater/html/rfc6749.html) で定義されている認証・認可に関する仕様。現在のWebでよく利用されている仕組みになります。

Azure AD,API Managementを利用することで認証・認可の処理をバックエンド処理から切り離すことで以下を実現します。  
・認証・認可の処理を一元管理できる  
・バックエンド側の開発は業務ロジックに専念することができるようになる  

## 処理の流れ
① Single Page Application(SPA) は MSAL.js を利用して認可コードフローを使ってTokenを取得する  
② SPA は取得したTokenをヘッダーに設定してAPI Managementへリクエストを要求する  
③ API Management は Token を検証しバックエンドにリクエストを通す  
[f:id:mountain1415:20220810103228p:plain]

## まずは、AADでアプリ登録 (my-example-react-spa)

検証で利用するアプリ(SPA)をAADのアプリ登録から登録します。  
アプリ登録とはAzure AD に アプリ用のサービスプリンシパルを登録すること。今回の場合はアプリ登録後にSPA用のサービスプリンシパルが作成されてAzureADへログインできるようになります。

(登録内容)  
・scopeを設定しておく  
・「認証」はシングルページアプリケーションとして登録し、リダイレクトURI に http://localhost:3000 を設定  
※ my-example-react-spaという名前で登録しました。　
※ 今回は v2エンドポイントを利用するので マニフェストで "accessTokenAcceptedVersion": 2 を指定  
[f:id:mountain1415:20220810103302p:plain]

## 検証に利用したアプリ (ms-identity-javascript-react-spa)

チュートリアルで公開しているコードサンプル(react js)を利用します。  
https://docs.microsoft.com/ja-jp/azure/active-directory/develop/tutorial-v2-react  
(PKCE と CORS を使用した認可コード フロー)  
※ PKCE（Proof Key for Code Exchange）とは、認可コード横取り攻撃への対策を目的とし、RFC7636 で定義されているOAuth2.0拡張仕様。  

サンプル(ms-identity-javascript-react-spa)は設定を変更するだけで簡単に利用できるようなっています。  
ログインに成功すると以下のように「Request Profile Information」というボタンが表示されます。  
[f:id:mountain1415:20220810103332g:plain]

デフォルトではブラウザの session storage に token が入っていることが確認できます。
[f:id:mountain1415:20220810103442p:plain]

### 設定変更について(src/authConfig.js)
以下でログイン時に要求する scope を指定します。
```
:
export const loginRequest = {
    //scopes: ["User.Read"]    ★デフォルトの MS Graph の Scope
    scopes: [
        "api://xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx/myscope1", ★アプリ登録で作成したScopeを指定
:
```

## jwtトークンの確認について (https://jwt.io/)
検証作業中にTokenの内容を確認したい場合は、https://jwt.io/ で token をDecodeして内容を確認しすることができます。
```
{
  "aud": "api://xxxxxx-xxxx-xxxxx-xxxx-xxxxxxxxxx",　★ClientIDが確認できます。★
  "iss": "https://sts.windows.net/xxxxx-xxxx-xxxx-xxxx-123123123123/",
  "iat": 1659925300,
  "nbf": 1659925300,
  "exp": 1659930624,
  "acr": "1",
  "aio": "xxxxx",
  "amr": [
    "pwd"
  ],
  "appid": "12341234-1234-48b5-1233-123123123",
  "appidacr": "0",
  "ipaddr": "1.2.3.4",
  "name": "TEST TEST",
  "oid": "xxxx",
  "rh": "0.xxxx.",
  "scp": "test test2", ★loginRequestで要求したScopeが確認できます★
  "sub": "xxx",
  "tid": "xxx-xx-xx-xx-xx",
  "unique_name": "test@mail.co.jp",
  "upn": "test@mail.co.jp",
  "uti": "xxx",
  "ver": "1.0"d
}
```

## API Managementと連携させてTokenを検証する

今回はテスト用にfunction(http trigger)を用意し、API Management で token の validation を行います。
細かい手順は省略しますが、図にしておきます。
[f:id:mountain1415:20220810103524p:plain]

api management の inbound 設定で cors, validation-jwt を追加します。
```
    <inbound>
        <validate-jwt header-name="Authorization" failed-validation-httpcode="401" 
            failed-validation-error-message="Unauthorized. Access token is missing or invalid.(test)">
            <openid-config url="https://login.microsoftonline.com/<tenat-id>/v2.0/.well-known/openid-configuration" />
            <required-claims>
                <claim name="aud">
                    <value> [client id] </value>
                </claim>
            </required-claims>
        </validate-jwt>
        <cors allow-credentials="false">
            <allowed-origins>
                <origin>*</origin>
            </allowed-origins>
            <allowed-methods>
                <method>*</method>
            </allowed-methods>
            <allowed-headers>
                <header>*</header>
            </allowed-headers>
        </cors>
        <base />
    </inbound>
```

### (補足) API Management の Policy 設定
※ 検証する項目は自由に変更可能です。

 scopeを検証したい場合は以下のように設定することができます。
(例) scopeが全部一致した場合の指定
```
                <claim name="scp" match="all">
                    <value>test test2</value>
                </claim>
```
(例) scopeの一部一致した場合の指定
```
                <claim name="scp" match="any">
                    <value>test</value>
                    <value>test2</value>
                    <value>test test2</value>
                </claim>
```
(例) jwt token から値を取り出してBackendに転送することも可能です  
この例では jwt token から aud を取り出して header名:mytest-aud としてバックエンドに転送します。
```
        <set-header name="mytest-aud" exists-action="override">
            <value>@(context.Request.Headers["authorization"].First().Split(' ')[1].AsJwt()?.Claims["aud"].FirstOrDefault())</value>
        </set-header>
```
※ @(expression) , @{expression} は C# 式ステートメント 詳しくは[こちら](https://docs.microsoft.com/ja-jp/azure/api-management/api-management-policy-expressions)へ。

## 確認
※ サンプルアプリケーションにボタンを一つ追加して、ボタンが押されたときにAPIを呼び出すように修正しています。

ローカルでSPAを起動 (npm start) してブラウザで確認します。
[f:id:mountain1415:20220810103626p:plain]

ブラウザで確認したTokenを取り出してcurlコマンドでも実行可能です。
```
curl https://xxxxxxxxxxxxxxxxxx.azure-api.net/hello -H 'authorization: Bearer eyJ0eXAxxxxx'
hello, im working...
```

# まとめ

今回検証した内容は RFC 6749 で定義されている 「4.1. Authorization Code Grant のフロー」の実装になります。   
4.1. Authorization Code Grantのフロー
```
     +----------+
     | Resource |
     |   Owner  |
     |          |
     +----------+
          ^
          |
         (B)
     +----|-----+          Client Identifier      +---------------+
     |         -+----(A)-- & Redirection URI ---->|               |
     |  User-   |                                 | Authorization |
     |  Agent  -+----(B)-- User authenticates --->|     Server    |
     |          |                                 |               |
     |         -+----(C)-- Authorization Code ---<|               |
     +-|----|---+                                 +---------------+
       |    |                                         ^      v
      (A)  (C)                                        |      |
       |    |                                         |      |
       ^    v                                         |      |
     +---------+                                      |      |
     |         |>---(D)-- Authorization Code ---------'      |
     |  Client |          & Redirection URI                  |
     |         |                                             |
     |         |<---(E)----- Access Token -------------------'
     +---------+       (w/ Optional Refresh Token)
        
```
[RFC 6749] (https://tex2e.github.io/rfc-translater/html/rfc6749.html)に書かれている内容を確認しながら進めましたが正直なかなか理解に苦しむことが多かったです。
ただ、実装自体はMSAL.jsライブラリ を利用することで工数をかけずに実現可能であることがわかりました。また、API Managementの token validation もある程度柔軟に対応可能であることも確認できました。「Azure Active Directory + MSAL.js + API Management」 は是非、利用したいパターンです。

# 最後に
私達のチームでは、Azure・AKSを活用したシステムのSIや内製化のお手伝いをさせていただいております。 Azureやコンテナ技術の知見を持つエンジニアが対応いたします。ご相談等ありましたらぜひご連絡ください。
