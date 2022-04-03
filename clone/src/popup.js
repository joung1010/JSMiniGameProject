'use strict';
// html 파일을 보면 크게 game section 과 popup sectio이 있다.
// 먼저 main.js 에서 popup을 하자

//export default 해당 클래스를 바깥으로 노출시키는 것
// 이 파일에서 뿐만아니라 외부에서 이 클래스를 볼 수 있고
export default class Popup {
    constructor() {
        this.popup = document.querySelector('.popup');
        this.popupMsg = document.querySelector('.popup__message');
        this.popupRefresh = document.querySelector('.popup__refresh');
        this.popupRefresh.addEventListener('click',()=>{
            this.onClick && this.onClick();
            this.hide();
        })
    }
    setClickListener(onClick){
        this.onClick = onClick;
    }
     showWithText(text) {
        this.popupMsg.innerText = text;
        this.popup.classList.remove('popup-hide');
    }


    hide(){
        this.popup.classList.add('popup-hide');
    }
}