var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createSawBlade (x, y){
    var hitZoneSize = 25;
    var damageFromObstacle = 10;
    var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
    sawBladeHitZone.x = x;
    sawBladeHitZone.y = y;
    game.addGameItem(sawBladeHitZone);
    var obstacleImage = draw.bitmap("img/sawblade.png");
    sawBladeHitZone.addChild(obstacleImage);
    obstacleImage.x = -25;
    obstacleImage.y = -25;
    }

    for (var i = 0; i <= 5; i++){
      createSawBlade(num1, num2)
      var num1 = Math.random() * 1800;
      var num2 = Math.random() * 800 - 300;
    }
    
    function createEnemy(x, y){
    var enemy = game.createGameItem("enemy", 25);
    var redSquare = draw.rect(50, 50, "red");
    redSquare.x = -25;
    redSquare.y = -25;
    enemy.addChild(redSquare);
    enemy.x = x;
    enemy.y = y;
    game.addGameItem(enemy);
    enemy.velocityX = -1
    enemy.rotationalVelocity = Math.random() * 10

    enemy.onPlayerCollision = function () {
      game.changeIntegrity(-10)
    };
    enemy.onProjectileCollision = function () {
      game.increaseScore(100);
      enemy.shrink();
      
    }
  }
  
  // createEnemy(600, groundY - 15);
  // createEnemy(800, groundY - 50);
  // createEnemy(1000, groundY - 15);
  // createEnemy(1200, groundY - 50);
  // createEnemy(1400, groundY - 15);

    function createReward(x, y){
      var reward = game.createGameItem("reward", 25);
      var blueSquare = draw.rect(50, 50, "blue");
      blueSquare.x = -25;
      blueSquare.y = -25;
      reward.addChild(blueSquare);
      reward.x = x;
      reward.y = y;
      game.addGameItem(reward);
      reward.velocityX = -1
      reward.rotationalVelocity = Math.random() * 10
  
      reward.onPlayerCollision = function () {
        game.changeIntegrity(100)
      };
      reward.onProjectileCollision = function () {
        reward.shrink();
        
      }
    }
    // createReward(740, groundY - 105)
    // createReward(1000, groundY - 105)
    // createReward(1450, groundY - 105)

    function createMarker(x, y){
      var marker = game.createGameItem("marker", 25);
      var greenSquare = draw.rect(50, 50, "green");
      greenSquare.x = -25;
      greenSquare.y = -25;
      marker.addChild(greenSquare);
      marker.x = x;
      marker.y = y;
      game.addGameItem(marker);
      marker.velocityX = -1
      marker.rotationalVelocity = Math.random() * 10
  
      marker.onPlayerCollision = function () {
        marker.fadeOut();
        startLevel()
      };
      marker.onProjectileCollision = function () {
        marker.fadeOut();
        startLevel()
        
      }
    }
    // createMarker(1600, groundY - 15)

    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel]
      var levelObjects = level.gameItems
      for(var i = 0; i < levelObjects.length; i++){
        var object = levelObjects[i];
        if(object.type === "sawblade"){
          createSawBlade(object.x, object.y)
        }
        else if(object.type === "enemy"){
          createEnemy(object.x, object.y)
        }
        else if(object.type === "reward"){
          createReward(object.x, object.y)
        }
        else if(object.type === "marker"){
          createMarker(object.x, object.y)
        }
      }


      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
