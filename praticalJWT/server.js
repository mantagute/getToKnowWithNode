require('dotenv').config();

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());

const posts = [
    {
        username: "Joao Gabriel",
        title: "Post 1"
    },
    {
        username: "Ana julia",
        title: "Post 2"
    }
]

app.get('/posts', (request, response) => {
    response.json(posts.filter(post => post.username === request.user.name));
})

app.post('/login', (request, response) => {
    //authenticate user
    const username = request.body.username;
    const user = {name: username}

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    response.json({accessToken: accessToken });
})

function authenticateToken(request, response, next) {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return response.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return response.sendStatus(403);
        request.user = user;
        next();
    })
}

app.listen(3000, () => {
    console.log("Listening on port 3000...");
})