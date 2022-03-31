'use strict';
const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click',event=>{
    if (started) {
        stopGame();
    } else {
        startGame();
    }
    started = !started;
});

function startGame() {
    initGame();
    showStopBtn();
    showTimerAndScore();
    startGameTimer();
}


function stopGame() {

}

function showStopBtn() {
    const icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
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
    field.innerHTML='';
    gameScore.innerText =CARROT_COUNT;
    //벌레와 당근을 생성한뒤 field에 추가하자
    addItem('carrot',CARROT_COUNT,'img/carrot.png')
    addItem('bug',BUG_COUNT,'img/bug.png')
}

function startGameTimer() {

}


function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;

    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class',className);
        item.setAttribute('src',imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1,x2);
        const y = randomNumber(y1,y2);
        item.style.left=`${x}px`;
        item.style.top=`${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min,max){
    return Math.random() * (max - min) + min;
}
