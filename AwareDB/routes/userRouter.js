"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const userModel = __importStar(require("../models/userModel"));
const userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    userModel.findAll((err, user) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }
        res.status(200).json({ "dataUser": user });
    });
}));
userRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    userModel.create(newUser, (err, id) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }
        res.status(200).json({ "user_id": id });
    });
}));
userRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = Number(req.params.id);
    userModel.findOne(user, (err, user) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }
        res.status(200).json({ "userProduct": user });
    });
}));
userRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    userModel.update(user, (err) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }
        res.status(200).send();
    });
}));
userRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = Number(req.params.id);
    userModel.deleteUser(user, (err) => {
        if (err) {
            return res.status(500).json({ "errorMessage": err.message });
        }
        res.status(200).json({ "message": "User deleted successfully" });
    });
}));
