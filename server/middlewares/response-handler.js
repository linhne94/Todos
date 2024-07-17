/**
 * Generic success response handler
 *
 * @param {*} body - response that needs to be returned as part of API result
 */
module.exports = body => ({
  success: true,
  body,
});