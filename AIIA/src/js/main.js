
// import as from './gsap.min.js';
document.addEventListener('DOMContentLoaded', function() {
  let fullHeight, innerHeight;
  const progressBar = document.querySelector('.progressbar-line');

  window.addEventListener('scroll', fillProgressLine);
  window.addEventListener('resize', fillProgressLine);

  function fillProgressLine() {
    fullHeight = document.body.scrollHeight;
    innerHeight = window.innerHeight;
    progressBar.style.width = (scrollY * 100 / (fullHeight - innerHeight)) + '%';
  }
  fillProgressLine();


  const accordions = document.querySelectorAll('.accordion__item');

  for(item of accordions) {
    item.addEventListener('click', function() {
      if(this.classList.contains('active')) {
        this.classList.remove('active');
      } else {
          for(el of accordions) {
            el.classList.remove('active');
          }
          this.classList.add('active');
      }
    })
  }

  var tl = gsap.timeline();

  tl.from('.visual__sun', {duration: 2.5, rotate: -360, scale: 0.6})
    .from('#vector1', {duration: .1, opacity: 0})
    .from('#vector1', {duration: 1.2, strokeDasharray: "0 800"}, "-=.3")
    .from('#vector2', {duration: .1, opacity: 0})
    .from('#vector2', {duration: .5, strokeDasharray: "0 140"}, "-=.1")

})

// import './gsap.min.js'
// import { gsap } from "gsap"

// .from('.hero__btn', {opacity: 0, y: 70, duration: 1}, "-=1")
// .from('.hero__descr', {opacity: 0, duration: 0.6}, "-=0.2")
// .from('.photos-img1', {opacity: 0, scale: 0.9, duration: 0.5}, "-=0.4" )
// .from('.photos-img2', {opacity: 0, scale: 0.9, duration: 0.5}, "-=0.3" )
// .from('.photos-img3', {opacity: 0, scale: 0.9, duration: 0.5}, "-=0.3" )
// .from('.photos__author', {opacity: 0, duration: 0.8}, "-=0.3" );
