import UserService, { createUserPayload, getUserTokenPayload } from "../../services/user"

const queries = {
    getUserToken:async(_:any,payload:getUserTokenPayload)=>{
      const token =   await UserService.getUserToken(payload)
      return token;
    },
    getLoginUser:async(_:any, parameter:any,context:any)=>{
        console.log("this is context ", context);
        console.log( context);
        
        if(context){
            return context;
        }

        throw new Error("No context hai ");

    }

}
const mutations = {
createUser:async(_:any,payload:createUserPayload)=>{
    const res = await UserService.createUser(payload)
        return res.id;

    }
}

export const resolver = { 
    queries , mutations
}