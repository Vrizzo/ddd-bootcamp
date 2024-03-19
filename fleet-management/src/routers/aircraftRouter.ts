import {Router} from 'express';
import {Aircraft} from "../database/Aircraft";
import {AircraftRepository} from "../database/AircraftRepository";


export const defaultRoute = Router();


defaultRoute.get('/', (req, res) => {
    res.send("What's up doc ?!");
});
let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/aircraft', function (req: any, res: any) {

    new AircraftRepository().fetch().then((aircrafts) => {
        console.log(aircrafts)
        return res.send(JSON.stringify(aircrafts));
    })
        .catch((error) => {
            console.error('Promise rejected with error: ' + error);
            return res.status(500).send();
        });


});

router.post('/aircraft', function (req: any, res: any) {
    console.log("post");
    let aircraft = req.body as Aircraft;
    console.log(aircraft);

    new AircraftRepository().insert(aircraft).then((result) => {
        res.send(JSON.stringify(aircraft));
    })
        .catch((error) => {
            console.error('Promise rejected with error: ' + error);
        });


});

router.put('/aircraft', function (req: any, res: any) {
    console.log("put");
    let aircraft = req.body as Aircraft;
    console.log(aircraft);

    new AircraftRepository().insert(aircraft).then((result) => {
        res.send(JSON.stringify(aircraft));
    })
        .catch((error) => {
            console.error('Promise rejected with error: ' + error);
        });


});

router.delete('/aircraft', function (req: any, res: any) {

    new AircraftRepository().delete('test').then((result) => {
        res.json('ok');
    })
        .catch((error) => {
            console.error('Promise rejected with error: ' + error);
        });


});

export default router
