// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Navigation, Pagination, Manipulation, Mousewheel, Zoom } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';



export const swiperGallery = {

  selector: '#swiperGallery',
  swiper: null,
  swiperContainer: null,

  init (){

    document.body.insertAdjacentHTML('beforeend', `  <div class="swiper-container hide" id="swiper-container" >
    <div class="swiperGallery" id="swiperGallery">
      <div class="swiper-wrapper">
        <!-- Slides -->
      </div>
      <div class="swiper-button-prev swiper-button-white"></div>
      <div class="swiper-button-next swiper-button-white"></div>
      <div class="swiper-scrollbar"></div>
    </div>
    <div class="swiper-container__close" id="swiper-close">
      <svg width="48" height="48" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Icon/close">
          <path id="Path" d="M2.78431 2.08859L2.85355 2.14645L8 7.293L13.1464 2.14645C13.3417 1.95118 13.6583 1.95118 13.8536 2.14645C14.0271 2.32001 14.0464 2.58944 13.9114 2.78431L13.8536 2.85355L8.707 8L13.8536 13.1464C14.0488 13.3417 14.0488 13.6583 13.8536 13.8536C13.68 14.0271 13.4106 14.0464 13.2157 13.9114L13.1464 13.8536L8 8.707L2.85355 13.8536C2.65829 14.0488 2.34171 14.0488 2.14645 13.8536C1.97288 13.68 1.9536 13.4106 2.08859 13.2157L2.14645 13.1464L7.293 8L2.14645 2.85355C1.95118 2.65829 1.95118 2.34171 2.14645 2.14645C2.32001 1.97288 2.58944 1.9536 2.78431 2.08859Z" fill="#ffffff"/>
        </g>
      </svg>
    </div>
  </div>`);

    if (!document.querySelector(this.selector)) return;

    this.swiperContainer = document.getElementById('swiper-container');

    this.swiper = new Swiper(this.selector, {
      lazy: true,
      lazyPreloadPrevNext: 2,
      centeredSlides: true,
      mousewheel: true,
      slidesPerView: 1,
      spaceBetween: 30,
      zoom: true,
      limitToOriginalSize:true,
      // configure Swiper to use modules
      modules: [Navigation,Manipulation, Mousewheel, Zoom],

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

    });


    if (this.swiper){

      let links = document.querySelectorAll('a');
      let images = [];

      this.swiperContainer.addEventListener('touchmove',(event)=>{
        event.preventDefault() // For prevent scroll by swipe body/page
      })

      links.forEach( (el)=>{

        let origin = document.location.host;

        const IMG_REGEXP = new RegExp(`^(.*)${origin}(.*)\.(gif|jpg|bmp|png)$`, 'g');
        if(IMG_REGEXP.test(el.href))
        {

          images.push(el.href)
          el.addEventListener('click', (event)=>{
            event.preventDefault();
            document.body.style.position = 'sticky';
            document.body.style.top = window.scrollY;
            this.swiperContainer.classList.replace('hide', 'show');

            let imgIndex = images.findIndex((el)=>{ return el === event.target.parentElement.href})
            this.swiper.slideTo(imgIndex, 0, false)
          })

          let slideText = el.querySelector('img');
          if(slideText){
            slideText = `<div class="swiper-slide-text">${slideText.alt}</div>`
          }else {
            slideText=''
          }
          this.swiper.appendSlide(`<div class="swiper-slide"><div class="swiper-zoom-container">
                                         <img loading="lazy" src="${el.href}"  alt="" class="swiper-img" />
                                         <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                                         </div>${slideText}</div>`)
        }
      })

    }else {
      return;
    }

    //const swiperClose = document.getElementById('swiper-close');

    // swiperClose.addEventListener('click', ()=>{
    //   this.swiperContainer.classList.replace('show', 'hide');
    //   document.body.style.position = '';
    //   document.body.style.top = '';
    // })

    document.addEventListener('keydown', (event)=> {
      if (event.key === 'Escape') {
        if(this.swiperContainer.classList.contains('show')){
          this.swiperContainer.classList.replace('show', 'hide');
          document.body.style.position = '';
          document.body.style.top = '';
        }
      }
    })


    this.swiperContainer.addEventListener('click', (event)=>{
      if(!event.target.classList.contains('swiper-img') &&
        !event.target.classList.contains('swiper-button-next')
        && !event.target.classList.contains('swiper-button-prev')){
        this.swiperContainer.classList.replace('show', 'hide');
      }
    })

  },

  show(){
    this.swiperContainer.classList.remove('hide');
    this.swiperContainer.classList.add('show');
  }

}


