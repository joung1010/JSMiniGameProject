'use strict';

export default class Field {
    constructor(carrotCount,bugCount) {
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field.addEventListener('click',(event)=>{
            this.onClick && this.onClick(event);
        });
    }

    addItem(className,count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - this.CARROT_SIZE;
        const y2 = this.fieldRect.height - this.CARROT_SIZE;

        for (let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = this.randomNumber(x1, x2);
            const y = this.randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }
    clearItem(){
        this.field.innerHTML='';
    }

    randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    setOnClickListener(onclick) {
        this.onClick = onclick;
    }

    setCarrotCount(count) {
        this.carrotCount = count
    }

    getCarrotCount() {
        return this.carrotCount;
    }

    setBugCount(count) {
        this.bugCount = count;
    }

    getBugCount() {
        return this.bugCount;
    }

    setCarrotSize(size) {
        this.CARROT_SIZE = size;
    }
}