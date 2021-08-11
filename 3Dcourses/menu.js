document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#burger').addEventListener('click', function() {
   document.querySelector('#menu').classList.toggle('nav-menu_active')
  });

  document.querySelector('#menu-close').addEventListener('click', function() {
    document.querySelector('#menu').classList.toggle('nav-menu_active')
   });

  document.querySelectorAll('.nav-menu__item').forEach(function (ev) {
    ev.addEventListener('click', function() {
      document.querySelector('#menu').classList.remove('nav-menu_active')
    });
  });
});
