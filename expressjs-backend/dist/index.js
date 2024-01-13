"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_1 = __importDefault(require("./routes/account"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const app = (0, express_1.default)();
const port = 8000;
(0, dotenv_1.configDotenv)();
const key = fs_1.default.readFileSync(__dirname + "/../cert/localhost.decrypted.key");
const cert = fs_1.default.readFileSync(__dirname + "/../cert/localhost.crt");
const options = {
    key,
    cert,
};
// const name = req.query["name"];
//   const job = req.query["job"];
//   try {
//     const result = await userServices.getUsers(name, job);
//     res.send({ users_list: result });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("An error ocurred in the server.");
//   }
app.use((0, cors_1.default)({
    origin: "https://localhost:3000", // allow setting cookies to this origin
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/api/account", account_1.default);
const server = https_1.default.createServer(options, app);
server.listen(port, () => {
    console.log(`Example app listening at https://localhost:${port}`);
});
// this was stripped from stackoverflow
// src: https://stackoverflow.com/questions/14934452/how-to-get-all-registered-routes-in-express
// const routes: { methods: string[], path: string }[] = [];
// const parseRoute = (def: { route: { path: any; methods: {}; }; name: string; handle: { stack: any[]; }; }) => {
//   if (def.route) {
//     routes.push({ path: def.route.path, methods: Object.keys(def.route.methods) });
//   } else if (def.name === 'router') {
//     // nested route (sub router)..
//     def.handle.stack.forEach(parseRoute);
//   }
// }
// app._router.stack.forEach(parseRoute);
// console.log(routes);
