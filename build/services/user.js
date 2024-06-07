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
const db_1 = __importDefault(require("../lib/db"));
const node_crypto_1 = require("node:crypto");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let JWT_SECRET = "ahhasdfjkak";
class UserService {
    static hashPass(salt, password) {
        const hashedPass = (0, node_crypto_1.createHmac)('sha256', salt).update(password).digest("hex");
        return hashedPass;
    }
    static createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password } = payload;
            const salt = (0, node_crypto_1.randomBytes)(32).toString("hex");
            const hashedPass = yield UserService.hashPass(salt, password);
            return db_1.default.user.create({
                data: {
                    firstName, lastName, email, password: hashedPass, salt
                }
            });
        });
    }
    static checkUser(email) {
        return db_1.default.user.findUnique({ where: { email } });
    }
    static getUserToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const user = yield UserService.checkUser(email);
            if (!user)
                throw new Error("User not Found");
            const userSalt = user.salt;
            const hashedPass = UserService.hashPass(userSalt, password);
            if (hashedPass !== user.password)
                throw new Error("Incorrect Password ");
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, JWT_SECRET);
            return token;
        });
    }
    static decodeToken(token) {
        return jsonwebtoken_1.default.verify(token, JWT_SECRET);
    }
}
exports.default = UserService;
