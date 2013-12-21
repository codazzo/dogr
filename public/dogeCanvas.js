var fontSize = 20;
var palette = ['darkcyan', 'turquoise', 'maroon', 'navy', 'red', 'green', 'fuchsia', 'crimson', 'indigo', 'yellow'];

function initContext(ctx){
    ctx.font = fontSize + "pt Comic Sans MS, Sans";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
}

module.exports = function(options){
    var canvas = options.canvas,
        ctx = canvas.getContext('2d'),
        dogeImgURL = options.imgURL,
        img = new Image(),
        imageWidth,
        imageHeight;

    img.onload = function(){
        imageWidth = canvas.width = img.width;
        imageHeight = canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        initContext(ctx);

        if (options.callback) {
            options.callback();
        }
    }

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
            ctx.drawImage(img, 0, 0, img.width, img.height); //clears the canvas

            lines.forEach(addLineToCanvas);
        }
    }
}
