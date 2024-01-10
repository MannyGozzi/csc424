import express, { Request, Response } from 'express';
import AccountRoutes from './routes/account';
import cors from 'cors';

const app = express();
const port: number = 8000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/account', AccountRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});