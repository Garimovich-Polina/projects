var tl = gsap.timeline();

tl.from('.hero__title', {opacity: 0, y: 70, duration: 1})
  .from('.hero__btn', {opacity: 0, y: 70, duration: 1}, "-=1")
  .from('.hero__descr', {opacity: 0, duration: 0.6}, "-=0.2")
  .from('.photos-img1', {opacity: 0, scale: 0.9, duration: 0.5}, "-=0.4" )
  .from('.photos-img2', {opacity: 0, scale: 0.9, duration: 0.5}, "-=0.3" )
  .from('.photos-img3', {opacity: 0, scale: 0.9, duration: 0.5}, "-=0.3" )
.from('.photos__author', {opacity: 0, duration: 0.8}, "-=0.3" );



var tlMemu = gsap.timeline({paused: true});

  tlMemu.to('#menu', {display: 'block', duration: 0.4})
    .from('.menu__top', {opacity: 0, y: -70, duration: 0.4})
    .from('.close', {opacity: 0, duration: 0.4}, "-=0.3")
    .from('.menu__wrapper', {opacity: 0, y: 70, duration: 0.4}, "-=0.3")
    .from('.menu__nav', {opacity: 0, y: 30, duration: 0.5}, "-=0.2")
    .from('.menu__right', {opacity: 0, y: 40, duration: 0.5}, "-=0.2")
    .from('.social', {opacity: 0, y: 30, duration: 0.5}, "-=0.5");

document.querySelector('#burger').addEventListener('click', function () {
  tlMemu.play();
});

var reverse = document.querySelector("#menu-close");

reverse.addEventListener('click', function () {
  tlMemu.reverse();
});




