var dogeImgURL = '/doge.png'
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var fontSize = 20;
var imageWidth,
    imageHeight;
var palette = ['darkcyan', 'turquoise', 'maroon', 'navy', 'red', 'green', 'fuchsia', 'crimson', 'indigo', 'yellow'];
var img = new Image();

function loadDoge(dogeLoadedCallback){
    img.onload = function(){
        imageWidth = canvas.width = img.width;
        imageHeight = canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        dogeLoadedCallback();
    }
    img.src = dogeImgURL;
}

function addLineToCanvas(text){
    var textWidth = ctx.measureText(text).width;
    var xMax = imageWidth - textWidth;
    var yMax = imageHeight - fontSize;
    var xPos = Math.random() * xMax;
    var yPos = Math.random() * yMax;
    ctx.fillStyle = palette[Math.floor(( Math.random() * 1000 ) % palette.length)];
    ctx.fillText(text, xPos, yPos);
}

function writeAllDogeContent(){
    var textLines = document.getElementById('textarea').value.split('\n'),
        i;

    ctx.drawImage(img, 0, 0, img.width, img.height);

    ctx.font = fontSize + "pt Comic Sans MS, Sans";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";

    textLines.forEach(addLineToCanvas);
}

function prefillTextArea(lines){
    lines = lines || [
        'wow',
        'such sample',
        'much text',
        'very try long line example'
    ];

    document.getElementById('textarea').value = lines.join('\n');
}

// var pathname = window.location.pathname;
//     providedLines = pathname.split('/')
//                 .filter(function(token){ return token; })
//                 .map(function(token){ return decodeURIComponent(token)});

loadDoge(function(){
    if(providedLines.length) {
        writeAllDogeContent();
    }
});
prefillTextArea(providedLines);

document.getElementById('wow').onclick = writeAllDogeContent;
document.getElementById('download').onclick = function(){
    var dataURL = canvas.toDataURL();
    window.location.href = dataURL;
}