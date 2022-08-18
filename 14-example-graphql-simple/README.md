# graphql on azure

RESTFull vs GraphQL

![image](../doc/graphql-restfull.png)

# Azure で Graph QL を利用する

## Azure 構成
cosmos db + functions (typescript + apollo))

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
※サンプルに含まれるサンプルデータ(trivia.json)を投入する。

db作成
```
az cosmosdb sql database create -a example01cosmosaccount -g az-graphql-example -n trivia
```
containerの作成
```
az cosmosdb sql container create -a example01cosmosaccount -g az-graphql-example -d trivia -n game -p /modelType --throughput 400
```

### functions
```
az storage account create -n funcstorage0002 -g az-graphql-example -l japaneast --sku Standard_LRS --kind StorageV2
az functionapp create -g az-graphql-example --consumption-plan-location japaneast --runtime node --runtime-version 14 --functions-version 4 --name my-example-graphql-func --storage-account funcstorage0002 
```

appのデプロイします。
```
func azure functionapp publish my-example-graphql-func --publish-local-settings -y
```

## functions コーディング (apollo)
https://www.aaron-powell.com/posts/2020-04-07-using-graphql-in-azure-functions-to-access-cosmosdb/
```
func init my-graphql-fun
cd my-graphql-fun
func new xxx
```
## curlで確認
helloWorld
```
curl -H 'content-type: application/json' http://localhost:7071/api/graphql -d "{ \"query\": \"{ helloWorld }\" }"
```

