module.exports = function() {
    var Bluebird = require('bluebird');

    Bluebird.config({warnings: true});

    var doSomething = function(res) {
        console.log(res);
    };

    var p1 = Bluebird.resolve('fulfilled value');

    // only a function should be passed into 'then'
    p1.then(doSomething('another value'));
    p1.then(doSomething);

    // a promise should not be reject with a non-error    
    var p2 = new Bluebird(function(resolve, reject) {
        reject('not an error');
    });

    p2.catch(function(err) {
        // error api expected
        console.log(err.message);
        console.log(err.stack);
    });

    // 
    p1.then(function(res) {
        // next 'then' does not wait for this
        Bluebird.delay(1000).then(function() {
            console.log('missing return');
        });
    }).then(function(res) {
        // no value/promise returned from previous 'then' (undefined)
        console.log(res);
    })
};
