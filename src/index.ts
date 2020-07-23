import { connection } from './config/database/mysql';
import { usersRouter } from './routes/usuarios'
import { areasRouter } from './routes/areas';

import express, {Express} from 'express';
const app: Express = express()

app.use(express.json());
app.set('port', process.env.PORT || 3000);

connection.connect((err) => {
    if(err) throw err;
    console.log('Connection established');
    // TODO EL CODIGO AQUI

    app.listen(app.get('port'), () => {
        console.log('Server on port', 3000);
    });
});

app.use('/users', usersRouter);
app.use('/areas', areasRouter);
