import express from 'express';

import { connection } from '../config/database/mysql';
const router = express.Router();    

router.get('/', (req, res) => {
    connection.query('SELECT * FROM area', (err, rows, fields) => {
        if(err) throw err;
        res.json(rows)
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM area WHERE id = ?', [id], (err, rows, fields) => {
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
    connection.query('DELETE FROM area WHERE id = ?', [id], (err, rows, fields) => {
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

    let update: string = '';
    const arrData: any[] = [];

    for (const key of Object.keys(req.body)) {
        if(req.body[`${key}`]){
            update += `${key}=?,`;
            arrData.push(req.body[`${key}`]);
        }
    }
    
    update = update.substr(0, update.length-1);

    const sql = `
        UPDATE area 
        SET ${update}
        WHERE ID = ${id}
    `;
    connection.query(sql, arrData, 
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
    const { name, ID, leader_ID } = req.body;
    const sql = `
        INSERT INTO area 
            VALUES (?, ?, ?, ?)  
    `;
    connection.query(sql, [ID, name, leader_ID, 0], 
        (err, rows, fields) => {
            if(err) {
                if (err.errno === 1062) {
                    res.send('Area already exists')
                }
            } 
            res.send(rows);
    });
});


export const areasRouter = router;