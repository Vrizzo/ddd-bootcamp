import {DataTypes, Sequelize} from "sequelize";

export type SeatType = {
    id: string
    version: number;
    type: string
    width: number
    height: number
    pitch: number
    weight: number
    productionDate: number
    comfortLevel: number
    features: string[]
}


const sequelize = new Sequelize('postgresql://fleetops_user:S3cret@localhost:5432/fleet_management?schema=public') // Example for postgres

export const SeatTypeSql = sequelize.define('SeatType', {
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
    type: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    width: {
        type: DataTypes.DOUBLE
        // allowNull defaults to true
    },
    height: {
        type: DataTypes.DOUBLE
        // allowNull defaults to true
    },
    pitch: {
        type: DataTypes.DOUBLE
        // allowNull defaults to true
    },
    weight: {
        type: DataTypes.DOUBLE,
        get() {
            const rawValue = this.getDataValue('weight');
        }
        // allowNull defaults to true
    },
    productionDate: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    comfortLevel: {
        type: DataTypes.DOUBLE
        // allowNull defaults to true
    },
    features: {
        type: DataTypes.STRING
        // allowNull defaults to true
    }
}, {
    // Other model options go here
});