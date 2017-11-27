import Component from '../share/Component';
import Swiper from 'swiper';

import main from './main.pug';
import slides from './sildes.pug';
import mainStyle from './main.scss';

// audio
// import audioSrc from '../../static/media/ ';

let audioSrc = 'https://raw.githubusercontent.com/cycjimmy/staticFiles/storage/media/Richard_Clayderman-LOVE_IS_BLUE.mp3';

// component
import SlideXComponent from './slideXComponent/SlideX.component';

import H5AudioControls from 'h5-audio-controls';

// service
import loadingOverlayServiceIns from '../loadingComponent/loadingOverlay.service.ins';
import SwiperAnimation from 'swiper-animation';

export default class extends Component {
  constructor() {
    super({
      context: document.querySelector('.main-screen'),
    });
    this.mainSwiper = null;
    this.audioComponent = new H5AudioControls(audioSrc, {
      context: this.context,
    });
  };

  load() {
    return this.render({
      pugTemplate: main,
      wrapperElement: this.context,
      insetParam: {
        _style,
      },
    })
      .then(() => {
        return this.render({
          pugTemplate: slides,
          wrapperElement: this.context.querySelector('.' + _style.wrapper),
          insetParam: {
            _style,
            length: SlideComponents.length,
          },
        });
      })
      .then(() => {
        return new Promise(resolve => {
          // Swiper
          this.mainSwiper = new Swiper(this.context, {
            direction: 'vertical',
            wrapperClass: _style.wrapper,

            // effect: 'fade',
            // fadeEffect: {
            //   crossFade: false,
            // },
            // speed: 1000,

            // noSwiping: true,
            // noSwipingClass: _style.slide,

            hashNavigation: {
              watchState: true,
              replaceState: true,
            },

            on: {
              init: () => this.renderSlideComponents()
                .then(() => this.audioComponent.load())
                .then(() => new loadingOverlayServiceIns().doRemove())
                .then(() => new SwiperAnimation(this.mainSwiper).animate()),

              slideChange: () => setTimeout(() => new SwiperAnimation(this.mainSwiper).animate(), 0),
            },
          });

          setTimeout(() => {
            resolve();
          }, 0);
        });
      });
  };

  renderSlideComponents() {
    return Promise.all([
      // SlideComponentsLoader
      SlideComponents.forEach((Component, index) => {
        new Component({
          context: this.context.querySelector('.' + _style.slide + ':nth-of-type(' + (index + 1) + ')'),
          mainSwiper: this.mainSwiper,
          slideIndex: index,
          audioComponent: this.audioComponent,
        }).load();
      }),
    ]);
  };
};

// private
let
  _style = mainStyle
  , SlideComponents = [
    SlideXComponent,
  ]
;