const Promise = require('bluebird');
const got = require('got');
const R = require('ramda');

module.exports = (config) => (options) => {
  const name = R.propOr(null, 'serviceName', config);
  const version = R.propOr(null, 'version', config);
  let serviceUrl = 'badUrl';

  if (name === 'testService' && version === '1.0.0') { serviceUrl = 'http://test.service.com:4242/' + options.endpoint }

  return Promise.resolve(got(serviceUrl, options)).then((response) => { response.data = JSON.parse(response.body); return response; });
};

