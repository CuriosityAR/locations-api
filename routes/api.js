'use strict'

const router     = require('express').Router()           
const mysql      = require('mysql')
const Geometrics = require('../libs/geometrics')
const env        = require('../env.json')

router.get('/get/locations', (req, res) => {
    let locations = []
    let con = mysql.createConnection(env)

    res.setHeader('Content-Type', 'application/json')

    con.connect(err => {
        if (err) return res.send({err: err})

        con.query(
            'SELECT * \
            FROM curiosity.location AS t1 \
            INNER JOIN curiosity.describe AS t2 \
            ON t1._id_describe = t2._id',
        (err, result) => {
            if (err) return res.send({err: err})

            for (let row of result) {
                if (Geometrics.distance(
                    parseFloat(req.query.lat), parseFloat(req.query.lon),
                    row.lat, row.lon
                ) <= parseFloat(req.query.radius)) {
                    locations = [...locations, row]
                }
            }
            
            return res.send({locations: locations})
        })
    })
})

router.post('/post/location', (req, res) => {
    let con = mysql.createConnection(env)

    con.connect(err => {
        if (err) return res.send(err)

        con.query(
            `INSERT INTO curiosity.describe (name) VALUES \
            ("${req.body.name}")`,
        (err, result) => {
            if (err) return res.send(err)

            // TODO : Insertion des coordonnées dans curiosity.location
        })
    })
})

module.exports = router