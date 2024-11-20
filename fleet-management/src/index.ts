// @ts-ignore
import express, { Request, Response } from 'express';
import aircraftRouter from './routers/aircraftRouter';
import seatTypeRouter from './routers/seatTypeRouter';
import {AircraftSql} from "./active-records/Aircraft";
import {SeatTypeSql} from "./active-records/SeatType";
import {CabinLayoutSql} from "./active-records/CabinLayout";
import cabinLayoutRouter from "./routers/cabinLayoutRouter";
import fleetUnitRouter from "./routers/fleetUnitRouter";
import {FleetUnit, FleetUnitSql} from "./active-records/FleetUnit";
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(aircraftRouter)
app.use(seatTypeRouter)
app.use(cabinLayoutRouter)
app.use(fleetUnitRouter)
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.get('/setup', async (req: Request, res: Response) => {
    await AircraftSql.sync({force: true});
    await SeatTypeSql.sync({force: true});
    await CabinLayoutSql.sync({force: true});
    await FleetUnitSql.sync({force: true});
    console.log("The table for the User model was just (re)created!");
    res.send('Hello, TypeScript Express!');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});