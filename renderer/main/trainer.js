
function initar(){

  var stagio = new createjs.Stage("trainer-canvas");
  var mainstagio = document.getElementById("trainer-canvas");
  mainstagio.mouseMoveOutside = true;
  stagio.mouseMoveOutside = true;




  var trainerTitle = new createjs.Bitmap("../Assets/trainerTitle.png");
  trainerTitle.x = 70;  //place where the image is
  trainerTitle.y = 0;   //place where the image is
  trainerTitle.scaleX = 0.95; //proportion of the image here is divided by two
  trainerTitle.scaleY = 1; //same


  var titleText = new createjs.Text("", "25px Arial", "#ffffff");
  titleText.text = "Dresseurs";
  titleText.lineWidth = 2000;
  titleText.lineHeight = 40;
  titleText.textAlign = "center";
  titleText.y = 10;
  titleText.x = 190;

  stagio.addChild(trainerTitle, titleText);

  i=0;
  allboost = saveObject.trainers;
  allboost.forEach(allboost =>createBoostItem());


  counteBeforeRefresheuh =0;
  function createBoostItem(){
    //cliquable boost item
    visibleCount = 0; //never pass 5 visible item
    yStart = 65;



      allboost.forEach(thisElement =>{
        if(i<5 && thisElement.purchased == false){
        var boostName = new createjs.Text("", "18px Arial", "#111");
        boostName.text = ""+thisElement.name+" Recrutement: "+thisElement.cost;
        boostName.lineWidth = 2000;
        boostName.lineHeight = 40;
        boostName.textAlign = "center";
        boostName.y = yStart+10;
        boostName.x = 115;


        var boostItem = new createjs.Bitmap("../Assets/trainer.png");
        boostItem.x = -200;  //place where the image is
        boostItem.y = yStart;   //place where the image is
        boostItem.scaleX=1.2;
        boostItem.scaleY=1.4;
        boostItem.opacity = 0.5;

        var trainerSprite = new createjs.Bitmap("../Assets/player.png");
        trainerSprite.x = 180;  //place where the image is
        trainerSprite.y = yStart;   //place where the image is
        trainerSprite.scale = 1;
        trainerSprite.opacity = 0.;



        boostItem.addEventListener("click", function(evt) {

          //used to pay boosts
          if(saveObject.pokeBallCount>= thisElement.cost){
            counteBeforeRefresheuh++;

            thisElement.purchased = true;
            saveObject.pokeBallCount =  saveObject.pokeBallCount -thisElement.cost;
            saveObject.discoveringChance = saveObject.discoveringChance+thisElement.boostVal;
            createjs.Tween.get(boostName, { loop: false })
            .to({x:20}, 10)
            .to({x:780}, 500,createjs.Ease.cubicOut);

            createjs.Tween.get(boostItem, { loop: false })
            .to({x:20}, 10)
            .to({x:780}, 500,createjs.Ease.cubicOut);

            createjs.Tween.get(trainerSprite, { loop: false })
            .to({x:180}, 10)
            .to({x:780}, 500,createjs.Ease.cubicOut);



            if (counteBeforeRefresheuh ==5) {
              counteBeforeRefresheuh = 0;
              i=0;
              createBoostItem();
            }
          }
          else{
            console.log("Vous n'avez pas assez d'argent");
          }


        });


        createjs.Tween.get(trainerSprite, { loop: false })
        .to({x:-200}, 10)
        .to({x:290}, 500,createjs.Ease.cubicOut);

        createjs.Tween.get(boostName, { loop: false })
        .to({x:-200}, 10)
        .to({x:155}, 500,createjs.Ease.cubicOut);

        createjs.Tween.get(boostItem, { loop: false })
        .to({x:-200}, 10)
        .to({x:20}, 500+yStart,createjs.Ease.cubicOut);

        stagio.addChild(boostItem, trainerSprite,boostName);
        yStart += 65;

        i++;

      }
      else{

      }
      });
      i++;



//end of function
  }





  stagio.addChild(/*ajouter des trucs*/);

  createjs.Ticker.addEventListener("tick", handleTick);
  function handleTick(event) {
    stagio.update();
  }


}
