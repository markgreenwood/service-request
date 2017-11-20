const Promise = require('bluebird');
const got = require('got');
const R = require('ramda');

function serviceRequest(requestConfig) {
  const name = R.propOr(null, 'serviceName', requestConfig);
  const version = R.propOr(null, 'version', requestConfig);
  let serviceUrl = 'badUrl';

  if (name === 'testService' && version === '1.0.0') { serviceUrl = 'http://test.service.com:4242' + requestConfig.endpoint }

  console.log(`serviceUrl: ${serviceUrl}\nrequestConfig: ${JSON.stringify(requestConfig, null, 2)}`);
  return got(serviceUrl, requestConfig);
}

module.exports = serviceRequest;

