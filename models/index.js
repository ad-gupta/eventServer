import sequelize from "../config/database.js";
import Event from "./Event.js";

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");

        await sequelize.sync({alter: true});
        console.log("Tables have been synchronized successfully.");
    } catch (error) {
        console.log("Unable to connect to database", error.message)
    }
})();

export { Event, sequelize };