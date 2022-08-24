import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { ApolloServer, gql } from "apollo-server-azure-functions"

//scheme
const typeDefs = gql`
    type Query {
        helloWorld: String!
    }
`;
//resolver
const resolvers = {
    Query: {
        helloWorld() {
            const msg = 'hello world.';
            console.log(msg);
            return msg;
        }
    }
};

const server = new ApolloServer({ 
    typeDefs, 
    resolvers
});
export default server.createHandler();

// const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
//     context.log('HTTP trigger function processed a request.');
//     const name = (req.query.name || (req.body && req.body.name));
//     const responseMessage = name
//         ? "Hello, " + name + ". This HTTP triggered function executed successfully."
//         : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//     context.res = {
//         // status: 200, /* Defaults to 200 */
//         body: responseMessage
//     };

// };

// export default httpTrigger;