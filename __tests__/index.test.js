const testSuiteUserUnit = require('./unit/user');
const testSuiteUserIntegration = require('./integration/user');
const testSuiteSessionIntegration = require('./integration/session');

describe('api test', () => {
    testSuiteSessionIntegration();
    testSuiteUserUnit();
    testSuiteUserIntegration();
 });