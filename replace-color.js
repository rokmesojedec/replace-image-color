
const { createCanvas, loadImage } = require('canvas')
const sizeOf = require('image-size');

module.exports = (args) => 
{
    const { url, color, replaceColor } = args || {}; 
    
    var dimensions = sizeOf(url);

    const canvas = createCanvas(dimensions.width, dimensions.height);
    const ctx = canvas.getContext('2d')

    const image = loadImage(url).then((image) => {
        ctx.drawImage(image, 0, 0);
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        const phase = 0;
        const center = 128;
        const width = 127;
        const frequency = Math.PI*2/ data.length;

        for (let i = 0; i < data.length; i = i + 4) 
        {
            let feathering =  70;
            // change color if pixel is not transparnet
            if (data[i + 3] > 0 
                && Math.abs(replaceColor.r - data[i]) < feathering
                && Math.abs(replaceColor.b - data[i+1]) < feathering 
                && Math.abs(replaceColor.g - data[i+2]) < feathering)
            {
                if(color.r) data[i] = Math.sin(frequency*i+2+phase) * width + center;     // Red
                if(color.b) data[i + 1] = Math.sin(frequency*i+0+phase) * width + center; // Blue
                if(color.g) data[i + 2] = Math.sin(frequency*i+4+phase) * width + center; // Green
            }
        }
        ctx.putImageData(imageData, 0, 0);
        return canvas.toDataURL();
    })
    
    return image;
}