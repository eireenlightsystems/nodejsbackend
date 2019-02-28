const express = require('express')
const controller = require('../../controllers/command/commandType')
const router = express.Router()

router.get('/', controller.getAll)

module.exports = router
