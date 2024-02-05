import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user: any;
}

function authenticateToken(req: AuthRequest, res: Response, next: any) {
  const token = req.cookies.jwt;
  if (token == null) {
    res.clearCookie("jwt");
    return res.sendStatus(401);
  }
  jwt.verify(
    token,
    process.env.TOKEN_SECRET as jwt.Secret,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    },
  );
}

export default authenticateToken;
