const hostUrl = window.location.href.split('#')[0];

function renderString(str) {
  location.replace(hostUrl + '#' + str);
}

// let animationText = 'Hello_world!';
// let animationIndex = 0;
// function getAnimationString() {
//   let resultText =
//     animationText.substring(0, animationIndex) +
//     '*' +
//     animationText.substring(animationIndex + 1);
//   animationIndex =
//     animationIndex > animationText.length - 2 ? 0 : animationIndex + 1;
//   return resultText;
// }

class ClickGame {
  constructor() {
    this.isGameStart = false;
    this.countDownTimer = 0;
    this.clickCount = 0;
    this.gameResult = '';
  }

  startGame() {
    this.isGameStart = true;
    this.countDownTimer = 3;
    this.clickCount = 0;
    this.gameResult = '';
  }

  update(deltaTime) {
    if (this.isGameStart) {
      this.countDownTimer -= deltaTime;
      if (this.countDownTimer <= 0) {
        this.isGameStart = false;
        this.gameResult = '總共點擊_' + this.clickCount + '_次';
      }
    }
  }

  getRenderString() {
    if (!this.isGameStart) {
      if (this.gameResult === '') {
        return '按下_R開始(重製)遊戲!';
      } else {
        return this.gameResult + '|按下_R開始(重製)遊戲!';
      }
    } else {
      return (
        this.clickCount + '|倒數_' + (parseInt(this.countDownTimer) + 1) + '_秒'
      );
    }
  }

  keyboardInput(key) {
    if (key === 'r') {
      this.startGame();
    }
    if (key === 'z' && this.isGameStart) {
      this.clickCount++;
    }
  }
}

let clickGame = new ClickGame();
const updateTimeSecond = 0.2;

function update() {
  clickGame.update(updateTimeSecond);
  renderString(clickGame.getRenderString());

  setTimeout(() => {
    requestAnimationFrame(update);
  }, updateTimeSecond * 1000);
}
update();

window.addEventListener('keydown', function (e) {
  clickGame.keyboardInput(e.key);
});
