import jwt from "jsonwebtoken";

function generateJWT(user: any) {
  return jwt.sign(
    { user },
    process.env.TOKEN_SECRET as jwt.Secret,
    { expiresIn: "1h" },
  );
}

export default generateJWT;
