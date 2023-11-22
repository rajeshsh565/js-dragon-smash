const btn = document.querySelector(".btn");
const dino = document.querySelector(".dino");
const dragon = document.querySelector(".dragon");
const arena = document.querySelector(".arena");
const message = document.querySelector(".message");
const messageText = document.querySelector(".message-text");
const score = document.querySelector(".score");

let dragonInterval = 8000;
let scoreCount = -1;

const timer = (n) => {
  setTimeout(() => {
    if (n == 1000) {
      messageText.style.display = "block";
      messageText.textContent = "3";
    }
    if (n == 2000) messageText.textContent = "2";
    if (n == 3000) messageText.textContent = "1";
  }, n);
};

window.addEventListener("DOMContentLoaded", ()=>{
     startHere();
})

const startHere =()=>{
     btn.addEventListener("click", (e) => {
          setTimeout(()=>{
               messageText.style.display = "none";
          },300);
     //   btn.style.display = "none";
     btn.style.visibility="hidden";
       timer(1000);
       timer(2000);
       timer(3000);
       setTimeout(() => {
         messageText.style.display = "none";
         startGame();
       }, 4000);
     });
}
const startGame = () => {
  dragonAttackBegin();
  dinoJump();
  dinoVSdragon();
};
////////////////////////////////Dragon n Difficulty////////////////////////////////
const dragonAttackBegin = () => {
  dragon.style.display = "block";
  dragon.classList.add("animateDragon");
  scoreNdifficulty();
};
let scoreNdifficulty = () => {
  if (
    window.getComputedStyle(dragon).getPropertyValue("animation-play-state") !=
    "paused"
  ) {
    scoreCount += 1;
    if (dragonInterval > 800) {
      dragon.classList.remove("animateDragon");
      dragon.style.setProperty(
        "--dragon-duration",
        dragonInterval - 600 + "ms"
      );
      dragonInterval = parseInt(
        window.getComputedStyle(dragon).getPropertyValue("--dragon-duration")
      );
      // dino.style.setProperty("--dino-duration", dinoInterval);
    }
    score.textContent = scoreCount;
    dragon.classList.add("animateDragon");
    setTimeout(scoreNdifficulty, dragonInterval);
  }
};
////////////////////////////////END of Dragon n Difficulty////////////////////////////////

const dinoJump = () => {
     window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowUp") {
      dino.classList.toggle("animateDino");
     }
});
};
////////////////////////////////FIGHTTTTTTT////////////////////////////////
const dinoVSdragon = () => {
  const fight = setInterval(() => {
    dragonX = parseInt(window.getComputedStyle(dragon).getPropertyValue("left"));
    dragonY = parseInt(window.getComputedStyle(dragon).getPropertyValue("top"));
    dinoX = parseInt(window.getComputedStyle(dino).getPropertyValue("left"));
    dinoY = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    if(dragonX<210 && dragonX >75 && dinoY>-100){
      dragon.style.animationPlayState = "paused";
      dino.style.animationPlayState = "paused";
      gameOver();
      clearInterval(fight);
    }
}, 10);
};

const gameOver = () =>{
     messageText.style.display = "block";
     // btn.style.display = "block";
     btn.style.visibility="visible";
     messageText.innerHTML = "GAME OVER!!!<br>Retry?"
     btn.textContent = "Restart";
     btn.addEventListener("click", ()=>{
          location.reload();
     })
}
