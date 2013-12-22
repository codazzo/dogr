var dogeImgURL = '/doge.png';
var canvas = document.getElementById('canvas');

var dogeCanvas = require('./dogeCanvas')({
    callback: onDogeLoaded,
    imgURL: dogeImgURL,
    imageClass: Image,
    canvas: canvas
});

function prefillTextArea(lines){
    lines = lines || [
        'wow',
        'such sample',
        'much text',
        'very try long line example'
    ];

    document.getElementById('textarea').value = lines.join('\n');
}

function onDogeLoaded(){
    if(providedLines.length) {
        writeAllDogeContent();
    }
}

prefillTextArea(providedLines);

document.getElementById('wow').onclick = writeAllDogeContent;
document.getElementById('download').onclick = function(){
    var dataURL = canvas.toDataURL();
    window.location.href = dataURL;
};

function writeAllDogeContent(){
    var textLines = document.getElementById('textarea').value.split('\n');

    dogeCanvas.addLines(textLines);
}