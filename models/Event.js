import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Event = sequelize.define('Event', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    rsvp: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

export default Event;