function _module(keyring){
    var path = keyring.path,
        constants = keyring.constants;

    function home(){
        return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    }

    function keyringHome() {
        return path.join(home(), constants.KEYRING_HOME);
    }

    function keyringDatabase() {
        return path.join(keyringHome(), constants.KEYRING_DB);
    }

    function keyringLogFile() {
        return path.join(keyringHome(), constants.KEYRING_LOGFILE);
    }

    return {
        home: home,
        keyringHome: keyringHome,
        keyringDatabase: keyringDatabase,
        keyringLogFile: keyringLogFile
    };
}

module.exports = _module;