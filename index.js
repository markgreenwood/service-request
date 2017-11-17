const Promise = require('bluebird');
const got = require('got');
const R = require('ramda');

function serviceRequest(requestConfig) {
  const name = R.propOr(null, 'serviceName', requestConfig);
  const version = R.propOr(null, 'version', requestConfig);
  let serviceUrl = 'badUrl';

  if (name === 'testService' && version === '1.0.0') { serviceUrl = 'test.service.com:4242' }

  console.log(`serviceUrl: ${serviceUrl}`);
  return got(serviceUrl, requestConfig);
}

module.exports = requestConfig => Promise.resolve(serviceRequest(requestConfig));

