import { Router } from "express";
import fakeAuth from "../utils/FakeAuth";
import { RequestHandler } from "express";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import generateAccessToken from "../utils/AccessToken";
import authenticateToken from "../middleware/AuthenticateToken";

const AccountRoutes = Router();

interface PassMap {
  [key: string]: string;
}

const passMap: PassMap = {};
passMap["bj"] = "pass424";

AccountRoutes.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send("Missing username or password");
  } else if (
    req.body.username in passMap &&
    req.body.password === passMap[req.body.username]
  ) {
    const accessToken = generateAccessToken(req.body.username);
    res.cookie("jwt", accessToken, { httpOnly: true });
    const auth = await fakeAuth();
    res.send({ token: auth });
  } else {
    res.status(401).send("Invalid username or password");
  }
});

/* 
    Password 
    - must be of length 8 or greater
    - must contain one capital letter
    - must contain one symbol
    - must contain one number
    On successful registration a token is returned
*/
AccountRoutes.post("/register", async (req, res) => {
  if (req.body.username in passMap) {
    res.status(400).send("Username already exists");
  }
  if (
    req.body.password.length < 8 ||
    !req.body.password.match(/[A-Za-z]/) ||
    !req.body.password.match(/[0-9]/) ||
    !req.body.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
  ) {
    res.status(400).send("Password does not meet requirements");
    return;
  }
  const auth = await fakeAuth();
  passMap[req.body.username] = req.body.password;
  console.log(
    "passMap mapping added ",
    req.body.username,
    " to ",
    req.body.password,
  );
  res.send({ token: auth });
});

AccountRoutes.get("/get", async (req, res) => {
  const username = req.query.username;
  const users = Object.entries(passMap).map(
    ([user, _]: [string, string]) => user,
  );
  if (!username || username === "") {
    res.send({ users });
  } else {
    res.send({ users: users.filter((user: string) => user === username) });
  }
});

AccountRoutes.get(
  "/token",
  authenticateToken as RequestHandler,
  async (req, res) => {
    res.send({ token: await fakeAuth() });
  },
);

export default AccountRoutes;
