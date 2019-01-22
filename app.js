'use strict'

const app = require('express')()

const env = require('./env.json')

app.use((req, res, next) => {
    next()
})

app.use('/', require('./routes/api.js'))

app.listen(env.port, env.host)
