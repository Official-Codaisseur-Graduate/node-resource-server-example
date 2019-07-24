const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const authServerUrl = 'http://172.16.31.64'

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: false,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${authServerUrl}:5000/jwks`,
    }),
    audience: 'foo',
    issuer: authServerUrl,
    algorithms: ['RS256'],
});

module.exports = checkJwt;