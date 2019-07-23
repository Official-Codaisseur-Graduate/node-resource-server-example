const express = require('express')
const bodyParser = require('body-parser')
const { promisify } = require('util')
const authCheck = require('./auth.middleware');

const app = express()
app.use(bodyParser.json())

// This is an example of an unprotected route
app.get('/unprotected', (req, res) => {
    console.log("REACHED UNPROTECTED ENDPOINT, NO AUTH REQUIRED")
    return res.status(200).send("done")
})

// This is another example of a protected route
// NOTE: Middleware also adds the user properties in the request.
app.get('/protected', authCheck, (req, res) => {
    console.log("AUTHENTICATED ROUTE REACHED. USER DETAILS RETRIEVED: ", req.user)
    return res.status(200).send("done")
})

// The default behavior is to throw an error when the token is invalid, 
// so you can add your custom logic to manage unauthorized access as follows:
// NOTE: this needs to be added after assigning the routes
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token...');
    }
});

const startServer = async () => {
    const port = process.env.SERVER_PORT || 3000
    await promisify(app.listen).bind(app)(port)
    console.log(`Listening on port ${port}`)
}

startServer()