var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup

var survivalTime=0;
var score=0;
var ground,groundImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,400);

  monkey=createSprite(80,315,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.12;
  
  ground=createSprite(400,350,1000,10);
  ground.velocityX=-4;
  ground.x = ground.width /2;
  console.log(ground.x);
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
 
}


function draw() {
  background("white");
  
  //displaying score
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: "+ score, 400,50);
  
  stroke("white");
  textSize(20);
  fill("black");
  text("Survival Time: "+ survivalTime, 100,50);
  
  //gamestate play and gamestate end
  if(gameState === PLAY){
  
     survivalTime = survivalTime + Math.round(getFrameRate()/60);
    
    //Moving ground
    if (ground.x < 0) {
       ground.x = ground.width/2;
    }
    
    
    //jump when space key is pressed
    if (keyDown("space")&& monkey.y >= 100) {
      monkey.velocityY=-8;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
    
    
  }
    
  else if (gameState === END) {
  
      ground.velocityX = 0;
      monkey.velocityY = 0
      
    }
  

  
  monkey.collide(ground);
  
  spawnbanana();
  spawnObstacles();

  drawSprites();
  
  
function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(480,310,10,40);
   obstacle.velocityX = -(6 + survivalTime/100);
   obstacle.addImage(obstacleImage);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
       
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}
  
  function spawnbanana () {
    if (frameCount % 80 === 0) {
    var banana = createSprite(480,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  }
  } 
  
}






