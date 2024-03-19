import {Router} from 'express';
import {Aircraft, AircraftSql} from "../active-records/Aircraft";

export const defaultRoute = Router();

defaultRoute.get('/', (req, res) => {
    res.send("What's up doc ?!");
});
let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/aircraft', function (req: any, res: any) {
    AircraftSql.findAll().then((aircrafts) => {
        console.log(aircrafts)
        return res.send(JSON.stringify(aircrafts));
    }).catch((error) => {
            console.error('Promise rejected with error: ' + error);
            return res.status(500).send();
        });


});

router.post('/aircraft', async function (req: any, res: any) {
    try {
        let aircraft = AircraftSql.build(req.body as Aircraft);
        console.log(aircraft);
        aircraft.set({
            version: "1"
        });

        await aircraft.save();
        return res.send(JSON.stringify(aircraft));
    } catch (e) {
        console.error(e)
        return res.status(400).send();
    }
});

router.put('/aircraft', async function (req: any, res: any) {
    try {
        console.log('put');
        const aircraft = req.body as Aircraft
        let persistedAircraft = await AircraftSql.findOne({
            where: {
                model: aircraft.model,
                version: aircraft.version
            }
        });

        if (!persistedAircraft) {
            console.error(`unable to find ${aircraft.model} version ${aircraft.version}`)
            return res.status(400).send();
        }
        persistedAircraft.set(aircraft);
        persistedAircraft = await persistedAircraft.increment('version', {by: 1});
        console.log(persistedAircraft);
        await persistedAircraft.save();
        return res.send(JSON.stringify(persistedAircraft));
    } catch (e) {
        console.error(e)
        return res.status(400).send();
    }

});

router.delete('/aircraft', async function (req: any, res: any) {

    try {
        console.log('delete');
        const aircraft = req.body as Aircraft
        let persistedAircraft = await AircraftSql.destroy({
            where: {
                model: aircraft.model,
                version: aircraft.version
            }
        });


        return res.send("deleted");
    } catch (e) {
        console.error(e)
        return res.status(400).send();
    }


});

export default router
