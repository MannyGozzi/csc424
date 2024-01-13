import express from "express";
import AccountRoutes from "./routes/account";
import cors from "cors";
import * as userServices from "./models/user-services.js";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import fs from "fs";
import https from "https";

const app = express();
const port: number = 8000;
configDotenv();

const key = fs.readFileSync(__dirname + "/../cert/localhost.decrypted.key");
const cert = fs.readFileSync(__dirname + "/../cert/localhost.crt");
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

app.use(
  cors({
    origin: "https://localhost:3000", // allow setting cookies to this origin
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/account", AccountRoutes);

const server = https.createServer(options, app);
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
