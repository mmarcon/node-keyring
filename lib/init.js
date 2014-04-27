function _module(keyring){
    var uutils = keyring.uutils,
        fs = keyring.fs,
        constants = keyring.constants;


    function init(){
        //1- create keyring home folder
        if(!fs.existsSync(uutils.keyringHome())) {
            fs.mkdirSync(uutils.keyringHome());
        }
        //2- create database
        if(!fs.existsSync(uutils.keyringDatabase())) {
            fs.writeFileSync(uutils.keyringDatabase(), JSON.stringify(constants.EMPTY_DB, null, 4));
        }
    }

    return {
        exec: init
    };
}

module.exports = _module;