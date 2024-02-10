import { Router } from "express";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import authenticateToken from "../middleware/AuthenticateToken";
import userServices from "../models/user-services";

const AccountRoutes = Router();

AccountRoutes.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send("Missing username or password");
    return
  } 
  await userServices.findUserByUsernamePassword(req.body.username, req.body.password).then(async (user: any) => {
    if (user === null) {
      return res.status(401).send("Invalid username or password" )
    }
    try {
      jwt.verify(user.jwt, process.env.TOKEN_SECRET as jwt.Secret)
      res.cookie("jwt", user.jwt, { httpOnly: true, secure: true });
    } catch (err) {
      // issue new cookie if theirs is invalid
      const jwtToken = jwt.sign({ username: req.body.username }, process.env.TOKEN_SECRET as jwt.Secret, { expiresIn: "1h" });
      user.jwt = jwtToken;
      await user.save()
      res.cookie("jwt", user.jwt, { httpOnly: true, secure: true });
    }
    return res.send({ token: user.jwt });
  })
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
  if (!req.body.username) return res.status(400).send("Missing username");
  if (!req.body.password) return res.status(400).send("Missing password");
  if (await userServices.findUserByName(req.body.username)) {
    return res.status(400).send("Username already exists");
  }
  if (
    req.body.password.length < 8 ||
    !req.body.password.match(/[A-Za-z]/) ||
    !req.body.password.match(/[0-9]/) ||
    !req.body.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
  ) {
    return res.status(400).send("Registration failed, 8+ chars, 1 num, 1 sym.");
  }
  userServices.addUser({ username: req.body.username, password: req.body.password }).then((user: any) => {
    console.log("account created: ", user);
    res.cookie("jwt", user.jwt, { httpOnly: true, secure: true });
    return res.send({ token: user.jwt });
  }).catch((error: any) => {
    console.log("error: ", error);
    return res.status(500).send("An error ocurred in the server.");
  })
});

AccountRoutes.get("/get", async (req, res) => {
  const username = req.query.username;
  userServices.getUsers(username as string, "").then((users: any) => {
        return res.send({ users })
    }).catch((error: any) => {
        return res.status(500).send("An error ocurred in the server.")
    });
})

AccountRoutes.get(
  "/token",
  authenticateToken as RequestHandler,
  async (req, res) => {
    const jwt = req.cookies.jwt
    const user = await userServices.findUserByJwt(jwt)
    if (!user) return res.status(403).send("User not found");
    res.send({ token: user.jwt });
  },
);

export default AccountRoutes;
