var dogeImgURL = '/doge.png';
var canvas = document.getElementById('canvas');

var dogeCanvas = require('./dogeCanvas')({
    callback: onDogeLoaded,
    imgURL: dogeImgURL,
    imageClass: Image,
    canvas: canvas
});

function prefillTextArea(lines){
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
    var dataURL = canvas.toDataURL('image/jpeg');
    window.location.href = dataURL;
};

function writeAllDogeContent(){
    var textLines = document.getElementById('textarea').value.split('\n');

    dogeCanvas.addLines(textLines);
}