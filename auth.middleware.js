const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')
const { authorityUrl } = require('./config')

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: false,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${authorityUrl}/jwks`,
    }),
    audience: 'foo',
    issuer: authorityUrl,
    algorithms: ['RS256'],
});


const readProducts = (req, res, next) => {
    const user = req.user;
    if (user['read:products'] === 'true') {
        return next()
    } else {
        return res.status(403).send('u dont have read access')
    }
}

const editProducts = (req, res, next) => {
    const user = req.user;
    if (user['edit:products'] === 'true') {
        return next()
    } else {
        return res.status(403).send('u dont have edit access')
    }
}

module.exports = { checkJwt, readProducts, editProducts };