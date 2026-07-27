require('dotenv').config();

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());

let refreshToken = [];

app.post('/token', (request, response) => {
    const refreshToken = request.body.token;
    if (refreshToken == null) return response.sendStatus(401);
    if (!refreshToken.includes(refreshToken)) return response.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) return response.sendStatus(403);
        const accessToken = generateAccessToken({name: user.name});
        response.json({accessToken: accessToken});
    })
})

app.delete('/logout', (request, response) => {
    refreshToken = refreshToken.filter(token => token !== request.body.token);
    response.sendStatus(204);
})

app.post('/login', (request, response) => {
    //authenticate user
    const username = request.body.username;
    const user = {name: username}

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshToken.push(refreshToken);
    response.json({accessToken: accessToken, refreshToken: refreshToken });
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'});
}

app.listen(4000, () => {
    console.log("Listening on port 3000...");
})