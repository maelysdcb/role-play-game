const miniPotion = 10;
const maxiPotion = 30;
let playerLife = 100;
let enemyLife = 100;
let smallPotion = 2;
let bigPotion = 2;
let nbPotionStock = smallPotion + bigPotion;

// HISTORIC LOGGER
let logger = document.querySelector(".log");

function playerLog(message) {
  logger.innerHTML = message + logger.innerHTML;
  logger.style.color = "#D3E876";
}

function enemyLog(message) {
  logger.innerHTML = message + logger.innerHTML;
  logger.style.color = "#F0542D";
}

// ATTACK PUNCH
function attackWithHands() {
  enemyLife -= 10;
  let punch = document.getElementById("punch");
  punch.play();

  if (enemyLife <= 0) {
    enemyLife = 0;
    reset();
    updateLife();
    return true;
  } else {
    playerLog(
      `<pre>PUNCH ! Enemy life is now at <strong>${enemyLife} hp</strong></pre>`
    );
  }
  updateLife();
  return false;
}

// COMBO ATTACK X3
function comboAttack(nbHits) {
  let isEnemyDead = false;
  let combo = document.getElementById("combo");
  combo.play();
  do {
    playerLog(`COMBO X3`);
    isEnemyDead = attackWithHands();
    nbHits--;
  } while (nbHits > 0 && !isEnemyDead);
}

// ATTACK WITH SWORD
function attackWithSword() {
  let sword = document.getElementById("sword");
  sword.play();
  enemyLife -= 20;
  if (enemyLife <= 0) {
    enemyLife = 0;
    reset();
  } else {
    playerLog(
      `<pre>SWING ! Enemy life is now at <strong>${enemyLife} hp</strong></pre>`
    );
  }
  updateLife();
}

// FIREBALL
function fireBall() {
  enemyLife = Math.floor(enemyLife / 2);
  let fireSpell = document.getElementById("fireball");
  fireSpell.play();
  if (enemyLife <= 0) {
    reset();
  } else {
    playerLog(
      `<pre>Incredible ! Enemy's life is now at <strong>${enemyLife} hp</strong></pre>`
    );
  }
  updateLife();
}

// ENEMY ATTACK
function enemyAttack() {
  playerLife -= 40;
  let playerGrunts = document.getElementById("playerGrunts");
  playerGrunts.play();
  if (playerLife <= 0) {
    playerLife = 0;
    reset();
  } else {
    enemyLog(
      `<pre>Enemy attacked ! Your life is now at <strong>${playerLife} hp</strong></pre>`
    );
  }
  updateLife();
}

// STEAL LIFE
function stealLife() {
  if (enemyLife > 20 && playerLife < 50) {
    let steal = document.getElementById("stealLife");
    steal.play();
    enemyLife -= 10;
    playerLife += 10;
    playerLog(
      `<pre>You steal life ! Your life is now at <strong>${playerLife} hp</strong><pre>Enemy's life is now at <strong>${enemyLife} hp</strong></pre>`
    );
  } else {
    alert(`Nah nah... you can't steal life`);
  }
  updateLife();
}

// TAKE A POTION
function takePotion(p) {
  let sPotions = document.getElementById("miniPotions");
  let bPotions = document.getElementById("maxiPotions");
  if (playerLife >= 100) {
    p = 0;
    alert("Nice try, but your life is full :)");
  }

  if (bigPotion > 0 && p == 30) {
    bPotions.play();
    bigPotion--;
    nbPotionStock--;
    playerLife += p;
    console.log(bigPotion);
    console.log(smallPotion);
    console.log(playerLife);
  } else if (bigPotion == 0 && p == 30) {
    alert("No maxi potions anymore");
  }

  if (playerLife + p > 100) {
    playerLife = 100;
    playerLog(
      `<pre>Glup ! You take a maxi potion, your life is now at <strong>${playerLife} hp</strong></pre>`
    );
  }

  if (smallPotion > 0 && p == 10) {
    sPotions.play();
    smallPotion--;
    nbPotionStock--;
    playerLife += p;
    playerLog(
      `<pre>Glup ! You take a mini potion, your life is now at <strong>${playerLife} hp</strong></pre>`
    );
  } else if (smallPotion == 0 && p == 10) {
    alert("No mini potions anymore");
  }
  updatePotions();
  updateLife();
}

//UPDATE POTION
function updatePotions() {
  const bPotions = document.querySelector(".inventory ul li span#minHeal");
  const sPotions = document.querySelector(".inventory ul li span#maxHeal");
  const nbPotions = document.querySelector(".inventory ul li span#totalHeal");
  bPotions.innerHTML = `${smallPotion}`;
  sPotions.innerHTML = `${bigPotion}`;
  nbPotions.innerHTML = `${nbPotionStock}`;
}
updatePotions();

// UPDATE LIFE
function updateLife() {
  const playerLifeBar = document.querySelector("#player .healthbar");
  const enemyLifeBar = document.querySelector("#enemy .healthbar");
  const pPlayer = document.querySelector("#player .healthbar span");
  const pEnemy = document.querySelector("#enemy .healthbar span");
  playerLifeBar.style.width = `${playerLife}%`;
  enemyLifeBar.style.width = `${enemyLife}%`;
  pPlayer.innerHTML = `${playerLife}hp`;
  pEnemy.innerHTML = `${enemyLife}hp`;

  if (playerLife <= 50) {
    playerLifeBar.style.background = "#f0542d";
  } else {
    playerLifeBar.style.background = "#1db379";
  }

  if (enemyLife <= 50) {
    enemyLifeBar.style.background = "#f0542d";
  } else {
    enemyLifeBar.style.background = "#1db379";
  }
}
updateLife();

// GAME OVER
function reset() {
  if (playerLife == 0) {
    playerLife = 100;
    enemyLife = 100;
    smallPotion = 2;
    bigPotion = 2;
    nbPotionStock = smallPotion + bigPotion;
    alert("You lose ❌ Press OK to restart !");
  } else if (enemyLife == 0) {
    enemyLife = 100;
    playerLife = 100;
    smallPotion = 2;
    bigPotion = 2;
    nbPotionStock = smallPotion + bigPotion;
    alert("You win ! 🥇 Press OK to restart !");
  }
  logger.innerHTML = ``;
  updateLife();
  updatePotions();
}

// RESET BUTTON
function reset2() {
  if (playerLife < 100 || nbPotionStock > 0) {
    playerLife = 100;
    enemyLife = 100;
    smallPotion = 2;
    bigPotion = 2;
    nbPotionStock = smallPotion + bigPotion;
  } else if (enemyLife < 100) {
    enemyLife = 100;
    playerLife = 100;
    smallPotion = 2;
    bigPotion = 2;
    nbPotionStock = smallPotion + bigPotion;
  }
  logger.innerHTML = ``;
  updateLife();
  updatePotions();
}

// MUSIC
function playStop() {
  let sound = document.getElementById("track");
  let controlBtn = document.getElementById("playPause");
  if (sound.paused) {
    sound.play();
    sound.volume = 0.5;
    controlBtn.innerHTML = `🔊`;
  } else {
    sound.pause();
    controlBtn.innerHTML = `🔇`;
  }
}
