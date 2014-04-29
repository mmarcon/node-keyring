var jutils = require('./utils/jasmineutils');
var TEST_ENV = require('./mocks/testenv');

var NON_EMPTY_DB = {
    foo: {
        bar: {
            key: '123456'
        }
    }
};

var API = require('../lib/api')(TEST_ENV);

describe('API', function(){
    var api;
    beforeEach(function(){
        api = new API();
    });
    it('loads synchronously', function(){
        TEST_ENV.fs.readFileSync.andReturn(JSON.stringify(NON_EMPTY_DB));
        api.load();
        expect(TEST_ENV.fs.readFileSync).toHaveBeenCalledWith('db.json', jasmine.any(Object));
        expect(api.db).toEqual(NON_EMPTY_DB);
    });

    it('loads synchronously a corrupted db', function(){
        TEST_ENV.fs.readFileSync.andReturn('{');
        api.load();
        expect(TEST_ENV.fs.readFileSync).toHaveBeenCalledWith('db.json', jasmine.any(Object));
        expect(api.db).toEqual({});
    });

    it('loads asynchronously', function(){
        var spy = jasmine.createSpy('ondone');
        var readFile = jutils.NiceSpy(TEST_ENV.fs.readFile);
        api.load(spy);
        expect(TEST_ENV.fs.readFile).toHaveBeenCalledWith('db.json', jasmine.any(Object), jasmine.any(Function));
        readFile.lastCall().thirdArg().call(null, JSON.stringify(NON_EMPTY_DB));
        expect(api.db).toEqual(NON_EMPTY_DB);
    });
});