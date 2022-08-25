import { CosmosClient } from "@azure/cosmos";
import { Record, RecordDetail } from "./types";
import { v4 as uuid } from 'uuid';

//console.log(process.env.CosmosDBConnection);
const client = new CosmosClient(process.env.CosmosDBConnection);

//リゾルバー定義
export const resolvers = {

    Mutation: {
        //関数の定義もいろいろ

        //開発用に全削除
        async allPurge(_){
            console.log("all Purge start...");
            let results = await client
                .database("my-test-db")
                .container("my-container1")
                .items.query({
                    query: "SELECT * FROM c"
                    // query: "SELECT * FROM c where c.category = @category",
                    // parameters: [
                    //     {
                    //         name: "@category",
                    //         value: "User"
                    //     }
                    // ]
                })
                .fetchAll();

            //result
            console.log(results.resources);
            //results.resources.forEach(value => {
            for (const value of results.resources) {                
                console.log(value.id);
                try{
                    let results = await client.database("my-test-db").container("my-container1")
                    .item(value.id).delete();
                    console.log("delete cosmos db record. done.");                
                }catch(error){
                    console.log(error);
                    throw error;
                }                

            }

            return {message:"allPurge has done."};
        },
        //async 
        createRecord: async (_, {input}) =>{
            console.log("start createRecord...");
            console.log(input);            

            const newRecord = new Record(uuid(), input);
            newRecord.userId = uuid();
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
        },
        createRecordDetail: async (_, {input}) =>{
            console.log("start createRecordDetail...");
            console.log(input);            

            const newRecord = new RecordDetail(_, input);
            newRecord.userId = input.userId;
            console.log(newRecord);

            //create cosmos db item
            console.log("create cosmos db record.");
            let results = await client.database("my-test-db").container("my-container1").items.create(newRecord);
            console.log("create cosmos db record.done.");
            return newRecord;
        },
    },
    Query: {
        helloWorld() {
            const msg = 'hello world.cosmos api';
            console.log(msg);
            return msg;
        },        
        async getAll(_, {maxRecord}: {maxRecord: number}) {
            console.log('start getAll...maxRecord:' + maxRecord);
            if ( maxRecord ){
                let results = await client
                .database("my-test-db")
                .container("my-container1")
                .items.query({
                    query: "SELECT TOP @maxRecord * FROM c where c.category = @category",
                    parameters: [
                        {
                            name: "@category",
                            value: "User"
                        },
                        {
                            name: "@maxRecord",
                            value: maxRecord
                        }                        
                    ]
                })
                .fetchAll();
                return results.resources;                
            }else{
                let results = await client
                .database("my-test-db")
                .container("my-container1")
                .items.query({
                    query: "SELECT * FROM c where c.category = @category",
                    parameters: [
                        {
                            name: "@category",
                            value: "User"
                        }
                    ]
                })
                .fetchAll();
                return results.resources;
            }

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
                    query: "SELECT * FROM c WHERE c.category = @category AND c.userId = @userId",
                    parameters: [
                        {
                            name: "@category",
                            value: "User"
                        },                        
                        {
                            name: "@userId",
                            value: userId
                        }
                    ]
                })
                .fetchAll();                
            console.log("results :" + JSON.stringify(results));
            return results.resources;
        },
        async getDetailByUserId(_, { userId }: { userId: string }){
            console.log('start getDetailByUserId...:' + userId);
            let results = await client
                .database("my-test-db")
                .container("my-container1")
                .items.query({
                    query: "SELECT * FROM c WHERE c.category = @category AND c.userId = @userId",
                    parameters: [
                        {
                            name: "@category",
                            value: "UserDetail"
                        },                        
                        {
                            name: "@userId",
                            value: userId
                        }
                    ]
                })
                .fetchAll();                
            //console.log("results :" + JSON.stringify(results));
            console.log("results count: " + results.resources.length);            
            return results.resources;            
        }
    }
};

export default resolvers;