import { ApolloServer } from "@apollo/server";

async function CreateGraphqlServer (){
    const gqlServer = new  ApolloServer({
        typeDefs:`
        type Query{
         
        }
        
        type Mutation{
        }
        `,
        resolvers:{
           Query : {
           
           },
           Mutation:{
      


            
           }
        },
    })

    await gqlServer.start()
    return gqlServer ; 
}


export default CreateGraphqlServer;