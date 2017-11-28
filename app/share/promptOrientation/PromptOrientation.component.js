import _style from './promptOrientation.scss';
import promptOrientation from './promptOrientation.pug';


export default class PromptOrientationComponent {
  constructor() {
    this.wrapper = document.createElement('div');
  };

  load() {
    return new Promise(resolve => {
      this.wrapper.classList.add(_style.wrapper);
      this.wrapper.innerHTML = promptOrientation({
        _style,
        suggest: '为了更好的体验，请竖屏观看',
      });

      setTimeout(() => {
        document.body.appendChild(this.wrapper);
        resolve();
      }, 0);
    });
  };
};
