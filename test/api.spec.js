var jutils = require('./utils/jasmineutils');
var TEST_ENV = require('./mocks/testenv');

var NON_EMPTY_DB = {foo: { bar: { key: '123456'}}};
var NON_EMPTY_DB_STRING = JSON.stringify(NON_EMPTY_DB, null, 4);

var API = require('../lib/api')(TEST_ENV);

describe('API', function(){
    beforeEach(function(){
        this.api = new API();
    });
    describe('load', function(){
        it('loads synchronously', function(){
            var api = this.api;

            TEST_ENV.fs.readFileSync.andReturn(NON_EMPTY_DB_STRING);
            api.load();
            expect(TEST_ENV.fs.readFileSync).toHaveBeenCalledWith('db.json', jasmine.any(Object));
            expect(api.db).toEqual(NON_EMPTY_DB);
        });

        it('loads synchronously a corrupted db', function(){
            var api = this.api;

            TEST_ENV.fs.readFileSync.andReturn('{');
            api.load();
            expect(TEST_ENV.fs.readFileSync).toHaveBeenCalledWith('db.json', jasmine.any(Object));
            expect(api.db).toEqual({});
        });

        it('loads asynchronously', function(){
            var api = this.api;

            var spy = jasmine.createSpy('ondone');
            var readFile = jutils.NiceSpy(TEST_ENV.fs.readFile);
            api.load(spy);
            expect(TEST_ENV.fs.readFile).toHaveBeenCalledWith('db.json', jasmine.any(Object), jasmine.any(Function));
            readFile.lastCall().thirdArg().call(null, NON_EMPTY_DB_STRING);
            expect(api.db).toEqual(NON_EMPTY_DB);
        });

        it('loads asynchronously a corrupted db', function(){
            var api = this.api;

            var spy = jasmine.createSpy('ondone');
            var readFile = jutils.NiceSpy(TEST_ENV.fs.readFile);
            api.load(spy);
            readFile.lastCall().thirdArg().call(null, '{');
            expect(api.db).toEqual({});
        });
    });
    describe('save', function(){
        beforeEach(function(){
            this.api = new API();
            this.api.db = NON_EMPTY_DB;
        });

        it('saves synchronously', function(){
            this.api.save();
            expect(TEST_ENV.fs.writeFileSync).toHaveBeenCalledWith('db.json', NON_EMPTY_DB_STRING, jasmine.any(Object));
        });

        it('saves asynchronously', function(){
            this.api.save(function(){});
            expect(TEST_ENV.fs.writeFile).toHaveBeenCalledWith('db.json', NON_EMPTY_DB_STRING, jasmine.any(Object), jasmine.any(Function));
        });
    });
});