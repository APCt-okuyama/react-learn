import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosClient } from "@azure/cosmos";

//console.log(process.env.CosmosDBConnection);
const client = new CosmosClient("AccountEndpoint=https://example01cosmosaccount.documents.azure.com:443/;AccountKey=t5b3f9WxLQFsFpDUqXxvOBNzp0NU8jmLXO7zqH6pwpCrTBL46X96oPZFJkqJ0psPdh4KcBx4JEKlRUDxcMWdiQ==;");

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');




    let results = await client
    .database("my-test-db")
    .container("my-container1")
    .items.query({
        query: "SELECT * FROM c"
        // query: "SELECT * FROM c WHERE c.vanityUrl = @vanity",
        // parameters: [
        //     {
        //         name: "@vanity",
        //         value: vanity
        //     }
        // ]
    })
    .fetchAll();

    context.log('cosmos: results:', JSON.stringify(results));
    console.log('this is console.log');

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "hello consmos db."
    };

};

export default httpTrigger;