function _module(keyring) {
    var fs = keyring.fs,
        uutils = keyring.uutils,
        json = keyring.json;

    function API() {
        this.db = {};
    }

    API.instance = function(){
        return new API();
    };

    API.prototype.load = function(ondone) {
        var self = this,
            readFileOptions = {
                encoding: 'utf-8'
            },
            db = false;
        if(typeof ondone === 'function') {
            fs.readFile(uutils.keyringDatabase(), readFileOptions, function(db){
                self.db = json.parse(db);
                ondone();
            });
        } else {
            db = fs.readFileSync(uutils.keyringDatabase(), readFileOptions);
            if(db) {
                this.db = json.parse(db);
            }
        }
    };

    API.prototype.save = function(ondone) {
        var writeFileOptions = {
            encoding: 'utf-8'
        };
        if(typeof ondone === 'function') {
            fs.writeFile(uutils.keyringDatabase(), json.stringify(this.db, null, 4), writeFileOptions, ondone);
        } else {
            fs.writeFileSync(uutils.keyringDatabase(), json.stringify(this.db, null, 4), writeFileOptions);
        }
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
        var path = key.split['.'];
        this._storeValueAtPath(path, value);
    };

    API.prototype.storeEncrypted = function(key, value){
        return this.store(key, value);
    };

    API.prototype.retrieve = function(key){
        var path = key.split['.'];
        return this._retrieveValueAtPath(path);
    };

    API.prototype.retrieveEncrypted = function(key){
        return this.retrieve(key);
    };

    return API;
}

module.exports = _module;