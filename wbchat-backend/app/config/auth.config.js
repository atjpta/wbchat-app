module.exports = {
    secret: require('crypto').randomBytes(64).toString('hex')
  };