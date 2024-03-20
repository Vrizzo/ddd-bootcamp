import {DataTypes, Sequelize} from "sequelize";

export enum CabinCell  {
    Seat="Seat",
    Aisle ="Aisle",
}

export type CabinRowLayout ={
    seatType: string
    aisleWidth: number
    extraSpace: number
    cabinCell: CabinCell[]
}

export type CabinLayout = {
    id: string
    version: number
    width: number
    length: number
    layout: CabinRowLayout[]
}


const sequelize = new Sequelize('postgresql://fleetops_user:S3cret@localhost:5432/fleet_management?schema=public') // Example for postgres

export const CabinLayoutSql = sequelize.define('CabinLayout', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    width: {
        type: DataTypes.DOUBLE
    },
    length: {
        type: DataTypes.DOUBLE
    },
    layout:{
        type: DataTypes.JSON
    }
}, {
    // Other model options go here
});
