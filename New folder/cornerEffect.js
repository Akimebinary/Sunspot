function applyCornerEffect(inputCanvas) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    // Set canvas dimensions to match the input canvas
    canvas.width = inputCanvas.width;
    canvas.height = inputCanvas.height;

    ctx.drawImage(inputCanvas, 0, 0, inputCanvas.width, inputCanvas.height);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    // Define the threshold for the size of connected black regions
    var threshold = 50; // Adjust as needed

    // Helper function to perform flood fill
    function floodFill(x, y, fillColor) {
        var stack = [{ x: x, y: y }];
        var filledPixels = [];

        while (stack.length) {
            var pixel = stack.pop();
            var pixelIndex = (pixel.y * canvas.width + pixel.x) * 4;

            if (data[pixelIndex] === 0 && data[pixelIndex + 1] === 0 && data[pixelIndex + 2] === 0) {
                data[pixelIndex] = fillColor[0];
                data[pixelIndex + 1] = fillColor[1];
                data[pixelIndex + 2] = fillColor[2];
                filledPixels.push({ x: pixel.x, y: pixel.y });

                // Add adjacent pixels to the stack
                if (pixel.x > 0) {
                    stack.push({ x: pixel.x - 1, y: pixel.y });
                }
                if (pixel.x < canvas.width - 1) {
                    stack.push({ x: pixel.x + 1, y: pixel.y });
                }
                if (pixel.y > 0) {
                    stack.push({ x: pixel.x, y: pixel.y - 1 });
                }
                if (pixel.y < canvas.height - 1) {
                    stack.push({ x: pixel.x, y: pixel.y + 1 });
                }
            }
        }

        return filledPixels;
    }

   // Flood fill from outer edges of the image
for (var x = 0; x < canvas.width; x++) {
    floodFill(x, 0, [255, 165, 0]); // Top edge (orange)
    floodFill(x, canvas.height - 1, [255, 165, 0]); // Bottom edge (orange)
}
for (var y = 0; y < canvas.height; y++) {
    floodFill(0, y, [255, 165, 0]); // Left edge (orange)
    floodFill(canvas.width - 1, y, [255, 165, 0]); // Right edge (orange)
}

    ctx.putImageData(imageData, 0, 0);

    return canvas;
}
