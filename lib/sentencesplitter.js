var threshold;
var dictionary = require('./dictionary.js')({
    onReady: function(){
        threshold = 10 / dictionary.totalCount(); //at least 10 occurrences in the corpus
        console.log('Word split frequency threshold:' + threshold);
    }
});

function splitSentence(sentenceText){
    return splitRecursive([], sentenceText);
}

function splitRecursive(words, restOfSentence){
    var i,
        subString,
        rating;

    if (restOfSentence.length === 0){
        return words.join(' ');
    }

    for ( i = restOfSentence.length; i > 0; i--) {
        subString = restOfSentence.substr(0, i);
        rating = dictionary.rate(subString);
        if (rating > threshold) {
            return splitRecursive(words.concat(subString), restOfSentence.substr(i));
        }
    }

    throw new Error('Could not split sentence: ' + restOfSentence);
}

exports.splitPath = function(path){
    var providedLines,
        splitSentences;

    providedLines = path.split('/')
                    .filter(function(token){ return token; })
                    .map(function(token){ return decodeURIComponent(token);});

    splitSentences = providedLines.map(function(line){
        return splitSentence(line);
    });

    return splitSentences;
};
