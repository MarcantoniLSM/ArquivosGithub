const tasksModel = require('../models/tasksModel')
const getAll = async (req, res) => res.status(200).json( await tasksModel.getAll())

module.exports = {
    getAll
}