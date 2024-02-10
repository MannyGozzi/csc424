import jwt from "jsonwebtoken";

function generateJWT(user: any) {
  // only use the username and password fields to gen the token
  const userJwtObj = {username: user.username, password: user.password }
  return jwt.sign(
    {userJwtObj},
    process.env.TOKEN_SECRET as jwt.Secret,
    { expiresIn: "1h" },
  );
}

export default generateJWT;
