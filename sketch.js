let video;
let bw_radio;
let inverted_radio;
let inverted_green_radio;
let cart_radio;
let none_radio;

let spoken_word;
let spoken_word_conf;

let face_radio;
let face_color_radio;
let dup_radio;
//var for pixels
var p0;
var p1;
var p2;
var p3;
var p4; 
var p5;
var p6;
var p7;
var p8;
var p9; 
var p10;
var p11;
var p12;
var p13;
var p14; 
var p15;
var p16;
var p17;
var p18;
var p19; 
var p20;
var p21;
var p22;
var p23;
var p24; 

///////////////// ML5 sound classifier ////////////////////
const options = { probabilityThreshold: 0.8 };
let classifier;


///////////////// ML5 uNet / Posenet //////////////////// - https://learn.ml5js.org/#/reference/unet?id=examples
let uNet;
let poseNet;

let pose;
let skeleton;

///////////////////// PRE LOAD FUNCTION ////////////////////
function preload() {
    
    //I thought of adding voice activated filters but code was unable to hear anything as it was already trying to compute so much 
  // Load SpeechCommands18w sound classifier model
//    classifier = ml5.soundClassifier('SpeechCommands18w', options, modelReady);
    
//    uNet = ml5.uNet('face');
//        bkg_img = loadImage('img/bkg.png');
}




function setup() {
    //720p 1280×720
//    createCanvas(640, 640);
    createCanvas(640, 640);
    pixelDensity(2);

textFont('Times New Roman');
    
//    text(s)

    bw_radio = createRadio();
    bw_radio.option('B&W');
    bw_radio.style('width', '130px');
    bw_radio.style('color', 'white');
    bw_radio.position(50, 555);
    
    
    inverted_radio = createRadio();
    inverted_radio.option('Inverted w/o face');
    inverted_radio.style('width', '140px');
        inverted_radio.style('color', 'white');
    inverted_radio.position(50, 580);
    
    
    inverted_green_radio= createRadio(); 
    inverted_green_radio.option('Inverted (Green)');
    inverted_green_radio.style('width', '130px');
            inverted_green_radio.style('color', 'white');
    inverted_green_radio.position(50, 605);
    

    
    
    //circle face radio
    face_radio = createRadio();
    face_radio.option('Circles');
    face_radio.style('width', '130px');
    face_radio.style('color', 'white');
    face_radio.position(270, 555);
    
    //circle only face color radio
    face_color_radio = createRadio();
    face_color_radio.option('Colorful Circles');
    face_color_radio.style('width', '150px');
    face_color_radio.style('color', 'white');
    face_color_radio.position(270, 580);
       
    //duplicate faces face radio
    dup_radio = createRadio();
    dup_radio.option('Multiple face');
    dup_radio.style('width', '130px');
    dup_radio.style('color', 'white');
    dup_radio.position(270, 605);
    
    
    
        
    //blur radio
    cart_radio = createRadio();
    cart_radio.option('Blur');
    cart_radio.style('width', '130px');
    cart_radio.style('color', 'white');
    cart_radio.position(500, 555);

    
    //no filter radio
    none_radio = createRadio();
    none_radio.option('None');
    none_radio.style('width', '130px');
    none_radio.style('color', 'white');
    none_radio.position(500, 580);
    
    
    
    video = createCapture(VIDEO);
    video.hide();
    video.size(640, 480);
    
    video_1 = createCapture(VIDEO);
    video_1.hide();
    video_1.size(64, 48); 
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    
      
    
    // initial segmentation
//    uNet.segment(video, gotResults);
}






///////////////////// MODEL FOR ML5 FUNCTION ////////////////////
//function modelReady() {
//  // classify sound
//  classifier.classify(gotResult);
//
//}







///////////////////// ML5 FUNCTION ////////////////////
//function gotResult(error, result) {
//  if (error) {
//    console.log(error);
//    return;
//  }
//  // log the result
//  console.log(result);
//    console.log('Label: ' + result[0].label);
//    console.log('Confidence: ' + nf(result[0].confidence, 0, 2));
//    
//    if (result.length > 0) {
//        spoken_word = result[0].label;
//        spoken_word_conf = nf(result[0].confidence, 0, 2);
//    }
//    
//    
//}




// code from https://editor.p5js.org/Luxapodular/sketches/BXoa5L5Eu
function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}



function modelLoaded() {
  console.log('poseNet ready');
}




// nNet
//function gotResults(error, result) {
//  // if there's an error return it
//  if (error) {
//    console.error(error);
//    return;
//  }
//  // set the result to the global segmentation variable
////  video = result.backgroundMask;
//
//  // Continue asking for a segmentation image
//  uNet.segment(video, gotResult);
//}



///////////////////// DRAW FUNCTION /////////////////////
function draw() {

    background(0);
    push();
        fill(0);
        rect(0, 480, 640, 160);
    
        fill('#1098f7');
        rect(0, 480, 213, 60);
        rect(214, 480, 213, 60);
        rect(428, 480, 213, 60);
    
        strokeWeight(2);
        stroke(255);
        line(213.5, 481, 213.5, 660);
        line(427.5, 481, 427.5, 660);
    
        line(0, 480, 640, 480);
        line(0, 540, 640, 540);    
    pop();
    

        
    fill(255);
    textSize(22);
    text("Please select an option", width/2-95, height/2-75);
    fill(255);
        textSize(18);
    text("Filter Set #1", 60, 515)
    text("Filter Set #2", 280, 515)
    text("Filter Set #3", 490, 515)
//    cap_img = capture.get();

    

    
        if (bw_radio.value() === 'B&W'){
            bw_filter();
        }  
        if (inverted_radio.value() === 'Inverted w/o face'){
            inverted_filter();
        }
        if (inverted_green_radio.value() === 'Inverted (Green)'){
            face_inverted_filter();
        }
        if (cart_radio.value() === 'Blur'){
            gauss_blur();
        }
        if (none_radio.value() === 'None'){
            no_filter();
        }
        if (face_radio.value() === 'Circles'){
            circle_filter();
        }
        if (face_color_radio.value() === 'Colorful Circles'){
            face_filter();
        }

        if (dup_radio.value() === 'Multiple face'){
            dup_face_filter();
        }



}



function bw_filter(){
    

video.loadPixels();
    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
            
          var index = (x + y * video.width) * 4;
        
          let r = video.pixels[index+0];
          let g = video.pixels[index+1];
          let b = video.pixels[index+2];
          let a = video.pixels[index+3];   
          
          let avg = (r + g + b) / 3;
          
          video.pixels[index+0] = avg;
          video.pixels[index+1] = avg;
          video.pixels[index+2] = avg;
          video.pixels[index+3] = 255;
            
        }
      }

    video.updatePixels();
    image(video, 0, 0, 640, 480);
    
}


function inverted_filter(){
          
video.loadPixels();
    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
            
          var index = (x + y * video.width) * 4;
        
          let r = video.pixels[index+0];
          let g = video.pixels[index+1];
          let b = video.pixels[index+2];
          let a = video.pixels[index+3];   
          
          let avg = (r + g + b) / 3;
          
        if(avg > 155){
          video.pixels[index+0] = 255 - r;
          video.pixels[index+1] = 255 - g;
          video.pixels[index+2] = 255 - b;
          video.pixels[index+3] = 255;
        }
            
        }
      }

        video.updatePixels();
    image(video, 0, 0, 640, 480);
    
}


function face_inverted_filter(){
          
video.loadPixels();
    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
            
          var index = (x + y * video.width) * 4;
        
          let r = video.pixels[index+0];
          let g = video.pixels[index+1];
          let b = video.pixels[index+2];
          let a = video.pixels[index+3];   
          
          let avg = (r + g + b) /3;
          
          video.pixels[index+0] = 30 - g;
          video.pixels[index+1] = 150 - r;
          video.pixels[index+2] = 100 - b;
          video.pixels[index+3] = 255;
            
        }
      }

        video.updatePixels();
    image(video, 0, 0, 640, 480);
    
}



function circle_filter(){
        background(0);
        push();
        fill(0);
        rect(0, 480, 640, 160);
    
        fill('#1098f7');
        rect(0, 480, 213, 60);
        rect(214, 480, 213, 60);
        rect(428, 480, 213, 60);
    
        strokeWeight(2);
        stroke(255);
        line(213.5, 481, 213.5, 660);
        line(427.5, 481, 427.5, 660);
    
        line(0, 480, 640, 480);
        line(0, 540, 640, 540);

    
    pop();
    
        fill(255);
        textSize(18);
    text("Filter Set #1", 60, 515);
    text("Filter Set #2", 280, 515);
    text("Filter Set #3", 490, 515);

    video_1.loadPixels();
    for (var y = 0; y < video_1.height; y++) {
    for (var x = 0; x < video_1.width; x++) {
        var index = (x + y * video_1.width) * 4;

        let r = video_1.pixels[index + 0];
        let g = video_1.pixels[index + 1];
        let b = video_1.pixels[index + 2];
        let a = video_1.pixels[index+3]; 

          var avg = (r + g + b) / 3;

        //source for this method https://vimeo.com/298100317
          var circle_w = map(avg, 0, 255, 0, 16);

        if(avg >161 && avg<255){
         stroke(0);
          fill(r,g, b);
        }
        if(avg >50 && avg<160){
         stroke(r, g, b);
          fill(0);
        }
//        else{
//        stroke(0);
//          fill(255); 
//    }
          ellipseMode(CENTER);
          ellipse(x*10, y*10 , circle_w, circle_w);  
        
        }
    }
    video_1.updatePixels();
    

}



function face_filter(){
    background(0);
        push();
        fill(0);
        rect(0, 480, 640, 160);
    
        fill('#1098f7');
        rect(0, 480, 213, 60);
        rect(214, 480, 213, 60);
        rect(428, 480, 213, 60);
    
        strokeWeight(2);
        stroke(255);
        line(213.5, 481, 213.5, 660);
        line(427.5, 481, 427.5, 660);
    
        line(0, 480, 640, 480);
        line(0, 540, 640, 540);

    
    pop();
    
        fill(255);
        textSize(18);
    text("Filter Set #1", 60, 515);
    text("Filter Set #2", 280, 515);
    text("Filter Set #3", 490, 515);
    
if (pose) {
         let d = dist(pose.leftEar.x, pose.leftEar.y, pose.rightEar.x, pose.rightEar.y);
//    print(pose.leftEar.x, pose.rightEar.x);
//    print(pose.nose.x, pose.nose.y);
    
//    var is_looping = true;


    video_1.loadPixels();
    
//            print(pose.nose.x, pose.nose.y);
//        if(pose.nose.x> 500 && pose.nose.y < 150){
//            print("egfgf");
////                circle_filter();
//            is_looping = false;
//           }
    
    for (var y = 0; y < pose.nose.y; y++) {
    for (var x = 0; x < pose.rightEar.x; x++) {
        
//        print(y);
//        print(pose.nose.y);
        var index = (x + y * video_1.width) * 4;

        let r = video_1.pixels[index + 0];
        let g = video_1.pixels[index + 1];
        let b = video_1.pixels[index + 2];
        let a = video_1.pixels[index+3]; 

          var avg = (r + g + b) / 3;

        //source for this method https://vimeo.com/298100317
          var circle_w = map(avg, 0, 255, 0, 22);

        if(x<pose.rightEar.x && x>pose.rightEar.x && y<(pose.nose.y-(d/2)-25) && y<(pose.nose.y+(d/2)+25) ){
         stroke(255);
          fill(255);
        }
//        if(is_looping === false){
//            clear();
//            circle_filter();
////            break;
//        }
        else{
            stroke(r,g,b);
          fill(r,g,b);
        }
        
        

          ellipseMode(CENTER);
        ellipse(x*10, y*10 , circle_w, circle_w)
//        rectMode(CENTER);
//          random(ellipse(x*10, y*10 , circle_w, circle_w), rect(x*10, y*10 , circle_w, circle_w));  
        
        
//        stroke(0);
//        fill(0);
//        ellipse(pose.nose.x, pose.nose.y, d+30, d+50);
        
        
        }
    }
    video_1.updatePixels();
//    image(video_1, 0, 0, 640, 480);
    
}
    
}


function gauss_blur(){
    
    video.loadPixels();
    var blur_mtx = [  [1, 4, 6, 4, 1],
		              [4, 16, 24, 16, 4],
		              [6, 24, 36, 24, 6],
                      [4, 16, 24, 16, 4],
                      [1, 4, 6, 4, 1]  ]; 
    
    
//    while (x<pose.rightEar.x && x>pose.leftEar.x && y<(pose.rightEar.y - d/2) && y>(pose.rightEar.y + d/2))  { 
    
    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
//            console.log("hello" + x, y);
//           
//       
//              console.log("bewne" + x, y);
              
                var m0 = ((x-2+video.width)%video.width + video.width*((y-2+video.height)%video.height))*4;
				var m1 = ((x-1+video.width)%video.width + video.width*((y-2+video.height)%video.height))*4;
				var m2 = ((x+0+video.width)%video.width + video.width*((y-2+video.height)%video.height))*4;
				var m3 = ((x+1+video.width)%video.width + video.width*((y-2+video.height)%video.height))*4;
				var m4 = ((x+2+video.width)%video.width + video.width*((y-2+video.height)%video.height))*4;
            
            
                var m5 = ((x-2+video.width)%video.width + video.width*((y-1+video.height)%video.height))*4;
				var m6 = ((x-1+video.width)%video.width + video.width*((y-1+video.height)%video.height))*4;
				var m7 = ((x+0+video.width)%video.width + video.width*((y-1+video.height)%video.height))*4;
				var m8 = ((x+1+video.width)%video.width + video.width*((y-1+video.height)%video.height))*4;
				var m9 = ((x+2+video.width)%video.width + video.width*((y-1+video.height)%video.height))*4;
            
            
                var m10 = ((x-2+video.width)%video.width + video.width*((y+video.height)%video.height))*4;
				var m11 = ((x-1+video.width)%video.width + video.width*((y+video.height)%video.height))*4;
				var m12 = ((x+0+video.width)%video.width + video.width*((y+video.height)%video.height))*4;
				var m13 = ((x+1+video.width)%video.width + video.width*((y+video.height)%video.height))*4;
				var m14 = ((x+2+video.width)%video.width + video.width*((y+video.height)%video.height))*4;
            
            
                var m15 = ((x-2+video.width)%video.width + video.width*((y+1+video.height)%video.height))*4;
				var m16 = ((x-1+video.width)%video.width + video.width*((y+1+video.height)%video.height))*4;
				var m17 = ((x+0+video.width)%video.width + video.width*((y+1+video.height)%video.height))*4;
				var m18 = ((x+1+video.width)%video.width + video.width*((y+1+video.height)%video.height))*4;
				var m19 = ((x+2+video.width)%video.width + video.width*((y+1+video.height)%video.height))*4;            


                var m20 = ((x-2+video.width)%video.width + video.width*((y+2+video.height)%video.height))*4;
				var m21 = ((x-1+video.width)%video.width + video.width*((y+2+video.height)%video.height))*4;
				var m22 = ((x+0+video.width)%video.width + video.width*((y+2+video.height)%video.height))*4;
				var m23 = ((x+1+video.width)%video.width + video.width*((y+2+video.height)%video.height))*4;
				var m24 = ((x+2+video.width)%video.width + video.width*((y+2+video.height)%video.height))*4;  
            
            
				p0 = video.pixels[m0]*blur_mtx[0][0];
				p1 = video.pixels[m1]*blur_mtx[0][1];
				p2 = video.pixels[m2]*blur_mtx[0][2];
                p3 = video.pixels[m3]*blur_mtx[0][3];
                p4 = video.pixels[m4]*blur_mtx[0][4];
                p5 = video.pixels[m5]*blur_mtx[1][0];
                p6 = video.pixels[m6]*blur_mtx[1][1];
                p7 = video.pixels[m7]*blur_mtx[1][2];
                p8 = video.pixels[m8]*blur_mtx[1][3];
                p9 = video.pixels[m9]*blur_mtx[1][4]; 
                p10 = video.pixels[m10]*blur_mtx[2][0];
                p11 = video.pixels[m11]*blur_mtx[2][1];
                p12 = video.pixels[m12]*blur_mtx[2][2];
                p13 = video.pixels[m13]*blur_mtx[2][3];
                p14 = video.pixels[m14]*blur_mtx[2][4]; 
                p15 = video.pixels[m15]*blur_mtx[3][0];
                p16 = video.pixels[m16]*blur_mtx[3][1];
                p17 = video.pixels[m17]*blur_mtx[3][2];
                p18 = video.pixels[m18]*blur_mtx[3][3];
                p19 = video.pixels[m19]*blur_mtx[3][4]; 
                p20 = video.pixels[m20]*blur_mtx[4][0];
                p21 = video.pixels[m21]*blur_mtx[4][1];
                p22 = video.pixels[m22]*blur_mtx[4][2];
                p23 = video.pixels[m23]*blur_mtx[4][3];
                p24 = video.pixels[m24]*blur_mtx[4][4];

				var blur_red = (p0+p1+p2+p3+p4+p5+p6+p7+p8+p9+p10+p11+p12+p13+p14+p15+p16+p17+p18+p19+p20+p21+p22+p23+p24)/256;
            
            
            
					
				p0 = video.pixels[m0+1]*blur_mtx[0][0];
				p1 = video.pixels[m1+1]*blur_mtx[0][1];
				p2 = video.pixels[m2+1]*blur_mtx[0][2];
                p3 = video.pixels[m3+1]*blur_mtx[0][3];
                p4 = video.pixels[m4+1]*blur_mtx[0][4];
                p5 = video.pixels[m5+1]*blur_mtx[1][0];
                p6 = video.pixels[m6+1]*blur_mtx[1][1];
                p7 = video.pixels[m7+1]*blur_mtx[1][2];
                p8 = video.pixels[m8+1]*blur_mtx[1][3];
                p9 = video.pixels[m9+1]*blur_mtx[1][4]; 
                p10 = video.pixels[m10+1]*blur_mtx[2][0];
                p11 = video.pixels[m11+1]*blur_mtx[2][1];
                p12 = video.pixels[m12+1]*blur_mtx[2][2];
                p13 = video.pixels[m13+1]*blur_mtx[2][3];
                p14 = video.pixels[m14+1]*blur_mtx[2][4]; 
                p15 = video.pixels[m15+1]*blur_mtx[3][0];
                p16 = video.pixels[m16+1]*blur_mtx[3][1];
                p17 = video.pixels[m17+1]*blur_mtx[3][2];
                p18 = video.pixels[m18+1]*blur_mtx[3][3];
                p19 = video.pixels[m19+1]*blur_mtx[3][4]; 
                p20 = video.pixels[m20+1]*blur_mtx[4][0];
                p21 = video.pixels[m21+1]*blur_mtx[4][1];
                p22 = video.pixels[m22+1]*blur_mtx[4][2];
                p23 = video.pixels[m23+1]*blur_mtx[4][3];
                p24 = video.pixels[m24+1]*blur_mtx[4][4];

				var blur_green = (p0+p1+p2+p3+p4+p5+p6+p7+p8+p9+p10+p11+p12+p13+p14+p15+p16+p17+p18+p19+p20+p21+p22+p23+p24)/256;
            
            
					
				p0 = video.pixels[m0+2]*blur_mtx[0][0];
				p1 = video.pixels[m1+2]*blur_mtx[0][1];
				p2 = video.pixels[m2+2]*blur_mtx[0][2];
                p3 = video.pixels[m3+2]*blur_mtx[0][3];
                p4 = video.pixels[m4+2]*blur_mtx[0][4];
                p5 = video.pixels[m5+2]*blur_mtx[1][0];
                p6 = video.pixels[m6+2]*blur_mtx[1][1];
                p7 = video.pixels[m7+2]*blur_mtx[1][2];
                p8 = video.pixels[m8+2]*blur_mtx[1][3];
                p9 = video.pixels[m9+2]*blur_mtx[1][4]; 
                p10 = video.pixels[m10+2]*blur_mtx[2][0];
                p11 = video.pixels[m11+2]*blur_mtx[2][1];
                p12 = video.pixels[m12+2]*blur_mtx[2][2];
                p13 = video.pixels[m13+2]*blur_mtx[2][3];
                p14 = video.pixels[m14+2]*blur_mtx[2][4]; 
                p15 = video.pixels[m15+2]*blur_mtx[3][0];
                p16 = video.pixels[m16+2]*blur_mtx[3][1];
                p17 = video.pixels[m17+2]*blur_mtx[3][2];
                p18 = video.pixels[m18+2]*blur_mtx[3][3];
                p19 = video.pixels[m19+2]*blur_mtx[3][4]; 
                p20 = video.pixels[m20+2]*blur_mtx[4][0];
                p21 = video.pixels[m21+2]*blur_mtx[4][1];
                p22 = video.pixels[m22+2]*blur_mtx[4][2];
                p23 = video.pixels[m23+2]*blur_mtx[4][3];
                p24 = video.pixels[m24+2]*blur_mtx[4][4];

				var blur_blue = (p0+p1+p2+p3+p4+p5+p6+p7+p8+p9+p10+p11+p12+p13+p14+p15+p16+p17+p18+p19+p20+p21+p22+p23+p24)/256;
                
            var avg = (blur_red + blur_green + blur_blue)/3;
        
				if(avg > 130){
//                    print(avg);
                    video.pixels[m12] = blur_red;
                    video.pixels[m12+1] = blur_green;
                    video.pixels[m12+2] = blur_blue;
                    video.pixels[m12+3] = video.pixels[m22+3];
                }

//        }
            
        }
      }

                    video.updatePixels();
                image(video, 0, 0, 640, 480);
    
}



function dup_face_filter(){
    background(0);
    push();
        fill(0);
        rect(0, 480, 640, 160);
    
        fill('#1098f7');
        rect(0, 480, 213, 60);
        rect(214, 480, 213, 60);
        rect(428, 480, 213, 60);
    
        strokeWeight(2);
        stroke(255);
        line(213.5, 481, 213.5, 660);
        line(427.5, 481, 427.5, 660);
    
        line(0, 480, 640, 480);
        line(0, 540, 640, 540);
    

    
    pop();
    
            fill(255);
        textSize(18);
    text("Filter Set #1", 60, 515);
    text("Filter Set #2", 280, 515);
    text("Filter Set #3", 490, 515);
    
    video.loadPixels();
    var blur_mtx = [  [1, 4, 6, 4, 1],
		              [4, 16, 24, 16, 4],
		              [6, 24, 36, 24, 6],
                      [4, 16, 24, 16, 4],
                      [1, 4, 6, 4, 1]  ]; 
    
    
    for (var y = 0; y < video.height; y++) {
        for (var x = 0; x < video.width; x++) {
//            console.log("hello" + x, y);
//           
//       
//              console.log("bewne" + x, y);
              
                var m0 = ((x-2+video.width)%video.width + video.width*((y-2+video.height)%video.height))*6;
				var m1 = ((x-1+video.width)%video.width + video.width*((y-2+video.height)%video.height))*6;
				var m2 = ((x+0+video.width)%video.width + video.width*((y-2+video.height)%video.height))*6;
				var m3 = ((x+1+video.width)%video.width + video.width*((y-2+video.height)%video.height))*6;
				var m4 = ((x+2+video.width)%video.width + video.width*((y-2+video.height)%video.height))*6;
            
            
                var m5 = ((x-2+video.width)%video.width + video.width*((y-1+video.height)%video.height))*6;
				var m6 = ((x-1+video.width)%video.width + video.width*((y-1+video.height)%video.height))*6;
				var m7 = ((x+0+video.width)%video.width + video.width*((y-1+video.height)%video.height))*6;
				var m8 = ((x+1+video.width)%video.width + video.width*((y-1+video.height)%video.height))*6;
				var m9 = ((x+2+video.width)%video.width + video.width*((y-1+video.height)%video.height))*6;
            
            
                var m10 = ((x-2+video.width)%video.width + video.width*((y+video.height)%video.height))*6;
				var m11 = ((x-1+video.width)%video.width + video.width*((y+video.height)%video.height))*6;
				var m12 = ((x+0+video.width)%video.width + video.width*((y+video.height)%video.height))*6;
				var m13 = ((x+1+video.width)%video.width + video.width*((y+video.height)%video.height))*6;
				var m14 = ((x+2+video.width)%video.width + video.width*((y+video.height)%video.height))*6;
            
            
                var m15 = ((x-2+video.width)%video.width + video.width*((y+1+video.height)%video.height))*6;
				var m16 = ((x-1+video.width)%video.width + video.width*((y+1+video.height)%video.height))*6;
				var m17 = ((x+0+video.width)%video.width + video.width*((y+1+video.height)%video.height))*6;
				var m18 = ((x+1+video.width)%video.width + video.width*((y+1+video.height)%video.height))*6;
				var m19 = ((x+2+video.width)%video.width + video.width*((y+1+video.height)%video.height))*6;            


                var m20 = ((x-2+video.width)%video.width + video.width*((y+2+video.height)%video.height))*6;
				var m21 = ((x-1+video.width)%video.width + video.width*((y+2+video.height)%video.height))*6;
				var m22 = ((x+0+video.width)%video.width + video.width*((y+2+video.height)%video.height))*6;
				var m23 = ((x+1+video.width)%video.width + video.width*((y+2+video.height)%video.height))*6;
				var m24 = ((x+2+video.width)%video.width + video.width*((y+2+video.height)%video.height))*6;  
            
            
				p0 = video.pixels[m0]*blur_mtx[0][0];
				p1 = video.pixels[m1]*blur_mtx[0][1];
				p2 = video.pixels[m2]*blur_mtx[0][2];
                p3 = video.pixels[m3]*blur_mtx[0][3];
                p4 = video.pixels[m4]*blur_mtx[0][4];
                p5 = video.pixels[m5]*blur_mtx[1][0];
                p6 = video.pixels[m6]*blur_mtx[1][1];
                p7 = video.pixels[m7]*blur_mtx[1][2];
                p8 = video.pixels[m8]*blur_mtx[1][3];
                p9 = video.pixels[m9]*blur_mtx[1][4]; 
                p10 = video.pixels[m10]*blur_mtx[2][0];
                p11 = video.pixels[m11]*blur_mtx[2][1];
                p12 = video.pixels[m12]*blur_mtx[2][2];
                p13 = video.pixels[m13]*blur_mtx[2][3];
                p14 = video.pixels[m14]*blur_mtx[2][4]; 
                p15 = video.pixels[m15]*blur_mtx[3][0];
                p16 = video.pixels[m16]*blur_mtx[3][1];
                p17 = video.pixels[m17]*blur_mtx[3][2];
                p18 = video.pixels[m18]*blur_mtx[3][3];
                p19 = video.pixels[m19]*blur_mtx[3][4]; 
                p20 = video.pixels[m20]*blur_mtx[4][0];
                p21 = video.pixels[m21]*blur_mtx[4][1];
                p22 = video.pixels[m22]*blur_mtx[4][2];
                p23 = video.pixels[m23]*blur_mtx[4][3];
                p24 = video.pixels[m24]*blur_mtx[4][4];

				var blur_red = (p0+p1+p2+p3+p4+p5+p6+p7+p8+p9+p10+p11+p12+p13+p14+p15+p16+p17+p18+p19+p20+p21+p22+p23+p24)/256;
            
            
            
					
				p0 = video.pixels[m0+1]*blur_mtx[0][0];
				p1 = video.pixels[m1+1]*blur_mtx[0][1];
				p2 = video.pixels[m2+1]*blur_mtx[0][2];
                p3 = video.pixels[m3+1]*blur_mtx[0][3];
                p4 = video.pixels[m4+1]*blur_mtx[0][4];
                p5 = video.pixels[m5+1]*blur_mtx[1][0];
                p6 = video.pixels[m6+1]*blur_mtx[1][1];
                p7 = video.pixels[m7+1]*blur_mtx[1][2];
                p8 = video.pixels[m8+1]*blur_mtx[1][3];
                p9 = video.pixels[m9+1]*blur_mtx[1][4]; 
                p10 = video.pixels[m10+1]*blur_mtx[2][0];
                p11 = video.pixels[m11+1]*blur_mtx[2][1];
                p12 = video.pixels[m12+1]*blur_mtx[2][2];
                p13 = video.pixels[m13+1]*blur_mtx[2][3];
                p14 = video.pixels[m14+1]*blur_mtx[2][4]; 
                p15 = video.pixels[m15+1]*blur_mtx[3][0];
                p16 = video.pixels[m16+1]*blur_mtx[3][1];
                p17 = video.pixels[m17+1]*blur_mtx[3][2];
                p18 = video.pixels[m18+1]*blur_mtx[3][3];
                p19 = video.pixels[m19+1]*blur_mtx[3][4]; 
                p20 = video.pixels[m20+1]*blur_mtx[4][0];
                p21 = video.pixels[m21+1]*blur_mtx[4][1];
                p22 = video.pixels[m22+1]*blur_mtx[4][2];
                p23 = video.pixels[m23+1]*blur_mtx[4][3];
                p24 = video.pixels[m24+1]*blur_mtx[4][4];

				var blur_green = (p0+p1+p2+p3+p4+p5+p6+p7+p8+p9+p10+p11+p12+p13+p14+p15+p16+p17+p18+p19+p20+p21+p22+p23+p24)/256;
            
            
					
				p0 = video.pixels[m0+2]*blur_mtx[0][0];
				p1 = video.pixels[m1+2]*blur_mtx[0][1];
				p2 = video.pixels[m2+2]*blur_mtx[0][2];
                p3 = video.pixels[m3+2]*blur_mtx[0][3];
                p4 = video.pixels[m4+2]*blur_mtx[0][4];
                p5 = video.pixels[m5+2]*blur_mtx[1][0];
                p6 = video.pixels[m6+2]*blur_mtx[1][1];
                p7 = video.pixels[m7+2]*blur_mtx[1][2];
                p8 = video.pixels[m8+2]*blur_mtx[1][3];
                p9 = video.pixels[m9+2]*blur_mtx[1][4]; 
                p10 = video.pixels[m10+2]*blur_mtx[2][0];
                p11 = video.pixels[m11+2]*blur_mtx[2][1];
                p12 = video.pixels[m12+2]*blur_mtx[2][2];
                p13 = video.pixels[m13+2]*blur_mtx[2][3];
                p14 = video.pixels[m14+2]*blur_mtx[2][4]; 
                p15 = video.pixels[m15+2]*blur_mtx[3][0];
                p16 = video.pixels[m16+2]*blur_mtx[3][1];
                p17 = video.pixels[m17+2]*blur_mtx[3][2];
                p18 = video.pixels[m18+2]*blur_mtx[3][3];
                p19 = video.pixels[m19+2]*blur_mtx[3][4]; 
                p20 = video.pixels[m20+2]*blur_mtx[4][0];
                p21 = video.pixels[m21+2]*blur_mtx[4][1];
                p22 = video.pixels[m22+2]*blur_mtx[4][2];
                p23 = video.pixels[m23+2]*blur_mtx[4][3];
                p24 = video.pixels[m24+2]*blur_mtx[4][4];

				var blur_blue = (p0+p1+p2+p3+p4+p5+p6+p7+p8+p9+p10+p11+p12+p13+p14+p15+p16+p17+p18+p19+p20+p21+p22+p23+p24)/256;
            

        

				video.pixels[m12+0] = blur_red;
				video.pixels[m12+1] = blur_green;
				video.pixels[m12+2] = blur_blue;
				video.pixels[m12+3] = video.pixels[m22+3];

            
        }
            
        }    

        video.updatePixels();
                image(video, 0, 0, 640, 480);
    
}






function no_filter(){

        
    video.loadPixels();

            image(video, 0, 0, 640, 480);

}


