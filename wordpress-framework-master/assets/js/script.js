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

  $('.animate-1').viewportChecker({
    classToAdd: 'fade-up-1',
  });

  $('.animate-2').viewportChecker({
    classToAdd: 'fade-up-2',
  });

  $('.animate-3').viewportChecker({
    classToAdd: 'fade-up-3',
  });

  $('.animate-fade').viewportChecker({
    classToAdd: 'fade-in',
  });

  $('.animate-fade-slow').viewportChecker({
    classToAdd: 'fade-in-slow',
  });

  $('.animate-pulse').viewportChecker({
    classToAdd: 'pulse-in',
  });

  $('.animate-left').viewportChecker({
    classToAdd: 'fade-left',
  });

  $('.animate-left-1').viewportChecker({
    classToAdd: 'fade-left-1',
  });

  $('.animate-left-2').viewportChecker({
    classToAdd: 'fade-left-2',
  });

  $('.animate-left-3').viewportChecker({
    classToAdd: 'fade-left-3',
  });

  $('.animate-right').viewportChecker({
    classToAdd: 'fade-right',
  });

  //
  // Header scroll shrink
  //
  // $(document).on('scroll', () => {
  //   let scrollStart = 150;
  //   if ($(window).width() < 1240) {
  //     scrollStart = 50;
  //     if ($(document).scrollTop() > scrollStart) {
  //       $('.page-header').addClass('scroll');
  //       $('.pre-header-container').addClass('scroll');
  //     } else {
  //       $('.page-header').removeClass('scroll');
  //       $('.pre-header-container').removeClass('scroll');
  //     }
  //   } else {
  //     $('.page-header').removeClass('scroll');
  //     $('.pre-header-container').removeClass('scroll');
  //   }
  // });

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
    console.log('smooth');

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

  // const scrollingoffset = 0;
  // if (window.location.hash.length) {
  //   const target = $(window.location.hash);

  //   if (target.length) {
  //     $('html, body').animate(
  //       { scrollTop: target.offset().top - scrollingoffset },
  //       1000,
  //     );
  //   }
  // }

  // // Select all links with hashes
  // $('a[href*="#"]')
  //   // Remove links that don't actually link to anything
  //   .not('[href="#"]')
  //   .not('[href="#0"]')
  //   // eslint-disable-next-line func-names
  //   .click(function (event) {
  //     // On-page links
  //     if (
  //       window.location.pathname.replace(/^\//, '') ===
  //         this.pathname.replace(/^\//, '') &&
  //       window.location.hostname === this.hostname
  //     ) {
  //       // Figure out element to scroll to
  //       let target = $(this.hash);
  //       target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
  //       // Does a scroll target exist?
  //       if (target.length) {
  //         // Only prevent default if animation is actually gonna happen
  //         event.preventDefault();
  //         $('html, body').animate(
  //           {
  //             scrollTop: target.offset().top - scrollingoffset,
  //           },
  //           1000,
  //           () => {
  //             // Callback after animation
  //             // Must change focus!
  //             const $target = $(target);
  //             $target.focus();
  //             if ($target.is(':focus')) {
  //               // Checking if the target was focused
  //               return false;
  //             }
  //             $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
  //             $target.focus(); // Set focus again
  //             return true;
  //           },
  //         );
  //       }
  //     }
  //   });
});
