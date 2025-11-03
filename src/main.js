let playerHP = 100;
let monsterHP = 100;
let gameOver = false;

let playerWins = 0;
let monsterWins = 0;

const cpuScore = document.querySelector(".cpu")
const playerScore = document.querySelector(".player")
let messageEl = document.querySelector("myMessage")

// buttons
const attackBtn = document.querySelector("#attackBtn");
const healBtn = document.querySelector("#healBtn");
const newGameBtn = document.querySelector("#newGameBtn")
//button clears local storage
const resetBtn = document.querySelector("#resetBtn")

attackBtn.disabled = true
healBtn.disabled = true

const logStatus = document.querySelector("#log")

//display the win records 

const playerWinsDisplay = document.getElementById("playerWinsDisplay");
const monsterWinsDisplay = document.getElementById("monsterWinsDisplay");


let storedPlayer = localStorage.getItem("playerWins")

let storedCpu = localStorage.getItem("monsterWins")



function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// render player and his health with  health stats for clearlity 
function renderPlayer(){
  playerScore.innerHTML = `
       <img src="./src/img/yoda.png" alt="Player" id="playerSprite">
   
      <div class="playersHealth"> 
        <strong> Health</strong> ${playerHP} 
      </div>
      `
}

function updatePlayersHealth(){
  const playersHealthEl = document.querySelector(".playersHealth")
  if(playersHealthEl){
    playersHealthEl.innerHTML = `<strong> Health</strong> ${playerHP}`
  }
}


// render cpu and his health
function renderCpu(){
    cpuScore.innerHTML = ` 
    <img src="./src/img/jabba.png" alt="Monster" id="monsterSprite">
      <div class="cpuHealth"> <strong> Health</strong> ${monsterHP}
     </div>`
}

function updateCpuHealth() {
  let cpuHealthEl = document.querySelector(".cpuHealth")
  if (cpuHealthEl) {
    cpuHealthEl.innerHTML = ` <strong> Health</strong> ${monsterHP}`
  }
}

//log for clarity 
function addlog(message){

  logStatus.innerHTML += `<p class="myMessage"> ${message} </p>`
}

//need game over to check for user to win or cpu to win 
//  and also figure out how to display just 0 for the loser


function checkGameOver(){
   if (monsterHP <= 0){
    monsterHP = 0
    updateCpuHealth()
    addlog("baby yoda wins this time!")
    gameOver = true
     playerWins++
     updateScore()
  
   } else if (playerHP <= 0) {
 playerHP = 0
    updatePlayersHealth()
     addlog("baby yoda lost this time!")
     gameOver = true
     monsterWins++
     updateScore()
   }
  if (gameOver) {
    attackBtn.disabled = true
    healBtn.disabled = true
  }
}



newGameBtn.addEventListener("click", function(){
   playerHP = 100
   monsterHP = 100
   gameOver = false
  
  logStatus.innerHTML = "";

    renderPlayer()
    renderCpu()

   addlog( `you attack first! Remember you can't go 100% health!  The attack and heal are random so good luck `)
   
  attackBtn.disabled = false
  healBtn.disabled = true

});

healBtn.addEventListener("click", function () {
  if (gameOver) return


  const heal = randInt(5, 25)
  playerHP += heal

  // Cap health at 100
  if (playerHP > 100) playerHP = 100

  // Always update and log
  updatePlayersHealth()
  addlog(`You heal for ${heal} HP.`)



  // Monster attacks after a delay
  setTimeout(monsterAttack, 1000)
})




attackBtn.addEventListener("click", function(){
  if (gameOver) return
  
  let damage = randInt(10, 45)
  monsterHP -= damage;
  logStatus.innerHTML = ""
  addlog(`You did ${damage} to Jabba the hut`)
  updateCpuHealth()

  checkGameOver()
  if (gameOver) return

  healBtn.disabled = false

  setTimeout(monsterAttack, 1000)
  
})
// fuction named monster if i want to show different 
// monsters and power levels in arrays but keep it simple for now

function monsterAttack(){
  if (gameOver) return

  let damage = randInt(10, 45)
  logStatus.innerHTML  += ""
  playerHP -= damage 
  updatePlayersHealth()
  addlog( `<p> jabba did ${damage} to your baby yoda </p>`)

  checkGameOver()
}


function loadScores() {
  var storedPlayer = localStorage.getItem("playerWins");
  var storedMonster = localStorage.getItem("monsterWins");

  if (storedPlayer === null) {
    playerWins = 0;
    localStorage.setItem("playerWins", "0");
  } else {
    playerWins = parseInt(storedPlayer, 10);
    if (isNaN(playerWins)) {
      playerWins = 0;
    }
  }

  if (storedMonster === null) {
    monsterWins = 0;
    localStorage.setItem("monsterWins", "0");
  } else {
    monsterWins = parseInt(storedMonster, 10);
    if (isNaN(monsterWins)) {
      monsterWins = 0;
    }
  }

  updateScore();
}

function updateScore() {
 
  playerWinsDisplay.textContent = playerWins;
  monsterWinsDisplay.textContent = monsterWins;

  localStorage.setItem("playerWins", playerWins.toString());
  localStorage.setItem("monsterWins", monsterWins.toString());

   if (playerWins > 0 || monsterWins > 0){
   } else {
     resetBtn.disabled = true;
   }
   
}

resetBtn.addEventListener("click", function(){
  localStorage.clear()
  playerWins = 0;
  monsterWins = 0
  updateScore()
  addlog("all records cleared!")
  resetBtn.disabled = true;
})

loadScores();

