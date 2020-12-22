var restify = require('restify');
var bodyReader = require('restify-plugin-body-reader');

module.exports = function jsonParser (options) {
  return [
    function reader (req, res, next) {
      req._parseBody = true;

      if (req.method === 'HEAD') {
        req._parseBody = false;
        return next();
      }

      if (req.contentLength() === 0 && !req.isChunked()) {
        req._parseBody = false;
        return next();
      }

      if (req.contentType() === 'application/json') {
        // No need to read request body
        if (typeof req.body === 'string') {
          return next();
        } else {
          return bodyReader(options)(req, res, next);
        }
      } else {
        req._parseBody = false;
        return next();
      }
    },

    function parser (req, res, next) {
      if (req._parseBody) {
        try {
          req.body = JSON.parse(req.body);
        } catch (e) {
          return next(new restify.InvalidContentError('Invalid JSON: ' + e.message));
        }

        return next();
      } else {
        return next();
      }
    }
  ];
};