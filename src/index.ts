import { connection } from './config/database/mysql';
import { usersRouter } from './routes/usuarios'
import { areasRouter } from './routes/areas';

import express, {Express} from 'express';
import cors from 'cors';
const app: Express = express()

app.use(cors());

app.use(express.json());
app.set('port', process.env.PORT || 8100);

connection.connect((err) => {
    if(err) throw err;
    console.log('Connection established');

    app.listen(app.get('port'), () => {
        console.log('Server on port', app.get('port'));
    });
});

app.use('/users', usersRouter);
app.use('/areas', areasRouter);
