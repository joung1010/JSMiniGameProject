'use strict';
import Popup from "./popup.js";
import Field from "./field.js";

const gamePlayField = new Field(20,20);
gamePlayField.setCarrotSize(80);

const CARROT_COUNT =gamePlayField.getCarrotCount();
const BUG_COUNT = gamePlayField.getBugCount();

const GAME_DURATION_SEC = 10;



const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const gameFinishBanner = new Popup();

const carrotSound = new Audio('sound/carrot_pull.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const gameWinSound = new Audio('sound/game_win.mp3');
const alertSound = new Audio('sound/alert.wav');
const bgSound = new Audio('sound/bg.mp3');

let started = false;
let score = 0;
let timer = undefined;

gamePlayField.setOnClickListener(onFiledClick);

gameFinishBanner.setClickListener(()=>{
    startGame();
});

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
    gamePlayField.clearItem();
    gameScore.innerText = CARROT_COUNT
    //벌레와 당근을 생성한뒤 field에 추가하자
    gamePlayField.addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    gamePlayField.addItem('bug', BUG_COUNT, 'img/bug.png');
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

function onFiledClick(event) {
    if (!started) {
        return;
    }
    const target = event.target;

    //matches 해당 css가 맞는지지
    if (target.matches('.carrot')) {
        //당근
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if (score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if (target.matches('.bug')) {
        finishGame(false);
    }
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function updateScoreBoard() {
    gameScore.innerText = CARROT_COUNT - score;
}




