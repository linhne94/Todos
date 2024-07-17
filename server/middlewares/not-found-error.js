const { NotFoundError } = require('../utils/api-error.js');
module.exports = async (req, res, next) => next(new NotFoundError());