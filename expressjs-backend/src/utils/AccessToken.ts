import jwt from 'jsonwebtoken';

function generateAccessToken(username: string) {
    return jwt.sign({username: username}, process.env.TOKEN_SECRET as jwt.Secret, { expiresIn: '1h' });
}

export default generateAccessToken