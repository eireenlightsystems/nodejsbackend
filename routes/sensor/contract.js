const express = require('express')
const controller = require('../../controllers/sensor/contract')
const router = express.Router()


router.get('/', controller.getAll)

module.exports = router
