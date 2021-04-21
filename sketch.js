var PLAY = 1;
var END = 0;
var gameState = PLAY;
var asteroids, asteroid1, asteroid2, asteroid3;
var spaceship, spaceshipImg;
var laser;
var heart, heart1, heart2, heart3;
var life=0;

function preload() {
  spaceshipImg = loadImage("spaceship.png");
  spaceImg = loadImage("space.jpeg");
  heart1Img = loadImage("heart1.png");
  heart2Img = loadImage("heart2.png");
  heart3Img = loadImage("heart3.png");
  laserImg = loadImage("laser.png");
  asteroid1Img = loadImage("asteroid1.png")
  asteroid2Img = loadImage("asteroid2.png")
  asteroid3Img = loadImage("asteroid3.png")
  earthImg = loadImage("earth.png");
}

function setup() {
  createCanvas(1440, 710);
  spaceship = createSprite(720, 535, 50, 50);
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.5;

  earth = createSprite(730, 650)
  earth.addImage(earthImg)
  earth.scale = 0.7;

  asteroids = new Group();
  lasers = new Group();

  heart1 = createSprite(40, 35, 15, 15);
  heart1.addImage(heart1Img);
  heart1.scale = 0.07;
  heart2 = createSprite(100, 35, 15, 15);
  heart2.addImage(heart2Img);
  heart2.scale = 0.07;
  heart3 = createSprite(160, 35, 15, 15);
  heart3.addImage(heart3Img);
  heart3.scale = 0.07;

  //create invisible boundries
}

function draw() {
  background(spaceImg);

  if (gameState === PLAY) {
    if (keyWentDown("space")) {
      spawnLaser();
    }
    if (keyWentUp("space")) {
      console.log("hi")
    }
    if (keyDown("a")) {
      spaceship.x = spaceship.x - 5;
    }
    if (keyDown("d")) {
      spaceship.x = spaceship.x + 5;
    }
    if (asteroids.isTouching(spaceship)) {
      life=life+1;
      if(life==1){
        heart1.visible=false;
      }
      if(life==2){
        heart2.visible=false;
      }
      if(life==3){
        heart3.visible=false;
      }
    }
    // if(life===3){
    //   gameState=END;
    // }
    spawnAsteroids();
  } else if (gameState === END) {
    asteroids.setVelocityYEach(0);
    asteroids.setLifetimeEach(-1);
    if (keyDown("enter")) {
      reset();
    }
  }
  drawSprites();
}

function spawnLaser() {
  laser=createSprite(spaceship.x-80, spaceship.y-60, 5, 25);
  laser2=createSprite(spaceship.x+80, spaceship.y-60, 5, 25);
  laser.addImage(laserImg);
  laser2.addImage(laserImg);
  laser.scale = 0.2;
  laser2.scale = 0.2;
  laser.velocityY = -7;
  laser2.velocityY = -7;
  lasers.add(laser);
  lasers.add(laser2);
}

function spawnAsteroids() {
  if (frameCount % 120 === 0) {
    asteroid = createSprite(Math.round(random(200, 1240)), 5, 30, 30);
    asteroid.scale = 0.1;
    asteroid.velocityY = 4;

    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        asteroid.addImage(asteroid1Img)
        break;
      case 2:
        asteroid.addImage(asteroid2Img)
        break;
      case 3:
        asteroid.addImage(asteroid3Img)
        break;
      default: break;
    }
    asteroid.lifetime = 300;
    asteroids.add(asteroid);
  }
}

function reset() {
  gameState = PLAY;
  asteroids.destroyEach();
}