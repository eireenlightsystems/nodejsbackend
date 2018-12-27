const express = require('express')
const passport = require('passport')

const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const fixtureRoutes = require('./routes/fixture')
const geographRoutes = require('./routes/geograph')

const keys = require('./config/keys')
const app = express()

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/fixture', fixtureRoutes)
app.use('/api/geograph', geographRoutes)

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('../light_client/dist/client'))
//
//     app.get('*', (req, res) => {
//         res.sendFile(
//             path.resolve(
//                 __dirname, 'light_client', 'dist', 'client', 'index.html'
//             )
//         )
//     })
// }

module.exports = app
