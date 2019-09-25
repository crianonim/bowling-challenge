var BowlingGame = function(){
  this.frameRolls = [];
  this.currentFrame = [];
};

BowlingGame.prototype.roll = function (pins) {
  this.frameRolls.push(pins);
  var isEven=this.frameRolls.length % 2 === 0
  console.log("LENGTH after roll with pins:",pins," l: ", this.frameRolls.length)
  var id="r"+this.frameRolls.length;
  console.log({id})
  document.getElementById(id).textContent=pins
  var score=this.currentScore();
  console.log({score})
  document.getElementById("score").textContent=score;
  if (pins===10 && !isEven){
      this.roll(0);
   }
};

BowlingGame.prototype.currentScore= function () {
  var result=0;
  for (var i=0;i<this.frameRolls.length;i++){
    result+=this.frameRolls[i];
  }
  return result;
}

BowlingGame.prototype.score = function () {
  var result = 0;
  var rollIndex = 0;
  var game = this;

  for(var frame = 0; frame < 10; frame++) {
    if (isStrike()) {
      result += strikeScore();
      rollIndex++
    } else if (isSpare()) {
      result += spareScore();
      rollIndex += 2
    } else {
      result += getScore();
      rollIndex += 2
    }
  }
  return result;

  function isSpare() {
    return (game.frameRolls[rollIndex] + game.frameRolls[rollIndex + 1] === 10);
  }

  function spareScore() {
    return game.frameRolls[rollIndex] + game.frameRolls[rollIndex +1] + game.frameRolls[rollIndex + 2];
  }

  function getScore() {
    return game.frameRolls[rollIndex] + game.frameRolls[rollIndex +1]
  }

  function isStrike() {
    return game.frameRolls[rollIndex] === 10;
  }

  function strikeScore() {
    return game.frameRolls[rollIndex] + game.frameRolls[rollIndex + 1] + game.frameRolls[rollIndex + 2];
  }

};
var game=new BowlingGame();
[5,4,10,4].forEach((el,i)=>setTimeout(()=>{
  game.roll(el);
},i*1000))
// setTimeout(()=>{
//   game.roll(5);
//   game.roll(4);
//   game.roll(7);
//   game.roll(3);
// },1000)