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
import { saltPassword, checkPassword } from "../utils/Salt";
dotenv.config();

async function getUserData(access_token: string) {
    
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );

  return await response.json();
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
    // console.log("userData", userData);
    // console.log("user", user);

    const jwtToken = generateJWT({ username: userData.sub, password: user.id_token});
    await userServices.findUserByName(userData.sub as string).then(async (userRes: any) => {
      if (userRes && await checkPassword(user.id_token, userRes.password)) {
        console.log("Logging in for user: ", userData.sub);

        userRes.jwt = jwtToken;
        await userRes.save();
      } else {
        console.log("Adding new user: ", userData.sub);
        await userServices.addUser({ username: userData.sub, password: await saltPassword(user.id_token), jwt: jwtToken});
      }
    })

    const url = new URL(process.env.CLIENT_URL as string);
    url.searchParams.append("token", jwtToken);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.cookie("jwt", jwtToken);
    return res.redirect(303, url.toString());
    } catch (err) {
        console.log("Error with signin with Google", err);
        return res.redirect(303, process.env.CLIENT_URL as string);
    }
});

export default OAuthRoutes;