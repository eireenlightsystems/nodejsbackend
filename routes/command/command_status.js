const express = require('express')
const controller = require('../../controllers/command/command_status')
const router = express.Router()

router.get('/', controller.getAll)

module.exports = router
