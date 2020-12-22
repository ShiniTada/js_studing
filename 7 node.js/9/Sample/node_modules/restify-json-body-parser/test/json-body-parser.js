var must = require('must');
var demand = must;
var request = require('supertest');
var restify = require('restify');
var jsonParser = require('../index');

describe('Restify JSON body parser middleware', function () {
  var server = null;

  before(function (done) {
    server = restify.createServer();

    server.pre(restify.pre.pause());
    server.use(jsonParser());

    server.post('/json', function (req, res, next) {
      if (typeof req.body === 'undefined') {
        res.send(400);
      } else {
        res.json(req.body); // Echo
      }
    });

    server.listen(65001, done);
  });

  it('should parse body content', function (done) {
    var body = { data: 'Hello world!' };

    request('http://localhost:65001')
      .post('/json')
      .accept('json')
      .send(body)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }

        demand(res.body).be.object();
        demand(res.body).be.eql(body);
        done();
      });
  });

  it('should throw an error if content is invalid', function (done) {
    request('http://localhost:65001')
      .post('/json')
      .accept('json')
      .send('')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function (err, res) {
        demand(err).be.object();
        done();
      });
  });
});