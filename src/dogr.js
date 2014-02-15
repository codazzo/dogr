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

$('.share').click(function(){
    var popup = {
            width: 500,
            height: 350
        },
        sharedUrl = 'http://www.dogr.io',
        sharedMsg = 'wow. much doge. such generator.',
        popupUrl,
        openOptions,
        shareType;

    popup.top = (screen.height/2) - (popup.height/2);
    popup.left = (screen.width/2) - (popup.width/2);

    openOptions = [
        "toolbar=no",
        "location=no",
        "status=no",
        "menubar=no",
        "scrollbars=yes",
        "resizable=yes",
        "left=" + popup.left,
        "top=" + popup.top,
        "width=" + popup.width,
        "height=" + popup.height
    ].join(',');

    if ($(this).is('.facebook')) {
        popupUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + sharedUrl;
        shareType = 'facebook';
    } else if ($(this).is('.twitter')) {
        popupUrl = 'http://twitter.com/intent/tweet?text=' + sharedMsg + '&url=' + sharedUrl;
        shareType = 'twitter';
    } else if ($(this).is('.google-plus')) {
        popupUrl = 'https://plus.google.com/share?url=' + sharedUrl;
        shareType = 'google-plus';
    }

    window.open(popupUrl, 'targetWindow', openOptions);

    ga('send', 'event', 'share-button', 'click', shareType, popupUrl);
});