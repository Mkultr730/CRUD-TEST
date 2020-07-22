import { connection } from './config/database/mysql';
import express, {Express} from 'express';
const app: Express = express()

app.use(express.json());

app.set('port', process.env.PORT || 3000);

connection.connect((err) => {
    if(err) throw err;
    console.log('Connection established');
    // TODO EL CODIGO
    app.listen(app.get('port'), () => {
        console.log('Server on port', 3000);
    });
})
