// selectors 
const squares = document.querySelectorAll('.square');
const score = document.getElementById('score');
const timeLeft = document.getElementById('timeLeft');
const mole = document.querySelector('.mole');
const gameInfo = document.querySelector('#info')
const startGameBtn = document.querySelector('.startGame');
const newGameBtn = document.querySelector('.newGame');
const ulLevelsBtn = document.querySelector('.btn-group');

let hitValue;
let result = 0;
let currentTime = 30;
let timer = null;
let countDownBegins = null
let duration = 1000;


let levelsBtn = document.querySelectorAll('.dropdown-item');
levelsBtn.forEach((btn) => btn.addEventListener('click', function (e) {
    // console.log(e.target.id);
    let level = e.target.id;
    if (level == 1) {
        duration = 1000
    } else if (level == 2) {
        duration = 800
    } else if (level == 3) {
        duration = 600
    } else if (level == 4) {
        duration = 400
    } else if (level == 5) {
        duration = 200
    }
}));


function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');
    // console.log(randomSquare)
    randomSquare.style.background = 'white'
    setTimeout(() => randomSquare.style.backgroundColor = '', 100)

    hitValue = randomSquare.id;
}
// randomSquare();


function moveMole() {
    timer = setInterval(randomSquare, duration);
}
// moveMole();

startGameBtn.addEventListener('click', () => {
    hideBtns();
    moveMole();
    decrementTime()
});

function hideBtns() {
    startGameBtn.style.display = 'none';
    ulLevelsBtn.style.visibility = 'hidden';
}

function showBtns() {
    ulLevelsBtn.style.visibility = 'visible';
    newGameBtn.style.display = 'block';
}

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
        showBtns()
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

    ulLevelsBtn.style.visibility = 'hidden';
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
