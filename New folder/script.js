document.getElementById('fileInput').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        var img = new Image();
        img.onload = function() {
            var outputCanvas = document.getElementById('outputCanvas');
            var outputCtx = outputCanvas.getContext('2d');
            outputCanvas.width = img.width;
            outputCanvas.height = img.height;

            // Convert image to black and white and apply corner effect
            var result = convertToBlackAndWhite(img); 
            var processedCanvas = applyCornerEffect(result.canvas); 

            // Draw processed image onto output canvas
            outputCtx.drawImage(processedCanvas, 0, 0);

            // Count black and white pixels
            var imageData = outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
            var pixelCounts = countBlackAndWhitePixels(imageData);

            // Get the per-pixel multiplier value
            var perPixelMultiplier = parseFloat(document.getElementById('perPixelMultiplier').value);

            // Calculate the total value
            var totalValue = pixelCounts.blackPixels * perPixelMultiplier;

            // Display the total value
            var pixelCountsDiv = document.getElementById('pixelCounts');
            pixelCountsDiv.innerHTML = "Number of Black Pixels: " + pixelCounts.blackPixels + "<br>" +
                                       "Number of White Pixels: " + pixelCounts.whitePixels + "<br>" +
                                       "Total Sunspots: " + totalValue.toFixed(2);
        };
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
});
