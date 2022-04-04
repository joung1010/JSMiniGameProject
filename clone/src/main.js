'use strict';
import Popup from "./popup.js";
import {GameBuilder, Reason} from "./game.js";

// innerText vs textContent
//innerText는 'Element'의 속성으로, 해당 Element 내에서 사용자에게 '보여지는' 텍스트 값을 읽어옵니다
//textContent는 'Node'의 속성으로, innetText와는 달리 <script>나 <style> 태그와 상관없이
// 해상 노드가 가지고 있는 텍스트 값을 그대로 읽습니다.
//또한, 'display:none' 스타일이 적용된 '숨겨진 텍스트' 문자열도 그대로 출력되는 것을 확인 할 수 있습니다.
//

const gameFinishBanner = new Popup();
const game = new GameBuilder()
    .gameDuration(10)
    .carrotCount(4)
    .bugCount(4)
    .build();

game.setGameStopListener((reason) => {
    let message;
    switch (reason) {
        case Reason.cancel:
            message = 'Replay ??';
            break;
        case Reason.win:
            message = 'YOU WON!!';
            break;
        case  Reason.lose:
            message = 'YOU LOSE :)';
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
    game.start();
});



