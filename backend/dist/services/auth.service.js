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
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const registerUser = (email, password, name) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const newUser = yield prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });
    return {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
    };
});
exports.registerUser = registerUser;
const jwt_1 = require("../utils/jwt");
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid credentials');
    }
    const token = (0, jwt_1.generateToken)({ id: user.id, email: user.email, role: user.role });
    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        }
    };
});
exports.loginUser = loginUser;
