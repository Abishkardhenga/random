import express   from "express";

import { expressMiddleware } from '@apollo/server/express4';
import CreateGraphqlServer from "./graphql";


async function startServer (){
    const app = express()


    app.use(express.json())
//     const gqlServer = new  ApolloServer({
//         typeDefs:`
//         type Query{
//             hello: String ,
//             say(name:String):String
//         }
        
//         type Mutation{
//             createUser(firstName:String! ,lastName:String!,  email:String! ,password:String!  ):Boolean
//         }
//         `,
//         resolvers:{
//            Query : {
//             hello : ()=>'hello name is aabiskar',
//             say:(_,{name}:{name:string})=>`Hi ${name}, how are you ?`
//            },
//            Mutation:{
//             createUser: async(_,{firstName, lastName, email, password}:{firstName:string; lastName:string; email:string; password:string})=> {
// const usercreated = await prisma.user.create({
//     data:{
//         email,
//         firstName,
//         lastName,
//         password,

//     }
// })
// return true ; 


//             }
//            }
//         },
//     })

//     await gqlServer.start()


    app.get("/",(req, res)=>{
        res.json({
            message:"Home page"
        })
        })
        const gqlServer = await CreateGraphqlServer()

        app.use("/graphql", expressMiddleware(gqlServer))
    
    app.listen(8000, ()=>{
        console.log("server started at port 8000")
    })
}

startServer()