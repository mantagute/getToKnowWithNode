const Task = require('../models/Task')

const getAllTasks = async (request, response) => {
    try {
        const tasks = await Task.find({})
        response.status(200).json({tasks})
    } catch (error) {
        response.status(500).json({message: error});
    }
}

const createTask = async (request, response) => {
    try {
        const task = await Task.create(request.body);
        response.status(201).json({task});
    }
    catch(error){
        response.status(500).json({message: error});
    }
    
}

const getTask = async (request, response) => {
    try {
        const {id:taskID} = request.params;
        const task = await Task.findOne({_id:taskID})
        
        if (!task) {
            return response.status(404).json({message: `No task with id: ${taskID}`})
        }

        response.status(200).json({task})

    } catch (error) {
        response.status(500).json({message: error});
    }
    
}

const updateTask = async (request, response) => {
    try {
        const {id:taskID} = request.params;
        const task = await Task.findOneAndUpdate({_id: taskID}, request.body, {
            new: true, runValidators: true
        })

        if (!task) {
            return response.status(404).json({message: `No task with id: ${taskID}`})
        }

        response.status(200).json({task})
    } catch (error) {
        response.status(500).json({message: error});
    }
}

const deleteTask = async (request, response) => {
    try {
        const {id:taskID} = request.params;
        const task = await Task.findOneAndDelete({_id:taskID})

        if (!task) {
            return response.status(404).json({message: `No task with id: ${taskID}`})
        }

        response.status(200).json({task: null, status: 'success'})

    } catch (error) {
        response.status(500).json({message: error});
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}