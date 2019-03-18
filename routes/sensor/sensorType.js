const express = require('express')
const controller = require('../../controllers/sensor/sensorType')
const router = express.Router()


router.get('/', controller.getAll)

module.exports = router
