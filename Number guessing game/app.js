
//game value
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max);
    guessesLeft = 3;

//UI Elements

const game = document.querySelector('#game'),
    minNum = document.querySelector('.min_num'),
    maxNum = document.querySelector('.max_num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//Asign Ui min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function(e) {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
})

//listen for guess
guessBtn.addEventListener('click', function() {
  //guess
  let guess = parseInt(guessInput.value);

  //Validate
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please a number between ${min} and ${max}`, 'red');
  } else {
    //check if won
    if(guess === winningNum) {
      //GAME OVER WON 
      gameOver(true, `${winningNum} is correct, YOU WIN!`);
    } else {
      //wrong number
      guessesLeft -= 1;
      
      if(guessesLeft === 0) {
        //game over - lost
        gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
      } else {
        //game continues - answer wrong
        //change border color
        guessInput.style.borderColor = 'red';
        //clear input
        guessInput.value = '';
        //tell user is the wrong number
        setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
      }
    }
  }
});

//Game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red';
  //Disable Input
  guessInput.disabled = true;
  //set text color
  message.style.color = color;
  //change border color
  guessInput.style.borderColor = color;
  // Set messasge
  setMessage(msg);

  //play again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

//get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}