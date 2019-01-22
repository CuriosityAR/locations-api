'use strict'

const app = require('express')()

app.use((req, res, next) => {
    console.log('new connection')

    next()
})

app.use('/', require('./routes/api.js'))

app.listen(8080, '0.0.0.0')