function convertToBlackAndWhite(inputImage) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    // Set canvas dimensions to match the image
    canvas.width = inputImage.width;
    canvas.height = inputImage.height;

    ctx.drawImage(inputImage, 0, 0, inputImage.width, inputImage.height);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

   

    // Convert to black and white
    for (var i = 0; i < data.length; i += 4) {
        // Weighing red, green, and blue channels differently
        var avg = (data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11); // Weighted average
        var color = avg > 83 ? 255 : 0; // Determine black or white based on weighted average value and a threshold of 83
        data[i] = color; // Red
        data[i + 1] = color; // Green
        data[i + 2] = color; // Blue

    }

    ctx.putImageData(imageData, 0, 0);

    // Return both the modified canvas and the counts of black and white pixels
    return { canvas: canvas};
}
