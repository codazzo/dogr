var threshold;
var dictionary = require('./dictionary.js')({
    onReady: function(){
        threshold = 10 / dictionary.totalCount(); //at least 10 occurrences in the corpus
        console.log('Word split frequency threshold:' + threshold);
    }
});

var oneLetterWords = ['a', 'i', 'u', 'y', 'r'],
    twoLetterWords = ['to', 'it', 'of', 'in', 'is', 'me', 'we', 'he', 'my', 'on', 'do', 'no', 'be', 'so', 'go', 'up', 'if', 'at', 'oh', 'as', 'an', 'us', 'or', 'by', 'am', 'uh', 'ok', 'hi', 'ah', 'mr', 'um', 'ha', 'ma', 'lf', 'ya', 'la', 'tv', 'mm', 'eh', 'ls', 'de', 're', 'yo', 'il', 'ln', 'ho', 'ow', 'da', 'ex'],
    oneTwoLetterWords = oneLetterWords.concat(twoLetterWords),
    MAXIMUM_PORTION_LENGTH = 50;

function splitSentence(sentenceText){
    var results = [],
        highestRatedSencence;

    splitRecursive(results, [], sentenceText, 1);

    if (results.length === 0) {
        throw new Error('Sentence could not be split: ' + sentenceText);
    }

    results.sort(function(a,b){
        return b.rating - a.rating;
    });

    highestRatedSencence = results[0];

    return highestRatedSencence.words;
}

function splitRecursive(allResults, words, restOfSentence, ratingSoFar){
    var i,
        subString,
        rating,
        stepResults = [],
        restOfSentenceSplits;

    if (restOfSentence.length === 0){
        allResults.push({
            words: words.join(' '),
            rating: ratingSoFar
        });
        return [];
    }

    for (i = restOfSentence.length; i > 0; i--) {
        subString = restOfSentence.substr(0, i);
        rating = dictionary.rate(subString);

        if (rating < threshold || !stringShouldBeProcessed(restOfSentence)) {
            continue;
        }

        restOfSentenceSplits = splitRecursive(allResults, words.concat(subString), restOfSentence.substr(i), ratingSoFar * rating);
        restOfSentenceSplits.forEach(function(split){
            stepResults.push(words.concat(split));
        });
    }

    return stepResults;
}

function stringShouldBeProcessed(string){
    if (string.length > 2) {
        return string.length < MAXIMUM_PORTION_LENGTH;
    } else {
        return oneTwoLetterWords.indexOf(string) !== -1;
    }
}

exports.splitPath = function(path){
    var providedLines,
        splitSentences,
        startTime = new Date().getTime(),
        endTime;

    providedLines = path.split('/')
                    .filter(function(token){ return token; })
                    .map(function(token){ return decodeURIComponent(token);});

    console.log('Splitting lines: ' + JSON.stringify(providedLines));

    try {
        splitSentences = providedLines.map(function(line){
            return splitSentence(line);
        });
        console.log('Parsed Lines: ' + JSON.stringify(splitSentences));
    } catch (e) {
        console.log(e);
        splitSentences = null;
    }

    endTime = new Date().getTime();
    console.log('Time Elapsed: ' + (endTime - startTime));
    console.log('');
    return splitSentences;
};
