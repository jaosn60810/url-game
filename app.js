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
  gameTime = 3;

  constructor() {
    this.isGameStart = false;
    this.countDownTimer = 0;
    this.clickCount = 0;
    this.gameResult = '';
  }

  startGame() {
    this.isGameStart = true;
    this.countDownTimer = this.gameTime;
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

const input = document.querySelector('input');
const text = document.querySelector('#gameTime');

input.addEventListener('blur', () => {
  clickGame.gameTime = parseInt(input.value);
  text.textContent = `遊戲時間 ${input.value} 秒`;
});

window.addEventListener('keydown', function (e) {
  clickGame.keyboardInput(e.key);
});
