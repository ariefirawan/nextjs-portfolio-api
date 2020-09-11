const jwt = require('express-jwt');
const JwksRsa = require('jwks-rsa');

exports.checkJwt = jwt({
  secret: JwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: 'https://dev-lcx4l9h3.au.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://dev-lcx4l9h3.au.auth0.com/api/v2/',
  issuer: 'https://dev-lcx4l9h3.au.auth0.com/',
  algorithms: ['RS256'],
});
