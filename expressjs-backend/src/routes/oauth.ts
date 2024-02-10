/*
  This route is called by google to know whether or not the oauth was successful
*/

import { Request, Response } from "express";
const express = require("express");
const OAuthRoutes = express.Router();
const dotenv = require("dotenv");
import generateJWT from "../utils/AccessToken";
import userServices from "../models/user-services";
const { OAuth2Client } = require("google-auth-library");
dotenv.config();

async function getUserData(access_token: string) {
    
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );

  const data = await response.json();
  console.log("data", data);
  return data;
}

OAuthRoutes.get("/", async function (req: Request, res: Response, next: any) {
  const code = req.query.code;
  try {
    const redirectUrl = `${process.env.HOST_URL}/oauth`;
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const result = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(result.tokens);
    const user = oAuth2Client.credentials;
    const userData = await getUserData(user.access_token);

    // TODO CHECK FOR DUPLICATE GOOGLE USERS
    const jwtToken = generateJWT(user.id_token);
    console.log("GENERATE OAUTH KEY", jwtToken);
    await userServices.addUser({ username: userData.name, jwt: jwtToken});
    const url = new URL(process.env.CLIENT_URL as string);
    url.searchParams.append("token", jwtToken);
    res.cookie("jwt", jwtToken, { httpOnly: true, secure: true });
    return res.redirect(303, url.toString());
    } catch (err) {
        console.log("Error with signin with Google", err);
        return res.redirect(303, process.env.CLIENT_URL as string);
    }
});

export default OAuthRoutes;