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


// this was stripped from stackoverflow
// src: https://stackoverflow.com/questions/14934452/how-to-get-all-registered-routes-in-express

// const routes: { methods: string[], path: string }[] = [];
// const parseRoute = (def: { route: { path: any; methods: {}; }; name: string; handle: { stack: any[]; }; }) => {
//   if (def.route) {
//     routes.push({ path: def.route.path, methods: Object.keys(def.route.methods) });
//   } else if (def.name === 'router') {
//     // nested route (sub router)..
//     def.handle.stack.forEach(parseRoute);
//   }
// }

// app._router.stack.forEach(parseRoute);
// console.log(routes);