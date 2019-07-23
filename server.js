const express = require('express')
const bodyParser = require('body-parser')
const { promisify } = require('util')
const { auth, strategies, requiredScopes } = require('express-oauth2-bearer');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express()
app.use(bodyParser.json())

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: false,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `http://localhost:5000/jwks`,
    }),
    audience: 'foo',
    issuer: 'http://localhost:5000',
    algorithms: ['RS256'],
});

app.get('/test', (req, res) => {
    console.log("REACHED TEST")
    return res.status(200).send("done")
})

app.get('/auth', checkJwt, (req, res) => {
    console.log("REACHED AUTH: ", req.user)
    return res.status(200).send("done")
})

const startServer = async () => {
    const port = process.env.SERVER_PORT || 3000
    await promisify(app.listen).bind(app)(port)
    console.log(`Listening on port ${port}`)
}

startServer()