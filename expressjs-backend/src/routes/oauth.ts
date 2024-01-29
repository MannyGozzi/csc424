import { Request, Response } from "express";
const express = require("express");
const OAuthRoutes = express.Router();
const dotenv = require("dotenv");
import generateJWT from "../utils/AccessToken";
dotenv.config();

const { OAuth2Client } = require("google-auth-library");

async function getUserData(access_token: string) {

  const response = await fetch(

    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`

  );

  const data = await response.json();

  console.log("data", data);

}

OAuthRoutes.get("/", async function (req: Request, res: Response, next: any) {

  const code = req.query.code;

  try {

    const redirectUrl = "https://127.0.0.1:8000/oath";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const result = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(result.tokens);
    const user = oAuth2Client.credentials;
    await getUserData(user.access_token);

        
   // call your code to generate a new JWT from your backend, don't reuse Googles

    const token = generateJWT(user.appUser.userid);
    res.redirect(303, `http://localhost:3000/token=${token}`);

    } catch (err) {
    console.log("Error with signin with Google", err);
           res.redirect(303, "http://localhost:3000/");
  }

});

export default OAuthRoutes;