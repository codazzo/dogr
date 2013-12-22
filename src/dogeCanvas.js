var fontName = 'Comic Sans MS, doge, Marker Felt, Sans';
var fontSize = 30;
var palette = ['darkcyan', 'turquoise', 'maroon', 'navy', 'red', 'green', 'fuchsia', 'crimson', 'indigo', 'yellow'];

function initContext(ctx){
    ctx.font =  fontSize + 'px ' + fontName;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
}

module.exports = function(options){
    var canvas = options.canvas,
        ctx = canvas.getContext('2d'),
        font = options.font,
        dogeImgURL = options.imgURL,
        img = new options.imageClass(),
        imageWidth,
        imageHeight;

    if (font) {
        fontName = font.name;
        console.log('Using font: ' + fontName);
        ctx.addFont(font);
    }

    img.onload = function(){
        imageWidth = canvas.width = img.width;
        imageHeight = canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        initContext(ctx);

        if (options.callback) {
            options.callback();
        }
    };

    img.src = dogeImgURL;

    function addLineToCanvas (text){
        var textWidth = ctx.measureText(text).width,
            xMax = imageWidth - textWidth,
            yMax = imageHeight - fontSize,
            xPos = Math.random() * xMax,
            yPos = Math.random() * yMax;

        ctx.fillStyle = palette[Math.floor(( Math.random() * 1000 ) % palette.length)];
        ctx.fillText(text, xPos, yPos);
    }

    return {
        addLines: function(lines){
            initContext(ctx);
            ctx.drawImage(img, 0, 0, img.width, img.height); //clears the canvas

            lines.forEach(addLineToCanvas);
        }
    };
};
