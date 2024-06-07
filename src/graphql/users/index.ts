import  { typeDefs } from "./typedef"
import { queries } from "./queries"
import  { mutation } from "./mutation"
import { resolver} from "./resolver"


export const user = { 
    typeDefs,
    queries,
    mutation,
    resolver
}
