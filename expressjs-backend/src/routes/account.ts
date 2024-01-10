import { Router } from "express";
import fakeAuth from "../utils/FakeAuth";

const AccountRoutes = Router();

interface PassMap {
    [key: string]: string;
}

const passMap: PassMap = {};
passMap["bj"] = "pass424";

AccountRoutes.post('/login', async (req, res) => {
    const validUsername = "bj"
    const validPassword = "pass424"

    if (!req.body.username || !req.body.password) {
        res.status(400).send('Missing username or password');
        return;
    }
    if (req.body.username !== validUsername || req.body.password !== validPassword) {
        res.status(401).send('Invalid username or password');
        return;
    }
    const auth = await fakeAuth()
    res.send({token: auth});
});

/* 
    Password 
    - must be of length 8 or greater
    - must contain one capital letter
    - must contain one symbol
    - must contain one number
    On successful registration a token is returned
*/
AccountRoutes.post('/register', async (req, res) => {
    if (req.body.username in passMap) {
        res.status(400).send('Username already exists');
        return;
    }
    if (req.body.password.length < 8
        && !req.body.password.match(/[A-Z]/)
        && !req.body.password.match(/[a-z]/)
        && !req.body.password.match(/[0-9]/)
        && !req.body.password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
        res.status(400).send('Password does not meet requirements');
        return;
    }
    const auth = await fakeAuth()
    passMap[req.body.username] = req.body.password;
    console.log("passMap mapping added ", req.body.username, " to ", req.body.password);
    res.send({token: auth});
});

export default AccountRoutes;