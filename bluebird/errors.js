module.exports = function() {
    var Promise = require('bluebird');

    var catching = function(fun, msg) {
        try {
            fun();
        } catch(err) {
            console.error(msg, err);
        }
    };

    catching(function() {
        Promise.promisify(require('fs'));
    }, 'Promise.promisify must be called on a function');
    // for objs, use Promise.promisifyAll instead

    catching(function() {
        new Promise();
    }, 'Promise constructor must be called with a resolver function arg');

    catching(function() {
        var p = Promise.delay(1000);
        p.value();
    }, 'cannot call p.value() on a non-fulfilled promise');

    catching(function() {
        Promise.promisifyAll('nope');
    }, 'Promise.promisifyAll must be called on an obj or function');
    
    catching(function() {
        var api = {
            foo: function() {},
            fooAsync: function() {}
        };
        Promise.promisifyAll(api);
    }, 'Promise.promisifyAll cannot be called on an api which already has "Async" method suffixes');
    // customize suffixes or use Promise.promisify on individual props

    catching(function() {
    }, '');

    catching(function() {
        var p = Promise.delay(100).then(function() { return p; });
    }, 'a promise cannot resolve or reject with itself');

};
