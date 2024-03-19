let listOfGeneratedNumbers = [];
let limitNumber = 10;
let secretNumber = generateRandomNumber();
let attempts = 1;

function showTextOnScreen(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'US English Male', {rate: 1.2});
}

function showInitialMessage() {
    showTextOnScreen('h1', 'Game Gumball of Secret Number');
    showTextOnScreen('p', 'Choose a number between 1 and 10');
}

showInitialMessage();

function verifyGuess() {
    let guess = document.querySelector('input').value;
    
    if (guess == secretNumber) {
        showTextOnScreen('h1', 'Congratulations!');
        let wordAttempts = attempts > 1 ? 'Attempts' : 'Attempt';
        let attemptsMessage = `You discovered the Secret Number with ${attempts} ${wordAttempts}`;
        showTextOnScreen('p', attemptsMessage);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        if (guess > secretNumber) {
            showTextOnScreen('p', 'The secret number is smaller');
        } else {
            showTextOnScreen('p', 'The secret number is greater');
        }
        attempts++;
        cleanField();

    }
}

function generateRandomNumber() {
    let numberChosen = parseInt(Math.random() * limitNumber + 1);
    let volumeNumbersinList = listOfGeneratedNumbers.length;

    if (volumeNumbersinList == limitNumber) {
        listOfGeneratedNumbers = [];
    }

    if (listOfGeneratedNumbers.includes(numberChosen)) {
        return generateRandomNumber();
    } else {
        listOfGeneratedNumbers.push(numberChosen);
        console.log(listOfGeneratedNumbers);
        return numberChosen;
    }
}

function cleanField() {
    guess = document.querySelector('input');
    guess.value = '';
}

function restartGame() {
    secretNumber = generateRandomNumber();
    cleanField();
    attempts = 1;
    showInitialMessage();
    document.getElementById('restart').setAttribute('disabled',true)
}

