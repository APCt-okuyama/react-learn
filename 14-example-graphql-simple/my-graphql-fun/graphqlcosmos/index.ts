import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ApolloServer, gql } from "apollo-server-azure-functions"
// const {
//     ApolloServerPluginLandingPageLocalDefault
//   } = require('apollo-server-core');
import { CosmosClient } from "@azure/cosmos";

import { v4 as uuid } from 'uuid';

//console.log(process.env.CosmosDBConnection);
const client = new CosmosClient(process.env.CosmosDBConnection);
//const client = new CosmosClient("AccountEndpoint=https://example01cosmosaccount.documents.azure.com:443/;AccountKey=t5b3f9WxLQFsFpDUqXxvOBNzp0NU8jmLXO7zqH6pwpCrTBL46X96oPZFJkqJ0psPdh4KcBx4JEKlRUDxcMWdiQ==;");

// DSL定義
const typeDefs = gql`
    input inpurtRecord{
        id: ID
        userId: String
        description: String        
    }
    type Record {
        id: ID
        userId: String
        vanityUrl: String!
        description: String
        links: [Link]
    }
    type Link {
        id: String
        url: String!
        title: String!
        description: String
        image: String
    }
    type Query {
        helloWorld: String!
        getAll: [Record]!
        getByUserId(userId: String): [Record]!
    }
    type Mutation {
        createRecord(input: inpurtRecord): Record
        updateRecord(input: inpurtRecord): Record
        deleteRecord(input: inpurtRecord): Record        
    }
`;

class Record {
    id: any;
    userId: string;
    description: string

    constructor(id: String, {userId, description}) {
        this.id = id;
        this.userId = userId;
        this.description = description;
    }
}

//リゾルバー定義
const resolvers = {
    Mutation: {
        //async 
        createRecord: async (_, {input}) =>{
            console.log("start createRecord...");
            console.log(input);            

            const newRecord = new Record(uuid(), input)
            console.log(newRecord);

            //create cosmos db item
            console.log("create cosmos db record.");

            let results = await client.database("my-test-db").container("my-container1").items
                .create(newRecord);

            console.log("create cosmos db record.done.");
            return newRecord;
        },
        updateRecord: async(_, {input}) =>{
            console.log("start updateRecord...");
            console.log(input);

            //update cosmos db
            const id = input.id;

            const newRecord = new Record(id, input)
            console.log(newRecord);


            console.log("update cosmos db record." + id);            
            let results = await client.database("my-test-db").container("my-container1")
                .item(id)
                .replace(newRecord);
            console.log("update cosmos db record. done")
            return newRecord;
        },
        deleteRecord: async(_, {input}) =>{
            console.log("start deleteRecord...");
            console.log(input.id);
            const id = input.id;
            console.log("delete cosmos db record." + id);
            try{
                let results = await client.database("my-test-db").container("my-container1")
                .item(id).delete();
                console.log("delete cosmos db record. done.");                
            }catch(error){
                console.log(error);
                throw error;
            }

            return input;
        }
    },
    Query: {
        helloWorld() {
            const msg = 'hello world.cosmos api';
            console.log(msg);
            return msg;
        },        
        async getAll() {
            console.log('start getAll...');
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
            return results.resources;
            // if (results.resources.length > 0) {
            //     return results.resources[0];
            // }
            // return null;
        },
        async getByUserId(_, { userId }: { userId: string }) {            
            console.log('start getByUserId...:' + userId);
            let results = await client
                .database("my-test-db")
                .container("my-container1")
                .items.query({
                    query: "SELECT * FROM c WHERE c.userId = @userId",
                    parameters: [
                        {
                            name: "@userId",
                            value: userId
                        }
                    ]
                })
                .fetchAll();                
            console.log("results :" + JSON.stringify(results));
            return results.resources;
        }
    }
};


// ApolloServerを作成
const server = new ApolloServer({ 
    typeDefs, 
    resolvers
});

export default server.createHandler({
    cors: { origin: "https://studio.apollographql.com", credentials: true }
});