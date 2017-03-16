const params = {
  development: {
    PORT: process.env.PORT || 3000
  },
  production: {
    PORT: process.env.PORT || 80
  }
};

module.exports = (env) => params[env];