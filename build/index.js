"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express4_1 = require("@apollo/server/express4");
const graphql_1 = __importDefault(require("./graphql"));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
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
        app.get("/", (req, res) => {
            res.json({
                message: "Home page"
            });
        });
        const gqlServer = yield (0, graphql_1.default)();
        app.use("/graphql", (0, express4_1.expressMiddleware)(gqlServer));
        app.listen(8000, () => {
            console.log("server started at port 8000");
        });
    });
}
startServer();
