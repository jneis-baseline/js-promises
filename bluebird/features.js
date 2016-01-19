module.exports = function() {
    var Promise = require('bluebird');

    var fs = require('fs');

    fs.readFile('package.json', 'utf8', function(err, data) {
        console.log('[UNPROMISED] reading files:', data);
    });

    fs.readFile('not-existent', 'utf8', function(err, data) {
        console.log('[UNPROMISED] error reading file:', err.message);
    });

    Promise.promisifyAll(fs);

    fs.readFileAsync('package.json', 'utf8')
        .then(function(data) {
            console.log('[PROMISED] reading files:', data);
        });

    fs.readFileAsync('not-existent', 'utf8')    
        .catch(function(err) {
            console.log('[PROMISED] error reading file:', err.message);
        });

    setTimeout(function() {
        setTimeout(function() {
            setTimeout(function() {
                try {
                    a.b.c;
                } catch(err) {
                    console.log('[UNPROMISED] error stack trace:', err.stack);
                };
            }, 1);
        }, 1);
    }, 1);

    Promise.delay(1)
        .delay(1)
        .delay(1)
        .then(function() {
            try {
                a.b.c;
            } catch(err) {
                console.log('[PROMISED] error stack trace:', err.stack);
            };
        });
};