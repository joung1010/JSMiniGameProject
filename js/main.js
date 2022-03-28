const controllerBtn = document.querySelector('.controller__btn');
const items = document.querySelector('.play__items');
const counter = document.querySelector('.counter');

let intervalId
controllerBtn.addEventListener('click',event =>{
    let btnType = event.currentTarget.children[0].id
    if (btnType === 'startBtn') {
        if(items.childElementCount > 0){
            items.innerHTML = '';
        }

        controllerBtn.innerHTML = `<i class="fa fa-stop" aria-hidden="true" id="stopBtn"></i>`;
        intervalId = setTimeout(10);
        makeRandomItems(10);
    } else {
        clearInterval(intervalId)
        controllerBtn.innerHTML = `<i class="fa fa-play" aria-hidden="true" id="startBtn"></i>`;
    }

});
//setInterval 정해진 시간마다 callback 함수 호출
function setTimeout(sec) {
    let time = sec;
    let intervalId = setInterval(()=>{
        document.querySelector('.controller__timer').innerHTML = `0:${time}`;
        time--;
        if (time < 0) {
            clearInterval(intervalId);
            const msg = makeResultMessage('YOU LOST');
            items.appendChild(msg);
        }
    },1000);
    console.log(intervalId);
    return intervalId;
}

function makeResultMessage(msg) {
    const div = document.createElement("div");
    div.setAttribute('class','result__box');

    const btn = document.createElement("button");
    btn.setAttribute('class','retry_btn');
    btn.innerHTML=` <i class="fa fa-repeat" aria-hidden="true"></i>`;

    const resMsg = document.createElement("div");
    resMsg.setAttribute('class','result__text');
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
        carrot.setAttribute('src','img/carrot.png');
        carrot.setAttribute('class','item carrot');
        const carrotWidth = carrot.getBoundingClientRect().width;
        carrot.style.transform=`translate(${getRandomIntX(minX,maxX)}px,${getRandomIntY(minY,maxY)}px)`;
        const bug = document.createElement("img");
        bug.setAttribute('src','img/bug.png');
        bug.setAttribute('class','item bug');
        bug.style.transform=`translate(${getRandomIntX(minX,maxX)}px,${getRandomIntY(minY,maxY)}px)`;

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
        randomVal -=60;
    }
    return Math.floor(randomVal)  ;
}
function getRandomIntY(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomVal = (Math.random() * (max - min));
    if (randomVal > 233) {
        randomVal -= 60;
    }
    return Math.floor(randomVal)  ;
}