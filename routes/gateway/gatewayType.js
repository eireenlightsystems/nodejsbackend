const express = require('express')
const controller = require('../../controllers/gateway/gatewayType')
const router = express.Router()


router.get('/', controller.getAll)

module.exports = router
