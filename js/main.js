const controllerBtn = document.querySelector('.controller__btn');
const items = document.querySelector('.play__items');
const counter = document.querySelector('.counter');

let intervalId
controllerBtn.addEventListener('click', event => {
    let btnType = event.currentTarget.children[0].id
    if (btnType === 'startBtn') {
        if (items.childElementCount > 0) {
            items.innerHTML = '';
        }
        intervalId = setTimeout(10);
        controllerBtn.innerHTML = `<i class="fa fa-stop" aria-hidden="true" id="stopBtn"></i>`;
        makeRandomItems(10);
    } else {
        clearInterval(intervalId)
        controllerBtn.innerHTML = `<i class="fa fa-play" aria-hidden="true" id="startBtn"></i>`;
    }

});

//setInterval 정해진 시간마다 callback 함수 호출

function setTimeout(sec) {
    let time = sec;
    const timer = document.querySelector('.controller__timer');
    timer.textContent = `0:${time}`;
    let intervalId = setInterval(() => {
        time--;
        timer.textContent = `0:${time}`;
        if (time === 0) {
            controllerBtn.innerHTML = `<i class="fa fa-play" aria-hidden="true" id="startBtn"></i>`;
            clearInterval(intervalId);
            const msg = makeResultMessage('YOU LOST');
            items.appendChild(msg);
        }
    }, 1000);
    return intervalId;
}

function makeResultMessage(msg) {
    const div = document.createElement("div");
    div.setAttribute('class', 'result__box');

    const btn = document.createElement("button");
    btn.setAttribute('class', 'retry_btn');
    btn.innerHTML = ` <i class="fa fa-repeat" aria-hidden="true" id="retryBtn"></i>`;

    const resMsg = document.createElement("div");
    resMsg.setAttribute('class', 'result__text');
    resMsg.innerText = msg;

    div.appendChild(btn);
    div.appendChild(resMsg);

    return div;
}

function makeRandomItems(count) {
    const minX = items.getBoundingClientRect().x;
    const maxX = items.getBoundingClientRect().right;
    const minY = items.getBoundingClientRect().y;
    const maxY = items.getBoundingClientRect().bottom;

    for (let i = 0; i < count; i++) {
        const carrot = document.createElement("img");
        carrot.setAttribute('src', 'img/carrot.png');
        carrot.setAttribute('class', 'item carrot');
        carrot.style.left = `${getRandomIntX(minX, maxX)}px`;
        carrot.style.top = `${getRandomIntY(minY, maxY)}px`;
        const bug = document.createElement("img");
        bug.setAttribute('src', 'img/bug.png');
        bug.setAttribute('class', 'item bug');
        bug.style.left = `${getRandomIntX(minX, maxX)}px`;
        bug.style.top = `${getRandomIntY(minY, maxY)}px`;

        items.appendChild(carrot);
        items.appendChild(bug);
    }
    counter.textContent = count;
}

function getRandomIntX(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomVal = (Math.random() * (max - min));
    if (randomVal > 850) {
        randomVal -= 60;
    }
    return Math.floor(randomVal);
}

function getRandomIntY(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomVal = (Math.random() * (max - min));
    if (randomVal > 233) {
        randomVal -= 60;
    }
    return Math.floor(randomVal);
}
let totalCount;
items.addEventListener('click', event => {
    console.log(event.target);
    if (event.target.id === 'retryBtn') {
        items.innerHTML = '';
        intervalId = setTimeout(10);
        makeRandomItems(10);
    }
    if (event.target.className === 'item bug') {
        controllerBtn.innerHTML = `<i class="fa fa-play" aria-hidden="true" id="startBtn"></i>`;
        clearInterval(intervalId);
        const msg = makeResultMessage('YOU LOST');
        items.appendChild(msg);
    }
    if (event.target.className === 'item carrot') {
        totalCount = Number(document.querySelector('.counter').textContent);
        items.removeChild(event.target);
        totalCount--;
        counter.textContent = totalCount;
        if(totalCount === 0){
            controllerBtn.innerHTML = `<i class="fa fa-play" aria-hidden="true" id="startBtn"></i>`;
            clearInterval(intervalId);
            const msg = makeResultMessage('YOU WIN');
            items.appendChild(msg);
        }

    }

});