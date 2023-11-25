/* eslint-disable consistent-return */
/* eslint-disable func-names */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-template */
/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
jQuery(window).ready(($) => {
  // Cookie Notice

  // eslint-disable-next-line no-unused-vars
  const cookieNotice = new CookieAccept();

  //
  // Animate classes
  //

  $('.animate').viewportChecker({
    classToAdd: 'fade-up',
  });

  $('.animate-fade').viewportChecker({
    classToAdd: 'fade-in',
  });

  //
  // Mobile Menu link
  //

  $('.hamburger-toggle').click((e) => {
    e.preventDefault();
    $('.hamburger-toggle').toggleClass('js-mobile-menu-open');
    $('#main-menu').toggleClass('page-header__main-menu--open');
  });

  const scrollingoffset = 0;
  if (window.location.hash.length) {
    const target = $(window.location.hash);

    if (target.length) {
      $('html, body').animate(
        { scrollTop: target.offset().top - scrollingoffset },
        1000,
      );
    }
  }

  $('a[href^="/#"]:not([href="#"])').click(function () {
    const navitem = $(this);

    if (!navitem.hasClass('selected')) {
      $('#main-menu').removeClass('page-header__main-menu--open');
      $('.hamburger-toggle').removeClass('js-mobile-menu-open');
    }

    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      let target = $(this.hash);

      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate(
          {
            scrollTop: target.offset().top - scrollingoffset,
          },
          1000,
        );
        return false;
      }
    }
  });
});
