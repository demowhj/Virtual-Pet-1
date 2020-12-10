var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(250, 250, 20, 20);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  foodStock = database.ref("food");
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  
  textSize(20);
  fill(255);

  text("Food remaining: "+foodS, 150, 100);
  text("Press 'UP' to feed Drago milk!", 120, 450);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 1){
    x = 0;
  }
  else{
    x = x - 1;
  }

  database.ref("/").update({
    food:x
  });
}

