saveObjectTemplate = {
  clickCount:0,
  pokeBallCount:0,
  currentPokeballBoostValue:0,
  discoveringChance:0.00,
  boosts:[{
    name:'Pokeball',
    cost:10,
    purchased:false,
    boostVal: 1
  },{
    name:'safariBall',
    cost:50,
    purchased:false,
    boostVal: 1
  },{
    name:'faibloBall',
    cost:100,
    purchased:false,
    boostVal: 1
  },{
    name:'luneBall',
    cost:100,
    purchased:false,
    boostVal: 1
  },
  {
    name:'luxeBall',
    cost:100,
    purchased:false,
    boostVal: 5
  },{
    name:'niveauBall',
    cost:100,
    purchased:false,
    boostVal: 2
  },{
    name:'soinBall',
    cost:150,
    purchased:false,
    boostVal: 5
  },
  {
    name:'noonBall',
    cost:200,
    purchased:false,
    boostVal: 5
  },
  {
    name:'appatBall',
    cost:100,
    purchased:false,
    boostVal: 5
  },{
    name:'bisBall',
    cost:500,
    purchased:false,
    boostVal: 10
  },{
    name:'filetBall',
    cost:500,
    purchased:false,
    boostVal: 10
  },{
    name:'masseBall',
    cost:1000,
    purchased:false,
    boostVal: 50
  },{
    name:'sombreBall',
    cost:1500,
    purchased:false,
    boostVal: 50
  },{
    name:'superBall',
    cost:25000,
    purchased:false,
    boostVal: 200
  },{
    name:'hyperBall',
    cost:50000,
    purchased:false,
    boostVal: 500
  },{
    name:'masterBall',
    cost:100000,
    purchased:false,
    boostVal: 2000
  },{
    name:'ultraBall',
    cost:500000,
    purchased:false,
    boostVal: 10000
  },{
    name:'memoireBall',
    cost:1000000000,
    purchased:false,
    boostVal: 50000
  },
],
pokemons:[{name: 'tortank',
purchased:false
},
{name: 'dracaufeu',
purchased:false
},
{name: 'florizarre',
purchased:false
},
{name: 'pikachu',
purchased:false
},
{name: 'lokhlass',
purchased:false
},
{name: 'ronflex',
purchased:false
},],
trainers:[
  {
    name:'Elliot',
    cost:10,
    purchased:false,
    boostVal: 1
  },{
    name:'Josh',
    cost:10000,
    purchased:false,
    boostVal: 2
  },{
    name:'ASH',
    cost:1000000,
    purchased:false,
    boostVal: 5
  },
  {
    name:'Ethan',
    cost:1000000,
    purchased:false,
    boostVal: 10
  },
  {
    name:'Brendan',
    cost:10000000,
    purchased:false,
    boostVal: 15
  },]


}
saveObject = JSON.parse(localStorage.getItem('save-object')) || saveObjectTemplate;
function init() {
  var stage = new createjs.Stage("click-canvas");
  var mainStage = document.getElementById("click-canvas");
  mainStage.mouseMoveOutside = true;
  stage.mouseMoveOutside = true;


  var pokeballTitle = new createjs.Bitmap("../Assets/clickTitle.png");
  pokeballTitle.x = 0;  //place where the image is
  pokeballTitle.y = 0;   //place where the image is
  pokeballTitle.scaleX = 1; //proportion of the image here is divided by two
  pokeballTitle.scaleY = 0.5; //same
  stage.addChild(pokeballTitle);



  //count the amount of pokeBALLS
  var counter = new createjs.Text("", "18px Arial", "#111");
  counter.text = ""+saveObject.pokeBallCount+"";
  counter.lineWidth = 550;
  counter.lineHeight = 22;
  counter.textAlign = "center";
  counter.y = 10;
  counter.x = stage.canvas.width/2;

  //show the percentage of dropping a pokemon
  var counter_discovering = new createjs.Text("", "18px Arial", "#111");
  counter_discovering.text = "Taux de capture:"+saveObject.discoveringChance+"";
  counter_discovering.lineWidth = 550;
  counter_discovering.lineHeight = 22;
  counter_discovering.textAlign = "center";
  counter_discovering.y = 20;
  counter_discovering.x = 100;


  function addPokeball(){
    saveObject.pokeBallCount += 1;
    counter.text="Pokeball: "+saveObject.pokeBallCount+"";
    // counter_discovering.text="Taux de capture: "+saveObject.discoveringChance+"";
  }
  function addClick(){
    saveObject.clickCount +=1;
    console.log("vous avez clické"+saveObject.clickCount+", fois")
  }
  var pokeballPerSec = new createjs.Text("", "18px Arial", "#111");
  pokeballPerSec.text = "0";
  pokeballPerSec.lineWidth = 550;
  pokeballPerSec.lineHeight = 22;
  pokeballPerSec.textAlign = "center";
  pokeballPerSec.y = 30;
  pokeballPerSec.x = stage.canvas.width/2;

  function addPokeballEverySeconds() {
    setInterval(increasePokeball, 1000);

  }

  function increasePokeball() {
    //TO DO : Create and add boosters
    saveObject.pokeBallCount = saveObject.pokeBallCount+1;//initial value that increment every second when you start the game
    saveObject.pokeBallCount = saveObject.pokeBallCount+ saveObject.currentPokeballBoostValue;
    counter.text= "Pokeball: "+saveObject.pokeBallCount;
    counter_discovering.text = "Taux de capture:"+saveObject.discoveringChance+"";
    pokeballPerSec.text = "+"+saveObject.currentPokeballBoostValue;
    save();
    pokeballRain();




  }

  addPokeballEverySeconds();
  //clickable pokeball (square image)
  var pokeyball = new createjs.Bitmap("../Assets/pokeball.png");
  pokeyball.x = 300;  //place where the image is
  pokeyball.y = 200;   //place where the image is
  pokeyball.scaleX = 0.5; //proportion of the image here is divided by two
  pokeyball.scaleY = 0.5; //same
  //pokeyball animation (roll)
  createjs.Tween.get(pokeyball, { loop: true })
  .to({rotation:360}, 8000)



  //pokeyballW = pokeyball.image.width; //size in pixels of the image
  //pokeyballH = pokeyball.image.height; //size in pixels of the image
  pokeyball.regX = 512/2; //can't get the image size (so i just read the size on the image file)
  pokeyball.regY = 512/2;

  //i need to create start x,y because every time I clicked the pokeball change his place
  start=0; startY=0;
  startX = pokeyball.x; startY = pokeyball.y;



  pokeyball.addEventListener("click", function(evt) {
    addPokeball();
    addClick();
    pokeballRain();
    createjs.Tween.get(pokeyball, { loop: false })
    .to({x:startX-10,y:startY-10, scaleX: 0.55, scaleY:0.55 }, 100, createjs.Ease.elasticInOut)
    .to({x:startX,y:startY, scaleX: 0.5, scaleY:0.5}, 100, createjs.Ease.elasticInOut)
    console.log("click");
  });


  //display some pokeball and make it fall down
  function pokeballRain(){

    var pokeball = new createjs.Bitmap("../Assets/pokeball-sprite.png");
    pokeball.x = Math.floor(Math.random() * 800) + -200 ;
    pokeball.y = Math.floor(Math.random() * 360) + -100 ;
    pokeball.scaleX = Math.floor(Math.random() * 1) + 0.05 ;
    pokeball.scaleY = Math.floor(Math.random() * 1) + 0.05 ;
    pokeball.visible = true;

    createjs.Tween.get(pokeball, { loop: false })
    .to({y:360}, 1000)
    .to({visible:false},10)

    stage.addChild(pokeball);
    var pokeball = null;
  }




  //brendan's spritesheet ( framerate issue...)
  // var brendan = {
  //   images: ["../Assets/spritesheet/tall-brendan.png"],
  //   frames:{width:57,height:63,regX:0,regY:0,framerate:15},
  //   animations: {
  //     throw:[0,1,2,3]
  //   },
  // };
  // var spriteSheet = new createjs.SpriteSheet(brendan);
  // var animation = new createjs.Sprite(spriteSheet, "throw");
  // animation.framerate = 15;
  // animation.x=50;
  //animation.y=50;
  //stage.addChild(animation);


  stage.addChild(pokeyball, counter, pokeballPerSec, counter_discovering);

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", handleTick);
  function handleTick(event) {

    stage.update();
  }

}
