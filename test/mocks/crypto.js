var cipher = {
    update: function(text){
        return 'encrypted:' + text;
    },
    final: function(){
        return '';
    }
};

var decipher = {
    update: function(encryptedText){
        return encryptedText.replace('encrypted:', '');
    },
    final: function(){
        return '';
    }
};

module.exports = {
    createCipher: jasmine.createSpy('createCipher').andReturn(cipher),
    createDecipher: jasmine.createSpy('createDecipher').andReturn(decipher)
};