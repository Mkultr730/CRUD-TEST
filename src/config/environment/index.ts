import { IEnvironment } from "../../interfaces/environment/environment.interface";
require("dotenv").config(); 

export const environment: IEnvironment = {
    databaseHost: process.env.databaseHost,
    databaseUser: process.env.databaseUser,
    databaseName: process.env.databaseName,
    databasePassword: process.env.databasePassword,
}