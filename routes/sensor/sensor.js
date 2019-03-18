const express = require('express')
const controller = require('../../controllers/sensor/sensor')
const router = express.Router()


router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.ins)
router.patch('/', controller.upd)
router.patch('/set_id_node', controller.set_id_node)
router.delete('/:id', controller.del)

module.exports = router
