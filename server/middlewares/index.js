const notFoundHandler = require('./not-found-error.js');
const badJsonHandler = require('./validate-json.js');
const errorHandler = require('./error-handler.js');

module.exports = {
  notFoundHandler,
  errorHandler,
  badJsonHandler
};