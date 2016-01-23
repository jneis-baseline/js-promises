module.exports = function() {
    var Promise = require('bluebird');

    // without promises
    var fs = require('fs');

    fs.readFile('package.json', 'utf8', function(err, data) {
        if (err) {
            console.error('unable to read file');
        } else {
            try {
                var json = JSON.parse(data);
                console.log(json.description);
            } catch (e) {
                console.error('invalid json in file');
            }
        }
    });

    // with promises
    fs.readFileAsync = Promise.promisify(fs.readFile);

    fs.readFileAsync('package.json', 'utf8')
        .then(JSON.parse)
        .then(function(json) {
            console.log(json.description);
        })
        .catch(SyntaxError, function(err) {
            console.error('invalid json in file');
        })
        .catch(function(err) {
            console.error('unable to read file');
        });

};
