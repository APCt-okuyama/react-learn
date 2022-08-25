# Cosmos DBトピック

## Cosmos DB SQL の結合　(これは結合？)

単一のレコードでの結合のようです。
```
SELECT 
        f.id AS familyName,
        c.givenName AS childGivenName,
        c.firstName AS childFirstName,
        p.givenName AS petName
    FROM Families f
    JOIN c IN f.children
    JOIN p IN c.pets
```
は以下の疑似コードのように捉えることができる
```
for-each(Family f in Families)
    {
        for-each(Child c in f.children)
        {
            for-each(Pet p in c.pets)
            {
                return (Tuple(f.id AS familyName,
                  c.givenName AS childGivenName,
                  c.firstName AS childFirstName,
                  p.givenName AS petName));
            }
        }
    }
```

## トランザクションについて
ストアドプロシージャ」「トリガー」内の処理においてACIDなトランザクションを保証している。
