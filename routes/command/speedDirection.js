const express = require('express')
const controller = require('../../controllers/command/speedDirection')
const router = express.Router()

router.get('/', controller.getAll)

module.exports = router
