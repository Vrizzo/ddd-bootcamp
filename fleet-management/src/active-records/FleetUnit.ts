import {DataTypes, Sequelize} from "sequelize";

export type FleetUnit = {
    tailNumber: string
    version: number
    model: string
    manufacturingDate: string
    purchaseDate: string
    nextMaintenanceDate: string
    cabinLayoutId: string
}


const sequelize = new Sequelize('postgresql://fleetops_user:S3cret@localhost:5432/fleet_management?schema=public') // Example for postgres

export const FleetUnitSql = sequelize.define('FleetUnit', {
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
    tailNumber: {
        type: DataTypes.STRING
    },
    model: {
        type: DataTypes.STRING
    },
    manufacturingDate: {
        type: DataTypes.DATE
    },
    nextMaintenanceDate: {
        type: DataTypes.DATE
    },
    purchaseDate: {
        type: DataTypes.DATE
    },
    cabinLayoutId: {
        type: DataTypes.STRING
    },
}, {
    // Other model options go here
});
