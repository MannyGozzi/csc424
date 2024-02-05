import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import fs from "fs";
import https from "https";
import AccountRoutes from "./routes/account";
import DataRoutes from "./routes/data";
import OAuthRoutes from "./routes/oauth";
import RequestRoutes from "./routes/request";

const app = express();
const port: number = 8000;
configDotenv();

const key = fs.readFileSync(__dirname + "/../cert/localhost.decrypted.key");
const cert = fs.readFileSync(__dirname + "/../cert/localhost.crt");
const options = {
  key,
  cert,
};

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
app.use("/api/data", DataRoutes);
app.use("/oauth", OAuthRoutes);
app.use("/request", RequestRoutes);

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
