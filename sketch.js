const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var obimg
var engine, world;
var ob,obgroup
var bulletG,bullet 
var score=0
var timeL=0
var time=0
var flag=0
var game="home"
var play,playImg
function preload(){
ob1img=loadImage("ob1.png")
ob2img=loadImage("ob2.png")
ob3img=loadImage("ob3.png")
spimg=loadImage("Game.png")
spup=loadImage("gameup.png")
bulimg=loadImage("bullet.png")
bg=loadImage("background.jpg")
explosion=loadSound("explosion.mp3")
theme=loadSound("theme.ogg")
playImg=loadImage("play2.png")
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  engine = Engine.create();
    world = engine.world;
   spaceship=createSprite(120,displayHeight/2)
   play=createSprite(displayWidth/2,displayHeight/2-100)
   play.addImage(playImg)
   obgroup=new Group();
   bulletG=new Group()
spaceship.addImage(spimg)
spaceship.scale=0.3
theme.play()
theme.loop();
}
setInterval(call,1000);
setInterval(sc,500);
function sc(){
  time=time+1
}
function call(){
  timeL=timeL+1
  flag=0
}
function draw() {
  background(bg);  
  Engine.update(engine);
  touches=[]
  console.log(touches)
          
  if(game==="home"){
    textSize(22)
   
    fill(random(0,255),random(0,255),random(0,255))
  text("Play",displayWidth/2-18,displayHeight/2-200)
  if(mousePressedOver(play)){
    game="play"
  }
    if(keyDown("space")){
      game="play"

    }
  }
  
  if(game==="play"){
    callob();
    play.x=20000000
    play.y=20000000

    if(spaceship.y>displayHeight){
      game="end"
    }
    fill("green")
    text("Score "+score,displayWidth-100,20)
   if(frameCount%10===0){
     score+=2
   }
    if(keyDown("space")){
      spaceship.y-=20 
      spaceship.addImage(spup) 
    }
    if(keyWentUp("space")){
      spaceship.y+=10
      spaceship.addImage(spimg) 
    }
    for(var i=0;i<obgroup.length;i++){
      if(obgroup.get(i).isTouching(spaceship)){
        obgroup.get(i).destroy()
        game="end"
      }
      
    }
    for (var i=0;i<obgroup.length;i++){
      
    for(var j=0;j<bulletG.length;j++){
      if(bulletG.get(j).isTouching(obgroup.get(i))){
        obgroup.get(i).destroy()
        bulletG.get(j).destroy()
        explosion.play()
        score+=40
        textSize(22)
   text("+10",displayWidth-100,80)
      }
    }
  }
 if(keyWentDown("ctrl")&&timeL%2===0&&flag===0){
   bullet=createSprite(spaceship.x,spaceship.y)
   bullet.addImage(bulimg)
   bullet.scale=0.7
   bullet.velocityX+=10
   bullet.lifetime=180
   bulletG.add(bullet)
   timeL=0
   flag=1
   
 }
    
    spaceship.y+=10
  }
  if(game==="end"){
    fill("red")
    text("Score "+score,displayWidth-100,20)
    obgroup.setVelocityXEach(0)
    obgroup.setLifetimeEach(0)
    spaceship.y+=5
  }
  

drawSprites()
}
function callob(){
  if (frameCount % 120===0&&game==="play"){
    ob=createSprite(displayWidth-20,random(150,displayHeight-100))
    ob.debug=true
    ob.setCollider("circle")
   ob.lifetime=1200
   ob.velocityX=-(3+score/50)
 
    var ran=Math.round(random(1,3))

    switch (ran){
      case 1: ob.addImage("ob",ob1img);ob.scale=random(0.4,1);break;
        case 2: ob.addImage("ob",ob2img);ob.scale=random(0.2,0.6);break;
          case 3: ob.addImage("ob",ob3img);ob.scale=random(0.4,1);break;
    }
obgroup.add(ob)
  }
}
