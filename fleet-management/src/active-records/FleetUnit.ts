import {DataTypes, Sequelize} from "sequelize";

export type FleetUnit = {
    tailNumber: string
    version: number
    model: string
    manufacturingDate: string
    purchaseDate: string
    nextMaintenanceDate: string
    cabinLoyoutId: string
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
