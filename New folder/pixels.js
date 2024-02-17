// pixelCounter.js

function countBlackAndWhitePixels(imageData) {
    var data = imageData.data;
    var blackPixels = 0;
    var whitePixels = 0;

    // Iterate through the image data and count black and white pixels
    for (var i = 0; i < data.length; i += 4) {
        if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) {
            blackPixels++;
        } else if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255) {
            whitePixels++;
        }
    }

    return { blackPixels: blackPixels, whitePixels: whitePixels };
}
