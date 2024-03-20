import {Router} from 'express';
import {FleetUnit} from "../active-records/FleetUnit";

export const defaultRoute = Router();

defaultRoute.get('/', (req, res) => {
    res.send("What's up doc ?!");
});
let express = require('express');
let router = express.Router();

router.post('/fleet-unit', async function (req: any, res: any) {
    async function validate(fleetUnit: FleetUnit) {

    }

    try {
        let fleetUnit = req.body as FleetUnit;
        await validate(fleetUnit);

        return res.send(JSON.stringify(fleetUnit));
    } catch (e) {
        console.error(e)
        return res.status(400).send();
    }
});


export default router
