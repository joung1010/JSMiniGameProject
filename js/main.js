const startBtn = document.querySelector('.controller__startBtn');
const items = document.querySelector('.play__items');
const counter = document.querySelector('.counter');

startBtn.addEventListener('click',event =>{

    const item = makeRandomItems(10);
    items.appendChild(item);
    setTimeout(10);
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
    console.log(maxX);
    console.log(maxY);

    const item = document.createElement("div");
    item.setAttribute('class','item');
    for (let i = 0; i < count; i++) {
        const carrot = document.createElement("img");
        carrot.setAttribute('src','img/carrot.png');
        carrot.style.transform=`translateX(${getRandomInt(minX,maxX)}px)`;
        carrot.style.transform=`translateY(${getRandomInt(minY,maxY)}px)`;
        const bug = document.createElement("img");
        bug.setAttribute('src','img/bug.png');
        bug.style.transform=`translateX(${getRandomInt(minX,maxX)}px)`;
        bug.style.transform=`translateY(${getRandomInt(minY,maxY)}px)`;

        item.appendChild(carrot);
        item.appendChild(bug);
    }
    counter.textContent = count;
   return item;

}
//todo 특정 범위 난수 발생 수정해야됨
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    console.log(`min: ${min}`);
    console.log(`max: ${max}`);
    return Math.floor(Math.random() * (max - min)) ;
}