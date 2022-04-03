'use strict';
const carrotSound = new Audio('sound/carrot_pull.mp3');

export default class Field {
    constructor(carrotCount, bugCount) {
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        // 그래서 자바스크립트 에서는 클래스 정보를 무시하고 싶지 않을때는 이함수를 클래스와 바인딩 해줘야 한다.
        // -> this.binding
        // 1. bind 직접 함숟에 this를 binding 해준다
        //this.onClick = this.onClick.bind(this);
        //2. arrow function으로 감싸준다. arrow function 은 this가 유지된다.
        //this는 Lexical this이다. 즉, 자신을 둘러싼 환경의 this를 그대로 계승 받는다. 다음과 같이 말이다.
        //this.field.addEventListener('click', (event)=>this.onClick(event));
        this.field.addEventListener('click', this.onClick);

    }
    // 해당 함수를 변수에 할당한다.
    onClick = event => {
        const target = event.target;
        if (target.matches('.carrot')) {
            target.remove();
            playSound(carrotSound);
            //이부분 함수가 실행이 안됨
            // 왜냐하면 자바스크립트에서 콜백으로 함수를 전달하면 그 함수만 전달되고 클래스에 포함된 정보는 전달되지 않는다.
            this.onItemClick && this.onItemClick('carrot');
        } else if (target.matches('.bug')) {
            this.onItemClick && this.onItemClick('bug');
        }
    }

    /*onClick(event) {
        const target = event.target;
        if (target.matches('.carrot')) {
            target.remove();
            playSound(carrotSound);
            //이부분 함수가 실행이 안됨
            // 왜냐하면 자바스크립트에서 콜백으로 함수를 전달하면 그 함수만 전달되고 클래스에 포함된 정보는 전달되지 않는다.
            this.onItemClick && this.onItemClick('carrot');
        } else if (target.matches('.bug')) {
            this.onItemClick && this.onItemClick('bug');
        }
    }*/

    init() {
        this._clearItem();
        this._addItem('carrot', this.carrotCount, 'img/carrot.png');
        this._addItem('bug', this.bugCount, 'img/bug.png');
    }

    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - this.carrotSize;
        const y2 = this.fieldRect.height - this.carrotSize;

        for (let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }

    _clearItem() {
        this.field.innerHTML = '';
    }

    setOnClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    setCarrotSize(size) {
        this.carrotSize = size;
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}
