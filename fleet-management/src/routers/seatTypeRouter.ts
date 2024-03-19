import {Router} from 'express';
import {SeatType, SeatTypeSql} from "../database/SeatType";

export const defaultRoute = Router();


defaultRoute.get('/', (req, res) => {
    res.send("What's up doc ?!");
});
let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/seat-type', function (req: any, res: any) {
    SeatTypeSql.findAll().then((seatTypes) => {
        console.log(seatTypes)
        return res.send(JSON.stringify(seatTypes));
    })
        .catch((error) => {
            console.error('Promise rejected with error: ' + error);
            return res.status(500).send();
        });


});

router.post('/seat-type', async function (req: any, res: any) {
    try {
        let seatType = SeatTypeSql.build(req.body as SeatType);
        console.log(seatType);
        seatType.set({
            version: "1"
        });

        await seatType.save();
        return res.send(JSON.stringify(seatType));
    } catch (e) {
        console.error(e)
        return res.status(400).send();
    }

});

router.put('/seat-type', async function (req: any, res: any) {
    try {
        console.log('put');
        const seatType = req.body as SeatType
        let persistedSeatType = await SeatTypeSql.findOne({
            where: {
                id: seatType.id,
                version: seatType.version
            }
        });

        if (!persistedSeatType) {
            console.error(`unable to find ${seatType.id} version ${seatType.version}`)
            return res.status(400).send();
        }
        persistedSeatType.set(seatType);
        persistedSeatType = await persistedSeatType.increment('version', {by: 1});
        console.log(persistedSeatType);
        await persistedSeatType.save();
        return res.send(JSON.stringify(persistedSeatType));
    } catch (e) {
        console.error(e)
        return res.status(400).send();
    }

});

router.delete('/seat-type', async function (req: any, res: any) {

    try {
        console.log('delete');
        const seatType = req.body as SeatType
        await SeatTypeSql.destroy({
            where: {
                id: seatType.id,
                version: seatType.version
            }
        });


        return res.send("deleted");
    } catch (e) {
        console.error(e)
        return res.status(400).send();
    }

});

export default router
