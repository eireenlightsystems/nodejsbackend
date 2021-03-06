const express = require('express')
const controller = require('../../controllers/fixture/fixture')
const router = express.Router()


router.get('/', controller.getAll)
router.get('/get-fixture-in-group', controller.getFixtureInGroupAll)
router.get('/get-fixture-not-in-this-group', controller.getFixtureNotInThisGroup)
router.get('/:id', controller.getById)
router.post('/', controller.ins)
router.patch('/', controller.upd)
router.patch('/set_id_node', controller.set_id_node)
router.delete('/:id', controller.del)

module.exports = router
