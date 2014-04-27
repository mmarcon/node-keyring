var fs = require('./mocks/fs');

describe('api', function(){
    it('works', function(){
        expect(typeof fs.readFile).toBe('function');
    });
});