# graphql on azure

RESTFull vs GraphQL

![image](../doc/graphql-restfull.png)

# Azure で Graph QL(Cosmos DB) を利用する

## Azureリソースの準備

cosmos db と functions (typescript + apollo)　を用意します。

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

### functions (Option)
※ functionsはローカルで実行もできるので必須ではありません。
```
az storage account create -n funcstorage0002 -g az-graphql-example -l japaneast --sku Standard_LRS --kind StorageV2
az functionapp create -g az-graphql-example --consumption-plan-location japaneast --runtime node --runtime-version 14 --functions-version 4 --name my-example-graphql-func --storage-account funcstorage0002 
```

functionsの準備ができたらfunctionsAppのデプロイします。
```
func azure functionapp publish my-example-graphql-func --publish-local-settings -y
```

# azure functions コーディング

環境
```
node -v
v14.18.2
func -v
4.0.4544
```

追加したライブラリ
```
npm install @azure/cosmos
npm install apollo-server-azure-functions
npm install graphql
npm install uuid
```

## graphql 単純なhello world + cosmos db

必要な作業
1. graphql用 に"Http Trigger"関数を作成する
1. スキーマ定義ファイル
1. リゾルバーの実装(データソースに対する処理(今回はcosmos db))

参考
```
https://www.aaron-powell.com/posts/2020-04-07-using-graphql-in-azure-functions-to-access-cosmosdb/
https://docs.microsoft.com/en-us/azure/developer/javascript/how-to/with-web-app/graphql/static-web-app-graphql/introduction
```

### cosmos db用のgraphql apiを作成
※ 名前をgraphqlcosmosとして作成しています。
```
func init --typescript my-graphql-fun
func new --template "Http Trigger" --name graphqlcosmos
```
### スキーマ定義の作成 (typeDefs.ts)
すべて書くと長くなってしまうので省略して記載します。
```
export const typeDefs = gql`
    input inpurtRecord {} 
    input inputRecordDetail {}
    type Result {} 
    type Record {}
    type RecordDetail {}
    type Query {　※Queryとして４つ定義しました。
        helloWorld: String!
        getAll(maxRecord: Int): [Record]! ※すべてのレコードを取得
        getByUserId(userId: String): [Record]! ※IDを指定して1件取得
        getDetailByUserId(userId: String): [RecordDetail]!
    }
    type Mutation { ※CRUD操作確認用に作成 
        allPurge: Result ※すべてのレコードを削除する(確認用)
        createRecord(input: inpurtRecord): Record
        updateRecord(input: inpurtRecord): Record
        deleteRecord(input: inpurtRecord): Record
        createRecordDetail(input: inpurtRecordDetail): RecordDetail
    }
:
`;
```

### リゾルバーの実装 (resolver.ts)
実際にCosmosDBへアクセスしてデータを操作する処理を実装します。
```
export const resolvers = {
    Mutation: { ... }
    Query: { ... }
}
```
ソースコードはこちら

## 確認

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
all
```
query {
  getAll{
    userId 
  }
}
```
output
```
```

one
```
query {
  getByUserId(userId:"userid1"){
    userId
  	links{id} 
  }
}

### Create
```
mutation{
  createRecord(input:{
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
one
```
mutation{
  deleteRecord(input:{
    id: "e31227b1-4790-4142-9459-0686a19bb929"
  }){id}
}
```
all
```
mutation{
  allPurge(input:{
    id: "e31227b1-4790-4142-9459-0686a19bb929"
  }){id}
}
```

# N+1の問題について
ORMを利用する場合は注意かな