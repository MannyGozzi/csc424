"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // bearer TOKEN
    if (token == null) {
        res.clearCookie("jwt");
        return res.sendStatus(401);
    }
    jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
}
exports.default = authenticateToken;
