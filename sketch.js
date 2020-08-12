var trex, trex_running, trex_hit, ground, score, invisible_ground, ground_image, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, clouds, cloudgroup, obstaclesgroup, bird_day, backdrop, time, moonimage, moon, gamestate, gameoverimage, gameover, trexlost, restartbutton, restart; 

function preload(){
  
  
  trex_running = loadAnimation("trex1.png",   "trex3.png", "trex4.png");
  trex_hit = loadImage("trex_collided.png");
  
  ground_image = loadImage("ground2.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  clouds = loadImage("cloud.png");   
  bird_day = loadAnimation("bird_day.png", "bird_day1.png");
  moonimage = loadImage("Capture.PNG");
  gameoverimage = loadImage("gameOver.png");
  trexlost = loadImage("trex_collided.png")
  restart= loadImage("restart.png");
}

function setup() {
  createCanvas(800, 200);
  backdrop = createSprite(800,100,1600,200);
  backdrop.shapeColor="white"
  
  trex= createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("lost", trexlost);
  trex.scale=0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground", ground_image);
  ground.velocityX=-5;
  
  gameover= createSprite(370,70,20,20);
  gameover.addImage("gameover", gameoverimage);
  gameover.scale=0.5;
  gameover.visible=false;
  
  restartbutton = createSprite(370,120,20,20);
  restartbutton.scale=0.5;
  restartbutton.addImage("restart",restart);
  restartbutton.visible=false;
  
  invisibleground =createSprite(200,180,400,10);
  invisibleground.visible=false;
  
  
  
  cloudgroup=new Group();
  obstaclesgroup=new Group();
  time=0
  score=0;
moon = createSprite(20,40,20,20);
moon.addImage("moon", moonimage);
moon.scale=0.3;
moon.visible=false;
 gamestate="playing";
}

function draw() {

background(150);
trex.collide(invisibleground);
if(gamestate=="playing"){
  


  score=score+0.25;  

      if(keyDown("space")){
       trex.velocityY=-10;

    }
    trex.velocityY=trex.velocityY+0.8;
    if(ground.x<0){
      ground.x=ground.width/2;
    }
  Spawn_Obstacles();
  Spawn_Clouds();
  if(score>300){
  Spawn_Birds();
  }
  if(score%300==0 && score!=0){
    time=time+1;
  }
  if(time%2==0){
  backdrop.shapeColor="white";
  fill("black");
  moon.visible=false;
  }

  if(time%2==1){
  backdrop.shapeColor="black";
  fill("white");
  moon.visible=true;
  trex.depth=moon.depth+1;
  }
if(obstaclesgroup.isTouching(trex)){
gamestate="end";   

}
  drawSprites();

  textSize(20);
  text("Score:" + Math.round(score), 450 ,40);
  }
if(gamestate=="end"){
ground.velocityX=0;
invisibleground.velocityX=0;
gameover.visible=true;
obstaclesgroup.setVelocityXEach(0);
cloudgroup.setVelocityXEach(0);
obstaclesgroup.setLifetimeEach(-1);
cloudgroup.setLifetimeEach(-1);
trex.changeAnimation("lost",trexlost)
  drawSprites();
restartbutton.visible=true;
  textSize(20);
  text("Score:" + Math.round(score), 450 ,40);
if(mousePressedOver(restartbutton)){
Reset();
gamestate="playing";
}
}
   
}

  

function Spawn_Obstacles(){
  if(frameCount%60==0){
    z=Math.round(random(1,6));
    var obstacle = createSprite(800,160,20,20);
    obstacle.velocityX=-5;
    obstacle.scale=0.5;
    obstaclesgroup.add(obstacle);
    obstacle.lifetime=-800/obstacle.velocityX;
    switch(z){
      case 1: obstacle.addImage("obstacle",obstacle1);
      break;
      case 2: obstacle.addImage("obstacle",obstacle2);
      break;
      case 3: obstacle.addImage("obstacle",obstacle3);
      break;
      case 4: obstacle.addImage("obstacle",obstacle4);
      break;
      case 5: obstacle.addImage("obstacle",obstacle5);
      break;
      case 6: obstacle.addImage("obstacle",obstacle6);
      break;
    }
  }

}
function Spawn_Clouds(){
  if(frameCount%80==0 || frameCount==0){ 
  var cloud = createSprite(800,random(50,100),20,20);
  cloud.velocityX=-5;
  cloud.addImage("cloud",clouds);
  cloud.scale=0.5;
  cloudgroup.add(cloud);
  trex.depth=cloud.depth+1;
  cloud.lifetime=-800/cloud.velocityX;
  }

}
function Spawn_Birds(){
  if(frameCount%100==0){ 
  var bird = createSprite(800,random(50,100),20,20);
  bird.velocityX=-5;
  bird.addAnimation("bird",bird_day);
  bird.scale=0.5;
  obstaclesgroup.add(bird);
  trex.depth=bird.depth+1;
  bird.lifetime=-800/bird.velocityX;
  bird.scale=0.2;
  }

}
function Reset(){
trex.y=180;
obstaclesgroup.destroyEach();
cloudgroup.destroyEach();
score=0;
gameover.visible=false;
ground.velocityX=-5;
restartbutton.visible=false;
trex.changeAnimation("running", trex_running);

}