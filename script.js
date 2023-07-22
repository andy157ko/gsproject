var fgImage = null;
var bgImage = null;
var fgCanvas;
var bgCanvas;

function loadForegroundImage(){
    var imgFile = document.getElementById("fgfile");
    fgImage = new SimpleImage(imgFile);
    var canvas = document.getElementById("fgcanvas");
    fgImage.drawTo(canvas);
}

function loadBackgroundImage(){
    var imgFile = document.getElementById("bgfile");
    fgImage = new SimpleImage(imgFile);
    var canvas = document.getElementById("bgcanvas");
    fgImage.drawTo(canvas);
}

function createComposite() {
    var output = new SimpleImage(fgImage.getWidth(),fgImage.getHeight());
    var greenThreshold = 240;
    for (var pixel of fgImage.values()) {
      var x = pixel.getX();
      var y = pixel.getY();
      if (pixel.getGreen() > greenThreshold) {
        var bgPixel = bgImage.getPixel(x,y);
        output.setPixel(x,y,bgPixel);
      }
      else {
        output.setPixel(x,y,pixel);
      }
    }
    return output;
  }

  function doGreenScreen() {
    if (fgImage == null  || ! fgImage.complete()) {
      alert("Foreground image not loaded");
    }
    if (bgImage == null || ! bgImage.complete()) {
      alert("Background image not loaded");
    }
    clearCanvas();
    var finalImage = createComposite();
    finalImage.drawTo(fgCanvas);
  }
  
  function clearCanvas() {
    doClear(fgCanvas);
    doClear(bgCanvas);
  }
  
  function doClear(canvas) {
    var context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width,canvas.height);
  }
