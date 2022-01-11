
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


  document.querySelector('#menu').addEventListener('click', function() {
    document.querySelector('#menu-active').classList.toggle('menu_active')
  });



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
