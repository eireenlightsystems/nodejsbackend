const express = require('express')
const controller = require('../../controllers/node/node')
const router = express.Router()


router.get('/', controller.getAll)
router.get('/:id', controller.getById)
router.post('/', controller.ins)
router.patch('/', controller.upd)
router.patch('/set_coords', controller.set_coords)
router.delete('/:id', controller.del)

module.exports = router
