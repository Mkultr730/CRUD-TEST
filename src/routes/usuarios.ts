import express, {Express} from 'express';

import { connection } from '../config/database/mysql';
const router = express.Router();    

router.get('/', (req, res) => {
    connection.query('SELECT * FROM users', (err, rows, fields) => {
        if(err) throw err;
        console.dir(rows);
        res.json(rows)
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM users WHERE id = ?', [id], (err, rows, fields) => {
        if (err) throw err;
        // console.log(rows);
        res.json(rows);
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM users WHERE id = ?', [id], (err, rows, fields) => {
        if (err) throw err;
        res.send('Deleted successfully');
    });
});


export const usersRouter = router;