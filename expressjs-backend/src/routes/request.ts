/*
  This route is called by the user from the frontend to contact google oauth
*/

import { Request, Response } from "express";
const express = require("express");
const RequestRoutes = express.Router();
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");
dotenv.config();

RequestRoutes.post("/", async function (req: Request, res: Response, next: any) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Referrer-Policy", "no-referrer-when-downgrade"); // needed for http

  const redirectUrl = "http://127.0.0.1:8000/oath";
  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });

  res.json({ url: authorizeUrl });
});

export default RequestRoutes;