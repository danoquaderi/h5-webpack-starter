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
import SwiperAnimateServiceIns from '../share/Swiper/SwiperAnimate.service.ins';

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
            // fade: {
            //   crossFade: true,
            // },
            // speed: 1000,
            //
            // noSwiping: true,
            // noSwipingClass: _style.slide,

            hashnav: true,
            hashnavWatchState: true,
            replaceState: true,

            onInit: (swiper) => {
              setTimeout(() => {
                this.renderSlideComponents()
                  .then(() => {
                    return this.audioComponent.load();
                  })
                  .then(() => {
                    return new loadingOverlayServiceIns().doRemove();
                  })
                  .then(() => {
                    new SwiperAnimateServiceIns().cache(swiper);
                    new SwiperAnimateServiceIns().animate(swiper);
                  });
              }, 0);
            },
            onSlideChangeEnd: (swiper) => {
              new SwiperAnimateServiceIns().animate(swiper);
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