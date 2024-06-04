import { ApolloServer } from "@apollo/server";
import { user } from "./users"

async function CreateGraphqlServer (){
    const gqlServer = new  ApolloServer({
        typeDefs:`
        type Query{
         hello:String
        }
        
        type Mutation{
            ${user.mutation}
        }
        `,
        resolvers:{
           Query : {
           ...user.resolver.queries
           },
           Mutation:{
            ...user.resolver.mutations



            
           }
        },
    })

    await gqlServer.start()
    return gqlServer ; 
}


export default CreateGraphqlServer;