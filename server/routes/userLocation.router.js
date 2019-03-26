const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    const queryUserLocation = `SELECT * FROM "user_location"
                                JOIN "user" ON "user"."id" = "user_location"."user_ref_id";`

    const queryPark = 'SELECT * FROM "park" WHERE id=$1'
    
    pool.query(queryUserLocation)
        .then(userResults => {
            let userAroundParks = []

            console.log('===========================userResults.rows:',userResults.rows)

            console.log('=======req.params.id:', req.params.id);
            
            pool.query(queryPark, [req.params.id])
                .then(parkResults => {
                    //this is logic for calculating the distance between the users and the park that was clicked
                    console.log('parkResults is:', parkResults);
                    
                    userResults.rows.forEach(user => {
                        const userLocation = {
                            position: { lat: user.user_latitude, lng: user.user_longitude },
                        }
                        var R = 6371; // Radius of the earth in km
                        var dLat = deg2rad(userLocation.position.lat - parkResults.rows[0].latitude);  // deg2rad below
                        var dLon = deg2rad(userLocation.position.lng - parkResults.rows[0].longitudes);
                        var a =
                            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos(deg2rad(userLocation.position.lat)) * Math.cos(deg2rad(parkResults.rows[0].latitude)) *
                            Math.sin(dLon / 2) * Math.sin(dLon / 2)
                            ;
                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        var distance = R * c; // Distance in km
                        console.log('the distance is:', distance);
                        console.log('user.username is:', user.username);

                        function deg2rad(deg) {
                            return deg * (Math.PI / 180)
                        };

                        if (distance < 0.402336) {
                            userAroundParks.push(user.username)
                        };
                        console.log('userAroundParks is 1 :', userAroundParks);
                    });
                    res.send(userAroundParks)
                })//ends
                .catch(error => {
                    console.log('error for get park and user location 1:', error);
                })

            // console.log('userAroundParks is 2 :', userAroundParks);
            
            // res.send(userAroundParks)
        })
        .catch(error => {

            console.log('get user location error 2:', error);

            res.sendStatus(500);
        });
});

router.put('/', (req, res) => {
    console.log(req.body);

    const chechIfExists = `SELECT * FROM "user_location" WHERE "user_ref_id" = $1`

    const queryText = 'INSERT INTO "user_location" (user_latitude, user_longitude, user_ref_id) VALUES ($1, $2, $3);'
    const queryItem = [Number.parseFloat(req.body.lat), Number.parseFloat(req.body.lng), req.user.id]

    const updateQuery = `UPDATE "user_location" 
    SET "user_latitude"=$1,
    "user_longitude"=$2
    WHERE "user_ref_id"=$3`
    const updateQueryItems = [Number.parseFloat(req.body.lat), Number.parseFloat(req.body.lng), req.user.id]



    pool.query(chechIfExists, [req.user.id])
        .then(checkResults => {
            if(checkResults.rows.length == 0) {
                pool.query(queryText, queryItem)
                .then(() => {
                    res.sendStatus(201)
                }).catch((error) => {

                    console.log('INSERT user location item 1 error:', error);

                    res.sendStatus(500)
                })
            } else {
                pool.query(updateQuery, updateQueryItems)
                .then(() => {
                    res.sendStatus(201)
                }).catch((error) => {

                    console.log('INSERT user location item 2 error:', error);

                    res.sendStatus(500)
                })
            }
            // res.sendStatus(201)
        })
        .catch((error) => {

            console.log('INSERT user location item 3 error:', error);

            res.sendStatus(500)
        })

});

module.exports = router;
