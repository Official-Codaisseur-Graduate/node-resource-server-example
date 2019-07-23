const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

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

module.exports = checkJwt;