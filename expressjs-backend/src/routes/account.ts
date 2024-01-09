import { Router } from "express";
import fakeAuth from "../utils/FakeAuth";

const AccountRoutes = Router();

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

export default AccountRoutes;