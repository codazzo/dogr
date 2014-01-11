var dogeImgURL = '/doge.png';
var canvas = document.getElementById('canvas');
var lastCanvasData;

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

$('#download').click(function(){
    var dataURL = canvas.toDataURL('image/jpeg');
    window.location.href = dataURL;
});

$('#wow').click(writeAllDogeContent);

function writeAllDogeContent(){
    var textLines = document.getElementById('textarea').value.split('\n');
    lastCanvasData = dogeCanvas.addLines(textLines);
}


$('#imgur').click(function uploadToImgur(){
    $.ajax({
        url: '/upload',
        type: 'POST',
        headers: {
            Accept: 'application/json'
        },
        data: {
            data: lastCanvasData
        },
        success: function(result) {
            // console.log('Image uploaded at ' + result.link + '. Delete hash: ' + result.deletehash);
            window.location.href = result.link;
        }
    });
});