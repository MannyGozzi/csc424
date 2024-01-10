"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_1 = __importDefault(require("./routes/account"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/account', account_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
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
