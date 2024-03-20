import {Router} from 'express';
import {CabinCell, CabinLayout, CabinLayoutSql, CabinRowLayout} from "../active-records/CabinLayout";
import {SeatTypeSql} from "../active-records/SeatType";

export const defaultRoute = Router();

defaultRoute.get('/', (req, res) => {
    res.send("What's up doc ?!");
});
let express = require('express');
let router = express.Router();

router.post('/cabin-layout', async function (req: any, res: any) {
    async function validate(cabinLayoutToValidate: CabinLayout) {
        async function validateMaxWidthCabinRow(cabinRow: CabinRowLayout) {
            let persistedSeatType = await SeatTypeSql.findOne({
                where: {
                    id: cabinRow.seatType
                }
            });
            let actualWidth = 0;
            for (const cabinCell of cabinRow.cabinCell) {
                if (cabinCell == CabinCell.Aisle)
                    actualWidth = actualWidth + cabinRow.aisleWidth;
                else if (cabinCell === CabinCell.Seat)
                    actualWidth = actualWidth + persistedSeatType?.getDataValue("width");
            }

            if (actualWidth > cabinLayoutToValidate.width)
                throw new Error(`CabinRow width exceeded [${cabinLayoutToValidate.width}] actual width=${actualWidth}`);
        }

        async function validateExtraSpace(cabinRow: CabinRowLayout) {
            if (cabinRow.extraSpace<0 || cabinRow.extraSpace>100)
                throw new Error(`extraSpace exceeded: has to be from 0 to 100 but actually is [${cabinRow.extraSpace}]`) ;
        }

        for (const cabinRow of cabinLayoutToValidate.layout) {
            await validateMaxWidthCabinRow(cabinRow);
            await validateExtraSpace(cabinRow);
        }
    }

    try {
        let cabinLayoutToValidate = req.body as CabinLayout;
        await validate(cabinLayoutToValidate);
        let cabinLayout = CabinLayoutSql.build(cabinLayoutToValidate);
        console.log(cabinLayout);
        cabinLayout.set({
            version: "1"
        });

        await cabinLayout.save();
        return res.send(JSON.stringify(cabinLayout));
    } catch (e) {
        console.error(e)
        return res.status(400).send();
    }
});


export default router
