const express = require('express')
const passport = require('passport')

const bodyParser = require('body-parser')

//Auth
const authRoutes = require('./routes/auth')

//Fixture
const fixtureRoutes = require('./routes/fixture/fixture')
const owner_fixtureRoutes = require('./routes/fixture/owner')
const fixtureTypeRoutes = require('./routes/fixture/fixtureType')
const substationRoutes = require('./routes/fixture/substation')
const contract_fixtureRoutes = require('./routes/fixture/contract')
const installer_fixtureRoutes = require('./routes/fixture/installer')
const heightTypeRoutes = require('./routes/fixture/heightType')

//Node
const nodeRoutes = require('./routes/node/node')
const nodeTypeRoutes = require('./routes/node/nodeType')
const owner_nodeRoutes = require('./routes/node/owner')
const contract_nodeRoutes = require('./routes/node/contract')

//Gateway
const gatewayRoutes = require('./routes/gateway/gateway')
const gatewayTypeRoutes = require('./routes/gateway/gatewayType')
const owner_gatewayRoutes = require('./routes/gateway/owner')
const contract_gatewayRoutes = require('./routes/gateway/contract')

//Geograph
const geographRoutes = require('./routes/geograph/geograph')

//Command
const command_switchRoutes = require('./routes/command/command_switch')
const commandTypeRoutes = require('./routes/command/commandType')
const command_statusRoutes = require('./routes/command/command_status')
const speedDirectionRoutes = require('./routes/command/speedDirection')

const keys = require('./config/keys')
const app = express()

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Auth
app.use('/api/auth', authRoutes)

//Fixture
app.use('/api/fixture', fixtureRoutes)
app.use('/api/owner_fixture', owner_fixtureRoutes)
app.use('/api/fixtureType', fixtureTypeRoutes)
app.use('/api/substation', substationRoutes)
app.use('/api/contract_fixture', contract_fixtureRoutes)
app.use('/api/installer_fixture', installer_fixtureRoutes)
app.use('/api/heightType', heightTypeRoutes)

//Node
app.use('/api/node', nodeRoutes)
app.use('/api/nodeType', nodeTypeRoutes)
app.use('/api/owner_node', owner_nodeRoutes)
app.use('/api/contract_node', contract_nodeRoutes)

//Gateway
app.use('/api/gateway', gatewayRoutes)
app.use('/api/gatewayType', gatewayTypeRoutes)
app.use('/api/owner_gateway', owner_gatewayRoutes)
app.use('/api/contract_gateway', contract_gatewayRoutes)

//Geograph
app.use('/api/geograph', geographRoutes)

//Command
app.use('/api/command_switch', command_switchRoutes)
app.use('/api/commandType', commandTypeRoutes)
app.use('/api/command_status', command_statusRoutes)
app.use('/api/speedDirection', speedDirectionRoutes)

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
