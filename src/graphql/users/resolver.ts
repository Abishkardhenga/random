import UserService, { createUserPayload, getUserTokenPayload } from "../../services/user"

const queries = {
    getUserToken:async(_:any,payload:getUserTokenPayload)=>{
      const token =   await UserService.getUserToken(payload)
      return token;
    },
    getLoginUser: async (_: any, parameter: any, contextValue: any) => {
        console.log("this is context ", contextValue);
        if (contextValue && contextValue.user) {
            console.log(contextValue.user.id);
            const id = contextValue.user.id;
           const user =  await UserService.getUserById(id)

            return user;
        }

        throw new Error("No context available");
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