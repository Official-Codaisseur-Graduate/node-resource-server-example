const express = require('express')
const bodyParser = require('body-parser')
const { promisify } = require('util')
const { auth, strategies, requiredScopes } = require('express-oauth2-bearer')

const app = express()
app.use(bodyParser.json());

// process.env.ISSUER_BASE_URL = 'http://localhost:5000';
// process.env.ALLOWED_AUDIENCES = 'foo';

// Use authentication here
app.use(auth(strategies.openid({
    issuerBaseURL: 'http://localhost:5000',
    allowedAudiences: 'foo'
})));

// This is an example of an unprotected route
app.get('/unprotected', (req, res) => {
    console.log("REACHED UNPROTECTED ENDPOINT, NO AUTH REQUIRED")
    return res.status(200).send("done")
})

// This is an example of a protected route
// that requires the 'read:products' scope
app.get('/protected-products', requiredScopes('read:products'),
    (req, res) => {
        console.log("AUTHENTICATED ROUTE REACHED. USER DETAILS RETRIEVED: ", req.auth)
        console.dir(req.auth.claims);
        res.sendStatus(200); z
    });

const startServer = async () => {
    const port = process.env.SERVER_PORT || 3000
    await promisify(app.listen).bind(app)(port)
    console.log(`Listening on port ${port}`)
}

startServer()