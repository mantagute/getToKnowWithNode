const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    {
        id: 1,
        name: 'course1'
    },
    {
        id: 2, 
        name: 'course2'
    },
    {
        id: 3, 
        name: 'course3'
    }
]

app.get('/', (request, response) => {
    response.send('Hello, World!!')
});

app.get('/api/courses', (request, response) => {
    response.send(courses);
});

app.get('/api/courses/:id', (request, response) => {
    const course = courses.find(course => course.id === parseInt(request.params.id));
    if (!course) {
        response.status(404).send('The course with the given ID was not found');
    }
    response.send(course);
});

app.post('/api/courses', (request, response) => {

    const schema = {
        name: Joi.string().min(2).required()
    }
    
    const result = Joi.validate(request.body, schema);

    if (result.error) {
        response.status(400).send(result.error.detail[0].message);
        return;
    }
    
    const course =  {
        id: courses.length + 1,
        name: request.body.name
    };

    courses.push(course);
    response.send(course);
});

// PORT 
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running port: ${port}...`);
})



