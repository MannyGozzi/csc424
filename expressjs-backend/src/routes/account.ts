import { Router } from "express";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import authenticateToken from "../middleware/AuthenticateToken";
import userServices from "../models/user-services";

const AccountRoutes = Router();

interface PassMap {
    [key: string]: string;
}

const passMap: PassMap = {};
passMap["bj"] = "pass424";

AccountRoutes.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send("Missing username or password");
    return
  } else {
    await userServices.findUserByUsernamePassword(req.body.username, req.body.password).then(async (user: any) => {
      if (user === null) {
        res.status(401).send("Invalid username or password");
        return;
      } else {
        try {
          jwt.verify(user.jwt, process.env.TOKEN_SECRET as jwt.Secret)
          res.cookie("jwt", user.jwt);
          res.send({ token: user.jwt });
        } catch (err) {
          // issue new cookie if theirs is invalid
          const jtwToken = jwt.sign({ username: req.body.username }, process.env.TOKEN_SECRET as jwt.Secret, { expiresIn: "1h" });
          user.jwt = jtwToken;
          await user.save()
          res.cookie("jwt", user.jwt);
          res.send({ token: user.jwt });
        }
      }
      
    })
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
    return res.status(400).send("Username already exists");
  }
  if (
    req.body.password.length < 8 ||
    !req.body.password.match(/[A-Za-z]/) ||
    !req.body.password.match(/[0-9]/) ||
    !req.body.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
  ) {
    return res.status(400).send("Password does not meet requirements");
  }
  passMap[req.body.username] = req.body.password;
  userServices.addUser({ username: req.body.username, password: req.body.password }).then((user: any) => {
    console.log("user: ", user);
    res.cookie("jwt", user.jwt);
    return res.send({ token: user.jwt });
  });
});

AccountRoutes.get("/get", async (req, res) => {
  const username = req.query.username;
  userServices.getUsers(username as string, "").then((users: any) => {
        return res.send({ users })
    }).catch((error: any) => {
        return res.status(500).send("An error ocurred in the server.");
    });
})

AccountRoutes.get(
  "/token",
  authenticateToken as RequestHandler,
  async (req, res) => {
    const jwt = req.cookies.jwt
    const user = await userServices.findUserByJwt(jwt)
    if (!user) return res.status(403).send("User not found");
    return res.send({ token: user.jwt });
  },
);

export default AccountRoutes;
