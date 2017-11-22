const assert = require('assert');
const format = require('util').format;
const nock = require('nock');
const serviceProviderBuilder = require('../index');

describe('serviceProvider', function() {
  const serviceName = 'testService';
  const endpoint = 'endpoint';
  const version = '1.0.0';
  const config = {
    serviceName,
    version
  };
  const options = {
    endpoint,
    method: 'GET'
  };

  const address = 'test.service.com';
  const port = 4242;
  const serviceUrl = 'http://' + address + ':' + port;

  // const healthUrl = format(
  //   '/v1/health/service/%s?passing',
  //   requestConfig.serviceName
  // );

  // Health check call responds with one healthy service.
  // nock(hostUrl)
  //   .get(healthUrl)
  //   .reply(200, [{Service: {Tags: ['1.0.0'], Address: address, Port: port}}]);

  const serviceProvider = serviceProviderBuilder(config);

  it('makes a GET request to the service if no proxy specified', () => {
    nock(serviceUrl)
      .get('/endpoint')
      .reply(200, { foo: 'bar' });

    return serviceProvider(options)
      .then(response => {
        assert.deepEqual(response.data, { foo: 'bar' });
      });
  });
});
