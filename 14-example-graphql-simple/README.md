# graphql on azure

RESTFull vs GraphQL

![image](../doc/graphql-restfull.png)

# Azure で Graph QL(Cosmos DB) を利用する

## Azure 構成
cosmos db + functions (typescript + apollo)

```
az group create -n az-graphql-example -l japaneast
#az group delete -n az-graphql-example
```

### cosmos db

account作成
```
az cosmosdb create --name example01cosmosaccount --resource-group az-graphql-example
```
※地理空間データにも対応しています。

db作成
```
az cosmosdb sql database create -a example01cosmosaccount -g az-graphql-example -n my-test-db
```

containerの作成(必要な数だけ作成する)
```
az cosmosdb sql container create -a example01cosmosaccount -g az-graphql-example -d my-test-db -n my-container1 -p /modelType --throughput 400
```

### functions
```
az storage account create -n funcstorage0002 -g az-graphql-example -l japaneast --sku Standard_LRS --kind StorageV2
az functionapp create -g az-graphql-example --consumption-plan-location japaneast --runtime node --runtime-version 14 --functions-version 4 --name my-example-graphql-func --storage-account funcstorage0002 
```

functionsの準備ができたらfunctionsAppのデプロイします。
```
func azure functionapp publish my-example-graphql-func --publish-local-settings -y
```

# azure functions コーディング
## graphql 単純なhello world

```
# プロジェクト作成
func init my-graphql-fun
cd my-graphql-fun

# 必要なパッケージ
npm install --save apollo-server-azure-functions

# apiを作成(Http Trigger)
func new --template "Http Trigger" --name graphql

# 確認
func start
curl -H 'content-type: application/json' http://localhost:7071/api/graphql -d "{ \"query\": \"{ helloWorld }\" }"
```



## graphql 単純なhello world + cosmos db
参考
```
https://www.aaron-powell.com/posts/2020-04-07-using-graphql-in-azure-functions-to-access-cosmosdb/
https://docs.microsoft.com/en-us/azure/developer/javascript/how-to/with-web-app/graphql/static-web-app-graphql/introduction
```

やることはこの３つ
1. テストデータの作成
1. スキーマ定義ファイル
1. リゾルバーの定義
1. リゾルバー内部にデータソースに対する処理(cosmos dbを利用)

## テストデータをCosmos DBへ作成する
```
[
    {
        "id": "0",
        "userId": "userid1",
        "country": "japan",
        "description": "desc",
        "links": [
            {
                "id": "0",
                "url": "google.com",
                "title": "google",
                "description": "search"
            },
            {
                "id": "2",
                "url": "yahoo.com",
                "title": "yahoo",
                "description": "search"
            }
        ],
        "modelType": "1"
    },
:
```
## cosmos db用のgraphql apiを作成
名前をgraphqlcosmosとして作成
```
func new --template "Http Trigger" --name graphqlcosmos
```

## curl で確認

getall
```
curl -H 'content-type: application/json' http://localhost:7071/api/graphqlcosmos -d "{ \"query\": \"{ getAll }\" }"
```

(確認) get by id
```
curl -H 'content-type: application/json' http://localhost:7071/api/graphqlcosmos -d "{ \"query\": \"{ getByUserId(userid:\"userid\"){id description} }\" }"
```

### corsの確認用のコマンド
```
npx diagnose-endpoint@1.1.0 --endpoint=http://localhost:7071/api/graphqlcosmos/
```

## altai(GUIでのデバッグツール) で確認
curlで少し複雑なクエリを書こうとすると文字列のエスケープなどで分かりにくくなってしまうので今回はGUIのツールをインストールして利用します。
https://altair.sirmuel.design/

## CRUDの例
### Read
複数つなげることが可能
```
query {
  getAll{
    userId 
  }
  getByUserId(userId:"userid1"){
    userId
  	links{id} 
  }
}
```
output
```
{
  "data": {
    "getAll": [
      {
        "userId": "userid1"
      },
      {
        "userId": "userid2"
      },
      {
        "userId": "userid3"
      }
    ],
    "getByUserId": [
      {
        "userId": "userid1",
        "links": [
          {
            "id": "0"
          },
          {
            "id": "2"
          }
        ]
      }
    ]
  }
}
```
### Create
```
mutation{
  createRecord(input:{
    userId: "John Doe",
    description: "new create"
  }){id}
}
```

### Update
```
mutation{
  updateRecord(input:{
    id: "e31227b1-4790-4142-9459-0686a19bb929",
    userId: "John Doe",
    description: "update description"
  }){id}
}
```

### Delete
```
mutation{
  deleteRecord(input:{
    id: "e31227b1-4790-4142-9459-0686a19bb929"
  }){id}
}
```