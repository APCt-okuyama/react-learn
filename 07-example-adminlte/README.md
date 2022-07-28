# Admin LTE 

Admin LTE と Router を組み合わせる

##　ローカル実行

```
cd my-admin-console
npm start
```

## Azure Storageへデプロイ
```
# ビルド
npm run build

# $webへUpload
az storage blob upload-batch -s ./build -d $web --account-name myreactstorage002 --overwrite

az storage account show -n myreactstorage002 -g az-react-example --query "primaryEndpoints.web" --output tsv
```

https://myreactstorage001.z22.web.core.windows.net/
https://myreactstorage002.z11.web.core.windows.net/
