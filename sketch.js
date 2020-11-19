var dog,dogImg,happyDog,happyDogImg,database,foodS,foodStock;
var gameState = 1;

function preload()
{
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png")
}

function setup() {
  createCanvas(500, 500);
  
  database = firebase.database();
  console.log(database);
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock,writeStock);

  dog = createSprite(250,250,10,10)
  dog.addImage(dogImg)
  dog.scale = 0.2;

}


function draw() {  
background(46,139,87)
 text("Press up arrow to feed the dog")
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(happyDogImg);
  }

  if(gameState===0&&keyDown("space")){
    console.log("hello")
   database.ref("Food").set({
    Food: 20
   })
  }
  console.log(gameState)
  drawSprites();
  fill("white")
  textSize(40)
  text("Food Remaining : "+foodS,80,440);
}

function readStock(data){
  foodS=data.val();

}

function writeStock(x){

  if(x<=0){
    x=0;
    gameState=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}

