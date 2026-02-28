const express = require('express');
const app = express();
let {people} = require('./data')

// static assets

app.use(express.static('./methods-public'))

app.use(express.urlencoded({extended: false}))

app.use(express.json());

app.get('/api/people', (request, response) => {
    response.status(200).json({success:true, data: people})
})

app.post('/api/people', (request, response) => {

    const {name} = request.body;

    if (!name) {
        return response.status(400).json({success: false, msg: 'Please provide name value'})
    }

    response.status(200).json({success: true, person: name})

})

app.post('/api/postman/people', (request, response) => {
    const {name} = request.body

    if (!name) {
        return response.status(400).json({success: false, msg: 'Please provide name value'})
    }

    response.status(201).json({success: true, data: [...people, name]})

})

app.post('/login', (request, response) =>{
    const {name} = request.body;

    if (name) {
        return response.status(200).send(`Welcome, ${name}`)
    }

    response.status(401).send('Please Provide Credentials')

})

app.put('/api/people/:id', (request, response) => {
    const {id} = request.params;
    const {name} = request.body;

    const person = people.find((person) => person.id === Number(id))

    if (!person) {
        return response.status(404).json({success: false, msg: `No person with id ${id} found.`})
    }

    const newPeople = people.map((person) => {
        if (person.id === Number(id)) {
            person.name = name
        }

        return person
    })

    response.status(200).json({success: true, data: newPeople})
})

app.delete('/api/people/:id', (request, response) => {
    const person = people.find((person) => person.id === Number(request.params.id))

    if (!person) {
        return response.status(404).json({success: false, msg: `No person with id ${request.params.id} found.`})
    }

    const newPeople = people.filter((person) => person.id !== Number(request.params.id))

    return response.status(200).json({success: true, data: newPeople})
})

app.listen(8000, () => {
    console.log(`Server is listen on port 8000...`)
})