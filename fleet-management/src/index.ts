// @ts-ignore
import express, { Request, Response } from 'express';
import aircraftRouter from './routers/aircraftRouter';
import seatTypeRouter from './routers/seatTypeRouter';
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(aircraftRouter)
app.use(seatTypeRouter)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});