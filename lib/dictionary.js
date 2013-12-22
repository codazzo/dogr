var fs = require('fs');
var dictionaryPath = __dirname + '/dictionary.txt';

module.exports = function(options){
    var onReadyCb = options.onReady,
        dictionaryMap = {},
        totalCount = 0;

    console.log('Installing dictionary. Root dir:' + __dirname);

    fs.readFile(dictionaryPath, {encoding: 'utf8'}, function (err, data) {
        var textData = data + '',
            lines = textData.split('\n');

        lines.forEach(function(line){
            var countText = line.split(' ')[1],
                count;

            try {
                count = parseInt(countText, 10);
            } catch (e) {
                throw new Error('Couldnt parse count: ' + countText);
            }

            totalCount += count;
        });

        lines.reduce(function(memo, line){
            var key = line.split(' ')[0],
                count = parseInt(line.split(' ')[1], 10),
                frequency = count / totalCount;

            memo[key] = frequency;
            return memo;
        }, dictionaryMap);

        console.log('Dictionary installed/ Total word count: ' + totalCount);
        if (onReadyCb) {
            onReadyCb();
        }
    });

    return {
        rate: function(word){
            var ratingInDictionary = dictionaryMap[word];
            return ratingInDictionary || 0;
        },

        totalCount: function(){
            return totalCount;
        }
    };
};