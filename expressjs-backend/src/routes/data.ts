import { RequestHandler, Router } from "express";
import userServices from "../models/user-services";
import authenticateToken from "../middleware/AuthenticateToken";

const DataRoutes = Router();

DataRoutes.post("/contacts", authenticateToken as RequestHandler, async (req, res) => {
    const { contacts } = req.body;
    const jwt = req.cookies.jwt;
    if (!jwt) {
        res.status(401).send("Not authorized");
        return;
    }
    const user = await userServices.findUserByJwt(jwt);
    // add contacts
    if (user != null) {
        user.contacts = contacts;
        await user.save();
        res.send(user.contacts);
    } else {
        res.status(401).send("Not authorized");
    }
});

DataRoutes.get("/contacts", authenticateToken as RequestHandler, async (req, res) => {
    const jwt = req.cookies.jwt;
    if (!jwt) {
        res.status(401).send("Not authorized");
        return;
    }
    const user = await userServices.findUserByJwt(jwt);
    if (user != null) {
        res.send({ contacts: user.contacts });
    } else {
        res.status(401).send("Not authorized");
    }
})

export default DataRoutes;
