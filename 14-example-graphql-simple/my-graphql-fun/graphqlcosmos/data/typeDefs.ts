import { gql } from "apollo-server-azure-functions"

// DSL定義
export const typeDefs = gql`
    input inpurtRecord{
        id: ID
        userId: String
        description: String
        detail: [inpurtRecordDetail]
    }
    input inpurtRecordDetail{
        id: String
        userId: String
        url: String
        title: String
        description: String
        image: String            
    }
    type Result {
        message: String
    }    
    type Record {
        id: ID
        userId: String
        description: String
        category: String!
        detail: [RecordDetail]
    }
    type RecordDetail {
        id: String
        userId: String!        
        url: String
        title: String
        description: String
        image: String
    }
    type Query {
        helloWorld: String!
        getAll: [Record]!
        getByUserId(userId: String): [Record]!
        getDetailByUserId(userId: String): [RecordDetail]!
    }
    type Mutation {
        allPurge: Result
        createRecord(input: inpurtRecord): Record
        updateRecord(input: inpurtRecord): Record
        deleteRecord(input: inpurtRecord): Record
        createRecordDetail(input: inpurtRecordDetail): RecordDetail
    }
`;
