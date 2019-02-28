const express = require('express')
const controller = require('../../controllers/command/command_switch')
const router = express.Router()

router.get('/', controller.getAll)

module.exports = router
