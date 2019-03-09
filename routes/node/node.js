const express = require('express')
const controller = require('../../controllers/node/node')
const router = express.Router()


router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.ins)
router.post('/ins_gateway_node', controller.ins_gateway_node)
router.patch('/', controller.upd)
router.patch('/set_coords', controller.set_coords)
router.delete('/:id', controller.del)
router.patch('/del_gateway_node', controller.del_gateway_node)

module.exports = router
