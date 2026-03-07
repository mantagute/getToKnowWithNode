const Task = require('../models/Task')

const asyncWrapper = require('../middleware/async');

const {createCustomError} = require('../errors/customErrors')

const getAllTasks = asyncWrapper( async (request, response) => {
    const tasks = await Task.find({});
    response.status(200).json({tasks});
})

const createTask = asyncWrapper(async (request, response) => {
    const task = await Task.create(request.body);
    response.status(201).json({task});
})

const getTask = asyncWrapper(async (request, response, next) => {
    const {id:taskID} = request.params;
    const task = await Task.findOne({_id:taskID})
    
    if (!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404));
    }

    response.status(200).json({task})
    
})

const updateTask = asyncWrapper( async (request, response) => {
    const {id:taskID} = request.params;
    const task = await Task.findOneAndUpdate({_id: taskID}, request.body, {
        new: true, runValidators: true
    })

    if (!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404));
    }

    response.status(200).json({task})
})

const deleteTask = asyncWrapper(async (request, response) => {
    const {id:taskID} = request.params;
    const task = await Task.findOneAndDelete({_id:taskID})

    if (!task) {
        return next(createCustomError(`No task with id: ${taskID}`, 404));
    }

    response.status(200).json({task: null, status: 'success'})

})


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}