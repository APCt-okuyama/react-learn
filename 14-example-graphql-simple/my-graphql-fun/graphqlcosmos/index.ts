import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ApolloServer } from "apollo-server-azure-functions"

import { typeDefs } from "./data/typeDefs";
import resolvers from "./data/resolvers";

// ApolloServerを作成
const server = new ApolloServer({ 
    typeDefs, 
    resolvers
});

export default server.createHandler({
//    cors: { origin: "https://studio.apollographql.com", credentials: true }
});