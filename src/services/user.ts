import prisma from "../lib/db";
import { createHmac, randomBytes} from "node:crypto"
import Jwt from "jsonwebtoken";
export interface createUserPayload {
    firstName: string,
    lastName?: string,
    email: string,
    password:string,

}


export interface getUserTokenPayload{
    email: string,
    password:string,
}



let JWT_SECRET = "ahhasdfjkak"


class UserService{


    private static hashPass(salt:string, password:string){


        const hashedPass = createHmac('sha256',salt).update(password).digest("hex")
        return hashedPass;

    }

    public static async createUser(payload:createUserPayload){
        const { firstName, lastName, email, password } = payload ; 
        const salt= randomBytes(32).toString("hex")

const hashedPass = await UserService.hashPass(salt,password)


        return prisma.user.create({
            data:{
                firstName, lastName, email, password:hashedPass,salt
                
            }
        })

    }

    private static checkUser(email:string){
     return prisma.user.findUnique({where:{email}})

    }

public static async getUserToken(payload:getUserTokenPayload){

    const { email, password}= payload;

    const user = await UserService.checkUser(email);
    if(!user)  throw new Error("User not Found");

    const userSalt = user.salt;
    const hashedPass =  UserService.hashPass(userSalt,password)
    if(hashedPass !== user.password) throw new Error("Incorrect Password ")

        const token = Jwt.sign({id:user.id,email:user.email},JWT_SECRET)

return token;
}

public static decodeToken(token:string){
    return Jwt.verify(token, JWT_SECRET)

}

}
export default UserService ; 