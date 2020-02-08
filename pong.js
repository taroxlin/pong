const game = document.querySelector('canvas');
const ctx = game.getContext('2d');
game.width = 1000;
game.height= 500;
const cw = game.width;
const ch = game.height;
//sIze of game elements
const ballSize = 20;
const palletsWeight = 20;
const palletsHeight = 100;
const hLineW = 2;
const hLineH = 15;
//X and Y positions of move game elements
let ballX=(cw-ballSize)/2;
let ballY=(ch-ballSize)/2;
//Scores//
let playerScore = 0;
let compScore = 0;
const endScore = 10;
//player and AI  starting Positions//
const playerX = 30
let playerY= 200;
const compX = 950;
let compY =  200;
//starting speeds of ball
let ballSpeedX=-5;
let ballSpeedY=4;

//pausing vars//
let gameState = true;
let runInterval = setInterval(gameUpdate,1000/60);
document.addEventListener('keypress', pauseGame);

//
game.addEventListener("mousemove",playerPosition);
topGameScreen = game.offsetTop;


// drawing ball
function ball() {
  ctx.fillStyle= "white";
  ctx.fillRect(ballX,ballY,ballSize,ballSize);
  //top and bottom line collision
if(ballY>=ch-ballSize||ballY<= 0){
    ballSpeedY*=-1;
    speedUp();
  }


// Comp and player Gate Score
if(ballX<0){
 ballX=(cw-ballSize)/2;
 ballY=(ch-ballSize)/2;
ballSpeedX = -5;
 compScore+=1;
}else if (ballX>1000)
{
ballX=(cw-ballSize)/2;
 ballY=(ch-ballSize)/2;
 playerScore+=1;
 ballSpeedX = 5;
};

//player collision
if(ballX<=playerX+palletsWeight&&ballX>=playerX && playerY<=ballY+ballSize/2 &&ballY+ballSize/2<= playerY+palletsHeight){
    ballX=playerX+palletsWeight;
    ballSpeedX*=-1;
    speedUp();
  }
//PC collision
if(compX<=ballX+ballSize &&compX+palletsWeight>=ballX+ballSize && ballY+ballSize/2>=compY&&ballY+ballSize/2<=compY+palletsHeight)
{
  ballX=compX-ballSize;
  ballSpeedX*=-1;
}
  ballX+=ballSpeedX;
  ballY+=ballSpeedY;
};
// Drawing pallets
function player()
{
  ctx.fillStyle = 'green'
  ctx.fillRect(playerX,playerY,palletsWeight,palletsHeight,);

};
function comp(){
ctx.fillStyle= "Red";
ctx.fillRect(compX,compY,palletsWeight,palletsHeight);
};
// Drawing the Clean table + Half lines

function table (){
ctx.fillStyle = 'black';
ctx.fillRect(0,0,cw,ch);
ctx.fillStyle = 'gray';
for(let lPos=20; lPos < ch; lPos+=25)
{
  ctx.fillRect((cw-hLineW)/2,lPos,hLineW,hLineH);
  }
};
//Whole game Drawing
function gameUpdate(){
if(playerScore<=endScore && compScore<=endScore){
table();
scoreDraw();
compAi();
player();
ball();
comp();
}
whoWin()
};


// Converting mouse poistion to player pallet possition
function playerPosition(e){
playerY = (e.clientY-topGameScreen)-(palletsWeight/2);
if(playerY>=ch-palletsHeight){playerY=ch-palletsHeight};
if(playerY<=0) {playerY= 0;}
//compY=playerY;
};

//Scores
function scoreDraw (){
ctx.fillStyle = 'White';
ctx.font = "30px arial";
ctx.fillText(`${playerScore}`, 400, 50);
ctx.fillText(`${compScore}`, 600, 50);
};
//who Win Draw
function whoWin(){
  ctx.fillStyle = 'Yellow';
  ctx.font = '60px arial';
    if(playerScore>endScore){
      ctx.fillText(`HUMAN WINS !!!`, 200, 150)
    }else if(compScore>endScore){
      ctx.fillText(`COMPUTER WINS !!!`, 200, 150)
    }
}
//pause Communicate drawing
function pauseDraw(){
  ctx.fillstyle = 'Red'
  ctx.font = '60px arial';
   ctx.fillText('GAME PAUSED!!!',240 ,150);
   ctx.fillText('Press p to resume',240 ,200);
};




//Ai moving
function compAi(){
const midPcPos = compY+palletsHeight/2;
const midBallPos = ballY+ballSize/2;
if(ballX > 500){
    if(midPcPos - midBallPos>200){
      compY-= 16;
    }else if(midPcPos -midBallPos>50){
      compY-= 8;
      }
    else if(midPcPos - midBallPos<-200){
        compY+= 16;
      }else if(midPcPos -midBallPos<-50){
        compY+= 8;
        }
}else if (ballX<=500 && ballX>150){
  if(midPcPos -midBallPos>100){
  compY -=3;
  }else if(midPcPos -midBallPos<-100){
    compY +=3;
}}};
//speeding the ball
function speedUp()
{
  if(0<ballSpeedX&&ballSpeedX<25){
  ballSpeedX+=1;
}else if (0>ballSpeedX&&ballSpeedX>-25) {
ballSpeedX-=1;
}
};

function clog(a){
console.log(a.code);
}

function pauseGame(key){
  console.log(`1 Keycode ${key.keycode}`);
  if(key.code== 'KeyP'){
    console.log(`3 Keycode ${key.keyCode}`)
      if(!gameState){
        console.log(`4 Keycode ${key.keyCode}`)
        runInterval = setInterval(gameUpdate,1000/60);
      }else{
        console.log(`5 Keycode ${key.keyCode}`)
        pauseDraw();
         clearInterval(runInterval);
      }
        gameState = !gameState;
  }
};
