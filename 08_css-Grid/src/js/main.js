import {test} from './func';
test()

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#search').addEventListener('click', function() {
    document.querySelector('#search-active').classList.toggle('search__wrapper_active')
  });
  document.querySelector('#search-close').addEventListener('click', function() {
    document.querySelector('#search-active').classList.remove('search__wrapper_active')
  });

  document.querySelector('#menu').addEventListener('click', function() {
    document.querySelector('#menu-active').classList.toggle('menu_active')
  });
  document.querySelector('#menu-close').addEventListener('click', function() {
    document.querySelector('#menu-active').classList.remove('menu_active')
  });

  document.querySelector('#map-close').addEventListener('click', function() {
    document.querySelector('#map-info').classList.add('map-inactive')
  });
})
