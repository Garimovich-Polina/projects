document.addEventListener('DOMContentLoaded', function() {
  // progressbar
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

  // menu
  document.querySelector('#menu').addEventListener('click', function() {
    document.querySelector('#menu-active').classList.toggle('menu_active')
  });

  // accordion
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

  // progressbar accordion
  let progressbar = document.querySelector('#progressbar');
  let item1 = document.querySelector('#accordionItem_1');
  let item2 = document.querySelector('#accordionItem_2');
  let item3 = document.querySelector('#accordionItem_3');

  item1.addEventListener('click', function() {
    progressbar.style.height = "33%"
  });
  item2.addEventListener('click', function() {
    progressbar.style.height = "66%"
  });
  item3.addEventListener('click', function() {
    progressbar.style.height = "100%"
  });

  const mediaQuery = window.matchMedia('(max-width: 769px)')
  if (mediaQuery.matches) {
    item1.addEventListener('click', function() {
      progressbar.style.width = "33%"
    });
    item2.addEventListener('click', function() {
      progressbar.style.width = "66%"
    });
    item3.addEventListener('click', function() {
      progressbar.style.width = "100%"
    });
  }

  // tabs for progressbar accordion
  document.querySelectorAll('.accordion__item').forEach(function(tabs) {
    tabs.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path

      document.querySelectorAll('.experience__numbers-start').forEach(function(tabContent) {
        tabContent.classList.remove('experience__numbers-start_active')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('experience__numbers-start_active')
    })
  })

  // animation
  var tl = gsap.timeline();

  tl.from('.visual__sun', {duration: 2.5, rotate: -360, scale: 0.6})
    .from('#vector1', {duration: .1, opacity: 0})
    .from('#vector1', {duration: 1, strokeDasharray: "0 800"}, "-=.3")
    .from('#vector2', {duration: .1, opacity: 0})
    .from('#vector2', {duration: .5, strokeDasharray: "0 140"}, "-=.1")
})
