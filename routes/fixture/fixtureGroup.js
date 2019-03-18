const express = require('express')
const controller = require('../../controllers/fixture/fixtureGroup')
const router = express.Router()


router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.ins)
router.patch('/', controller.upd)
router.delete('/:id', controller.del)

module.exports = router
