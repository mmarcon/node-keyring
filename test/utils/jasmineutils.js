function NiceSpy(spy) {
    this._spy = spy;
}

NiceSpy.prototype.nthCall = function(n) {
    return new Call(this._spy.calls[n]);
};

NiceSpy.prototype.lastCall = function() {
    var numberOfCalls = this._spy.calls.length;
    return this.nthCall(numberOfCalls - 1);
};

function Call(call) {
    this._call = call;
}

Call.prototype.nthArg = function(n) {
    return this._call.args[n];
};

Call.prototype.firstArg = function() {
    return this.nthArg(0);
};

Call.prototype.secondArg = function() {
    return this.nthArg(1);
};

Call.prototype.thirdArg = function() {
    return this.nthArg(2);
};

module.exports = {
    NiceSpy: function(spy) {
        return new NiceSpy(spy);
    },
    Call: function(call) {
        return new Call(call);
    }
};