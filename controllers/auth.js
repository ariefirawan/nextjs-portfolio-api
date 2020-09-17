const jwt = require('express-jwt');
const JwksRsa = require('jwks-rsa');
const config = require('../config/db');

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

exports.checkRole = (role) => (req, res, next) => {
  const user = req.user;

  if (user && user[config.AUTH0_NAMESPACE + '/roles'].includes(role)) {
    next();
  } else {
    return res
      .status(401)
      .send('You are not have authorization to access this resource');
  }
};

exports.getAccessToken = () => {
  const options = {
    mathod: 'POST',
    url: config.AUTH0_TOKEN_URL,
    headers: { 'content-type': 'application/json' },
    form: {
      grant_type: 'client_credentials',
      client_id: config.AUTH0_CLIENTID,
      client_secret: config.AUTH0_CLIENT_SECRET,
      audience_type: config.AUTH0_AUDIENCE,
    },
  };
};
