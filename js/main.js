function imageIsLoaded(img) { 
    if (img == null || ! img.complete()) {
        alert("Image not loaded");
        return false;
    } else {
        return true;
    }
}

function loadImage() {
    var imgFile = document.getElementById("imgFile");
    image = new SimpleImage(imgFile);
    startImage = new SimpleImage(imgFile);
    image.drawTo(canvas);
}

function resetImage() {
    if(imageIsLoaded(image)){
        image = new SimpleImage(startImage);
        image.drawTo(canvas);
    }
}

function makeGray() {
    if(imageIsLoaded(image)){
        image = new SimpleImage(startImage);
        for (var pixel of image.values()) {
            var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
            pixel.setRed(avg);
            pixel.setGreen(avg);
            pixel.setBlue(avg);
        }
        image.drawTo(canvas);
    }
}

function redFilter() {
    if(imageIsLoaded(image)){ 
        image = new SimpleImage(startImage);
        for (var pixel of image.values()) {
            var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
            if(avg < 128) {
                pixel.setRed(avg*2);
                pixel.setGreen(0);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(avg*2-255);
                pixel.setBlue(avg*2-255);
            }
        }
        image.drawTo(canvas);
    }
}

function myFilter() {

    if(imageIsLoaded(image)) { 
        image = new SimpleImage(startImage);
        for (var pixel of image.values()) {
            var red ,green ,blue;

            red = pixel.getRed();
            green = pixel.getGreen();
            blue = pixel.getBlue();

            pixel.setRed(blue);
            pixel.setGreen(red);
            pixel.setBlue(green);
        }
        image.drawTo(canvas);
    }

    
}

function setupRainbowColor(pixel , r , g , b) {
    pixel.setRed(r);
    pixel.setGreen(g);
    pixel.setBlue(b);
}

function rainbowFilter() {
    if(imageIsLoaded(image)) { 
        image = new SimpleImage(startImage);
        var height = image.getHeight();
        var mean = height/7;
        

        for (var pixel of image.values()) {
            var y = pixel.getY()
            var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
            if(mean > y) {
                if(avg < 128){
                    setupRainbowColor(pixel , 2*avg , 0 , 0)
                } else {
                    setupRainbowColor(pixel, 255 , 2*avg-255 , 2*avg-255)
                }
            } else if (mean*2 > y) {
                if(avg < 128){
                    setupRainbowColor(pixel , 2*avg , 0.8*avg , 0)
                } else {
                    setupRainbowColor(pixel, 255 , 1.2*avg-51 , 2*avg-255)
                }
            } else if (mean*3 > y) {
                if(avg < 128){
                    setupRainbowColor(pixel , 2*avg , 2*avg , 0)
                } else {
                    setupRainbowColor(pixel, 255 , 255 , 2*avg-255)
                }
            } else if (mean*4 > y) {
                if(avg < 128){
                    setupRainbowColor(pixel , 0 , 2*avg , 0)
                } else {
                    setupRainbowColor(pixel, 2*avg-255 , 255 , 2*avg-255)
                }
            } else if (mean*5 > y) {
                if(avg < 128){
                    setupRainbowColor(pixel , 0 , 0 , 2*avg)
                } else {
                    setupRainbowColor(pixel, 2*avg-255 , 2*avg-255 , 255)
                }
            } else if (mean*6 > y) {
                if(avg < 128){
                    setupRainbowColor(pixel , 0.8*avg , 0 , 2*avg)
                } else {
                    setupRainbowColor(pixel, 1.2*avg-51 , 2*avg-255 , 255)
                }
            } else {
                if(avg < 128){
                    setupRainbowColor(pixel , 1.6*avg , 0 , 1.6*avg)
                } else {
                    setupRainbowColor(pixel, 0.4*avg+153 , 2*avg-255 , 0.4*avg+153)
                }
            }
        }

        image.drawTo(canvas);

    }
}

function getRandomCord(min, max , cord , maxvalue) {
    min = Math.ceil(min);
    max = Math.floor(max);
    var randomValue = Math.floor(Math.random() * (max - min)) + min;
    var newCord;
    if(Math.random() < 0.5) {
        newCord = cord + randomValue;
    } else {
        newCord = cord - randomValue;
    }
    if(newCord < 0 || newCord >= maxvalue) {
        getRandomCord(min, max , cord , maxvalue);
    } else {
        return newCord;
    }

}

function blurFilter() {
    console.log("As");
    if(imageIsLoaded(image)) { 
        
        image = new SimpleImage(startImage);
        var blurpage = new SimpleImage(image);
        var width = blurpage.getWidth();
        var height = blurpage.getHeight();

        for (var pixel of image.values()) {
            var x = pixel.getX();
            var y = pixel.getY();

            if(Math.random() < 0.5) {
                blurpage.setPixel(x,y,pixel)
            } else {
                var randomX , randomY;
                randomX = getRandomCord(1,10,x,width);
                randomY = getRandomCord(1,10,y,height);
                blurpage.setPixel(randomX,randomY,pixel);
            }
        }

        blurpage.drawTo(canvas);
    }
}

var image , startImage;
var canvas = document.getElementById("canvas");
canvas.width = 500;
canvas.height = 500;


