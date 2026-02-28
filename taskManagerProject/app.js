express = require('express');
app = express();

const tasks = require('./routes/tasks')

const connectDB = require('./db/connect');

require('dotenv').config()

//middleware
app.use(express.json());

//routes
app.get('/hello', (request, response) => {
    response.send('Task Manager App');
})

app.use('/api/v1/tasks', tasks);

const port = 8000

const start = async () => {
    try {
        await connectDB(process.env.TASK_MANAGER_MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
    }
    catch (error) {
        console.log(error)
    }
}

start();