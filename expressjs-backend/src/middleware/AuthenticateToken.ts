import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
    user: any;
}

function authenticateToken(req: AuthRequest, res: Response, next: any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // bearer TOKEN
    if (token == null) {
        res.clearCookie("jwt")
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.TOKEN_SECRET as jwt.Secret, (err: any, user: any) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

export default authenticateToken