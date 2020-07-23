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
        if (err) {
            res.send(err);
        } else if(rows.length === 0){
            res.send('Invalid id')
        } else {
            res.json(rows);
        }
    });
});

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM users WHERE id = ?', [id], (err, rows, fields) => {
        if (err) {
            res.send(err);
        } else if(rows.affectedRows < 1) {
            res.send('Invalid ID');
        } else {
            res.send('Deleted successfully');
        }
    });
});

router.patch('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, lastname, birthdate, email, area_ID, salary, state } = req.body;
    const sql = `
        UPDATE users 
        SET name=?, lastname=?, birthdate=?, email=?, area_ID=?, salary=?, state=?
        WHERE ID = ${id}
    `;
    connection.query(sql, [name, lastname, birthdate, email, area_ID, salary, state], 
        (err, rows, fields) => {
            if (err) {
                res.send(err);
            } else if(rows.affectedRows < 1) {
                res.send('Invalid ID');
            } else {
                res.json(rows);
            }  
    })
});


router.post('/create', (req, res) => {
    const { name, lastname, birthdate, email, ID, area_ID, salary } = req.body;
    const sql = `
        INSERT INTO users 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)  
    `;
    connection.query(sql, [name, lastname, birthdate, email, ID, area_ID, salary, 0], (err, rows, fields) => {
        if(err) {
            if (err.errno === 1062) {
                res.send('User already exists')
            }
        } 
        res.send(rows);
    });
});


export const usersRouter = router;