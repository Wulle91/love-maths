
document.addEventListener("DOMContentLoaded", function(){
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons){
        button.addEventListener("click", function() {
            if(this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        })
    }

    document.getElementById('answer-box').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    })

    runGame("addition");
})

/**
 * the main game loop, called when the script is first loaded
 * and after the user´ss answer has been processed
 */

function runGame(gameType) {

    document.getElementById('answer-box').value = '';
    document.getElementById('answer-box').focus();

    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionalQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayAdditionalQuestion(num1, num2);
        document.getElementById('operator').textContent = '*';
    } else if (gameType === "subtract") {
        if(num1>num2){
            displayAdditionalQuestion(num1, num2);
            document.getElementById('operator').textContent = '-';
        } else {
            displayAdditionalQuestion(num2, num1);
            document.getElementById('operator').textContent = '-';
        }
    } else {
        displayAdditionalQuestion(num1*num2, num2);
        document.getElementById('operator').textContent = '/';
    } 
}


/**
 * Check the answer against the first element in
 * the returned calculateCorrectAnswer array.
 */
function checkAnswer() {
    
    let userAnswer = parseInt(document.getElementById('answer-box').value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
    
    if(isCorrect) {
        alert('Hey! you got it right! :D')
        incrementScore()
    } else {
        alert(`Awwwww... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

/** 
 * Gets the operands (the numbers) and the operator (plus, minus etc)
 * directly from the dom, and returns the correct answer
*/
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById('operand1').innerText);
    let operand2 = parseInt(document.getElementById('operand2').innerText);
    let operator = document.getElementById('operator').innerText;

    if(operator === "+") {
        return [operand1 + operand2, "addition"]
    } else if (operator === "*") {
        return [operand1 * operand2, "multiply"]
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"]
    } else {
        return [operand1 / operand2, "division"]
    }
}
/**
 * Gets current score from the DOM and incre,emts ot by one
 */
function incrementScore() { 
    let correct = document.getElementById('score');
    correct.innerHTML++;
}

/**
 * Gets current tally of incorrect answers from the DOM and increemts ot by one
 */
function incrementWrongAnswer() {
    let incorrect = document.getElementById('incorrect');
    incorrect.innerHTML++;
}

function displayAdditionalQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = '+';
}

function displaySubtractQuestion() {
/* document.getElementById('operand1').textContent = operand1>operand2 : operand1 : operand2
  if operand one is larger than operand2 return(:) operand1 operand2
  document.getElementById('operand1').textContent = operand1>operand2 : operand2 : operand1
  if operand one is larger than operand2 return(:) operand2 operand1
  */
}

function displayMultiplyQuestion() {

}

