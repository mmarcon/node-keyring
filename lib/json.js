module.exports = {
    parse: function(){
        try {
            return JSON.parse.apply(null, arguments);
        } catch(e) {
            return {};
        }
    },
    stringify: function(){
        return JSON.stringify.apply(null, arguments);
    }
};