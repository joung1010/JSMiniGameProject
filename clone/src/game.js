'use strict'

import Field from "./field.js";
import * as sound from "./sound.js";
//Object.freeze() 메서드는 객체를 동결합니다.
// 동결된 객체는 더 이상 변경될 수 없습니다.
// 즉, 동결된 객체는 새로운 속성을 추가하거나 존재하는 속성을 제거하는
// 것을 방지하며 존재하는 속성의 불변성, 설정 가능성(configurability),
// 작성 가능성이 변경되는 것을 방지하고, 존재하는 속성의 값이 변경되는 것도 방지합니다.

export const Reason = Object.freeze({
   win : 'win',
   lose: 'lose',
   cancel : 'cancel'
});

//builder 패턴 사용하기
export  class GameBuilder {
    gameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    carrotCount(num) {
        this.carrotCount = num;
        return this;
    }

    bugCount(num) {
        this.bugCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        );
    }
}

class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount
        this.bugCount = bugCount;

        this.gameBtn = document.querySelector('.game__button');
        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn.addEventListener('click', event => {
            if (this.started) {
                this.stop();
            } else {
                this.start();
            }

        });

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setCarrotSize(80);
        this.gameField.setOnClickListener(this.onItemClick);

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    setGameStopListener(onGameStop) {
        this.onGameStop = onGameStop;
    }

    start() {
        this.started = true;
        this.initGame();
        this.showStopBtn();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackGround();
    }


    stop() {
        this.started = false;
        this.stopGameTimer();
        this.hideGameStartBtn();
        sound.playAlert();
        sound.stopBackGround();
        this.onGameStop && this.onGameStop(Reason.cancel);
    }

    finishGame(win) {
        this.started = false;
        this.hideGameStartBtn();
        if (win) {
            sound.playWin();
        } else {
            sound.playBug();
        }
        this.stopGameTimer();
        sound.stopBackGround();
        this.onGameStop && this.onGameStop(win ? Reason.win : Reason.lose);

    }

    onItemClick = (item) => {
        if (!this.started) {
            return;
        }
        if (item === 'carrot') {
            this.score++;
            this.updateScoreBoard();
            if (this.score === this.carrotCount) {
                this.finishGame(true);
            }
        } else if (item === 'bug') {
            this.finishGame(false);
        }
    }

    showStopBtn() {
        const icon = this.gameBtn.querySelector('.fa');
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }


    hideGameStartBtn() {
        this.gameBtn.style.visibility = 'hidden';
        this.gameBtn.style.visibility = 'hidden';
    }

    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }


    initGame() {
        this.score = 0;
        this.gameField.init();
        this.gameScore.innerText = this.carrotCount


    }

    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(() => {
            if (remainingTimeSec <= 0) {
                clearInterval(this.timer);
                this.finishGame(this.carrotCount === this.score);
                return;
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }

    stopGameTimer() {
        clearInterval(this.timer);
    }


    updateTimerText(time) {
        const min = Math.floor(time / 60);
        const seconds = time % 60;

        this.gameTimer.innerText = `${min}:${seconds}`;
    }


    updateScoreBoard() {
        this.gameScore.innerText = this.carrotCount - this.score;
    }


};