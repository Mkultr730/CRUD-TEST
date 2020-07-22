import { IEnvironment } from "../../interfaces/environment/environment.interface";
require("dotenv").config(); 

export const environment: IEnvironment = {
    databaseHost: process.env.databaseHost,
    databaseUser: process.env.databaseUser,
    databasePassword: process.env.databasePassword
}