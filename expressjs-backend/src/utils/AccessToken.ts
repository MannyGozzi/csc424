import jwt from "jsonwebtoken";

function generateAccessToken(user: any) {
  return jwt.sign(
    { user },
    process.env.TOKEN_SECRET as jwt.Secret,
    { expiresIn: "1h" },
  );
}

export default generateAccessToken;
