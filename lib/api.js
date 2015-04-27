function _module(keyring) {
    var fs = keyring.fs,
        crypto = keyring.crypto,
        uutils = keyring.uutils,
        json = keyring.json;

    function API(encryptionKey, keyringDatabase) {
        this.db = {};
        this.encryptionKey = encryptionKey;
        this.keyringDatabase = keyringDatabase || uutils.keyringDatabase();
    }

    API.ALGORITHM = 'aes256';

    API.instance = function(encryptionKey, keyringDatabase){
        return new API(encryptionKey, keyringDatabase);
    };

    API.prototype.load = function(ondone) {
        var self = this,
            readFileOptions = {
                encoding: 'utf-8'
            },
            db = false;
        if(typeof ondone === 'function') {
            fs.readFile(self.keyringDatabase, readFileOptions, function(db){
                self.db = json.parse(db);
                ondone();
            });
        } else {
            db = fs.readFileSync(self.keyringDatabase, readFileOptions);
            if(db) {
                this.db = json.parse(db);
            }
        }
        return this;
    };

    API.prototype.save = function(ondone) {
        var self = this,
            writeFileOptions = {
                encoding: 'utf-8'
            };
        if(typeof ondone === 'function') {
            fs.writeFile(self.keyringDatabase, json.stringify(this.db, null, 4), writeFileOptions, ondone);
        } else {
            fs.writeFileSync(self.keyringDatabase, json.stringify(this.db, null, 4), writeFileOptions);
        }
        return this;
    };

    API.prototype._storeValueAtPath = function(path, value) {
        var currentObject = this.db, l = path.length, i, pathSegment;
        for(i = 0; i < l - 1; i++) {
            pathSegment = path[i];
            if(typeof currentObject[pathSegment] === 'undefined') {
                currentObject[pathSegment] = {};
            }
            currentObject = currentObject[pathSegment];
        }
        pathSegment = path[l - 1];
        currentObject[pathSegment] = value;
    };

    API.prototype._retrieveValueAtPath = function(path) {
        var i = 0, l = path.length, p = this.db;
        while(i < l) {
            p = p[path[i]];
            if(!p) {
                return null;
            }
            i++;
        }
        return p;
    };

    API.prototype.store = function(key, value){
        var path = key.split('.');
        this._storeValueAtPath(path, value);
        return this;
    };

    API.prototype.storeEncrypted = function(key, value){
        var cipher = crypto.createCipher(API.ALGORITHM, this.encryptionKey);
        value = cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
        return this.store(key, value);
    };

    API.prototype.retrieve = function(key){
        var path = key.split('.');
        return this._retrieveValueAtPath(path);
    };

    API.prototype.retrieveEncrypted = function(key){
        var decipher = crypto.createDecipher(API.ALGORITHM, this.encryptionKey),
            encryptedValue = this.retrieve(key);
        if(!encryptedValue) {
            return encryptedValue;
        }
        return decipher.update(encryptedValue, 'hex', 'utf8') + decipher.final('utf8');
    };

    return API;
}

module.exports = _module;