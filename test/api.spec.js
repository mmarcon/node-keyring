var jutils = require('./utils/jasmineutils');
var TEST_ENV = require('./mocks/testenv');

var NON_EMPTY_DB = {foo: { bar: { key: '123456', encryptedKey: 'encrypted:123456'}}};
var NON_EMPTY_DB_STRING = JSON.stringify(NON_EMPTY_DB, null, 4);

var API = require('../lib/api')(TEST_ENV);

describe('API', function(){
    beforeEach(function(){
        TEST_ENV.fs.readFileSync.andReturn(NON_EMPTY_DB_STRING);
        this.api = new API();
    });
    describe('load', function(){
        it('loads synchronously', function(){
            var api = this.api;

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
            this.api.load();
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
    describe('store', function(){
        beforeEach(function(){
            this.api = new API();
            this.api.load();
        });
        it('stores a value under a new path', function(){
            var api = this.api;
            api.store('a.b.c', 'monkey');
            expect(api.db.a.b.c).toEqual('monkey');
        });
        it('stores a value under an existing path', function(){
            var api = this.api;
            api.store('foo.bar.key2', 'monkey');
            expect(api.db.foo.bar.key2).toEqual('monkey');
            expect(api.db.foo.bar.key).toEqual('123456');
        });
    });
    describe('store encrypted', function(){
        beforeEach(function(){
            this.api = new API('somekey');
            this.api.load();
        });
        it('stores an encrypted value under a new path', function(){
            var api = this.api;
            api.storeEncrypted('a.b.c', 'monkey');
            expect(TEST_ENV.crypto.createCipher).toHaveBeenCalledWith(API.ALGORITHM, 'somekey');
            expect(api.db.a.b.c).toEqual('encrypted:monkey');
        });
        it('stores an encrypted value under an existing path', function(){
            var api = this.api;
            api.storeEncrypted('foo.bar.key2', 'monkey');
            expect(TEST_ENV.crypto.createCipher).toHaveBeenCalledWith(API.ALGORITHM, 'somekey');
            expect(api.db.foo.bar.key2).toEqual('encrypted:monkey');
            expect(api.db.foo.bar.key).toEqual('123456');
        });
    });
    describe('retrieve', function(){
        beforeEach(function(){
            this.api = new API();
            this.api.load();
        });
        it('retrieves a value under an existing path', function(){
            var api = this.api;
            expect(api.retrieve('foo.bar.key')).toEqual('123456');
        });
        it('attemps to retrieve a value under a non-existing path', function(){
            var api = this.api;
            expect(api.retrieve('a.b.c')).toBeNull();
        });
    });
    describe('retrieve encrypted', function(){
        beforeEach(function(){
            this.api = new API('somekey');
            this.api.load();
        });
        it('retrieves an encrypted value under an existing path', function(){
            var api = this.api;
            expect(api.retrieveEncrypted('foo.bar.encryptedKey')).toEqual('123456');
        });
        it('attemps to retrieve an encrypted value under a non-existing path', function(){
            var api = this.api;
            expect(api.retrieveEncrypted('a.b.c')).toBeNull();
        });
    });
});