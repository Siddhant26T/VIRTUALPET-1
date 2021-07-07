//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage ("images/dogImg.png");
  happydogImg = loadImage ("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
 
  //creating dog
    dog = createSprite(250,300,50,50);
    dog.addImage(dogImg);
    dog.scale= 0.2;
  //fetching food
    foodStock = database.ref('Food');
    foodStock.on("value",readStock); 
    foodStock.set(50);
}


function draw() {  
   background(46, 139, 87);
  drawSprites();
  //add styles here
  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(happydogImg);
  }
  //to move it to normal position
  if(keyWentUp(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(dogImg);
  }
  //text
  textSize(15);
  fill ("white");
  stroke (5);
  text("Note: Press UP_ARROW key To feed and drag Milk!",100,20);
  textSize(20);
  text("FoodStock (Total Food):"+foodS,100,200)
}
function readStock(data) {
  foodS = data.val();
}
function writeStock(x) {
  if(x<=0){
    x = 0;
  }else 
  {
    x=x-0.5;
  }
   database.ref('/').update({
      Food:x
   })
}

