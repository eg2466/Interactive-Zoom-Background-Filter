let video;
let bw_radio;
let inverted_radio;
let cart_radio;

function setup() {
    //720p 1280×720
    createCanvas(640, 630);
    
    
    
    bw_radio = createRadio();
    bw_radio.option('Black & White');
    bw_radio.style('width', '130px');
    
    
    inverted_radio = createRadio();
    inverted_radio.option('Inverted');
    inverted_radio.style('width', '130px');
    
    cart_radio = createRadio();
    cart_radio.option('Cartoon');
    cart_radio.style('width', '130px');
    
//    textAlign(CENTER);
    
    
    
//    noCanvas();
    
    video = createCapture(VIDEO);
//    let video = createImage(videoInput) ;
//    video.size(640, 480);
    video.hide();
}






function draw() {
    
    
    
    
    
    background(220);
    video.loadPixels();

    inverted_filter();
    
    
    video.updatePixels();
    image(video, 0, 0, video.width , video.height );
}





function inverted_filter(){
          

    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
            
          var index = (x + y * video.width) * 4;
        
          let r = video.pixels[index+0];
          let g = video.pixels[index+1];
          let b = video.pixels[index+2];
          let a = video.pixels[index+3];   
          
          let avg = (r + g + b) / 3;
          
          video.pixels[index+0] = 255 - r;
          video.pixels[index+1] = 255 - g;
          video.pixels[index+2] = 255 - b;
          video.pixels[index+3] = 255;
            
        }
      }

    
    
}