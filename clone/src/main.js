'use strict';
import Popup from "./popup.js";
import Field from "./field.js";

const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 10;


const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');


const bugSound = new Audio('sound/bug_pull.mp3');
const gameWinSound = new Audio('sound/game_win.mp3');
const alertSound = new Audio('sound/alert.wav');
const bgSound = new Audio('sound/bg.mp3');

let started = false;
let score = 0;
let timer = undefined;


const gameFinishBanner = new Popup();
gameFinishBanner.setClickListener(() => {
    startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setCarrotSize(80);
gameField.setOnClickListener(onItemClick);

function onItemClick(item) {
    if (!started) {
        return;
    }
    if (item === 'carrot') {
        score++;
        updateScoreBoard();
        if (score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if (item === 'bug') {
        finishGame(false);
    }
}


gameBtn.addEventListener('click', event => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }

});

function startGame() {
    started = true;
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}


function stopGame() {
    started = false;
    stopGameTimer();
    hideGameStartBtn();
    gameFinishBanner.showWithText('REPLAY????');

    playSound(alertSound);
    stopSound(bgSound);
}

function finishGame(win) {
    started = false;
    hideGameStartBtn();
    if (win) {
        playSound(gameWinSound);
    } else {
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    gameFinishBanner.showWithText(win ? 'YOU WON' : 'YOU LOST');

}

function showStopBtn() {
    const icon = gameBtn.querySelector('.fa');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}


function hideGameStartBtn() {
    gameBtn.style.visibility = 'hidden';
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}


// innerText vs textContent
//innerText는 'Element'의 속성으로, 해당 Element 내에서 사용자에게 '보여지는' 텍스트 값을 읽어옵니다
//textContent는 'Node'의 속성으로, innetText와는 달리 <script>나 <style> 태그와 상관없이
// 해상 노드가 가지고 있는 텍스트 값을 그대로 읽습니다.
//또한, 'display:none' 스타일이 적용된 '숨겨진 텍스트' 문자열도 그대로 출력되는 것을 확인 할 수 있습니다.
//

function initGame() {
    score = 0;
    gameField.init();
    gameScore.innerText = CARROT_COUNT


}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function stopGameTimer() {
    clearInterval(timer);
}


function updateTimerText(time) {
    const min = Math.floor(time / 60);
    const seconds = time % 60;

    gameTimer.innerText = `${min}:${seconds}`;
}


function stopSound(sound) {
    sound.pause();
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}



