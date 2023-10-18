const router = require('express').Router()
const tasksController = require('./controllers/tasksController')
router.get('/tasks',tasksController.getAll)

module.exports = router