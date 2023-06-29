var Dialogs = require('dialogs')


function initeu(){
  var stageu = new createjs.Stage("canvasseu");
  var mainStageu = document.getElementById("canvasseu");
  mainStageu.mouseMoveOutside = true;
  stageu.mouseMoveOutside = true;


  //montre le pokemon si il est attrapé/purchased
  function showPokemon(object, x){
    var unSuperPokemon = new createjs.Bitmap("../Assets/"+object.name+".png");
    unSuperPokemon.x =x;
    unSuperPokemon.y = 90;
    unSuperPokemon.scale = 1;
    console.log(object)
    stageu.addChild(unSuperPokemon);

  }

  xStart = 80;
  xPosIncrement=0;
  allpkmn = saveObject.pokemons;
  allpkmn.forEach(thissElement =>{
    if(thissElement.purchased == true){ //a passer en true c'est que pour tester
      var unPokemon = new createjs.Bitmap("../Assets/"+thissElement.name+".png");
      console.log("test");
    }
    else{
      var unPokemon = new createjs.Bitmap("../Assets/interrogation.png");
    }
    unPokemon.x =xStart;
    unPokemon.y = 90;
    unPokemon.scale = 1;


    var unSocle = new createjs.Bitmap("../Assets/socle.png");
    unSocle.x =xStart -25;
    unSocle.y = 140;
    unSocle.scale = 1;


    unPokemon.addEventListener("click", function(evt) {
      // ici
      var bet = Math.floor(Math.random() * 101.00);      // returns a random integer from 0 to 100
      console.log("bet: "+bet);
      console.log("discoveringChance: "+ saveObject.discoveringChance);
      if(bet <= saveObject.discoveringChance){
        unPokemon.scale=00;
        thissElement.purchased =true;
        showPokemon(thissElement, unPokemon.x)
      }



      createjs.Tween.get(unPokemon, { loop: false })
      .to({x:unPokemon.x+10}, 10,createjs.Ease.cubicOut)
      .to({x:unPokemon.x-10}, 10,createjs.Ease.cubicOut)
      .to({x:unPokemon.x}, 10, createjs.Ease.cubicOut);

    })


    stageu.addChild(unSocle, unPokemon );
    xStart = unPokemon.x +240;

  });




  buttonX=1320;
  var option_button = new createjs.Bitmap("../Assets/UI/button.png");
  option_button.x =buttonX+2;
  option_button.y = -5;
  option_button.scale = 0.7;

  var option_button_clicked = new createjs.Bitmap("../Assets/UI/button_clicked.png");
  option_button_clicked.x =buttonX;
  option_button_clicked.y = -2;
  option_button_clicked.scale = 0.7;

  option_button.addEventListener("click", function(evt) {

    createjs.Tween.get(option_button_clicked, { loop: false })
    .to({visible:true}, 1000)
    .to({visible:false}, 1000);
    createjs.Tween.get(option_button, { loop: false })
    .to({visible:false}, 10)
    .to({visible:true}, 1000);

    const dialogs = Dialogs()

    dialogs.confirm('Attention ! TOUT va repartir à 0 😔 😔 ', ok => {
      console.log('confirm', ok);
      if(ok == true){
        // allpkmn = saveObject.pokemons;
        // allpkmn.forEach(ElementToUnBuy =>{
        //   purchased = false;
        // })
        //
        // allBoosts = saveObject.boosts;
        // allBoosts.forEach(ElementToUnBuy =>{
        //   purchased = false;
        // })
        //
        // allTrainers = saveObject.trainers;
        // allBoosts.forEach(ElementToUnBuy =>{
        //   purchased = false;
        // })
        saveObject.discoveringChance = 0;
        saveObject.pokeBallCount = 0;
        saveObject.currentPokeballBoostValue = 0;
        eraseSaveObject();
        document.location.reload();
      }

    })

  })

  stageu.addChild(option_button_clicked, option_button );

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", handleTick);
  function handleTick(event) {

    stageu.update();
  }

}
