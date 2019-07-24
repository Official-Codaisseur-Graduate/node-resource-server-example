const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const authServerUrl = 'http://localhost:5000'

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: false,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `http://172.16.31.64:5000/jwks`,
    }),
    audience: 'foo',
    issuer: `${authServerUrl}`,
    algorithms: ['RS256'],
});


const readProducts = (req, res, next) => {
    const user = req.user;
    if(user['read:products'] === 'true') {
        return next()
    } else{
        return res.status(403).send('u dont have read access')
    }
}

module.exports = { checkJwt, readProducts };