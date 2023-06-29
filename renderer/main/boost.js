
function initeuh(){

  var stagia = new createjs.Stage("boost-canvas");
  var mainStagia = document.getElementById("boost-canvas");
  mainStagia.mouseMoveOutside = true;
  stagia.mouseMoveOutside = true;


  var pokeballTitle = new createjs.Bitmap("../Assets/pokeball_title.png");
  pokeballTitle.x = 0;  //place where the image is
  pokeballTitle.y = 0;   //place where the image is
  pokeballTitle.scaleX = 0.8; //proportion of the image here is divided by two
  pokeballTitle.scaleY = 1; //same


  var pokeballTitleText = new createjs.Text("", "18px Arial", "#111");
  pokeballTitleText.text = "Pokeballs";
  pokeballTitleText.lineWidth = 550;
  pokeballTitleText.lineHeight = 22;
  pokeballTitleText.textAlign = "center";
  pokeballTitleText.y = 20;
  pokeballTitleText.x = stagia.canvas.width/2;


  stagia.addChild(pokeballTitle, pokeballTitleText);







  console.log(saveObject);
  i=0;
  allboost = saveObject.boosts;
  allboost.forEach(allboost =>createBoostItem());


  countBeforeRefresh =0;
  function createBoostItem(){
    //cliquable boost item
    visibleCount = 0; //never pass 5 visible item
    yStart = 65;






    allboost = saveObject.boosts;
    allboost.forEach(element =>{
      if(i<5 && element.purchased == false){
        var boostName = new createjs.Text("", "18px Arial", "#111");
        boostName.text = ""+element.name+" Prix: "+element.cost;
        boostName.lineWidth = 2000;
        boostName.lineHeight = 40;
        boostName.textAlign = "center";
        boostName.y = yStart+10;
        boostName.x = 115;


        var boostItem = new createjs.Bitmap("../Assets/boostItem.png");
        boostItem.x = -200;  //place where the image is
        boostItem.y = yStart;   //place where the image is
        boostItem.scale = 1;
        boostItem.opacity = 0.5;

        var pokeballSprite = new createjs.Bitmap("../Assets/pokeballsList/"+element.name+".png");
        pokeballSprite.x = 180;  //place where the image is
        pokeballSprite.y = yStart+3;   //place where the image is
        pokeballSprite.scale = 0.7;




        boostItem.addEventListener("click", function(evt) {
          console.log(countBeforeRefresh)
          //used to pay boosts
          if(saveObject.pokeBallCount>= element.cost){
            countBeforeRefresh++;

            element.purchased = true;
            saveObject.pokeBallCount =  saveObject.pokeBallCount -element.cost;
            saveObject.currentPokeballBoostValue = saveObject.currentPokeballBoostValue + element.boostVal;
            //ICIU
            createjs.Tween.get(boostName, { loop: false })
            .to({x:20}, 10)
            .to({x:780}, 500,createjs.Ease.cubicOut);

            createjs.Tween.get(boostItem, { loop: false })
            .to({x:20}, 10)
            .to({x:780}, 500,createjs.Ease.cubicOut);

            createjs.Tween.get(pokeballSprite, { loop: false })
            .to({x:180}, 10)
            .to({x:780}, 500,createjs.Ease.cubicOut);

            if (countBeforeRefresh ==5) {
              console.log("on est a 5 connard");
              countBeforeRefresh = 0;
              i=0;
              createBoostItem();
            }
          }
          else{
            console.log("Vous n'avez pas assez d'argent");
          }


        });


        createjs.Tween.get(pokeballSprite, { loop: false })
        .to({x:-200}, 10)
        .to({x:227}, 500,createjs.Ease.cubicOut);

        createjs.Tween.get(boostItem, { loop: false })
        .to({x:-200}, 10)
        .to({x:20}, 500+yStart,createjs.Ease.cubicOut);

        stagia.addChild(boostItem, pokeballSprite,boostName);
        yStart += 65;

        i++;

      }
      else{

      }
    });
    i++;



    //end of function
  }





  stagia.addChild(/*ajouter des trucs*/);

  createjs.Ticker.addEventListener("tick", handleTick);
  function handleTick(event) {
    stagia.update();
  }


}
