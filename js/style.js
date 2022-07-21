  'use strict';
  
  window.addEventListener('DOMContentLoaded', () => {

    const dom = document;

    // スライダー用margin取得
    const slideHeight = dom.querySelector('.slide').getBoundingClientRect().height;
    console.log(slideHeight);

    const mainHeight = dom.querySelector('.slider_main').getBoundingClientRect().height;

    const mobNav = dom.querySelector('.slider_nav');
    mobNav.style.marginTop = `${slideHeight - mainHeight + 16}px`;
    // スライダー用margin取得

    // スライダー
    const slides = dom.querySelectorAll('.slide');
    let currentIndex = 0;
    slides[currentIndex].classList.add('active');

    function moveSlider() {
      slides[currentIndex].classList.remove('active');
      currentIndex++;
      if(currentIndex === slides.length) {
        currentIndex = 0;
      }
      slides[currentIndex].classList.add('active');
    }

    let timeId;

    function autoSlider() {
      timeId = setTimeout(() => {
        moveSlider();
        upDateDots();
        autoSlider();
      }, 5000);
    }
    autoSlider();

    const dots = [];

    function upDateDots() {
      dots.forEach(dot =>{
        dot.classList.remove('current');
      });
      dots[currentIndex].classList.add('current');
    }

    function createDots() {
      const sliderNav = dom.getElementById('slider_nav');

      for(let i = 0; i < slides.length; i++) {
        const dot = dom.createElement('p');
        sliderNav.appendChild(dot);
        dots.push(dot);

        dot.addEventListener('click', () => {
          slides[currentIndex].classList.remove('active');
          clearTimeout(timeId);
          dots[currentIndex].classList.remove('current');
          dots[i].classList.add('current');
          currentIndex = i;
          slides[currentIndex].classList.add('active');
          autoSlider();
        });
      }
      
      dots[0].classList.add('current');
    }
    createDots();
    // スライダー

    // モバイルナビゲーション
    const pareItems = dom.querySelectorAll('.pare-item');
    
    function toggle() {
      const chilItem = this.nextElementSibling;
      // const item = chilItem.childNodes;
      
      if(!chilItem.classList.contains('active')) {
        chilItem.classList.add('active');
      } else {
        chilItem.classList.remove('active');
      }
    }

    for(let i = 0; i < pareItems.length; i++) {
      pareItems[i].addEventListener('click', toggle);
    }
    // モバイルナビゲーション

  });