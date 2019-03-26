const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {acceptAdmin} = require('../modules/adminAuthorization');

router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM "park";'
    pool.query(queryText)
        .then(results => {
            
            res.send(results.rows)
        })
        .catch(error => {

            console.log('SELECT park error:', error);

            res.sendStatus(500);
        });
});

router.post('/', acceptAdmin, (req, res) => {
    console.log(req.body);
    
    const queryText = 'INSERT INTO "park" (latitude, longitudes, park_name, info_window, img_url) VALUES ($1, $2, $3, $4, $5);'

    const queryItem = [Number.parseFloat(req.body.position.latitude), Number.parseFloat(req.body.position.longitudes),req.body.park_name, req.body.info_window, req.body.img_url]

    pool.query(queryText, queryItem)
        .then(() => {

            res.sendStatus(201)
        })
        .catch((error) => {

            console.log('INSERT park error:', error);

            res.sendStatus(500)
        })

});

router.delete('/:id', acceptAdmin, (req, res) => {
    const queryText = 'DELETE FROM "park" WHERE id=$1';

    pool.query(queryText, [req.params.id])
        .then(() => {

            res.sendStatus(200)
        })
        .catch((error) => {

            console.log('DELETE park error: ', error);

            res.sendStatus(500);
        });
});

module.exports = router;