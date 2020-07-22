import { createConnection } from 'mysql';
import { environment } from '../environment/index';

export const connection = createConnection({
    host: environment.databaseHost,
    user: environment.databaseUser,
    password: environment.databasePassword
});

