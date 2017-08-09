import QueryAll from '../../share/QueryAll';
import SlideComponent from '../Slide.component';

import * as slide0 from './slide0.pug';
import * as slide0Style from './slide0.scss';
import * as logoSvg from '../../../static/images/myLogo.svg';

export default class Slide0Component extends SlideComponent {
  constructor({
                context,
                slideIndex,
              }) {
    super({
      context,
      slideIndex,
    });
  };

  load() {
    return this.init({
      pugTemplate: slide0,
      wrapperElement: this.context,
      insetParam: {
        _style,
        logoSvg,
      },
    });
  };

  paramInit() {
    this.oLogo = this.context.querySelector('.' + _style.logo);   // logo wrap
    this.oLogoImg = this.oLogo.firstElementChild;                 // logo img
  };

  eventBind() {

    new QueryAll(this.oLogoImg)
      .on('touchstart mouseover mousedown', () => {
        this.oLogoImg.classList.add(_style.animationPaused);
        this.oLogo.classList.add(_style.enlarge);
      })
      .on('touchmove touchend touchcancel mouseout mouseup', () => {
        if (this.oLogoImg.classList.contains(_style.animationPaused)) {
          this.oLogoImg.classList.remove(_style.animationPaused);
        }
        if (this.oLogo.classList.contains(_style.enlarge)) {
          this.oLogo.classList.remove(_style.enlarge);
        }
      });
  };
};

// private
let
  _style = slide0Style
;