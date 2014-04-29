var TEST_ENV = {
    fs: require('./fs'),
    uutils: {
        keyringDatabase: jasmine.createSpy('keyringDatabase').andReturn('db.json')
    },
    json: require('../../lib/json')
};

module.exports = TEST_ENV;