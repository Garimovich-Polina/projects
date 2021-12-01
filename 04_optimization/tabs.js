document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.section-how-work__item-step-btn').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path

      document.querySelectorAll('.section-how-work__item').forEach(function(tabContent) {
        tabContent.classList.remove('section-how-work__item_activ')
      })
      document.querySelector(`[data-target="${path}"]`).classList.add('section-how-work__item_activ')
    })
  });

  document.querySelector('#burger').addEventListener('click', function() {
    document.querySelector('#menu').classList.toggle('nav-menu_active')
  });

  document.querySelector('#menu-close').addEventListener('click', function() {
    document.querySelector('#menu').classList.toggle('nav-menu_active')
  });

  document.querySelectorAll('.nav-menu__item').forEach(function (ev) {
    ev.addEventListener('click', function() {
      document.querySelector('#menu').classList.remove('nav-menu_active')
    })
  })

  document.querySelector('#search').addEventListener('click', function() {
    document.querySelector('#search-active').classList.toggle('header__search_active')
  });

  document.querySelector('#search-close').addEventListener('click', function() {
    document.querySelector('#search-active').classList.remove('header__search_active')
  });

  $( ".js-accordion" ).accordion({
    collapsible: true,
    active: false,
    icons: false,
    heightStyle: 'content'
  });
});
