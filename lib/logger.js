function _module(container) {
    var winston = container.winston,
        uutils = container.uutils,
        init = container.init;

    //Need to make sure everything is initialized
    //so files and directories are in the right place before
    //attemping to write the log file.
    init.exec();

    var logger = new winston.Logger({
        transports: [
            new winston.transports.File({
                filename: uutils.keyringLogFile()
            })
        ]
    });

    return logger;
}

module.exports = _module;