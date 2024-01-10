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
const express_1 = require("express");
const FakeAuth_1 = __importDefault(require("../utils/FakeAuth"));
const AccountRoutes = (0, express_1.Router)();
const passMap = {};
passMap["bj"] = "pass424";
/*
    Password
    - must be of length 8 or greater
    - must contain one capital letter
    - must contain one symbol
    - must contain one number
    On successful registration a token is returned
*/
AccountRoutes.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.username in passMap) {
        res.status(400).send('Username already exists');
        return;
    }
    if (req.body.password.length < 8
        && !req.body.password.match(/[A-Za-z]/)
        && !req.body.password.match(/[0-9]/)
        && !req.body.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
        res.status(400).send('Password does not meet requirements');
        return;
    }
    const auth = yield (0, FakeAuth_1.default)();
    passMap[req.body.username] = req.body.password;
    console.log("passMap mapping added ", req.body.username, " to ", req.body.password);
    res.send({ token: auth });
}));
AccountRoutes.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validUsername = "bj";
    const validPassword = "pass424";
    if (!req.body.username || !req.body.password) {
        res.status(400).send('Missing username or password');
        return;
    }
    if (req.body.username !== validUsername || req.body.password !== validPassword) {
        res.status(401).send('Invalid username or password');
        return;
    }
    const auth = yield (0, FakeAuth_1.default)();
    res.send({ token: auth });
}));
exports.default = AccountRoutes;
