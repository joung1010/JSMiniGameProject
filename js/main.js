const startBtn = document.querySelector('.controller__startBtn');
const items = document.querySelector('.play__items');


startBtn.addEventListener('click',event =>{
    setTimeout(10);

});

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