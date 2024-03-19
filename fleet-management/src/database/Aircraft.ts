import {DataTypes, Sequelize} from "sequelize";

export type Aircraft = {
    model: string
    version: number
    manufacturer: string
    wingspan: number
    cabinWidth: number
    cabinHeight: number
    cabinLength: number
    cargoCapacity: number
    range: number
    cruiseSpeed: number
    engineType: string
    noiseLevel: string
}
const sequelize = new Sequelize('postgresql://fleetops_user:S3cret@localhost:5432/fleet_management?schema=public') // Example for postgres

export const AircraftSql = sequelize.define('Aircraft', {
    // Model attributes are defined here
    model: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    manufacturer: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    wingspan: {
        type: DataTypes.DOUBLE
        // allowNull defaults to true
    },
    cabinWidth: {
        type: DataTypes.DOUBLE
        // allowNull defaults to true
    },
    cabinHeight: {
        type: DataTypes.DOUBLE
        // allowNull defaults to true
    },
    cabinLength: {
        type: DataTypes.DOUBLE
        // allowNull defaults to true
    },
    cargoCapacity: {
        type: DataTypes.DOUBLE
        // allowNull defaults to true
    },
    range: {
        type: DataTypes.DOUBLE
        // allowNull defaults to true
    },
    cruiseSpeed: {
        type: DataTypes.DOUBLE
        // allowNull defaults to true
    },
    engineType: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    noiseLevel: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // Other model options go here
});
