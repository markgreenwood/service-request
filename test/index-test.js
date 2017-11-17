const assert = require('assert');
const format = require('util').format;
const nock = require('nock');
const serviceRequest = require('../index');

describe('consul-client/bluebird', function() {
  const host = 'my.service.discovery.host.com';
  const hostUrl = 'http://' + host;
  const serviceName = 'testService';
  const endpoint = 'testEndpoint';
  const version = '1.0.0';
  const sampleBody = {beep: 'boop'};
  const requestConfig = {
    serviceName: 'testService',
    version: '1.0.0',
    endpoint: 'endpoint',
    method: 'GET'
  };

  // beforeEach(function () {
  //   serviceRequest = null;
  // });

  const address = 'test.service.com';
  const port = 4242;
  const serviceUrl = 'http://' + address + ':' + port;

  const healthUrl = format(
    '/v1/health/service/%s?passing',
    requestConfig.serviceName
  );

  // Health check call responds with one healthy service.
  nock(hostUrl)
    .get(healthUrl)
    .reply(200, [{Service: {Tags: ['1.0.0'], Address: address, Port: port}}]);

  it('makes a GET request to consul service if no proxy specified', () => {
    nock(serviceUrl)
      .get('/endpoint')
      .reply(200, { foo: 'bar' });

    return serviceRequest(requestConfig)
      .then(response => {
        console.log(`response: ${response}`);
        assert.deepEqual(response.body, { foo: 'bar' });
      });
  });

  const proxyUrl = 'http://proxytest.service.com:9000';

  it ('makes a GET request to the proxy service if proxy is specified', () => {
    nock(proxyUrl)
      .get('/endpoint')
      .reply(200, { fooproxy: 'barproxy' });

    return serviceRequest(requestConfig)
      .then(response => {
        console.log(`response: ${response}`);
        assert.deepEqual(response.body, { fooproxy: 'barproxy' });
      });
  });
});