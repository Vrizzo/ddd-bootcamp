import {Router} from 'express';
import {Aircraft} from "../database/Aircraft";
import {PoolFactory} from "../database/Pool";
import {SeatTypeRepository} from "../database/SeatTypeRepository";
import {SeatType} from "../database/SeatType";

export const defaultRoute = Router();


defaultRoute.get('/', (req, res) => {
    res.send("What's up doc ?!");
});
let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/seat-type', function (req: any, res: any) {
    new SeatTypeRepository().fetch().then((seatTypes) => {
        console.log(seatTypes)
        return res.send(JSON.stringify(seatTypes));
    })
        .catch((error) => {
            console.error('Promise rejected with error: ' + error);
            return res.status(500).send();
        });


});

router.post('/seat-type', function (req: any, res: any) {
    console.log("post");
    let seatType = req.body as SeatType;
    console.log(seatType);

    new SeatTypeRepository().insert(seatType).then((result) => {
        res.send(JSON.stringify(seatType));
    })
        .catch((error) => {
            console.error('Promise rejected with error: ' + error);
        });


});

router.put('/seat-type', function (req: any, res: any) {
    console.log("put");
    let seatType = req.body as SeatType;
    console.log(seatType);

    new SeatTypeRepository().insert(seatType).then((result) => {
        res.send(JSON.stringify(seatType));
    })
        .catch((error) => {
            console.error('Promise rejected with error: ' + error);
        });


});

router.delete('/seat-type', function (req: any, res: any) {

    new SeatTypeRepository().delete('test').then((result) => {
        res.json('ok');
    })
        .catch((error) => {
            console.error('Promise rejected with error: ' + error);
        });


});

export default router
