var dog, happyDog;
var database, foodS, foodStock;

function preload()
{
  dogImage=loadImage('images/dogImg.png');
  happyDogImage= loadImage('images/dogImg1.png');
  MilkImage= loadImage('virtual pet images/Milk.png');
  bedImage= loadImage('virtual pet images/Bed Room.png');
  deadImage= loadImage('virtual pet images/deadDog.png');
  gardenImage= loadImage('virtual pet images/Garden.png');
  injectImage= loadImage('virtual pet images/Injection.png');
}

function setup() {
	createCanvas(500, 500);
  database= firebase.database();

  milk= createSprite(240,250,10,10);
  milk.addImage(MilkImage);
  dog= createSprite(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale= 0.2;

  

  var feed= createButton('feedTheDog');
  feed.position(250,100);

  var addFood= createButton('addTheFood');
  addFood.position(250,200);

  foodStock=database.ref('food');
  foodStock.on("value", readStock);
}



function draw() {  

  
  //add styles here
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }
  drawSprites();
  fill ('black');
  text ('food is the stock'+ foodS, 200,100);
  
  
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  
  database.ref('/').update({food:x})
}
