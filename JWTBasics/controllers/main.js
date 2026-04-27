//TODO: ceheck username, password in post(login) request
// if exist, create new JWT
// send back to front-end 

// setup authentication so only the request with JWT can access the dashboard.

const login = async (request, response) => {
    response.send("Fake Login/Register/Signup");
}

const dashboard = async (request, response) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    response.status(200).json({message: `Hello, John Doe`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`});
}

module.exports =  {
    login, dashboard
};
