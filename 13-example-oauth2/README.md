# azure + oauth2 + react

https://docs.microsoft.com/ja-jp/azure/active-directory/develop/tutorial-v2-react#get-the-completed-code-sample
(PKCE と CORS を使用した承認コード フロー)
※ PKCE（Proof Key for Code Exchange）とは、認可コード横取り攻撃への対策を目的とし、RFC7636 で定義されているOAuth2.0拡張仕様です。

1. サンプル(ms-identity-javascript-react-spa)を動かしながら理解する
2. サンプル(ms-identity-javascript-react-spa)に少し変更を加えてみる

## アプリ登録 (my-example-react-spa)
my-example-react-spaを登録する
```
認証：シングルページアプリケーションとして登録
　リダイレクト http://localhost:3000
```

## jwtトークンの確認について (https://jwt.io/)

取得したToken（以下はアクセストークン）はDecodeして内容を確認してみましょう。
```
{
  "aud": "api://8448ce9f-6978-48b5-94c9-042e67bb8048",　★ClientIDが確認できます。★
  "iss": "https://sts.windows.net/4029eb38-8689-465c-92e1-9464066c814c/",
  "iat": 1659925300,
  "nbf": 1659925300,
  "exp": 1659930624,
  "acr": "1",
  "aio": "ATQAy/8TAAAAsMcCOu/QPKTefUGTRThv4lSpcy2GEn4E5blBAgFDihxo/QGfWmxep6NTq/ChLvNJ",
  "amr": [
    "pwd"
  ],
  "appid": "8448ce9f-6978-48b5-94c9-042e67bb8048",
  "appidacr": "0",
  "ipaddr": "14.132.153.117",
  "name": "奥山 拓弥",
  "oid": "d79c183b-899e-4700-9e31-daed46ee561b",
  "rh": "0.AUkAOOspQImGXEaS4ZRkBmyBTJ_OSIR4abVIlMkELme7gEhJAMA.",
  "scp": "test test2", ★loginRequestで要求したScopeが確認できます★
  "sub": "KG5mf4Tj9jo_0W15ufwgLTN1lfEIA2TYzHNmBeCXhps",
  "tid": "4029eb38-8689-465c-92e1-9464066c814c",
  "unique_name": "t_okuyama@ap-com.co.jp",
  "upn": "t_okuyama@ap-com.co.jp",
  "uti": "9TJBv-Ry-EijFSxRYf5FAA",
  "ver": "1.0"
}
```

## API Managementとの連携

テスト用のfunctionを用意する
```
# Storage と FunctionApp
az storage account create -n funcstorage0001 -g az-react-example -l japaneast --sku Standard_LRS --kind StorageV2
az functionapp create -g az-react-example --consumption-plan-location japaneast --runtime node --runtime-version 14 --functions-version 4 --name my-example-test-func --storage-account funcstorage0001 

# apiをデプロイ
func azure functionapp publish my-example-test-func --publish-local-settings -y

# curlで確認
curl https://my-example-test-func.azurewebsites.net/api/hello 
hello, im working...
```

API ManagementにFunctionsをインポートする
```
# 確認
curl https://my-example-apim.azure-api.net/hello
hello, im working...
```

api の inbound設定例 (jwt validation　と cors) 
```
    <inbound>
        <validate-jwt header-name="Authorization" failed-validation-httpcode="401" failed-validation-error-message="Unauthorized. Access token is missing or invalid.(test)">
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

## tokenの確認

curlコマンド
```
curl https://my-example-apim.azure-api.net/hello -H 'authorization: Bearer eyJ0eXAxxxxx'
hello, im working...
```

サンプルアプリを少し修正して確認 (axiosを入れてAPIを呼び出す)
```
```

# まとめ
今回はAzure Active DirectoryでのSPAを利用したときに利用できる