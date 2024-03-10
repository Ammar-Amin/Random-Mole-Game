// selectors 
const squares = document.querySelectorAll('.square');
const score = document.getElementById('score');
const timeLeft = document.getElementById('timeLeft');
const mole = document.querySelector('.mole');
const gameInfo = document.querySelector('#info')
const newGameBtn = document.querySelector('.newGame');
const startGameBtn = document.querySelector('.startGame');

let hitValue;
let result = 0;
let currentTime = 30;
let timer = null;
let countDownBegins = null


function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');
    // console.log(randomSquare)

    hitValue = randomSquare.id;
}
// randomSquare();


function moveMole() {
    timer = setInterval(randomSquare, 800);
}
// moveMole();

startGameBtn.addEventListener('click', () => {
    startGameBtn.style.display = 'none';
    moveMole();
    decrementTime()
});

squares.forEach(square => {
    square.addEventListener('click', () => {
        if (square.id == hitValue) {
            result++;
            score.innerText = result;
            hitValue = null;
        }
    })
})


function countDown() {
    currentTime--;
    timeLeft.innerText = currentTime;

    if (currentTime == 0) {
        // alert('Times up')
        clearInterval(countDownBegins)
        clearInterval(timer)

        gameInfo.innerText = `Game Over, You Score is ${result}. Wanna Break it..?`
        gameInfo.style.color = "white"

        document.querySelector('body').style.backgroundColor = 'red';
        newGameBtn.style.display = 'block';
    }
}

function decrementTime() {
    countDownBegins = setInterval(countDown, 1000);
}


newGameBtn.addEventListener('click', function () {
    document.querySelector('body').style.backgroundColor = '';
    newGameBtn.style.display = 'none';
    gameInfo.innerText = `Your Previous Score was ${result}`
    gameInfo.style.color = "rgb(83, 252, 5)"
    newGame();
})

function newGame() {
    result = 0;
    score.textContent = result;
    currentTime = 30;
    timeLeft.textContent = currentTime;

    moveMole();
    decrementTime();
}

