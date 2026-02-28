const Task = require('../models/Task')

const getAllTasks = (request, response) => {
    response.send('Get All Tasks')
}

const createTask = async (request, response) => {
    const task = await Task.create(request.body);
    response.status(201).json({task});
}

const getTask = (request, response) => {
    response.json({id: request.params.id})
}

const updateTask = (request, response) => {
    response.send('Update Task')
}

const deleteTask = (request, response) => {
    response.send('Delete Task')
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}