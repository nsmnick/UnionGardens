/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/cookie-accept.js":
/*!************************************!*\
  !*** ./assets/js/cookie-accept.js ***!
  \************************************/
/***/ (function() {

/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable vars-on-top */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-spread */
/* eslint-disable func-names */
(function () {
  const CookieAccept = function () {
    this.default_options = {
      class_notice: 'cookie-accept',
      class_allow: 'cookie-accept__allow',
      class_deny: 'cookie-accept__deny',
      cookie: {
        name: 'accept_cookies',
        expiryDays: 365,
        domain: '',
        path: '/',
      },
      attr_name: 'cookie-accept',
      showNotice(notice, options) {
        notice.classList.add(`${options.class_notice}--show`);
      },
      hideNotice(notice, options) {
        notice.classList.remove(`${options.class_notice}--show`);
      },
    };

    this.status = {
      allow: 'allow',
      deny: 'deny',
    };

    this.init.apply(this, arguments);
  };

  CookieAccept.prototype.init = function (options) {
    let status = '';

    this.deepExtend((this.options = {}), this.default_options);

    if (this.isPlainObject(options)) {
      this.deepExtend(this.options, options);
    }

    status = this.checkCookieStatus();

    if (status === undefined) {
      this.el_notice = document.getElementsByClassName(
        this.options.class_notice,
      )[0];

      if (this.el_notice !== undefined) {
        this.configureEvents();
        this.showNotice();
      } else {
        console.log("Can't find cookie notice!");
      }
    } else if (status === this.status.allow) {
      this.enableCookies();
    }
  };

  CookieAccept.prototype.configureEvents = function () {
    const self = this;
    const elAllowButton = document.getElementsByClassName(
      this.options.class_allow,
    )[0];
    const elDenyButton = document.getElementsByClassName(
      this.options.class_deny,
    )[0];

    if (elAllowButton !== undefined) {
      elAllowButton.addEventListener(
        'click',
        (e) => {
          e.preventDefault();

          self.allowCookies();
        },
        false,
      );
    } else {
      console.log('Allow button not found!');
    }

    if (elDenyButton !== undefined) {
      elDenyButton.addEventListener(
        'click',
        (e) => {
          e.preventDefault();

          self.denyCookies();
        },
        false,
      );
    } else {
      console.log('Deny button not found!');
    }
  };

  CookieAccept.prototype.checkCookieStatus = function () {
    return this.getCookie(this.options.cookie.name);
  };

  CookieAccept.prototype.allowCookies = function () {
    this.setCookie(
      this.options.cookie.name,
      this.status.allow,
      this.options.cookie.expiryDays,
      this.options.cookie.domain,
      this.options.cookie.path,
    );

    this.hideNotice();
    this.enableCookies();
  };

  CookieAccept.prototype.denyCookies = function () {
    // Deny cookies only last for session.
    this.setCookie(
      this.options.cookie.name,
      this.status.deny,
      false,
      this.options.cookie.domain,
      this.options.cookie.path,
    );

    this.hideNotice();
  };

  CookieAccept.prototype.showNotice = function () {
    this.options.showNotice(this.el_notice, this.options);
  };

  CookieAccept.prototype.hideNotice = function () {
    this.options.hideNotice(this.el_notice, this.options);
  };

  CookieAccept.prototype.deepExtend = function (target, source) {
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        if (
          prop in target &&
          this.isPlainObject(target[prop]) &&
          this.isPlainObject(source[prop])
        ) {
          this.deepExtend(target[prop], source[prop]);
        } else {
          target[prop] = source[prop];
        }
      }
    }
    return target;
  };

  CookieAccept.prototype.isPlainObject = function (obj) {
    return (
      typeof obj === 'object' && obj !== null && obj.constructor === Object
    );
  };

  CookieAccept.prototype.getCookie = function (name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length !== 2 ? undefined : parts.pop().split(';').shift();
  };

  CookieAccept.prototype.setCookie = function (
    name,
    value,
    expiryDays,
    domain,
    path,
  ) {
    const cookie = [`${name}=${value}`, `path=${path || '/'}`];
    let expiryDate = new Date();
    if (this.isInteger(expiryDays) && expiryDays !== 0) {
      expiryDate.setDate(expiryDate.getDate() + (expiryDays || 365));
      expiryDate = expiryDate.toUTCString();
    } else {
      expiryDate = 0;
    }

    cookie.push(`expires=${expiryDate}`);

    if (domain) {
      cookie.push(`domain=${domain}`);
    }

    document.cookie = cookie.join(';');
  };

  CookieAccept.prototype.enableCookies = function () {
    this.enableScripts();
  };

  CookieAccept.prototype.enableScripts = function () {
    const self = this;
    const scripts = document.querySelectorAll(
      `script[type="text/plain"][${this.options.attr_name}]`,
    );

    for (let i = 0; i < scripts.length; i += 1) {
      // scripts.forEach(function(elScript) {

      // console.log(scripts[i]);

      const elScript = scripts[i];
      // console.log(typeof elScript);

      const srcPath = elScript.getAttribute('src');
      const elNewSrc = document.createElement('script');
      elNewSrc.setAttribute('type', 'text/javascript');

      if (srcPath !== null && srcPath !== '') {
        elNewSrc.setAttribute('src', srcPath);
        self.insertAfter(elNewSrc, elScript);
      } else {
        elNewSrc.innerHTML = elScript.innerHTML;
        self.insertAfter(elNewSrc, scripts[i]);
      }

      elScript.parentNode.removeChild(elScript);
    }
    // });
  };

  CookieAccept.prototype.insertAfter = function (el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
  };

  CookieAccept.prototype.isInteger =
    Number.isInteger ||
    function (value) {
      return (
        typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value
      );
    };

  window.CookieAccept = CookieAccept;
})();


/***/ }),

/***/ "./assets/js/jquery.viewportchecker.js":
/*!*********************************************!*\
  !*** ./assets/js/jquery.viewportchecker.js ***!
  \*********************************************/
/***/ (function() {

/* eslint-disable no-unused-vars */
/*
    The MIT License (MIT)

    Copyright (c) 2014 Dirk Groenen

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
*/

// eslint-disable-next-line no-undef
(function vp($) {
  // eslint-disable-next-line no-param-reassign
  $.fn.viewportChecker = function vpc(useroptions) {
    // Define options and extend with user

    const options = {
      classToAdd: 'visible',
      classToRemove: 'invisible',
      classToAddForFullView: 'full-visible',
      removeClassAfterAnimation: false,
      offset: 100,
      repeat: false,
      invertBottomOffset: true,
      callbackFunction(elem, action) {},
      scrollHorizontal: false,
      scrollBox: window,
    };
    $.extend(options, useroptions);

    // Cache the given element and height of the browser
    const $elem = this;
    let boxSize = {
      height: $(options.scrollBox).height(),
      width: $(options.scrollBox).width(),
    };

    /*
     * Main method that checks the elements and adds or removes the class(es)
     */
    this.checkElements = function () {
      let viewportStart;
      let viewportEnd;

      // Set some vars to check with
      if (!options.scrollHorizontal) {
        viewportStart = Math.max(
          $('html').scrollTop(),
          $('body').scrollTop(),
          $(window).scrollTop(),
        );
        viewportEnd = viewportStart + boxSize.height;
      } else {
        viewportStart = Math.max(
          $('html').scrollLeft(),
          $('body').scrollLeft(),
          $(window).scrollLeft(),
        );
        viewportEnd = viewportStart + boxSize.width;
      }

      // Loop through all given dom elements
      $elem.each(function () {
        const $obj = $(this);
        const objOptions = {};
        const attrOptions = {};

        //  Get any individual attribution data
        if ($obj.data('vp-add-class'))
          attrOptions.classToAdd = $obj.data('vp-add-class');
        if ($obj.data('vp-remove-class'))
          attrOptions.classToRemove = $obj.data('vp-remove-class');
        if ($obj.data('vp-add-class-full-view'))
          attrOptions.classToAddForFullView = $obj.data(
            'vp-add-class-full-view',
          );
        if ($obj.data('vp-keep-add-class'))
          attrOptions.removeClassAfterAnimation = $obj.data(
            'vp-remove-after-animation',
          );
        if ($obj.data('vp-offset')) attrOptions.offset = $obj.data('vp-offset');
        if ($obj.data('vp-repeat')) attrOptions.repeat = $obj.data('vp-repeat');
        if ($obj.data('vp-scrollHorizontal'))
          attrOptions.scrollHorizontal = $obj.data('vp-scrollHorizontal');
        if ($obj.data('vp-invertBottomOffset'))
          attrOptions.scrollHorizontal = $obj.data('vp-invertBottomOffset');

        // Extend objOptions with data attributes and default options
        $.extend(objOptions, options);
        $.extend(objOptions, attrOptions);

        // If class already exists; quit
        if ($obj.data('vp-animated') && !objOptions.repeat) {
          return;
        }

        // Check if the offset is percentage based
        if (String(objOptions.offset).indexOf('%') > 0)
          objOptions.offset =
            (parseInt(objOptions.offset, 10) / 100) * boxSize.height;

        // Get the raw start and end positions
        const rawStart = !objOptions.scrollHorizontal
          ? $obj.offset().top
          : $obj.offset().left;
        const rawEnd = !objOptions.scrollHorizontal
          ? rawStart + $obj.height()
          : rawStart + $obj.width();

        // Add the defined offset
        const elemStart = Math.round(rawStart) + objOptions.offset;
        let elemEnd = !objOptions.scrollHorizontal
          ? elemStart + $obj.height()
          : elemStart + $obj.width();

        if (objOptions.invertBottomOffset) elemEnd -= objOptions.offset * 2;

        // Add class if in viewport
        if (elemStart < viewportEnd && elemEnd > viewportStart) {
          // Remove class
          $obj.removeClass(objOptions.classToRemove);
          $obj.addClass(objOptions.classToAdd);

          // Do the callback function. Callback wil send the jQuery object as parameter
          objOptions.callbackFunction($obj, 'add');

          // Check if full element is in view
          if (rawEnd <= viewportEnd && rawStart >= viewportStart)
            $obj.addClass(objOptions.classToAddForFullView);
          else $obj.removeClass(objOptions.classToAddForFullView);

          // Set element as already animated
          $obj.data('vp-animated', true);

          if (objOptions.removeClassAfterAnimation) {
            $obj.one(
              'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
              () => {
                $obj.removeClass(objOptions.classToAdd);
              },
            );
          }

          // Remove class if not in viewport and repeat is true
        } else if ($obj.hasClass(objOptions.classToAdd) && objOptions.repeat) {
          $obj.removeClass(
            `${objOptions.classToAdd} ${objOptions.classToAddForFullView}`,
          );

          // Do the callback function.
          objOptions.callbackFunction($obj, 'remove');

          // Remove already-animated-flag
          $obj.data('vp-animated', false);
        }
      });
    };

    /**
     * Binding the correct event listener is still a tricky thing.
     * People have expierenced sloppy scrolling when both scroll and touch
     * events are added, but to make sure devices with both scroll and touch
     * are handles too we always have to add the window.scroll event
     *
     * @see  https://github.com/dirkgroenen/jQuery-viewport-checker/issues/25
     * @see  https://github.com/dirkgroenen/jQuery-viewport-checker/issues/27
     */

    // Select the correct events
    if ('ontouchstart' in window || 'onmsgesturechange' in window) {
      // Device with touchscreen
      $(document).bind(
        'touchmove MSPointerMove pointermove',
        this.checkElements,
      );
    }

    // Always load on window load
    $(options.scrollBox).bind('load scroll', this.checkElements);

    // On resize change the height var
    $(window).resize((e) => {
      boxSize = {
        height: $(options.scrollBox).height(),
        width: $(options.scrollBox).width(),
      };
      $elem.checkElements();
    });

    // trigger inital check if elements already visible
    this.checkElements();

    // Default jquery plugin behaviour
    return this;
  };

  // eslint-disable-next-line no-undef
})(jQuery);


/***/ }),

/***/ "./assets/js/properties-search.js":
/*!****************************************!*\
  !*** ./assets/js/properties-search.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");
/* harmony import */ var vue_axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-axios */ "./node_modules/vue-axios/dist/vue-axios.esm.min.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var _components_PropertiesSearch_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/PropertiesSearch.vue */ "./assets/js/components/PropertiesSearch.vue");






if (document.getElementById('properties-search') !== null) {
  // window.axios = require('axios');

  axios__WEBPACK_IMPORTED_MODULE_3__["default"].defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios__WEBPACK_IMPORTED_MODULE_3__["default"].defaults.baseURL = '/wp-json/wp/v2/';

  const searchEl = document.getElementById('properties-search');

  const props = {};

  if (searchEl.attributes['data-loadpage']) {
    props.loadpage = searchEl.attributes['data-loadpage'].value;
  }

  if (searchEl.attributes['data-category']) {
    props.category = searchEl.attributes['data-category'].value;
  }

  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createApp)({ render: () => (0,vue__WEBPACK_IMPORTED_MODULE_0__.h)(_components_PropertiesSearch_vue__WEBPACK_IMPORTED_MODULE_2__["default"], { ...props }) })
    .use(vue_axios__WEBPACK_IMPORTED_MODULE_1__["default"], axios__WEBPACK_IMPORTED_MODULE_3__["default"])
    .mount('#properties-search-lister');
}


/***/ }),

/***/ "./assets/js/script.js":
/*!*****************************!*\
  !*** ./assets/js/script.js ***!
  \*****************************/
/***/ (function() {

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

  const scrollingoffset = 200;
  if (window.location.hash.length) {
    const target = $(window.location.hash);

    if (target.length) {
      $('html, body').animate(
        { scrollTop: target.offset().top - scrollingoffset },
        1000,
      );
    }
  }

  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    // eslint-disable-next-line func-names
    .click(function (event) {
      // On-page links
      if (
        window.location.pathname.replace(/^\//, '') ===
          this.pathname.replace(/^\//, '') &&
        window.location.hostname === this.hostname
      ) {
        // Figure out element to scroll to
        let target = $(this.hash);
        target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate(
            {
              scrollTop: target.offset().top - scrollingoffset,
            },
            1000,
            () => {
              // Callback after animation
              // Must change focus!
              const $target = $(target);
              $target.focus();
              if ($target.is(':focus')) {
                // Checking if the target was focused
                return false;
              }
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
              return true;
            },
          );
        }
      }
    });

  $('.menu__accordion__header').on('click', (e) => {
    e.preventDefault();

    $(e.currentTarget)
      .toggleClass('menu__accordion__header--open')
      .siblings('.menu__accordion__content')
      .slideToggle('fast');
  });

  if ($('#generic-dialog').length) {
    const search = $('#s');
    if ($('#s').length && $('#s').val()) {
      $('#s').addClass('generic-dialog__group__input--dirty');
    } else {
      $('#s').removeClass('generic-dialog__group__input--dirty');
    }
    // eslint-disable-next-line func-names
    $('#s').on('change', function () {
      const $this = $(this);
      if ($(this).val()) {
        $this.addClass('generic-dialog__group__input--dirty');
      } else {
        $this.removeClass('generic-dialog__group__input--dirty');
      }
    });
  }
});


/***/ }),

/***/ "./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EffectScope: function() { return /* binding */ EffectScope; },
/* harmony export */   ITERATE_KEY: function() { return /* binding */ ITERATE_KEY; },
/* harmony export */   ReactiveEffect: function() { return /* binding */ ReactiveEffect; },
/* harmony export */   computed: function() { return /* binding */ computed; },
/* harmony export */   customRef: function() { return /* binding */ customRef; },
/* harmony export */   deferredComputed: function() { return /* binding */ deferredComputed; },
/* harmony export */   effect: function() { return /* binding */ effect; },
/* harmony export */   effectScope: function() { return /* binding */ effectScope; },
/* harmony export */   enableTracking: function() { return /* binding */ enableTracking; },
/* harmony export */   getCurrentScope: function() { return /* binding */ getCurrentScope; },
/* harmony export */   isProxy: function() { return /* binding */ isProxy; },
/* harmony export */   isReactive: function() { return /* binding */ isReactive; },
/* harmony export */   isReadonly: function() { return /* binding */ isReadonly; },
/* harmony export */   isRef: function() { return /* binding */ isRef; },
/* harmony export */   isShallow: function() { return /* binding */ isShallow; },
/* harmony export */   markRaw: function() { return /* binding */ markRaw; },
/* harmony export */   onScopeDispose: function() { return /* binding */ onScopeDispose; },
/* harmony export */   pauseTracking: function() { return /* binding */ pauseTracking; },
/* harmony export */   proxyRefs: function() { return /* binding */ proxyRefs; },
/* harmony export */   reactive: function() { return /* binding */ reactive; },
/* harmony export */   readonly: function() { return /* binding */ readonly; },
/* harmony export */   ref: function() { return /* binding */ ref; },
/* harmony export */   resetTracking: function() { return /* binding */ resetTracking; },
/* harmony export */   shallowReactive: function() { return /* binding */ shallowReactive; },
/* harmony export */   shallowReadonly: function() { return /* binding */ shallowReadonly; },
/* harmony export */   shallowRef: function() { return /* binding */ shallowRef; },
/* harmony export */   stop: function() { return /* binding */ stop; },
/* harmony export */   toRaw: function() { return /* binding */ toRaw; },
/* harmony export */   toRef: function() { return /* binding */ toRef; },
/* harmony export */   toRefs: function() { return /* binding */ toRefs; },
/* harmony export */   toValue: function() { return /* binding */ toValue; },
/* harmony export */   track: function() { return /* binding */ track; },
/* harmony export */   trigger: function() { return /* binding */ trigger; },
/* harmony export */   triggerRef: function() { return /* binding */ triggerRef; },
/* harmony export */   unref: function() { return /* binding */ unref; }
/* harmony export */ });
/* harmony import */ var _vue_shared__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vue/shared */ "./node_modules/@vue/shared/dist/shared.esm-bundler.js");


function warn(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}

let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    /**
     * @internal
     */
    this._active = true;
    /**
     * @internal
     */
    this.effects = [];
    /**
     * @internal
     */
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else if (true) {
      warn(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  } else if (true) {
    warn(
      `onScopeDispose() is called when there is no active effect scope to be associated with.`
    );
  }
}

const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};

const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol( true ? "iterate" : 0);
const MAP_KEY_ITERATE_KEY = Symbol( true ? "Map key iterate" : 0);
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect2) {
  const { deps } = effect2;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect2);
    }
    deps.length = 0;
  }
}
function effect(fn, options) {
  if (fn.effect instanceof ReactiveEffect) {
    fn = fn.effect.fn;
  }
  const _effect = new ReactiveEffect(fn);
  if (options) {
    (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.extend)(_effect, options);
    if (options.scope)
      recordEffectScope(_effect, options.scope);
  }
  if (!options || !options.lazy) {
    _effect.run();
  }
  const runner = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}
function stop(runner) {
  runner.effect.stop();
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo =  true ? { effect: activeEffect, target, type, key } : 0;
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if ( true && activeEffect.onTrack) {
      activeEffect.onTrack(
        (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.extend)(
          {
            effect: activeEffect
          },
          debuggerEventExtraInfo
        )
      );
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isSymbol)(key2) && key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isMap)(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isIntegerKey)(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isMap)(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isMap)(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo =  true ? { target, type, key, newValue, oldValue, oldTarget } : 0;
  if (deps.length === 1) {
    if (deps[0]) {
      if (true) {
        triggerEffects(deps[0], eventInfo);
      } else {}
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    if (true) {
      triggerEffects(createDep(effects), eventInfo);
    } else {}
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(dep) ? dep : [...dep];
  for (const effect2 of effects) {
    if (effect2.computed) {
      triggerEffect(effect2, debuggerEventExtraInfo);
    }
  }
  for (const effect2 of effects) {
    if (!effect2.computed) {
      triggerEffect(effect2, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect2, debuggerEventExtraInfo) {
  if (effect2 !== activeEffect || effect2.allowRecurse) {
    if ( true && effect2.onTrigger) {
      effect2.onTrigger((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.extend)({ effect: effect2 }, debuggerEventExtraInfo));
    }
    if (effect2.scheduler) {
      effect2.scheduler();
    } else {
      effect2.run();
    }
  }
}
function getDepFromReactive(object, key) {
  var _a;
  return (_a = targetMap.get(object)) == null ? void 0 : _a.get(key);
}

const isNonTrackableKeys = /* @__PURE__ */ (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.makeMap)(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isSymbol)
);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
class BaseReactiveHandler {
  constructor(_isReadonly = false, _shallow = false) {
    this._isReadonly = _isReadonly;
    this._shallow = _shallow;
  }
  get(target, key, receiver) {
    const isReadonly2 = this._isReadonly, shallow = this._shallow;
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(target);
    if (!isReadonly2) {
      if (targetIsArray && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isSymbol)(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isIntegerKey)(key) ? res : res.value;
    }
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isObject)(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  }
}
class MutableReactiveHandler extends BaseReactiveHandler {
  constructor(shallow = false) {
    super(false, shallow);
  }
  set(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!this._shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(target) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isIntegerKey)(key) ? Number(key) < target.length : (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasChanged)(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  }
  deleteProperty(target, key) {
    const hadKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(target, key);
    const oldValue = target[key];
    const result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
  }
  has(target, key) {
    const result = Reflect.has(target, key);
    if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isSymbol)(key) || !builtInSymbols.has(key)) {
      track(target, "has", key);
    }
    return result;
  }
  ownKeys(target) {
    track(
      target,
      "iterate",
      (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(target) ? "length" : ITERATE_KEY
    );
    return Reflect.ownKeys(target);
  }
}
class ReadonlyReactiveHandler extends BaseReactiveHandler {
  constructor(shallow = false) {
    super(true, shallow);
  }
  set(target, key) {
    if (true) {
      warn(
        `Set operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
  deleteProperty(target, key) {
    if (true) {
      warn(
        `Delete operation on key "${String(key)}" failed: target is readonly.`,
        target
      );
    }
    return true;
  }
}
const mutableHandlers = /* @__PURE__ */ new MutableReactiveHandler();
const readonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler();
const shallowReactiveHandlers = /* @__PURE__ */ new MutableReactiveHandler(
  true
);
const shallowReadonlyHandlers = /* @__PURE__ */ new ReadonlyReactiveHandler(true);

const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly = false, isShallow = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasChanged)(key, rawKey)) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasChanged)(key, rawKey)) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly = false) {
  target = target["__v_raw"];
  !isReadonly && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasChanged)(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else if (true) {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget =  true ? (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isMap)(target) ? new Map(target) : new Set(target) : 0;
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly, isShallow) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly, isShallow) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isMap)(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    !isReadonly && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    if (true) {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(
        `${(0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.capitalize)(type)} operation ${key}failed: target is readonly.`,
        toRaw(this)
      );
    }
    return type === "delete" ? false : type === "clear" ? void 0 : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(
      method,
      false,
      false
    );
    readonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      false
    );
    shallowInstrumentations2[method] = createIterableMethod(
      method,
      false,
      true
    );
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly, shallow) {
  const instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly;
    } else if (key === "__v_isReadonly") {
      return isReadonly;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(
      (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasOwn)(instrumentations, key) && key in target ? instrumentations : target,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.toRawType)(target);
    console.warn(
      `Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}

const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1 /* COMMON */;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2 /* COLLECTION */;
    default:
      return 0 /* INVALID */;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 /* INVALID */ : targetTypeMap((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.toRawType)(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(
    target,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target) {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target) {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function shallowReadonly(target) {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap
  );
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isObject)(target)) {
    if (true) {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0 /* INVALID */) {
    return target;
  }
  const proxy = new Proxy(
    target,
    targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.def)(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isObject)(value) ? reactive(value) : value;
const toReadonly = (value) => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isObject)(value) ? readonly(value) : value;

function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    if (true) {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    } else {}
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    if (true) {
      triggerEffects(dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    } else {}
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.hasChanged)(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function triggerRef(ref2) {
  triggerRefValue(ref2,  true ? ref2.value : 0);
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
function toValue(source) {
  return (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isFunction)(source) ? source() : unref(source);
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class CustomRefImpl {
  constructor(factory) {
    this.dep = void 0;
    this.__v_isRef = true;
    const { get, set } = factory(
      () => trackRefValue(this),
      () => triggerRefValue(this)
    );
    this._get = get;
    this._set = set;
  }
  get value() {
    return this._get();
  }
  set value(newVal) {
    this._set(newVal);
  }
}
function customRef(factory) {
  return new CustomRefImpl(factory);
}
function toRefs(object) {
  if ( true && !isProxy(object)) {
    console.warn(`toRefs() expects a reactive object but received a plain one.`);
  }
  const ret = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isArray)(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = propertyToRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(toRaw(this._object), this._key);
  }
}
class GetterRefImpl {
  constructor(_getter) {
    this._getter = _getter;
    this.__v_isRef = true;
    this.__v_isReadonly = true;
  }
  get value() {
    return this._getter();
  }
}
function toRef(source, key, defaultValue) {
  if (isRef(source)) {
    return source;
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isFunction)(source)) {
    return new GetterRefImpl(source);
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isObject)(source) && arguments.length > 1) {
    return propertyToRef(source, key, defaultValue);
  } else {
    return ref(source);
  }
}
function propertyToRef(source, key, defaultValue) {
  const val = source[key];
  return isRef(val) ? val : new ObjectRefImpl(source, key, defaultValue);
}

class ComputedRefImpl {
  constructor(getter, _setter, isReadonly, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly;
  }
  get value() {
    const self = toRaw(this);
    trackRefValue(self);
    if (self._dirty || !self._cacheable) {
      self._dirty = false;
      self._value = self.effect.run();
    }
    return self._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_0__.isFunction)(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter =  true ? () => {
      console.warn("Write operation failed: computed value is readonly");
    } : 0;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if ( true && debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}

const tick = /* @__PURE__ */ Promise.resolve();
const queue = [];
let queued = false;
const scheduler = (fn) => {
  queue.push(fn);
  if (!queued) {
    queued = true;
    tick.then(flush);
  }
};
const flush = () => {
  for (let i = 0; i < queue.length; i++) {
    queue[i]();
  }
  queue.length = 0;
  queued = false;
};
class DeferredComputedRefImpl {
  constructor(getter) {
    this.dep = void 0;
    this._dirty = true;
    this.__v_isRef = true;
    this["__v_isReadonly"] = true;
    let compareTarget;
    let hasCompareTarget = false;
    let scheduled = false;
    this.effect = new ReactiveEffect(getter, (computedTrigger) => {
      if (this.dep) {
        if (computedTrigger) {
          compareTarget = this._value;
          hasCompareTarget = true;
        } else if (!scheduled) {
          const valueToCompare = hasCompareTarget ? compareTarget : this._value;
          scheduled = true;
          hasCompareTarget = false;
          scheduler(() => {
            if (this.effect.active && this._get() !== valueToCompare) {
              triggerRefValue(this);
            }
            scheduled = false;
          });
        }
        for (const e of this.dep) {
          if (e.computed instanceof DeferredComputedRefImpl) {
            e.scheduler(
              true
              /* computedTrigger */
            );
          }
        }
      }
      this._dirty = true;
    });
    this.effect.computed = this;
  }
  _get() {
    if (this._dirty) {
      this._dirty = false;
      return this._value = this.effect.run();
    }
    return this._value;
  }
  get value() {
    trackRefValue(this);
    return toRaw(this)._get();
  }
}
function deferredComputed(getter) {
  return new DeferredComputedRefImpl(getter);
}




/***/ }),

/***/ "./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseTransition: function() { return /* binding */ BaseTransition; },
/* harmony export */   BaseTransitionPropsValidators: function() { return /* binding */ BaseTransitionPropsValidators; },
/* harmony export */   Comment: function() { return /* binding */ Comment; },
/* harmony export */   EffectScope: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.EffectScope; },
/* harmony export */   Fragment: function() { return /* binding */ Fragment; },
/* harmony export */   KeepAlive: function() { return /* binding */ KeepAlive; },
/* harmony export */   ReactiveEffect: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.ReactiveEffect; },
/* harmony export */   Static: function() { return /* binding */ Static; },
/* harmony export */   Suspense: function() { return /* binding */ Suspense; },
/* harmony export */   Teleport: function() { return /* binding */ Teleport; },
/* harmony export */   Text: function() { return /* binding */ Text; },
/* harmony export */   assertNumber: function() { return /* binding */ assertNumber; },
/* harmony export */   callWithAsyncErrorHandling: function() { return /* binding */ callWithAsyncErrorHandling; },
/* harmony export */   callWithErrorHandling: function() { return /* binding */ callWithErrorHandling; },
/* harmony export */   camelize: function() { return /* reexport safe */ _vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize; },
/* harmony export */   capitalize: function() { return /* reexport safe */ _vue_shared__WEBPACK_IMPORTED_MODULE_1__.capitalize; },
/* harmony export */   cloneVNode: function() { return /* binding */ cloneVNode; },
/* harmony export */   compatUtils: function() { return /* binding */ compatUtils; },
/* harmony export */   computed: function() { return /* binding */ computed; },
/* harmony export */   createBlock: function() { return /* binding */ createBlock; },
/* harmony export */   createCommentVNode: function() { return /* binding */ createCommentVNode; },
/* harmony export */   createElementBlock: function() { return /* binding */ createElementBlock; },
/* harmony export */   createElementVNode: function() { return /* binding */ createBaseVNode; },
/* harmony export */   createHydrationRenderer: function() { return /* binding */ createHydrationRenderer; },
/* harmony export */   createPropsRestProxy: function() { return /* binding */ createPropsRestProxy; },
/* harmony export */   createRenderer: function() { return /* binding */ createRenderer; },
/* harmony export */   createSlots: function() { return /* binding */ createSlots; },
/* harmony export */   createStaticVNode: function() { return /* binding */ createStaticVNode; },
/* harmony export */   createTextVNode: function() { return /* binding */ createTextVNode; },
/* harmony export */   createVNode: function() { return /* binding */ createVNode; },
/* harmony export */   customRef: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.customRef; },
/* harmony export */   defineAsyncComponent: function() { return /* binding */ defineAsyncComponent; },
/* harmony export */   defineComponent: function() { return /* binding */ defineComponent; },
/* harmony export */   defineEmits: function() { return /* binding */ defineEmits; },
/* harmony export */   defineExpose: function() { return /* binding */ defineExpose; },
/* harmony export */   defineModel: function() { return /* binding */ defineModel; },
/* harmony export */   defineOptions: function() { return /* binding */ defineOptions; },
/* harmony export */   defineProps: function() { return /* binding */ defineProps; },
/* harmony export */   defineSlots: function() { return /* binding */ defineSlots; },
/* harmony export */   devtools: function() { return /* binding */ devtools; },
/* harmony export */   effect: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.effect; },
/* harmony export */   effectScope: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.effectScope; },
/* harmony export */   getCurrentInstance: function() { return /* binding */ getCurrentInstance; },
/* harmony export */   getCurrentScope: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope; },
/* harmony export */   getTransitionRawChildren: function() { return /* binding */ getTransitionRawChildren; },
/* harmony export */   guardReactiveProps: function() { return /* binding */ guardReactiveProps; },
/* harmony export */   h: function() { return /* binding */ h; },
/* harmony export */   handleError: function() { return /* binding */ handleError; },
/* harmony export */   hasInjectionContext: function() { return /* binding */ hasInjectionContext; },
/* harmony export */   initCustomFormatter: function() { return /* binding */ initCustomFormatter; },
/* harmony export */   inject: function() { return /* binding */ inject; },
/* harmony export */   isMemoSame: function() { return /* binding */ isMemoSame; },
/* harmony export */   isProxy: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isProxy; },
/* harmony export */   isReactive: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isReactive; },
/* harmony export */   isReadonly: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isReadonly; },
/* harmony export */   isRef: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef; },
/* harmony export */   isRuntimeOnly: function() { return /* binding */ isRuntimeOnly; },
/* harmony export */   isShallow: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isShallow; },
/* harmony export */   isVNode: function() { return /* binding */ isVNode; },
/* harmony export */   markRaw: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.markRaw; },
/* harmony export */   mergeDefaults: function() { return /* binding */ mergeDefaults; },
/* harmony export */   mergeModels: function() { return /* binding */ mergeModels; },
/* harmony export */   mergeProps: function() { return /* binding */ mergeProps; },
/* harmony export */   nextTick: function() { return /* binding */ nextTick; },
/* harmony export */   normalizeClass: function() { return /* reexport safe */ _vue_shared__WEBPACK_IMPORTED_MODULE_1__.normalizeClass; },
/* harmony export */   normalizeProps: function() { return /* reexport safe */ _vue_shared__WEBPACK_IMPORTED_MODULE_1__.normalizeProps; },
/* harmony export */   normalizeStyle: function() { return /* reexport safe */ _vue_shared__WEBPACK_IMPORTED_MODULE_1__.normalizeStyle; },
/* harmony export */   onActivated: function() { return /* binding */ onActivated; },
/* harmony export */   onBeforeMount: function() { return /* binding */ onBeforeMount; },
/* harmony export */   onBeforeUnmount: function() { return /* binding */ onBeforeUnmount; },
/* harmony export */   onBeforeUpdate: function() { return /* binding */ onBeforeUpdate; },
/* harmony export */   onDeactivated: function() { return /* binding */ onDeactivated; },
/* harmony export */   onErrorCaptured: function() { return /* binding */ onErrorCaptured; },
/* harmony export */   onMounted: function() { return /* binding */ onMounted; },
/* harmony export */   onRenderTracked: function() { return /* binding */ onRenderTracked; },
/* harmony export */   onRenderTriggered: function() { return /* binding */ onRenderTriggered; },
/* harmony export */   onScopeDispose: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.onScopeDispose; },
/* harmony export */   onServerPrefetch: function() { return /* binding */ onServerPrefetch; },
/* harmony export */   onUnmounted: function() { return /* binding */ onUnmounted; },
/* harmony export */   onUpdated: function() { return /* binding */ onUpdated; },
/* harmony export */   openBlock: function() { return /* binding */ openBlock; },
/* harmony export */   popScopeId: function() { return /* binding */ popScopeId; },
/* harmony export */   provide: function() { return /* binding */ provide; },
/* harmony export */   proxyRefs: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.proxyRefs; },
/* harmony export */   pushScopeId: function() { return /* binding */ pushScopeId; },
/* harmony export */   queuePostFlushCb: function() { return /* binding */ queuePostFlushCb; },
/* harmony export */   reactive: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.reactive; },
/* harmony export */   readonly: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.readonly; },
/* harmony export */   ref: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.ref; },
/* harmony export */   registerRuntimeCompiler: function() { return /* binding */ registerRuntimeCompiler; },
/* harmony export */   renderList: function() { return /* binding */ renderList; },
/* harmony export */   renderSlot: function() { return /* binding */ renderSlot; },
/* harmony export */   resolveComponent: function() { return /* binding */ resolveComponent; },
/* harmony export */   resolveDirective: function() { return /* binding */ resolveDirective; },
/* harmony export */   resolveDynamicComponent: function() { return /* binding */ resolveDynamicComponent; },
/* harmony export */   resolveFilter: function() { return /* binding */ resolveFilter; },
/* harmony export */   resolveTransitionHooks: function() { return /* binding */ resolveTransitionHooks; },
/* harmony export */   setBlockTracking: function() { return /* binding */ setBlockTracking; },
/* harmony export */   setDevtoolsHook: function() { return /* binding */ setDevtoolsHook; },
/* harmony export */   setTransitionHooks: function() { return /* binding */ setTransitionHooks; },
/* harmony export */   shallowReactive: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReactive; },
/* harmony export */   shallowReadonly: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly; },
/* harmony export */   shallowRef: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowRef; },
/* harmony export */   ssrContextKey: function() { return /* binding */ ssrContextKey; },
/* harmony export */   ssrUtils: function() { return /* binding */ ssrUtils; },
/* harmony export */   stop: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.stop; },
/* harmony export */   toDisplayString: function() { return /* reexport safe */ _vue_shared__WEBPACK_IMPORTED_MODULE_1__.toDisplayString; },
/* harmony export */   toHandlerKey: function() { return /* reexport safe */ _vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey; },
/* harmony export */   toHandlers: function() { return /* binding */ toHandlers; },
/* harmony export */   toRaw: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw; },
/* harmony export */   toRef: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRef; },
/* harmony export */   toRefs: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRefs; },
/* harmony export */   toValue: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toValue; },
/* harmony export */   transformVNodeArgs: function() { return /* binding */ transformVNodeArgs; },
/* harmony export */   triggerRef: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.triggerRef; },
/* harmony export */   unref: function() { return /* reexport safe */ _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.unref; },
/* harmony export */   useAttrs: function() { return /* binding */ useAttrs; },
/* harmony export */   useModel: function() { return /* binding */ useModel; },
/* harmony export */   useSSRContext: function() { return /* binding */ useSSRContext; },
/* harmony export */   useSlots: function() { return /* binding */ useSlots; },
/* harmony export */   useTransitionState: function() { return /* binding */ useTransitionState; },
/* harmony export */   version: function() { return /* binding */ version; },
/* harmony export */   warn: function() { return /* binding */ warn; },
/* harmony export */   watch: function() { return /* binding */ watch; },
/* harmony export */   watchEffect: function() { return /* binding */ watchEffect; },
/* harmony export */   watchPostEffect: function() { return /* binding */ watchPostEffect; },
/* harmony export */   watchSyncEffect: function() { return /* binding */ watchSyncEffect; },
/* harmony export */   withAsyncContext: function() { return /* binding */ withAsyncContext; },
/* harmony export */   withCtx: function() { return /* binding */ withCtx; },
/* harmony export */   withDefaults: function() { return /* binding */ withDefaults; },
/* harmony export */   withDirectives: function() { return /* binding */ withDirectives; },
/* harmony export */   withMemo: function() { return /* binding */ withMemo; },
/* harmony export */   withScopeId: function() { return /* binding */ withScopeId; }
/* harmony export */ });
/* harmony import */ var _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vue/reactivity */ "./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js");
/* harmony import */ var _vue_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vue/shared */ "./node_modules/@vue/shared/dist/shared.esm-bundler.js");





const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn(msg, ...args) {
  if (false)
    {}
  (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.pauseTracking)();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(
      appWarnHandler,
      instance,
      11,
      [
        msg + args.join(""),
        instance && instance.proxy,
        trace.map(
          ({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`
        ).join("\n"),
        trace
      ]
    );
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.resetTracking)();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(
    vnode.component,
    vnode.type,
    isRoot
  )}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(value)) {
    value = formatProp(key, (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(value);
    return raw ? value : [`${key}=`, value];
  }
}
function assertNumber(val, type) {
  if (false)
    {}
  if (val === void 0) {
    return;
  } else if (typeof val !== "number") {
    warn(`${type} is not a valid number - got ${JSON.stringify(val)}.`);
  } else if (isNaN(val)) {
    warn(`${type} is NaN - the duration expression might be incorrect.`);
  }
}

const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isPromise)(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo =  true ? ErrorTypeStrings[type] : 0;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  if (true) {
    const info = ErrorTypeStrings[type];
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      throw err;
    } else {
      console.error(err);
    }
  } else {}
}

let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p = currentFlushPromise || resolvedPromise;
  return fn ? p.then(this ? fn.bind(this) : fn) : p;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJob = queue[middle];
    const middleJobId = getId(middleJob);
    if (middleJobId < id || middleJobId === id && middleJob.pre) {
      start = middle + 1;
    } else {
      end = middle;
    }
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
  if (true) {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if ( true && checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    if (true) {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if ( true && checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  if (true) {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check =  true ? (job) => checkRecursiveUpdates(seen, job) : 0;
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if ( true && check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn(
        `Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`
      );
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}

let isHmrUpdating = false;
const hmrDirtyComponents = /* @__PURE__ */ new Set();
if (true) {
  (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.getGlobalThis)().__VUE_HMR_RUNTIME__ = {
    createRecord: tryWrap(createRecord),
    rerender: tryWrap(rerender),
    reload: tryWrap(reload)
  };
}
const map = /* @__PURE__ */ new Map();
function registerHMR(instance) {
  const id = instance.type.__hmrId;
  let record = map.get(id);
  if (!record) {
    createRecord(id, instance.type);
    record = map.get(id);
  }
  record.instances.add(instance);
}
function unregisterHMR(instance) {
  map.get(instance.type.__hmrId).instances.delete(instance);
}
function createRecord(id, initialDef) {
  if (map.has(id)) {
    return false;
  }
  map.set(id, {
    initialDef: normalizeClassComponent(initialDef),
    instances: /* @__PURE__ */ new Set()
  });
  return true;
}
function normalizeClassComponent(component) {
  return isClassComponent(component) ? component.__vccOpts : component;
}
function rerender(id, newRender) {
  const record = map.get(id);
  if (!record) {
    return;
  }
  record.initialDef.render = newRender;
  [...record.instances].forEach((instance) => {
    if (newRender) {
      instance.render = newRender;
      normalizeClassComponent(instance.type).render = newRender;
    }
    instance.renderCache = [];
    isHmrUpdating = true;
    instance.update();
    isHmrUpdating = false;
  });
}
function reload(id, newComp) {
  const record = map.get(id);
  if (!record)
    return;
  newComp = normalizeClassComponent(newComp);
  updateComponentDef(record.initialDef, newComp);
  const instances = [...record.instances];
  for (const instance of instances) {
    const oldComp = normalizeClassComponent(instance.type);
    if (!hmrDirtyComponents.has(oldComp)) {
      if (oldComp !== record.initialDef) {
        updateComponentDef(oldComp, newComp);
      }
      hmrDirtyComponents.add(oldComp);
    }
    instance.appContext.propsCache.delete(instance.type);
    instance.appContext.emitsCache.delete(instance.type);
    instance.appContext.optionsCache.delete(instance.type);
    if (instance.ceReload) {
      hmrDirtyComponents.add(oldComp);
      instance.ceReload(newComp.styles);
      hmrDirtyComponents.delete(oldComp);
    } else if (instance.parent) {
      queueJob(instance.parent.update);
    } else if (instance.appContext.reload) {
      instance.appContext.reload();
    } else if (typeof window !== "undefined") {
      window.location.reload();
    } else {
      console.warn(
        "[HMR] Root or manually mounted instance modified. Full reload required."
      );
    }
  }
  queuePostFlushCb(() => {
    for (const instance of instances) {
      hmrDirtyComponents.delete(
        normalizeClassComponent(instance.type)
      );
    }
  });
}
function updateComponentDef(oldComp, newComp) {
  (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(oldComp, newComp);
  for (const key in oldComp) {
    if (key !== "__file" && !(key in newComp)) {
      delete oldComp[key];
    }
  }
}
function tryWrap(fn) {
  return (id, arg) => {
    try {
      return fn(id, arg);
    } catch (e) {
      console.error(e);
      console.warn(
        `[HMR] Something went wrong during Vue component hot-reload. Full reload required.`
      );
    }
  };
}

let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    window.HTMLElement && // also exclude jsdom
    !((_b = (_a = window.navigator) == null ? void 0 : _a.userAgent) == null ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version) {
  emit$1("app:init" /* APP_INIT */, app, version, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
function devtoolsUnmountApp(app) {
  emit$1("app:unmount" /* APP_UNMOUNT */, app);
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added" /* COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook("component:updated" /* COMPONENT_UPDATED */);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed" /* COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      component.parent ? component.parent.uid : void 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start" /* PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end" /* PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1(
    "component:emit" /* COMPONENT_EMIT */,
    component.appContext.app,
    component,
    event,
    params
  );
}

function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
  if (true) {
    const {
      emitsOptions,
      propsOptions: [propsOptions]
    } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey)(event) in propsOptions)) {
          warn(
            `Component emitted event "${event}" but it is neither declared in the emits option nor as an "${(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey)(event)}" prop.`
          );
        }
      } else {
        const validator = emitsOptions[event];
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn(
              `Invalid event arguments: event validation failed for event "${event}".`
            );
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener = event.startsWith("update:");
  const modelArg = isModelListener && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseToNumber);
    }
  }
  if (true) {
    devtoolsComponentEmit(instance, event, args);
  }
  if (true) {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey)(lowerCaseEvent)]) {
      warn(
        `Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(
          instance,
          instance.type
        )} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(event)}" instead of "${event}".`
      );
    }
  }
  let handlerName;
  let handler = props[handlerName = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey)(event)] || // also try camelCase event handler (#2249)
  props[handlerName = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey)((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(event))];
  if (!handler && isModelListener) {
    handler = props[handlerName = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey)((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if ( true && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(normalized, raw);
  }
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isOn)(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(options, key[0].toLowerCase() + key.slice(1)) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(options, (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(key)) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(options, key);
}

let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
const withScopeId = (_id) => withCtx;
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    if (true) {
      devtoolsComponentUpdated(ctx);
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}

let accessedAttrs = false;
function markAttrsAccessed() {
  accessedAttrs = true;
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    props,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  if (true) {
    accessedAttrs = false;
  }
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      const thisProxy =  true && setupState.__isScriptSetup ? new Proxy(proxyToUse, {
        get(target, key, receiver) {
          warn(
            `Property '${String(
              key
            )}' was accessed via 'this'. Avoid using 'this' in templates.`
          );
          return Reflect.get(target, key, receiver);
        }
      }) : proxyToUse;
      result = normalizeVNode(
        render.call(
          thisProxy,
          proxyToUse,
          renderCache,
          props,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if ( true && attrs === props) {
        markAttrsAccessed();
      }
      result = normalizeVNode(
        render2.length > 1 ? render2(
          props,
           true ? {
            get attrs() {
              markAttrsAccessed();
              return attrs;
            },
            slots,
            emit
          } : 0
        ) : render2(
          props,
          null
          /* we know it doesn't need it */
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  let setRoot = void 0;
  if ( true && result.patchFlag > 0 && result.patchFlag & 2048) {
    [root, setRoot] = getChildRoot(result);
  }
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs);
      } else if ( true && !accessedAttrs && root.type !== Comment) {
        const allAttrs = Object.keys(attrs);
        const eventAttrs = [];
        const extraAttrs = [];
        for (let i = 0, l = allAttrs.length; i < l; i++) {
          const key = allAttrs[i];
          if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isOn)(key)) {
            if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isModelListener)(key)) {
              eventAttrs.push(key[2].toLowerCase() + key.slice(3));
            }
          } else {
            extraAttrs.push(key);
          }
        }
        if (extraAttrs.length) {
          warn(
            `Extraneous non-props attributes (${extraAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`
          );
        }
        if (eventAttrs.length) {
          warn(
            `Extraneous non-emits event listeners (${eventAttrs.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`
          );
        }
      }
    }
  }
  if (vnode.dirs) {
    if ( true && !isElementRoot(root)) {
      warn(
        `Runtime directive used on component with non-element root node. The directives will not function as intended.`
      );
    }
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    if ( true && !isElementRoot(root)) {
      warn(
        `Component inside <Transition> renders non-element root node that cannot be animated.`
      );
    }
    root.transition = vnode.transition;
  }
  if ( true && setRoot) {
    setRoot(root);
  } else {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getChildRoot = (vnode) => {
  const rawChildren = vnode.children;
  const dynamicChildren = vnode.dynamicChildren;
  const childRoot = filterSingleRoot(rawChildren);
  if (!childRoot) {
    return [vnode, void 0];
  }
  const index = rawChildren.indexOf(childRoot);
  const dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
  const setRoot = (updatedRoot) => {
    rawChildren[index] = updatedRoot;
    if (dynamicChildren) {
      if (dynamicIndex > -1) {
        dynamicChildren[dynamicIndex] = updatedRoot;
      } else if (updatedRoot.patchFlag > 0) {
        vnode.dynamicChildren = [...dynamicChildren, updatedRoot];
      }
    }
  };
  return [normalizeVNode(childRoot), setRoot];
};
function filterSingleRoot(children) {
  let singleRoot;
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isVNode(child)) {
      if (child.type !== Comment || child.children === "v-if") {
        if (singleRoot) {
          return;
        } else {
          singleRoot = child;
        }
      }
    } else {
      return;
    }
  }
  return singleRoot;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isOn)(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props) => {
  const res = {};
  for (const key in attrs) {
    if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isModelListener)(key) || !(key.slice(9) in props)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
const isElementRoot = (vnode) => {
  return vnode.shapeFlag & (6 | 1) || vnode.type === Comment;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if ( true && (prevChildren || nextChildren) && isHmrUpdating) {
    return true;
  }
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}

const COMPONENTS = "components";
const DIRECTIVES = "directives";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function resolveDynamicComponent(component) {
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(component)) {
    return resolveAsset(COMPONENTS, component, false) || component;
  } else {
    return component || NULL_DYNAMIC_COMPONENT;
  }
}
function resolveDirective(name) {
  return resolveAsset(DIRECTIVES, name);
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component,
        false
        /* do not include inferred name to avoid breaking existing code */
      );
      if (selfName && (selfName === name || selfName === (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(name) || selfName === (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.capitalize)((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(name)))) {
        return Component;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component;
    }
    if ( true && warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else if (true) {
    warn(
      `resolve${(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.capitalize)(type.slice(0, -1))} can only be used in render() or setup().`
    );
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(name)] || registry[(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.capitalize)((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(name))]);
}

const isSuspense = (type) => type.__isSuspense;
const SuspenseImpl = {
  name: "Suspense",
  // In order to make Suspense tree-shakable, we need to avoid importing it
  // directly in the renderer. The renderer checks for the __isSuspense flag
  // on a vnode's type and calls the `process` method, passing in renderer
  // internals.
  __isSuspense: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals) {
    if (n1 == null) {
      mountSuspense(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized,
        rendererInternals
      );
    } else {
      patchSuspense(
        n1,
        n2,
        container,
        anchor,
        parentComponent,
        isSVG,
        slotScopeIds,
        optimized,
        rendererInternals
      );
    }
  },
  hydrate: hydrateSuspense,
  create: createSuspenseBoundary,
  normalize: normalizeSuspenseChildren
};
const Suspense = SuspenseImpl ;
function triggerEvent(vnode, name) {
  const eventListener = vnode.props && vnode.props[name];
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(eventListener)) {
    eventListener();
  }
}
function mountSuspense(vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals) {
  const {
    p: patch,
    o: { createElement }
  } = rendererInternals;
  const hiddenContainer = createElement("div");
  const suspense = vnode.suspense = createSuspenseBoundary(
    vnode,
    parentSuspense,
    parentComponent,
    container,
    hiddenContainer,
    anchor,
    isSVG,
    slotScopeIds,
    optimized,
    rendererInternals
  );
  patch(
    null,
    suspense.pendingBranch = vnode.ssContent,
    hiddenContainer,
    null,
    parentComponent,
    suspense,
    isSVG,
    slotScopeIds
  );
  if (suspense.deps > 0) {
    triggerEvent(vnode, "onPending");
    triggerEvent(vnode, "onFallback");
    patch(
      null,
      vnode.ssFallback,
      container,
      anchor,
      parentComponent,
      null,
      // fallback tree will not have suspense context
      isSVG,
      slotScopeIds
    );
    setActiveBranch(suspense, vnode.ssFallback);
  } else {
    suspense.resolve(false, true);
  }
}
function patchSuspense(n1, n2, container, anchor, parentComponent, isSVG, slotScopeIds, optimized, { p: patch, um: unmount, o: { createElement } }) {
  const suspense = n2.suspense = n1.suspense;
  suspense.vnode = n2;
  n2.el = n1.el;
  const newBranch = n2.ssContent;
  const newFallback = n2.ssFallback;
  const { activeBranch, pendingBranch, isInFallback, isHydrating } = suspense;
  if (pendingBranch) {
    suspense.pendingBranch = newBranch;
    if (isSameVNodeType(newBranch, pendingBranch)) {
      patch(
        pendingBranch,
        newBranch,
        suspense.hiddenContainer,
        null,
        parentComponent,
        suspense,
        isSVG,
        slotScopeIds,
        optimized
      );
      if (suspense.deps <= 0) {
        suspense.resolve();
      } else if (isInFallback) {
        patch(
          activeBranch,
          newFallback,
          container,
          anchor,
          parentComponent,
          null,
          // fallback tree will not have suspense context
          isSVG,
          slotScopeIds,
          optimized
        );
        setActiveBranch(suspense, newFallback);
      }
    } else {
      suspense.pendingId++;
      if (isHydrating) {
        suspense.isHydrating = false;
        suspense.activeBranch = pendingBranch;
      } else {
        unmount(pendingBranch, parentComponent, suspense);
      }
      suspense.deps = 0;
      suspense.effects.length = 0;
      suspense.hiddenContainer = createElement("div");
      if (isInFallback) {
        patch(
          null,
          newBranch,
          suspense.hiddenContainer,
          null,
          parentComponent,
          suspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        if (suspense.deps <= 0) {
          suspense.resolve();
        } else {
          patch(
            activeBranch,
            newFallback,
            container,
            anchor,
            parentComponent,
            null,
            // fallback tree will not have suspense context
            isSVG,
            slotScopeIds,
            optimized
          );
          setActiveBranch(suspense, newFallback);
        }
      } else if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
        patch(
          activeBranch,
          newBranch,
          container,
          anchor,
          parentComponent,
          suspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        suspense.resolve(true);
      } else {
        patch(
          null,
          newBranch,
          suspense.hiddenContainer,
          null,
          parentComponent,
          suspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        if (suspense.deps <= 0) {
          suspense.resolve();
        }
      }
    }
  } else {
    if (activeBranch && isSameVNodeType(newBranch, activeBranch)) {
      patch(
        activeBranch,
        newBranch,
        container,
        anchor,
        parentComponent,
        suspense,
        isSVG,
        slotScopeIds,
        optimized
      );
      setActiveBranch(suspense, newBranch);
    } else {
      triggerEvent(n2, "onPending");
      suspense.pendingBranch = newBranch;
      suspense.pendingId++;
      patch(
        null,
        newBranch,
        suspense.hiddenContainer,
        null,
        parentComponent,
        suspense,
        isSVG,
        slotScopeIds,
        optimized
      );
      if (suspense.deps <= 0) {
        suspense.resolve();
      } else {
        const { timeout, pendingId } = suspense;
        if (timeout > 0) {
          setTimeout(() => {
            if (suspense.pendingId === pendingId) {
              suspense.fallback(newFallback);
            }
          }, timeout);
        } else if (timeout === 0) {
          suspense.fallback(newFallback);
        }
      }
    }
  }
}
let hasWarned = false;
function createSuspenseBoundary(vnode, parentSuspense, parentComponent, container, hiddenContainer, anchor, isSVG, slotScopeIds, optimized, rendererInternals, isHydrating = false) {
  if ( true && !hasWarned) {
    hasWarned = true;
    console[console.info ? "info" : "log"](
      `<Suspense> is an experimental feature and its API will likely change.`
    );
  }
  const {
    p: patch,
    m: move,
    um: unmount,
    n: next,
    o: { parentNode, remove }
  } = rendererInternals;
  let parentSuspenseId;
  const isSuspensible = isVNodeSuspensible(vnode);
  if (isSuspensible) {
    if (parentSuspense == null ? void 0 : parentSuspense.pendingBranch) {
      parentSuspenseId = parentSuspense.pendingId;
      parentSuspense.deps++;
    }
  }
  const timeout = vnode.props ? (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toNumber)(vnode.props.timeout) : void 0;
  if (true) {
    assertNumber(timeout, `Suspense timeout`);
  }
  const suspense = {
    vnode,
    parent: parentSuspense,
    parentComponent,
    isSVG,
    container,
    hiddenContainer,
    anchor,
    deps: 0,
    pendingId: 0,
    timeout: typeof timeout === "number" ? timeout : -1,
    activeBranch: null,
    pendingBranch: null,
    isInFallback: true,
    isHydrating,
    isUnmounted: false,
    effects: [],
    resolve(resume = false, sync = false) {
      if (true) {
        if (!resume && !suspense.pendingBranch) {
          throw new Error(
            `suspense.resolve() is called without a pending branch.`
          );
        }
        if (suspense.isUnmounted) {
          throw new Error(
            `suspense.resolve() is called on an already unmounted suspense boundary.`
          );
        }
      }
      const {
        vnode: vnode2,
        activeBranch,
        pendingBranch,
        pendingId,
        effects,
        parentComponent: parentComponent2,
        container: container2
      } = suspense;
      let delayEnter = false;
      if (suspense.isHydrating) {
        suspense.isHydrating = false;
      } else if (!resume) {
        delayEnter = activeBranch && pendingBranch.transition && pendingBranch.transition.mode === "out-in";
        if (delayEnter) {
          activeBranch.transition.afterLeave = () => {
            if (pendingId === suspense.pendingId) {
              move(pendingBranch, container2, anchor2, 0);
              queuePostFlushCb(effects);
            }
          };
        }
        let { anchor: anchor2 } = suspense;
        if (activeBranch) {
          anchor2 = next(activeBranch);
          unmount(activeBranch, parentComponent2, suspense, true);
        }
        if (!delayEnter) {
          move(pendingBranch, container2, anchor2, 0);
        }
      }
      setActiveBranch(suspense, pendingBranch);
      suspense.pendingBranch = null;
      suspense.isInFallback = false;
      let parent = suspense.parent;
      let hasUnresolvedAncestor = false;
      while (parent) {
        if (parent.pendingBranch) {
          parent.effects.push(...effects);
          hasUnresolvedAncestor = true;
          break;
        }
        parent = parent.parent;
      }
      if (!hasUnresolvedAncestor && !delayEnter) {
        queuePostFlushCb(effects);
      }
      suspense.effects = [];
      if (isSuspensible) {
        if (parentSuspense && parentSuspense.pendingBranch && parentSuspenseId === parentSuspense.pendingId) {
          parentSuspense.deps--;
          if (parentSuspense.deps === 0 && !sync) {
            parentSuspense.resolve();
          }
        }
      }
      triggerEvent(vnode2, "onResolve");
    },
    fallback(fallbackVNode) {
      if (!suspense.pendingBranch) {
        return;
      }
      const { vnode: vnode2, activeBranch, parentComponent: parentComponent2, container: container2, isSVG: isSVG2 } = suspense;
      triggerEvent(vnode2, "onFallback");
      const anchor2 = next(activeBranch);
      const mountFallback = () => {
        if (!suspense.isInFallback) {
          return;
        }
        patch(
          null,
          fallbackVNode,
          container2,
          anchor2,
          parentComponent2,
          null,
          // fallback tree will not have suspense context
          isSVG2,
          slotScopeIds,
          optimized
        );
        setActiveBranch(suspense, fallbackVNode);
      };
      const delayEnter = fallbackVNode.transition && fallbackVNode.transition.mode === "out-in";
      if (delayEnter) {
        activeBranch.transition.afterLeave = mountFallback;
      }
      suspense.isInFallback = true;
      unmount(
        activeBranch,
        parentComponent2,
        null,
        // no suspense so unmount hooks fire now
        true
        // shouldRemove
      );
      if (!delayEnter) {
        mountFallback();
      }
    },
    move(container2, anchor2, type) {
      suspense.activeBranch && move(suspense.activeBranch, container2, anchor2, type);
      suspense.container = container2;
    },
    next() {
      return suspense.activeBranch && next(suspense.activeBranch);
    },
    registerDep(instance, setupRenderEffect) {
      const isInPendingSuspense = !!suspense.pendingBranch;
      if (isInPendingSuspense) {
        suspense.deps++;
      }
      const hydratedEl = instance.vnode.el;
      instance.asyncDep.catch((err) => {
        handleError(err, instance, 0);
      }).then((asyncSetupResult) => {
        if (instance.isUnmounted || suspense.isUnmounted || suspense.pendingId !== instance.suspenseId) {
          return;
        }
        instance.asyncResolved = true;
        const { vnode: vnode2 } = instance;
        if (true) {
          pushWarningContext(vnode2);
        }
        handleSetupResult(instance, asyncSetupResult, false);
        if (hydratedEl) {
          vnode2.el = hydratedEl;
        }
        const placeholder = !hydratedEl && instance.subTree.el;
        setupRenderEffect(
          instance,
          vnode2,
          // component may have been moved before resolve.
          // if this is not a hydration, instance.subTree will be the comment
          // placeholder.
          parentNode(hydratedEl || instance.subTree.el),
          // anchor will not be used if this is hydration, so only need to
          // consider the comment placeholder case.
          hydratedEl ? null : next(instance.subTree),
          suspense,
          isSVG,
          optimized
        );
        if (placeholder) {
          remove(placeholder);
        }
        updateHOCHostEl(instance, vnode2.el);
        if (true) {
          popWarningContext();
        }
        if (isInPendingSuspense && --suspense.deps === 0) {
          suspense.resolve();
        }
      });
    },
    unmount(parentSuspense2, doRemove) {
      suspense.isUnmounted = true;
      if (suspense.activeBranch) {
        unmount(
          suspense.activeBranch,
          parentComponent,
          parentSuspense2,
          doRemove
        );
      }
      if (suspense.pendingBranch) {
        unmount(
          suspense.pendingBranch,
          parentComponent,
          parentSuspense2,
          doRemove
        );
      }
    }
  };
  return suspense;
}
function hydrateSuspense(node, vnode, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, rendererInternals, hydrateNode) {
  const suspense = vnode.suspense = createSuspenseBoundary(
    vnode,
    parentSuspense,
    parentComponent,
    node.parentNode,
    document.createElement("div"),
    null,
    isSVG,
    slotScopeIds,
    optimized,
    rendererInternals,
    true
    /* hydrating */
  );
  const result = hydrateNode(
    node,
    suspense.pendingBranch = vnode.ssContent,
    parentComponent,
    suspense,
    slotScopeIds,
    optimized
  );
  if (suspense.deps === 0) {
    suspense.resolve(false, true);
  }
  return result;
}
function normalizeSuspenseChildren(vnode) {
  const { shapeFlag, children } = vnode;
  const isSlotChildren = shapeFlag & 32;
  vnode.ssContent = normalizeSuspenseSlot(
    isSlotChildren ? children.default : children
  );
  vnode.ssFallback = isSlotChildren ? normalizeSuspenseSlot(children.fallback) : createVNode(Comment);
}
function normalizeSuspenseSlot(s) {
  let block;
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(s)) {
    const trackBlock = isBlockTreeEnabled && s._c;
    if (trackBlock) {
      s._d = false;
      openBlock();
    }
    s = s();
    if (trackBlock) {
      s._d = true;
      block = currentBlock;
      closeBlock();
    }
  }
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(s)) {
    const singleChild = filterSingleRoot(s);
    if ( true && !singleChild && s.filter((child) => child !== NULL_DYNAMIC_COMPONENT).length > 0) {
      warn(`<Suspense> slots expect a single root node.`);
    }
    s = singleChild;
  }
  s = normalizeVNode(s);
  if (block && !s.dynamicChildren) {
    s.dynamicChildren = block.filter((c) => c !== s);
  }
  return s;
}
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
function setActiveBranch(suspense, branch) {
  suspense.activeBranch = branch;
  const { vnode, parentComponent } = suspense;
  const el = vnode.el = branch.el;
  if (parentComponent && parentComponent.subTree === vnode) {
    parentComponent.vnode.el = el;
    updateHOCHostEl(parentComponent, el);
  }
}
function isVNodeSuspensible(vnode) {
  var _a;
  return ((_a = vnode.props) == null ? void 0 : _a.suspensible) != null && vnode.props.suspensible !== false;
}

function watchEffect(effect, options) {
  return doWatch(effect, null, options);
}
function watchPostEffect(effect, options) {
  return doWatch(
    effect,
    null,
     true ? (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, options, { flush: "post" }) : 0
  );
}
function watchSyncEffect(effect, options) {
  return doWatch(
    effect,
    null,
     true ? (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, options, { flush: "sync" }) : 0
  );
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if ( true && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(cb)) {
    warn(
      `\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`
    );
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ) {
  var _a;
  if ( true && !cb) {
    if (immediate !== void 0) {
      warn(
        `watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
    if (deep !== void 0) {
      warn(
        `watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`
      );
    }
  }
  const warnInvalidSource = (s) => {
    warn(
      `Invalid watch source: `,
      s,
      `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`
    );
  };
  const instance = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope)() === ((_a = currentInstance) == null ? void 0 : _a.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(source)) {
    getter = () => source.value;
    forceTrigger = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isShallow)(source);
  } else if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isReactive)(source)) {
    getter = () => source;
    deep = true;
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isReactive)(s) || (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isShallow)(s));
    getter = () => source.map((s) => {
      if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(s)) {
        return s.value;
      } else if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isReactive)(s)) {
        return traverse(s);
      } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else {
         true && warnInvalidSource(s);
      }
    });
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP;
     true && warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
      cleanup = effect.onStop = void 0;
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasChanged)(v, oldValue[i])) : (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasChanged)(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.ReactiveEffect(getter, scheduler);
  if (true) {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(
      effect.run.bind(effect),
      instance && instance.suspense
    );
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.remove)(instance.scope.effects, effect);
    }
  };
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(value)) {
    traverse(value.value, seen);
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isSet)(value) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isMap)(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isPlainObject)(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}

function validateDirectiveName(name) {
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isBuiltInDirective)(name)) {
    warn("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
     true && warn(`withDirectives can only be used inside render functions.`);
    return vnode;
  }
  const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ] = directives[i];
    if (dir) {
      if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.pauseTracking)();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.resetTracking)();
    }
  }
}

const leaveCbKey = Symbol("_leaveCb");
const enterCbKey = Symbol("_enterCb");
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  // enter
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  // leave
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  // appear
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: BaseTransitionPropsValidators,
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        let hasFound = false;
        for (const c of children) {
          if (c.type !== Comment) {
            if ( true && hasFound) {
              warn(
                "<transition> can only be used on a single element or component. Use <transition-group> for lists."
              );
              break;
            }
            child = c;
            hasFound = true;
            if (false)
              {}
          }
        }
      }
      const rawProps = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(props);
      const { mode } = rawProps;
      if ( true && mode && mode !== "in-out" && mode !== "out-in" && mode !== "default") {
        warn(`invalid <transition> mode: ${mode}`);
      }
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(
        innerChild,
        rawProps,
        state,
        instance
      );
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(
          oldInnerChild,
          rawProps,
          state,
          instance
        );
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance.update.active !== false) {
              instance.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(
              state,
              oldInnerChild
            );
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el[leaveCbKey] = () => {
              earlyRemove();
              el[leaveCbKey] = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props, state, instance) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook = (hook, args) => {
    hook && callWithAsyncErrorHandling(
      hook,
      instance,
      9,
      args
    );
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook(hook, args);
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el[leaveCbKey]) {
        el[leaveCbKey](
          true
          /* cancelled */
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el[leaveCbKey]) {
        leavingVNode.el[leaveCbKey]();
      }
      callHook(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el[enterCbKey] = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook(cancelHook, [el]);
        } else {
          callHook(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el[enterCbKey] = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove) {
      const key2 = String(vnode.key);
      if (el[enterCbKey]) {
        el[enterCbKey](
          true
          /* cancelled */
        );
      }
      if (state.isUnmounting) {
        return remove();
      }
      callHook(onBeforeLeave, [el]);
      let called = false;
      const done = el[leaveCbKey] = (cancelled) => {
        if (called)
          return;
        called = true;
        remove();
        if (cancelled) {
          callHook(onLeaveCancelled, [el]);
        } else {
          callHook(onAfterLeave, [el]);
        }
        el[leaveCbKey] = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? (
    // #7121 ensure get the child component subtree in case
    // it's been replaced during HMR
     true && vnode.component ? vnode.component.subTree : vnode.children ? vnode.children[0] : void 0
  ) : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(
        getTransitionRawChildren(child.children, keepComment, key)
      );
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineComponent(options, extraOptions) {
  return (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(options) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    /* @__PURE__ */ (() => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({ name: options.name }, extraOptions, { setup: options }))()
  ) : options;
}

const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineAsyncComponent(source) {
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(source)) {
    source = { loader: source };
  }
  const {
    loader,
    loadingComponent,
    errorComponent,
    delay = 200,
    timeout,
    // undefined = never times out
    suspensible = true,
    onError: userOnError
  } = source;
  let pendingRequest = null;
  let resolvedComp;
  let retries = 0;
  const retry = () => {
    retries++;
    pendingRequest = null;
    return load();
  };
  const load = () => {
    let thisRequest;
    return pendingRequest || (thisRequest = pendingRequest = loader().catch((err) => {
      err = err instanceof Error ? err : new Error(String(err));
      if (userOnError) {
        return new Promise((resolve, reject) => {
          const userRetry = () => resolve(retry());
          const userFail = () => reject(err);
          userOnError(err, userRetry, userFail, retries + 1);
        });
      } else {
        throw err;
      }
    }).then((comp) => {
      if (thisRequest !== pendingRequest && pendingRequest) {
        return pendingRequest;
      }
      if ( true && !comp) {
        warn(
          `Async component loader resolved to undefined. If you are using retry(), make sure to return its return value.`
        );
      }
      if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
        comp = comp.default;
      }
      if ( true && comp && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(comp) && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(comp)) {
        throw new Error(`Invalid async component load result: ${comp}`);
      }
      resolvedComp = comp;
      return comp;
    }));
  };
  return defineComponent({
    name: "AsyncComponentWrapper",
    __asyncLoader: load,
    get __asyncResolved() {
      return resolvedComp;
    },
    setup() {
      const instance = currentInstance;
      if (resolvedComp) {
        return () => createInnerComp(resolvedComp, instance);
      }
      const onError = (err) => {
        pendingRequest = null;
        handleError(
          err,
          instance,
          13,
          !errorComponent
          /* do not throw in dev if user provided error component */
        );
      };
      if (suspensible && instance.suspense || isInSSRComponentSetup) {
        return load().then((comp) => {
          return () => createInnerComp(comp, instance);
        }).catch((err) => {
          onError(err);
          return () => errorComponent ? createVNode(errorComponent, {
            error: err
          }) : null;
        });
      }
      const loaded = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.ref)(false);
      const error = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.ref)();
      const delayed = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.ref)(!!delay);
      if (delay) {
        setTimeout(() => {
          delayed.value = false;
        }, delay);
      }
      if (timeout != null) {
        setTimeout(() => {
          if (!loaded.value && !error.value) {
            const err = new Error(
              `Async component timed out after ${timeout}ms.`
            );
            onError(err);
            error.value = err;
          }
        }, timeout);
      }
      load().then(() => {
        loaded.value = true;
        if (instance.parent && isKeepAlive(instance.parent.vnode)) {
          queueJob(instance.parent.update);
        }
      }).catch((err) => {
        onError(err);
        error.value = err;
      });
      return () => {
        if (loaded.value && resolvedComp) {
          return createInnerComp(resolvedComp, instance);
        } else if (error.value && errorComponent) {
          return createVNode(errorComponent, {
            error: error.value
          });
        } else if (loadingComponent && !delayed.value) {
          return createVNode(loadingComponent);
        }
      };
    }
  });
}
function createInnerComp(comp, parent) {
  const { ref: ref2, props, children, ce } = parent.vnode;
  const vnode = createVNode(comp, props, children);
  vnode.ref = ref2;
  vnode.ce = ce;
  delete parent.vnode.ce;
  return vnode;
}

const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
const KeepAliveImpl = {
  name: `KeepAlive`,
  // Marker for special handling inside the renderer. We are not using a ===
  // check directly on KeepAlive in the renderer, because importing it directly
  // would prevent it from being tree-shaken.
  __isKeepAlive: true,
  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const sharedContext = instance.ctx;
    if (!sharedContext.renderer) {
      return () => {
        const children = slots.default && slots.default();
        return children && children.length === 1 ? children[0] : children;
      };
    }
    const cache = /* @__PURE__ */ new Map();
    const keys = /* @__PURE__ */ new Set();
    let current = null;
    if (true) {
      instance.__v_cache = cache;
    }
    const parentSuspense = instance.suspense;
    const {
      renderer: {
        p: patch,
        m: move,
        um: _unmount,
        o: { createElement }
      }
    } = sharedContext;
    const storageContainer = createElement("div");
    sharedContext.activate = (vnode, container, anchor, isSVG, optimized) => {
      const instance2 = vnode.component;
      move(vnode, container, anchor, 0, parentSuspense);
      patch(
        instance2.vnode,
        vnode,
        container,
        anchor,
        instance2,
        parentSuspense,
        isSVG,
        vnode.slotScopeIds,
        optimized
      );
      queuePostRenderEffect(() => {
        instance2.isDeactivated = false;
        if (instance2.a) {
          (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.invokeArrayFns)(instance2.a);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeMounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
      }, parentSuspense);
      if (true) {
        devtoolsComponentAdded(instance2);
      }
    };
    sharedContext.deactivate = (vnode) => {
      const instance2 = vnode.component;
      move(vnode, storageContainer, null, 1, parentSuspense);
      queuePostRenderEffect(() => {
        if (instance2.da) {
          (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.invokeArrayFns)(instance2.da);
        }
        const vnodeHook = vnode.props && vnode.props.onVnodeUnmounted;
        if (vnodeHook) {
          invokeVNodeHook(vnodeHook, instance2.parent, vnode);
        }
        instance2.isDeactivated = true;
      }, parentSuspense);
      if (true) {
        devtoolsComponentAdded(instance2);
      }
    };
    function unmount(vnode) {
      resetShapeFlag(vnode);
      _unmount(vnode, instance, parentSuspense, true);
    }
    function pruneCache(filter) {
      cache.forEach((vnode, key) => {
        const name = getComponentName(vnode.type);
        if (name && (!filter || !filter(name))) {
          pruneCacheEntry(key);
        }
      });
    }
    function pruneCacheEntry(key) {
      const cached = cache.get(key);
      if (!current || !isSameVNodeType(cached, current)) {
        unmount(cached);
      } else if (current) {
        resetShapeFlag(current);
      }
      cache.delete(key);
      keys.delete(key);
    }
    watch(
      () => [props.include, props.exclude],
      ([include, exclude]) => {
        include && pruneCache((name) => matches(include, name));
        exclude && pruneCache((name) => !matches(exclude, name));
      },
      // prune post-render after `current` has been updated
      { flush: "post", deep: true }
    );
    let pendingCacheKey = null;
    const cacheSubtree = () => {
      if (pendingCacheKey != null) {
        cache.set(pendingCacheKey, getInnerChild(instance.subTree));
      }
    };
    onMounted(cacheSubtree);
    onUpdated(cacheSubtree);
    onBeforeUnmount(() => {
      cache.forEach((cached) => {
        const { subTree, suspense } = instance;
        const vnode = getInnerChild(subTree);
        if (cached.type === vnode.type && cached.key === vnode.key) {
          resetShapeFlag(vnode);
          const da = vnode.component.da;
          da && queuePostRenderEffect(da, suspense);
          return;
        }
        unmount(cached);
      });
    });
    return () => {
      pendingCacheKey = null;
      if (!slots.default) {
        return null;
      }
      const children = slots.default();
      const rawVNode = children[0];
      if (children.length > 1) {
        if (true) {
          warn(`KeepAlive should contain exactly one component child.`);
        }
        current = null;
        return children;
      } else if (!isVNode(rawVNode) || !(rawVNode.shapeFlag & 4) && !(rawVNode.shapeFlag & 128)) {
        current = null;
        return rawVNode;
      }
      let vnode = getInnerChild(rawVNode);
      const comp = vnode.type;
      const name = getComponentName(
        isAsyncWrapper(vnode) ? vnode.type.__asyncResolved || {} : comp
      );
      const { include, exclude, max } = props;
      if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
        current = vnode;
        return rawVNode;
      }
      const key = vnode.key == null ? comp : vnode.key;
      const cachedVNode = cache.get(key);
      if (vnode.el) {
        vnode = cloneVNode(vnode);
        if (rawVNode.shapeFlag & 128) {
          rawVNode.ssContent = vnode;
        }
      }
      pendingCacheKey = key;
      if (cachedVNode) {
        vnode.el = cachedVNode.el;
        vnode.component = cachedVNode.component;
        if (vnode.transition) {
          setTransitionHooks(vnode, vnode.transition);
        }
        vnode.shapeFlag |= 512;
        keys.delete(key);
        keys.add(key);
      } else {
        keys.add(key);
        if (max && keys.size > parseInt(max, 10)) {
          pruneCacheEntry(keys.values().next().value);
        }
      }
      vnode.shapeFlag |= 256;
      current = vnode;
      return isSuspense(rawVNode.type) ? rawVNode : vnode;
    };
  }
};
const KeepAlive = KeepAliveImpl;
function matches(pattern, name) {
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(pattern)) {
    return pattern.some((p) => matches(p, name));
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(pattern)) {
    return pattern.split(",").includes(name);
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isRegExp)(pattern)) {
    return pattern.test(name);
  }
  return false;
}
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.remove)(keepAliveRoot[type], injected);
  }, target);
}
function resetShapeFlag(vnode) {
  vnode.shapeFlag &= ~256;
  vnode.shapeFlag &= ~512;
}
function getInnerChild(vnode) {
  return vnode.shapeFlag & 128 ? vnode.ssContent : vnode;
}

function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.pauseTracking)();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.resetTracking)();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else if (true) {
    const apiName = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey)(ErrorTypeStrings[type].replace(/ hook$/, ""));
    warn(
      `${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().` + (` If you are using async setup(), make sure to register lifecycle hooks before the first await statement.` )
    );
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook(
  "rtg"
);
const onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}

function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache && cache[index];
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(source) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    if ( true && !Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached && cached[i])
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index] = ret;
  }
  return ret;
}

function createSlots(slots, dynamicSlots) {
  for (let i = 0; i < dynamicSlots.length; i++) {
    const slot = dynamicSlots[i];
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(slot)) {
      for (let j = 0; j < slot.length; j++) {
        slots[slot[j].name] = slot[j].fn;
      }
    } else if (slot) {
      slots[slot.name] = slot.key ? (...args) => {
        const res = slot.fn(...args);
        if (res)
          res.key = slot.key;
        return res;
      } : slot.fn;
    }
  }
  return slots;
}

function renderSlot(slots, name, props = {}, fallback, noSlotted) {
  if (currentRenderingInstance.isCE || currentRenderingInstance.parent && isAsyncWrapper(currentRenderingInstance.parent) && currentRenderingInstance.parent.isCE) {
    if (name !== "default")
      props.name = name;
    return createVNode("slot", props, fallback && fallback());
  }
  let slot = slots[name];
  if ( true && slot && slot.length > 1) {
    warn(
      `SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template.`
    );
    slot = () => [];
  }
  if (slot && slot._c) {
    slot._d = false;
  }
  openBlock();
  const validSlotContent = slot && ensureValidVNode(slot(props));
  const rendered = createBlock(
    Fragment,
    {
      key: props.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      validSlotContent && validSlotContent.key || `_${name}`
    },
    validSlotContent || (fallback ? fallback() : []),
    validSlotContent && slots._ === 1 ? 64 : -2
  );
  if (!noSlotted && rendered.scopeId) {
    rendered.slotScopeIds = [rendered.scopeId + "-s"];
  }
  if (slot && slot._c) {
    slot._d = true;
  }
  return rendered;
}
function ensureValidVNode(vnodes) {
  return vnodes.some((child) => {
    if (!isVNode(child))
      return true;
    if (child.type === Comment)
      return false;
    if (child.type === Fragment && !ensureValidVNode(child.children))
      return false;
    return true;
  }) ? vnodes : null;
}

function toHandlers(obj, preserveCaseIfNecessary) {
  const ret = {};
  if ( true && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(obj)) {
    warn(`v-on with no argument expects an object value.`);
    return ret;
  }
  for (const key in obj) {
    ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? `on:${key}` : (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toHandlerKey)(key)] = obj[key];
  }
  return ret;
}

const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    $el: (i) => i.vnode.el,
    $data: (i) => i.data,
    $props: (i) =>  true ? (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly)(i.props) : 0,
    $attrs: (i) =>  true ? (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly)(i.attrs) : 0,
    $slots: (i) =>  true ? (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly)(i.slots) : 0,
    $refs: (i) =>  true ? (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly)(i.refs) : 0,
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) =>  true ? resolveMergedOptions(i) : 0,
    $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
    $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
    $watch: (i) =>  true ? instanceWatch.bind(i) : 0
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ && !state.__isScriptSetup && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if ( true && key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1 /* SETUP */:
            return setupState[key];
          case 2 /* DATA */:
            return data[key];
          case 4 /* CONTEXT */:
            return ctx[key];
          case 3 /* PROPS */:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1 /* SETUP */;
        return setupState[key];
      } else if (data !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(data, key)) {
        accessCache[key] = 2 /* DATA */;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(normalizedProps, key)
      ) {
        accessCache[key] = 3 /* PROPS */;
        return props[key];
      } else if (ctx !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(ctx, key)) {
        accessCache[key] = 4 /* CONTEXT */;
        return ctx[key];
      } else if ( false || shouldCacheAccess) {
        accessCache[key] = 0 /* OTHER */;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.track)(instance, "get", key);
         true && markAttrsAccessed();
      } else if ( true && key === "$slots") {
        (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.track)(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(ctx, key)) {
      accessCache[key] = 4 /* CONTEXT */;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if ( true && currentRenderingInstance && (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ && isReservedPrefix(key[0]) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(data, key)) {
        warn(
          `Property ${JSON.stringify(
            key
          )} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`
        );
      } else if (instance === currentRenderingInstance) {
        warn(
          `Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`
        );
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if ( true && setupState.__isScriptSetup && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(setupState, key)) {
      warn(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(data, key)) {
      data[key] = value;
      return true;
    } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(instance.props, key)) {
       true && warn(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
       true && warn(
        `Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`
      );
      return false;
    } else {
      if ( true && key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(normalizedProps, key) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(ctx, key) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(publicPropertiesMap, key) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
if (true) {
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn(
      `Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`
    );
    return Reflect.ownKeys(target);
  };
}
const RuntimeCompiledPublicInstanceProxyHandlers = /* @__PURE__ */ (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(
  {},
  PublicInstanceProxyHandlers,
  {
    get(target, key) {
      if (key === Symbol.unscopables) {
        return;
      }
      return PublicInstanceProxyHandlers.get(target, key, target);
    },
    has(_, key) {
      const has = key[0] !== "_" && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isGloballyAllowed)(key);
      if ( true && !has && PublicInstanceProxyHandlers.has(_, key)) {
        warn(
          `Property ${JSON.stringify(
            key
          )} should not start with _ which is a reserved prefix for Vue internals.`
        );
      }
      return has;
    }
  }
);
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const {
    ctx,
    propsOptions: [propsOptions]
  } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn(
          `setup() return property ${JSON.stringify(
            key
          )} should not start with "$" or "_" which are reserved prefixes for Vue internals.`
        );
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP
      });
    }
  });
}

const warnRuntimeUsage = (method) => warn(
  `${method}() is a compiler-hint helper that is only usable inside <script setup> of a single file component. Its arguments should be compiled away and passing it at runtime has no effect.`
);
function defineProps() {
  if (true) {
    warnRuntimeUsage(`defineProps`);
  }
  return null;
}
function defineEmits() {
  if (true) {
    warnRuntimeUsage(`defineEmits`);
  }
  return null;
}
function defineExpose(exposed) {
  if (true) {
    warnRuntimeUsage(`defineExpose`);
  }
}
function defineOptions(options) {
  if (true) {
    warnRuntimeUsage(`defineOptions`);
  }
}
function defineSlots() {
  if (true) {
    warnRuntimeUsage(`defineSlots`);
  }
  return null;
}
function defineModel() {
  if (true) {
    warnRuntimeUsage("defineModel");
  }
}
function withDefaults(props, defaults) {
  if (true) {
    warnRuntimeUsage(`withDefaults`);
  }
  return null;
}
function useSlots() {
  return getContext().slots;
}
function useAttrs() {
  return getContext().attrs;
}
function useModel(props, name, options) {
  const i = getCurrentInstance();
  if ( true && !i) {
    warn(`useModel() called without active instance.`);
    return (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.ref)();
  }
  if ( true && !i.propsOptions[0][name]) {
    warn(`useModel() called with prop "${name}" which is not declared.`);
    return (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.ref)();
  }
  if (options && options.local) {
    const proxy = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.ref)(props[name]);
    watch(
      () => props[name],
      (v) => proxy.value = v
    );
    watch(proxy, (value) => {
      if (value !== props[name]) {
        i.emit(`update:${name}`, value);
      }
    });
    return proxy;
  } else {
    return {
      __v_isRef: true,
      get value() {
        return props[name];
      },
      set value(value) {
        i.emit(`update:${name}`, value);
      }
    };
  }
}
function getContext() {
  const i = getCurrentInstance();
  if ( true && !i) {
    warn(`useContext() called without active instance.`);
  }
  return i.setupContext || (i.setupContext = createSetupContext(i));
}
function normalizePropsOrEmits(props) {
  return (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(props) ? props.reduce(
    (normalized, p) => (normalized[p] = null, normalized),
    {}
  ) : props;
}
function mergeDefaults(raw, defaults) {
  const props = normalizePropsOrEmits(raw);
  for (const key in defaults) {
    if (key.startsWith("__skip"))
      continue;
    let opt = props[key];
    if (opt) {
      if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(opt) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(opt)) {
        opt = props[key] = { type: opt, default: defaults[key] };
      } else {
        opt.default = defaults[key];
      }
    } else if (opt === null) {
      opt = props[key] = { default: defaults[key] };
    } else if (true) {
      warn(`props default key "${key}" has no corresponding declaration.`);
    }
    if (opt && defaults[`__skip_${key}`]) {
      opt.skipFactory = true;
    }
  }
  return props;
}
function mergeModels(a, b) {
  if (!a || !b)
    return a || b;
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(a) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(b))
    return a.concat(b);
  return (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, normalizePropsOrEmits(a), normalizePropsOrEmits(b));
}
function createPropsRestProxy(props, excludedKeys) {
  const ret = {};
  for (const key in props) {
    if (!excludedKeys.includes(key)) {
      Object.defineProperty(ret, key, {
        enumerable: true,
        get: () => props[key]
      });
    }
  }
  return ret;
}
function withAsyncContext(getAwaitable) {
  const ctx = getCurrentInstance();
  if ( true && !ctx) {
    warn(
      `withAsyncContext called without active current instance. This is likely a bug.`
    );
  }
  let awaitable = getAwaitable();
  unsetCurrentInstance();
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isPromise)(awaitable)) {
    awaitable = awaitable.catch((e) => {
      setCurrentInstance(ctx);
      throw e;
    });
  }
  return [awaitable, () => setCurrentInstance(ctx)];
}

function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook(options.beforeCreate, instance, "bc");
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties =  true ? createDuplicateChecker() : 0;
  if (true) {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props" /* PROPS */, key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(methodHandler)) {
        if (true) {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        } else {}
        if (true) {
          checkDuplicateProperties("Methods" /* METHODS */, key);
        }
      } else if (true) {
        warn(
          `Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`
        );
      }
    }
  }
  if (dataOptions) {
    if ( true && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(dataOptions)) {
      warn(
        `The data option must be a function. Plain object usage is no longer supported.`
      );
    }
    const data = dataOptions.call(publicThis, publicThis);
    if ( true && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isPromise)(data)) {
      warn(
        `data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`
      );
    }
    if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(data)) {
       true && warn(`data() should return an object.`);
    } else {
      instance.data = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.reactive)(data);
      if (true) {
        for (const key in data) {
          checkDuplicateProperties("Data" /* DATA */, key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(opt) ? opt.bind(publicThis, publicThis) : (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(opt.get) ? opt.get.bind(publicThis, publicThis) : _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP;
      if ( true && get === _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP) {
        warn(`Computed property "${key}" has no getter.`);
      }
      const set = !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(opt) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(opt.set) ? opt.set.bind(publicThis) :  true ? () => {
        warn(
          `Write operation failed: computed property "${key}" is readonly.`
        );
      } : 0;
      const c = computed({
        get,
        set
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      if (true) {
        checkDuplicateProperties("Computed" /* COMPUTED */, key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP) {
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
    if (true) {
      checkDuplicateProperties("Inject" /* INJECT */, key);
    }
  }
}
function callHook(hook, instance, type) {
  callWithAsyncErrorHandling(
    (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(raw)) {
    const handler = ctx[raw];
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(handler)) {
      watch(getter, handler);
    } else if (true) {
      warn(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(raw)) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(handler)) {
        watch(getter, handler, raw);
      } else if (true) {
        warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else if (true) {
    warn(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
       true && warn(
        `"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`
      );
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend))(
      (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(to) ? to.call(this, this) : to,
      (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(to) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}

function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp(rootComponent, rootProps = null) {
    if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(rootComponent)) {
      rootComponent = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, rootComponent);
    }
    if (rootProps != null && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(rootProps)) {
       true && warn(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    if (true) {
      Object.defineProperty(context.config, "unwrapInjectedRef", {
        get() {
          return true;
        },
        set() {
          warn(
            `app.config.unwrapInjectedRef has been deprecated. 3.3 now always unwraps injected refs in Options API.`
          );
        }
      });
    }
    const installedPlugins = /* @__PURE__ */ new WeakSet();
    let isMounted = false;
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        if (true) {
          warn(
            `app.config cannot be replaced. Modify individual options instead.`
          );
        }
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin)) {
           true && warn(`Plugin has already been applied to target app.`);
        } else if (plugin && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app, ...options);
        } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(plugin)) {
          installedPlugins.add(plugin);
          plugin(app, ...options);
        } else if (true) {
          warn(
            `A plugin must either be a function or an object with an "install" function.`
          );
        }
        return app;
      },
      mixin(mixin) {
        if (true) {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else if (true) {
            warn(
              "Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : "")
            );
          }
        } else {}
        return app;
      },
      component(name, component) {
        if (true) {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if ( true && context.components[name]) {
          warn(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        if (true) {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if ( true && context.directives[name]) {
          warn(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          if ( true && rootContainer.__vue_app__) {
            warn(
              `There is already an app instance mounted on the host container.
 If you want to mount another app on the same host container, you need to unmount the previous app by calling \`app.unmount()\` first.`
            );
          }
          const vnode = createVNode(rootComponent, rootProps);
          vnode.appContext = context;
          if (true) {
            context.reload = () => {
              render(cloneVNode(vnode), rootContainer, isSVG);
            };
          }
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app._container = rootContainer;
          rootContainer.__vue_app__ = app;
          if (true) {
            app._instance = vnode.component;
            devtoolsInitApp(app, version);
          }
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        } else if (true) {
          warn(
            `App has already been mounted.
If you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. \`const createMyApp = () => createApp(App)\``
          );
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app._container);
          if (true) {
            app._instance = null;
            devtoolsUnmountApp(app);
          }
          delete app._container.__vue_app__;
        } else if (true) {
          warn(`Cannot unmount an app that is not mounted.`);
        }
      },
      provide(key, value) {
        if ( true && key in context.provides) {
          warn(
            `App already provides property with key "${String(key)}". It will be overwritten with the new value.`
          );
        }
        context.provides[key] = value;
        return app;
      },
      runWithContext(fn) {
        currentApp = app;
        try {
          return fn();
        } finally {
          currentApp = null;
        }
      }
    };
    return app;
  };
}
let currentApp = null;

function provide(key, value) {
  if (!currentInstance) {
    if (true) {
      warn(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else if (true) {
      warn(`injection "${String(key)}" not found.`);
    }
  } else if (true) {
    warn(`inject() can only be used inside setup() or functional components.`);
  }
}
function hasInjectionContext() {
  return !!(currentInstance || currentRenderingInstance || currentApp);
}

function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.def)(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  if (true) {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReactive)(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !( true && isInHmrContext(instance)) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(key)) === key || !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.trigger)(instance, "set", "$attrs");
  }
  if (true) {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isReservedProp)(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(options, camelKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(props);
    const castValues = rawCastValues || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props
          );
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0 /* shouldCast */]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1 /* shouldCastTrue */] && (value === "" || value === (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if ( true && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(comp)) {
      cache.set(comp, _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_ARR);
    }
    return _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_ARR;
  }
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if ( true && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(raw[i])) {
        warn(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if ( true && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(raw)) {
      warn(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(opt) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(opt) ? { type: opt } : (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0 /* shouldCast */] = booleanIndex > -1;
          prop[1 /* shouldCastTrue */] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else if (true) {
    warn(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(
      key,
      resolvedValues[key],
      opt,
      !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(rawProps, key) && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(rawProps, (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(key))
    );
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator, skipCheck } = prop;
  if (required && isAbsent) {
    warn('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !required) {
    return;
  }
  if (type != null && type !== true && !skipCheck) {
    let isValid = false;
    const types = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.makeMap)(
  "String,Number,Boolean,Function,Symbol,BigInt"
);
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(value);
  } else if (expectedType === "Array") {
    valid = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  if (expectedTypes.length === 0) {
    return `Prop type [] for prop "${name}" won't match anything. Did you mean to use type Array instead?`;
  }
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(_vue_shared__WEBPACK_IMPORTED_MODULE_1__.capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toRawType)(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}

const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if ( true && currentInstance) {
      warn(
        `Slot "${key}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`
      );
    }
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value)) {
      slots[key] = normalizeSlot(key, value, ctx);
    } else if (value != null) {
      if (true) {
        warn(
          `Non-function value encountered for slot "${key}". Prefer function slots for better performance.`
        );
      }
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  if ( true && !isKeepAlive(instance.vnode) && true) {
    warn(
      `Non-function value encountered for default slot. Prefer function slots for better performance.`
    );
  }
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(children);
      (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.def)(children, "_", type);
    } else {
      normalizeObjectSlots(
        children,
        instance.slots = {});
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.def)(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if ( true && isHmrUpdating) {
        (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(slots, children);
        (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.trigger)(instance, "set", "$slots");
      } else if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && deletionComparisonTarget[key] == null) {
        delete slots[key];
      }
    }
  }
};

function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref } = rawRef;
  if ( true && !owner) {
    warn(
      `Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.`
    );
    return;
  }
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(oldRef)) {
      refs[oldRef] = null;
      if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(oldRef)) {
      oldRef.value = null;
    }
  }
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(ref)) {
    callWithErrorHandling(ref, owner, 12, [value, refs]);
  } else {
    const _isString = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(ref);
    const _isRef = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(ref);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(setupState, ref) ? setupState[ref] : refs[ref] : ref.value;
          if (isUnmount) {
            (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(existing) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.remove)(existing, refValue);
          } else {
            if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(existing)) {
              if (_isString) {
                refs[ref] = [refValue];
                if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(setupState, ref)) {
                  setupState[ref] = refs[ref];
                }
              } else {
                ref.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref] = value;
          if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasOwn)(setupState, ref)) {
            setupState[ref] = value;
          }
        } else if (_isRef) {
          ref.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else if (true) {
          warn("Invalid template ref type:", ref, `(${typeof ref})`);
        }
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    } else if (true) {
      warn("Invalid template ref type:", ref, `(${typeof ref})`);
    }
  }
}

let hasMismatch = false;
const isSVGContainer = (container) => /svg/.test(container.namespaceURI) && container.tagName !== "foreignObject";
const isComment = (node) => node.nodeType === 8 /* COMMENT */;
function createHydrationFunctions(rendererInternals) {
  const {
    mt: mountComponent,
    p: patch,
    o: {
      patchProp,
      createText,
      nextSibling,
      parentNode,
      remove,
      insert,
      createComment
    }
  } = rendererInternals;
  const hydrate = (vnode, container) => {
    if (!container.hasChildNodes()) {
       true && warn(
        `Attempting to hydrate existing markup but container is empty. Performing full mount instead.`
      );
      patch(null, vnode, container);
      flushPostFlushCbs();
      container._vnode = vnode;
      return;
    }
    hasMismatch = false;
    hydrateNode(container.firstChild, vnode, null, null, null);
    flushPostFlushCbs();
    container._vnode = vnode;
    if (hasMismatch && true) {
      console.error(`Hydration completed but contains mismatches.`);
    }
  };
  const hydrateNode = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized = false) => {
    const isFragmentStart = isComment(node) && node.data === "[";
    const onMismatch = () => handleMismatch(
      node,
      vnode,
      parentComponent,
      parentSuspense,
      slotScopeIds,
      isFragmentStart
    );
    const { type, ref, shapeFlag, patchFlag } = vnode;
    let domType = node.nodeType;
    vnode.el = node;
    if (true) {
      if (!("__vnode" in node)) {
        Object.defineProperty(node, "__vnode", {
          value: vnode,
          enumerable: false
        });
      }
      if (!("__vueParentComponent" in node)) {
        Object.defineProperty(node, "__vueParentComponent", {
          value: parentComponent,
          enumerable: false
        });
      }
    }
    if (patchFlag === -2) {
      optimized = false;
      vnode.dynamicChildren = null;
    }
    let nextNode = null;
    switch (type) {
      case Text:
        if (domType !== 3 /* TEXT */) {
          if (vnode.children === "") {
            insert(vnode.el = createText(""), parentNode(node), node);
            nextNode = node;
          } else {
            nextNode = onMismatch();
          }
        } else {
          if (node.data !== vnode.children) {
            hasMismatch = true;
             true && warn(
              `Hydration text mismatch:
- Server rendered: ${JSON.stringify(
                node.data
              )}
- Client rendered: ${JSON.stringify(vnode.children)}`
            );
            node.data = vnode.children;
          }
          nextNode = nextSibling(node);
        }
        break;
      case Comment:
        if (isTemplateNode(node)) {
          nextNode = nextSibling(node);
          replaceNode(
            vnode.el = node.content.firstChild,
            node,
            parentComponent
          );
        } else if (domType !== 8 /* COMMENT */ || isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = nextSibling(node);
        }
        break;
      case Static:
        if (isFragmentStart) {
          node = nextSibling(node);
          domType = node.nodeType;
        }
        if (domType === 1 /* ELEMENT */ || domType === 3 /* TEXT */) {
          nextNode = node;
          const needToAdoptContent = !vnode.children.length;
          for (let i = 0; i < vnode.staticCount; i++) {
            if (needToAdoptContent)
              vnode.children += nextNode.nodeType === 1 /* ELEMENT */ ? nextNode.outerHTML : nextNode.data;
            if (i === vnode.staticCount - 1) {
              vnode.anchor = nextNode;
            }
            nextNode = nextSibling(nextNode);
          }
          return isFragmentStart ? nextSibling(nextNode) : nextNode;
        } else {
          onMismatch();
        }
        break;
      case Fragment:
        if (!isFragmentStart) {
          nextNode = onMismatch();
        } else {
          nextNode = hydrateFragment(
            node,
            vnode,
            parentComponent,
            parentSuspense,
            slotScopeIds,
            optimized
          );
        }
        break;
      default:
        if (shapeFlag & 1) {
          if ((domType !== 1 /* ELEMENT */ || vnode.type.toLowerCase() !== node.tagName.toLowerCase()) && !isTemplateNode(node)) {
            nextNode = onMismatch();
          } else {
            nextNode = hydrateElement(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized
            );
          }
        } else if (shapeFlag & 6) {
          vnode.slotScopeIds = slotScopeIds;
          const container = parentNode(node);
          if (isFragmentStart) {
            nextNode = locateClosingAnchor(node);
          } else if (isComment(node) && node.data === "teleport start") {
            nextNode = locateClosingAnchor(node, node.data, "teleport end");
          } else {
            nextNode = nextSibling(node);
          }
          mountComponent(
            vnode,
            container,
            null,
            parentComponent,
            parentSuspense,
            isSVGContainer(container),
            optimized
          );
          if (isAsyncWrapper(vnode)) {
            let subTree;
            if (isFragmentStart) {
              subTree = createVNode(Fragment);
              subTree.anchor = nextNode ? nextNode.previousSibling : container.lastChild;
            } else {
              subTree = node.nodeType === 3 ? createTextVNode("") : createVNode("div");
            }
            subTree.el = node;
            vnode.component.subTree = subTree;
          }
        } else if (shapeFlag & 64) {
          if (domType !== 8 /* COMMENT */) {
            nextNode = onMismatch();
          } else {
            nextNode = vnode.type.hydrate(
              node,
              vnode,
              parentComponent,
              parentSuspense,
              slotScopeIds,
              optimized,
              rendererInternals,
              hydrateChildren
            );
          }
        } else if (shapeFlag & 128) {
          nextNode = vnode.type.hydrate(
            node,
            vnode,
            parentComponent,
            parentSuspense,
            isSVGContainer(parentNode(node)),
            slotScopeIds,
            optimized,
            rendererInternals,
            hydrateNode
          );
        } else if (true) {
          warn("Invalid HostVNode type:", type, `(${typeof type})`);
        }
    }
    if (ref != null) {
      setRef(ref, null, parentSuspense, vnode);
    }
    return nextNode;
  };
  const hydrateElement = (el, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!vnode.dynamicChildren;
    const { type, props, patchFlag, shapeFlag, dirs, transition } = vnode;
    const forcePatch = type === "input" || type === "option";
    if (true) {
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "created");
      }
      if (props) {
        if (forcePatch || !optimized || patchFlag & (16 | 32)) {
          for (const key in props) {
            if (forcePatch && (key.endsWith("value") || key === "indeterminate") || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isOn)(key) && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isReservedProp)(key) || // force hydrate v-bind with .prop modifiers
            key[0] === ".") {
              patchProp(
                el,
                key,
                null,
                props[key],
                false,
                void 0,
                parentComponent
              );
            }
          }
        } else if (props.onClick) {
          patchProp(
            el,
            "onClick",
            null,
            props.onClick,
            false,
            void 0,
            parentComponent
          );
        }
      }
      let vnodeHooks;
      if (vnodeHooks = props && props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHooks, parentComponent, vnode);
      }
      let needCallTransitionHooks = false;
      if (isTemplateNode(el)) {
        needCallTransitionHooks = needTransition(parentSuspense, transition) && parentComponent && parentComponent.vnode.props && parentComponent.vnode.props.appear;
        const content = el.content.firstChild;
        if (needCallTransitionHooks) {
          transition.beforeEnter(content);
        }
        replaceNode(content, el, parentComponent);
        vnode.el = el = content;
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
      }
      if ((vnodeHooks = props && props.onVnodeMounted) || dirs || needCallTransitionHooks) {
        queueEffectWithSuspense(() => {
          vnodeHooks && invokeVNodeHook(vnodeHooks, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
        }, parentSuspense);
      }
      if (shapeFlag & 16 && // skip if element has innerHTML / textContent
      !(props && (props.innerHTML || props.textContent))) {
        let next = hydrateChildren(
          el.firstChild,
          vnode,
          el,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
        let hasWarned = false;
        while (next) {
          hasMismatch = true;
          if ( true && !hasWarned) {
            warn(
              `Hydration children mismatch in <${vnode.type}>: server rendered element contains more child nodes than client vdom.`
            );
            hasWarned = true;
          }
          const cur = next;
          next = next.nextSibling;
          remove(cur);
        }
      } else if (shapeFlag & 8) {
        if (el.textContent !== vnode.children) {
          hasMismatch = true;
           true && warn(
            `Hydration text content mismatch in <${vnode.type}>:
- Server rendered: ${el.textContent}
- Client rendered: ${vnode.children}`
          );
          el.textContent = vnode.children;
        }
      }
    }
    return el.nextSibling;
  };
  const hydrateChildren = (node, parentVNode, container, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    optimized = optimized || !!parentVNode.dynamicChildren;
    const children = parentVNode.children;
    const l = children.length;
    let hasWarned = false;
    for (let i = 0; i < l; i++) {
      const vnode = optimized ? children[i] : children[i] = normalizeVNode(children[i]);
      if (node) {
        node = hydrateNode(
          node,
          vnode,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      } else if (vnode.type === Text && !vnode.children) {
        continue;
      } else {
        hasMismatch = true;
        if ( true && !hasWarned) {
          warn(
            `Hydration children mismatch in <${container.tagName.toLowerCase()}>: server rendered element contains fewer child nodes than client vdom.`
          );
          hasWarned = true;
        }
        patch(
          null,
          vnode,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVGContainer(container),
          slotScopeIds
        );
      }
    }
    return node;
  };
  const hydrateFragment = (node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized) => {
    const { slotScopeIds: fragmentSlotScopeIds } = vnode;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    const container = parentNode(node);
    const next = hydrateChildren(
      nextSibling(node),
      vnode,
      container,
      parentComponent,
      parentSuspense,
      slotScopeIds,
      optimized
    );
    if (next && isComment(next) && next.data === "]") {
      return nextSibling(vnode.anchor = next);
    } else {
      hasMismatch = true;
      insert(vnode.anchor = createComment(`]`), container, next);
      return next;
    }
  };
  const handleMismatch = (node, vnode, parentComponent, parentSuspense, slotScopeIds, isFragment) => {
    hasMismatch = true;
     true && warn(
      `Hydration node mismatch:
- Client vnode:`,
      vnode.type,
      `
- Server rendered DOM:`,
      node,
      node.nodeType === 3 /* TEXT */ ? `(text)` : isComment(node) && node.data === "[" ? `(start of fragment)` : ``
    );
    vnode.el = null;
    if (isFragment) {
      const end = locateClosingAnchor(node);
      while (true) {
        const next2 = nextSibling(node);
        if (next2 && next2 !== end) {
          remove(next2);
        } else {
          break;
        }
      }
    }
    const next = nextSibling(node);
    const container = parentNode(node);
    remove(node);
    patch(
      null,
      vnode,
      container,
      next,
      parentComponent,
      parentSuspense,
      isSVGContainer(container),
      slotScopeIds
    );
    return next;
  };
  const locateClosingAnchor = (node, open = "[", close = "]") => {
    let match = 0;
    while (node) {
      node = nextSibling(node);
      if (node && isComment(node)) {
        if (node.data === open)
          match++;
        if (node.data === close) {
          if (match === 0) {
            return nextSibling(node);
          } else {
            match--;
          }
        }
      }
    }
    return node;
  };
  const replaceNode = (newNode, oldNode, parentComponent) => {
    const parentNode2 = oldNode.parentNode;
    if (parentNode2) {
      parentNode2.replaceChild(newNode, oldNode);
    }
    let parent = parentComponent;
    while (parent) {
      if (parent.vnode.el === oldNode) {
        parent.vnode.el = parent.subTree.el = newNode;
      }
      parent = parent.parent;
    }
  };
  const isTemplateNode = (node) => {
    return node.nodeType === 1 /* ELEMENT */ && node.tagName.toLowerCase() === "template";
  };
  return [hydrate, hydrateNode];
}

let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  if (true) {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(
      `<${formatComponentName(instance, instance.type)}> ${type}`,
      startTag,
      endTag
    );
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  if (true) {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}

function initFeatureFlags() {
  const needWarn = [];
  if (false) {}
  if (false) {}
  if ( true && needWarn.length) {
    const multi = needWarn.length > 1;
    console.warn(
      `Feature flag${multi ? `s` : ``} ${needWarn.join(", ")} ${multi ? `are` : `is`} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`
    );
  }
}

const queuePostRenderEffect = queueEffectWithSuspense ;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function createHydrationRenderer(options) {
  return baseCreateRenderer(options, createHydrationFunctions);
}
function baseCreateRenderer(options, createHydrationFns) {
  {
    initFeatureFlags();
  }
  const target = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.getGlobalThis)();
  target.__VUE__ = true;
  if (true) {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized =  true && isHmrUpdating ? false : !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        } else if (true) {
          patchStaticNode(n1, n2, container, isSVG);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (true) {
          warn("Invalid VNode type:", type, `(${typeof type})`);
        }
    }
    if (ref != null && parentComponent) {
      setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      isSVG,
      n2.el,
      n2.anchor
    );
  };
  const patchStaticNode = (n1, n2, container, isSVG) => {
    if (n2.children !== n1.children) {
      const anchor = hostNextSibling(n1.anchor);
      removeStaticNode(n1);
      [n2.el, n2.anchor] = hostInsertStaticContent(
        n2.children,
        container,
        anchor,
        isSVG
      );
    } else {
      n2.el = n1.el;
      n2.anchor = n1.anchor;
    }
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      isSVG,
      props && props.is,
      props
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        isSVG && type !== "foreignObject",
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props) {
      for (const key in props) {
        if (key !== "value" && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isReservedProp)(key)) {
          hostPatchProp(
            el,
            key,
            null,
            props[key],
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in props) {
        hostPatchProp(el, "value", null, props.value);
      }
      if (vnodeHook = props.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (true) {
      Object.defineProperty(el, "__vnode", {
        value: vnode,
        enumerable: false
      });
      Object.defineProperty(el, "__vueParentComponent", {
        value: parentComponent,
        enumerable: false
      });
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = needTransition(parentSuspense, transition);
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if ( true && subTree.patchFlag > 0 && subTree.patchFlag & 2048) {
        subTree = filterSingleRoot(subTree.children) || subTree;
      }
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
    for (let i = start; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
    const newProps = n2.props || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    if ( true && isHmrUpdating) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds
      );
      if (true) {
        traverseStaticChildren(n1, n2);
      }
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(
          el,
          n2,
          oldProps,
          newProps,
          parentComponent,
          parentSuspense,
          isSVG
        );
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(
                el,
                key,
                prev,
                next,
                isSVG,
                n1.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(
        el,
        n2,
        oldProps,
        newProps,
        parentComponent,
        parentSuspense,
        isSVG
      );
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          fallbackContainer
        )
      );
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isReservedProp)(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              isSVG,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
      }
      for (const key in newProps) {
        if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isReservedProp)(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(
            el,
            key,
            prev,
            next,
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if ( true && // #5523 dev root fragment may inherit directives
    (isHmrUpdating || patchFlag & 2048)) {
      patchFlag = 0;
      optimized = false;
      dynamicChildren = null;
    }
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        n2.children,
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
      // of renderSlot() with no valid children
      n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds
        );
        if (true) {
          traverseStaticChildren(n1, n2);
        } else {}
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          isSVG,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = (initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    ));
    if ( true && instance.type.__hmrId) {
      registerHMR(instance);
    }
    if (true) {
      pushWarningContext(initialVNode);
      startMeasure(instance, `mount`);
    }
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      if (true) {
        startMeasure(instance, `init`);
      }
      setupComponent(instance);
      if (true) {
        endMeasure(instance, `init`);
      }
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(
      instance,
      initialVNode,
      container,
      anchor,
      parentSuspense,
      isSVG,
      optimized
    );
    if (true) {
      popWarningContext();
      endMeasure(instance, `mount`);
    }
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        if (true) {
          pushWarningContext(n2);
        }
        updateComponentPreRender(instance, n2, optimized);
        if (true) {
          popWarningContext();
        }
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.invokeArrayFns)(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            if (true) {
              startMeasure(instance, `render`);
            }
            instance.subTree = renderComponentRoot(instance);
            if (true) {
              endMeasure(instance, `render`);
            }
            if (true) {
              startMeasure(instance, `hydrate`);
            }
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
            if (true) {
              endMeasure(instance, `hydrate`);
            }
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          if (true) {
            startMeasure(instance, `render`);
          }
          const subTree = instance.subTree = renderComponentRoot(instance);
          if (true) {
            endMeasure(instance, `render`);
          }
          if (true) {
            startMeasure(instance, `patch`);
          }
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            isSVG
          );
          if (true) {
            endMeasure(instance, `patch`);
          }
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        if (true) {
          devtoolsComponentAdded(instance);
        }
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        if (true) {
          pushWarningContext(next || instance.vnode);
        }
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.invokeArrayFns)(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        if (true) {
          startMeasure(instance, `render`);
        }
        const nextTree = renderComponentRoot(instance);
        if (true) {
          endMeasure(instance, `render`);
        }
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        if (true) {
          startMeasure(instance, `patch`);
        }
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        if (true) {
          endMeasure(instance, `patch`);
        }
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
        if (true) {
          devtoolsComponentUpdated(instance);
        }
        if (true) {
          popWarningContext();
        }
      }
    };
    const effect = instance.effect = new _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope
      // track it in component's effect scope
    );
    const update = instance.update = () => effect.run();
    update.id = instance.uid;
    toggleRecurse(instance, true);
    if (true) {
      effect.onTrack = instance.rtc ? (e) => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.invokeArrayFns)(instance.rtc, e) : void 0;
      effect.onTrigger = instance.rtg ? (e) => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.invokeArrayFns)(instance.rtg, e) : void 0;
      update.ownerInstance = instance;
    }
    update();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.pauseTracking)();
    flushPreFlushCbs();
    (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.resetTracking)();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_ARR;
    c2 = c2 || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          if ( true && keyToNewIndexMap.has(nextChild.key)) {
            warn(
              `Duplicate keys found during update:`,
              JSON.stringify(nextChild.key),
              `Make sure keys are unique.`
            );
          }
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition2 = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition2) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove2 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove2();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove2, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props,
      ref,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode;
    if (ref != null) {
      setRef(ref, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          optimized,
          internals,
          doRemove
        );
      } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      if ( true && vnode.patchFlag > 0 && vnode.patchFlag & 2048 && transition && !transition.persisted) {
        vnode.children.forEach((child) => {
          if (child.type === Comment) {
            hostRemove(child.el);
          } else {
            remove(child);
          }
        });
      } else {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    if ( true && instance.type.__hmrId) {
      unregisterHMR(instance);
    }
    const { bum, scope, update, subTree, um } = instance;
    if (bum) {
      (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.invokeArrayFns)(bum);
    }
    scope.stop();
    if (update) {
      update.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
    if (true) {
      devtoolsComponentRemoved(instance);
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
    for (let i = start; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs();
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(
      internals
    );
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function needTransition(parentSuspense, transition) {
  return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(ch1) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
      if ( true && c2.type === Comment && !c2.el) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p[v];
  }
  return result;
}

const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
const isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
const resolveTarget = (props, select) => {
  const targetSelector = props && props.to;
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(targetSelector)) {
    if (!select) {
       true && warn(
        `Current renderer does not support string target for Teleports. (missing querySelector renderer option)`
      );
      return null;
    } else {
      const target = select(targetSelector);
      if (!target) {
         true && warn(
          `Failed to locate Teleport target with selector "${targetSelector}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`
        );
      }
      return target;
    }
  } else {
    if ( true && !targetSelector && !isTeleportDisabled(props)) {
      warn(`Invalid Teleport target: ${targetSelector}`);
    }
    return targetSelector;
  }
};
const TeleportImpl = {
  name: "Teleport",
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
    const {
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      o: { insert, querySelector, createText, createComment }
    } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { shapeFlag, children, dynamicChildren } = n2;
    if ( true && isHmrUpdating) {
      optimized = false;
      dynamicChildren = null;
    }
    if (n1 == null) {
      const placeholder = n2.el =  true ? createComment("teleport start") : 0;
      const mainAnchor = n2.anchor =  true ? createComment("teleport end") : 0;
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const target = n2.target = resolveTarget(n2.props, querySelector);
      const targetAnchor = n2.targetAnchor = createText("");
      if (target) {
        insert(targetAnchor, target);
        isSVG = isSVG || isTargetSVG(target);
      } else if ( true && !disabled) {
        warn("Invalid Teleport target on mount:", target, `(${typeof target})`);
      }
      const mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          mountChildren(
            children,
            container2,
            anchor2,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
      } else if (target) {
        mount(target, targetAnchor);
      }
    } else {
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const target = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      isSVG = isSVG || isTargetSVG(target);
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          currentContainer,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds
        );
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          currentContainer,
          currentAnchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          false
        );
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(
            n2,
            container,
            mainAnchor,
            internals,
            1
          );
        } else {
          if (n2.props && n1.props && n2.props.to !== n1.props.to) {
            n2.props.to = n1.props.to;
          }
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(
            n2.props,
            querySelector
          );
          if (nextTarget) {
            moveTeleport(
              n2,
              nextTarget,
              null,
              internals,
              0
            );
          } else if (true) {
            warn(
              "Invalid Teleport target on update:",
              target,
              `(${typeof target})`
            );
          }
        } else if (wasDisabled) {
          moveTeleport(
            n2,
            target,
            targetAnchor,
            internals,
            1
          );
        }
      }
    }
    updateCssVars(n2);
  },
  remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const { shapeFlag, children, anchor, targetAnchor, target, props } = vnode;
    if (target) {
      hostRemove(targetAnchor);
    }
    doRemove && hostRemove(anchor);
    if (shapeFlag & 16) {
      const shouldRemove = doRemove || !isTeleportDisabled(props);
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        unmount(
          child,
          parentComponent,
          parentSuspense,
          shouldRemove,
          !!child.dynamicChildren
        );
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props)) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        move(
          children[i],
          container,
          parentAnchor,
          2
        );
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
  o: { nextSibling, parentNode, querySelector }
}, hydrateChildren) {
  const target = vnode.target = resolveTarget(
    vnode.props,
    querySelector
  );
  if (target) {
    const targetNode = target._lpa || target.firstChild;
    if (vnode.shapeFlag & 16) {
      if (isTeleportDisabled(vnode.props)) {
        vnode.anchor = hydrateChildren(
          nextSibling(node),
          vnode,
          parentNode(node),
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
        vnode.targetAnchor = targetNode;
      } else {
        vnode.anchor = nextSibling(node);
        let targetAnchor = targetNode;
        while (targetAnchor) {
          targetAnchor = nextSibling(targetAnchor);
          if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
            vnode.targetAnchor = targetAnchor;
            target._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
            break;
          }
        }
        hydrateChildren(
          targetNode,
          vnode,
          target,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      }
    }
    updateCssVars(vnode);
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
function updateCssVars(vnode) {
  const ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    let node = vnode.children[0].el;
    while (node && node !== vnode.targetAnchor) {
      if (node.nodeType === 1)
        node.setAttribute("data-v-owner", ctx.uid);
      node = node.nextSibling;
    }
    ctx.ut();
  }
}

const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
      /* isBlock */
    )
  );
}
function createBlock(type, props, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props,
      children,
      patchFlag,
      dynamicProps,
      true
      /* isBlock: prevent a block from tracking itself */
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  if ( true && n2.shapeFlag & 6 && hmrDirtyComponents.has(n2.type)) {
    n1.shapeFlag &= ~256;
    n2.shapeFlag &= ~512;
    return false;
  }
  return n1.type === n2.type && n1.key === n2.key;
}
let vnodeArgsTransformer;
function transformVNodeArgs(transformer) {
  vnodeArgsTransformer = transformer;
}
const createVNodeWithArgsTransform = (...args) => {
  return _createVNode(
    ...vnodeArgsTransformer ? vnodeArgsTransformer(args, currentRenderingInstance) : args
  );
};
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref,
  ref_key,
  ref_for
}) => {
  if (typeof ref === "number") {
    ref = "" + ref;
  }
  return ref != null ? (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(ref) || (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(ref) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(ref) ? { i: currentRenderingInstance, r: ref, k: ref_key, f: !!ref_for } : ref : null;
};
function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(children) ? 8 : 16;
  }
  if ( true && vnode.key !== vnode.key) {
    warn(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
  }
  if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
  !isBlockNode && // has current parent block
  currentBlock && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode =  true ? createVNodeWithArgsTransform : 0;
function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    if ( true && !type) {
      warn(`Invalid vnode type when creating vnode: ${type}.`);
    }
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props,
      true
      /* mergeRef: true */
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props) {
    props = guardReactiveProps(props);
    let { class: klass, style } = props;
    if (klass && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(klass)) {
      props.class = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.normalizeClass)(klass);
    }
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(style)) {
      if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isProxy)(style) && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(style)) {
        style = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, style);
      }
      props.style = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.normalizeStyle)(style);
    }
  }
  const shapeFlag = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(type) ? 4 : (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(type) ? 2 : 0;
  if ( true && shapeFlag & 4 && (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isProxy)(type)) {
    type = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(type);
    warn(
      `Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with \`markRaw\` or using \`shallowRef\` instead of \`ref\`.`,
      `
Component that was made reactive: `,
      type
    );
  }
  return createBaseVNode(
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props) {
  if (!props)
    return null;
  return (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isProxy)(props) || InternalObjectKey in props ? (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, props) : props;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props, ref, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref ? (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps)
    ) : ref,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children:  true && patchFlag === -1 && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(children) ? children.map(deepCloneVNode) : children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  return cloned;
}
function deepCloneVNode(vnode) {
  const cloned = cloneVNode(vnode);
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(vnode.children)) {
    cloned.children = vnode.children.map(deepCloneVNode);
  }
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createStaticVNode(content, numberOfNodes) {
  const vnode = createVNode(Static, null, content);
  vnode.staticCount = numberOfNodes;
  return vnode;
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(child)) {
    return createVNode(
      Fragment,
      null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.normalizeClass)([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.normalizeStyle)([ret.style, toMerge.style]);
      } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isOn)(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}

const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new _vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ,
    data: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ,
    props: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ,
    attrs: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ,
    slots: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ,
    refs: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ,
    setupState: _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  if (true) {
    instance.ctx = createDevRenderContext(instance);
  } else {}
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let globalCurrentInstanceSetters;
let settersKey = "__VUE_INSTANCE_SETTERS__";
{
  if (!(globalCurrentInstanceSetters = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.getGlobalThis)()[settersKey])) {
    globalCurrentInstanceSetters = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.getGlobalThis)()[settersKey] = [];
  }
  globalCurrentInstanceSetters.push((i) => currentInstance = i);
  internalSetCurrentInstance = (instance) => {
    if (globalCurrentInstanceSetters.length > 1) {
      globalCurrentInstanceSetters.forEach((s) => s(instance));
    } else {
      globalCurrentInstanceSetters[0](instance);
    }
  };
}
const setCurrentInstance = (instance) => {
  internalSetCurrentInstance(instance);
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
const isBuiltInTag = /* @__PURE__ */ (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.makeMap)("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn(
      "Do not use built-in or reserved HTML elements as component id: " + name
    );
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  var _a;
  const Component = instance.type;
  if (true) {
    if (Component.name) {
      validateComponentName(Component.name, instance.appContext.config);
    }
    if (Component.components) {
      const names = Object.keys(Component.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component.directives) {
      const names = Object.keys(Component.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component.compilerOptions && isRuntimeOnly()) {
      warn(
        `"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`
      );
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.markRaw)(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  if (true) {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.pauseTracking)();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [ true ? (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly)(instance.props) : 0, setupContext]
    );
    (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.resetTracking)();
    unsetCurrentInstance();
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isPromise)(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
        if ( true && !instance.suspense) {
          const name = (_a = Component.name) != null ? _a : "Anonymous";
          warn(
            `Component <${name}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`
          );
        }
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(setupResult)) {
    if ( true && isVNode(setupResult)) {
      warn(
        `setup() should not return VNodes directly - return a render function instead.`
      );
    }
    if (true) {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.proxyRefs)(setupResult);
    if (true) {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if ( true && setupResult !== void 0) {
    warn(
      `setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`
    );
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
let installWithProxy;
function registerRuntimeCompiler(_compile) {
  compile = _compile;
  installWithProxy = (i) => {
    if (i.render._rc) {
      i.withProxy = new Proxy(i.ctx, RuntimeCompiledPublicInstanceProxyHandlers);
    }
  };
}
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        if (true) {
          startMeasure(instance, `compile`);
        }
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(
          (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile(template, finalCompilerOptions);
        if (true) {
          endMeasure(instance, `compile`);
        }
      }
    }
    instance.render = Component.render || _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP;
    if (installWithProxy) {
      installWithProxy(instance);
    }
  }
  if (true) {
    setCurrentInstance(instance);
    (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.pauseTracking)();
    try {
      applyOptions(instance);
    } finally {
      (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.resetTracking)();
      unsetCurrentInstance();
    }
  }
  if ( true && !Component.render && instance.render === _vue_shared__WEBPACK_IMPORTED_MODULE_1__.NOOP && !isSSR) {
    if (!compile && Component.template) {
      warn(
        `Component provided template option but runtime compilation is not supported in this build of Vue.` + (` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".` )
        /* should not happen */
      );
    } else {
      warn(`Component is missing template or render function.`);
    }
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
     true ? {
      get(target, key) {
        markAttrsAccessed();
        (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.track)(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      }
    } : 0
  ));
}
function getSlotsProxy(instance) {
  return instance.slotsProxy || (instance.slotsProxy = new Proxy(instance.slots, {
    get(target, key) {
      (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.track)(instance, "get", "$slots");
      return target[key];
    }
  }));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (true) {
      if (instance.exposed) {
        warn(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(exposed)) {
            exposedType = "array";
          } else if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn(
            `expose() should be passed a plain object, received ${exposedType}.`
          );
        }
      }
    }
    instance.exposed = exposed || {};
  };
  if (true) {
    return Object.freeze({
      get attrs() {
        return getAttrsProxy(instance);
      },
      get slots() {
        return getSlotsProxy(instance);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  } else {}
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.proxyRefs)((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.markRaw)(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component, includeInferred = true) {
  return (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function formatComponentName(instance, Component, isRoot = false) {
  let name = getComponentName(Component);
  if (!name && Component.__file) {
    const match = Component.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component) {
          return key;
        }
      }
    };
    name = inferFromRegistry(
      instance.components || instance.parent.type.components
    ) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
function isClassComponent(value) {
  return (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value) && "__vccOpts" in value;
}

const computed = (getterOrOptions, debugOptions) => {
  return (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.computed)(getterOrOptions, debugOptions, isInSSRComponentSetup);
};

function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(propsOrChildren) && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}

const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    if (!ctx) {
       true && warn(
        `Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build.`
      );
    }
    return ctx;
  }
};

function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}

function initCustomFormatter() {
  if ( false || typeof window === "undefined") {
    return;
  }
  const vueStyle = { style: "color:#3ba776" };
  const numberStyle = { style: "color:#0b1bc9" };
  const stringStyle = { style: "color:#b62e24" };
  const keywordStyle = { style: "color:#9d288c" };
  const formatter = {
    header(obj) {
      if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(obj)) {
        return null;
      }
      if (obj.__isVue) {
        return ["div", vueStyle, `VueInstance`];
      } else if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isRef)(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, genRefFlag(obj)],
          "<",
          formatValue(obj.value),
          `>`
        ];
      } else if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isReactive)(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReactive" : "Reactive"],
          "<",
          formatValue(obj),
          `>${(0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isReadonly)(obj) ? ` (readonly)` : ``}`
        ];
      } else if ((0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.isReadonly)(obj)) {
        return [
          "div",
          {},
          ["span", vueStyle, isShallow(obj) ? "ShallowReadonly" : "Readonly"],
          "<",
          formatValue(obj),
          ">"
        ];
      }
      return null;
    },
    hasBody(obj) {
      return obj && obj.__isVue;
    },
    body(obj) {
      if (obj && obj.__isVue) {
        return [
          "div",
          {},
          ...formatInstance(obj.$)
        ];
      }
    }
  };
  function formatInstance(instance) {
    const blocks = [];
    if (instance.type.props && instance.props) {
      blocks.push(createInstanceBlock("props", (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(instance.props)));
    }
    if (instance.setupState !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ) {
      blocks.push(createInstanceBlock("setup", instance.setupState));
    }
    if (instance.data !== _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ) {
      blocks.push(createInstanceBlock("data", (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(instance.data)));
    }
    const computed = extractKeys(instance, "computed");
    if (computed) {
      blocks.push(createInstanceBlock("computed", computed));
    }
    const injected = extractKeys(instance, "inject");
    if (injected) {
      blocks.push(createInstanceBlock("injected", injected));
    }
    blocks.push([
      "div",
      {},
      [
        "span",
        {
          style: keywordStyle.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: instance }]
    ]);
    return blocks;
  }
  function createInstanceBlock(type, target) {
    target = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, target);
    if (!Object.keys(target).length) {
      return ["span", {}];
    }
    return [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        type
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(target).map((key) => {
          return [
            "div",
            {},
            ["span", keywordStyle, key + ": "],
            formatValue(target[key], false)
          ];
        })
      ]
    ];
  }
  function formatValue(v, asRaw = true) {
    if (typeof v === "number") {
      return ["span", numberStyle, v];
    } else if (typeof v === "string") {
      return ["span", stringStyle, JSON.stringify(v)];
    } else if (typeof v === "boolean") {
      return ["span", keywordStyle, v];
    } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(v)) {
      return ["object", { object: asRaw ? (0,_vue_reactivity__WEBPACK_IMPORTED_MODULE_0__.toRaw)(v) : v }];
    } else {
      return ["span", stringStyle, String(v)];
    }
  }
  function extractKeys(instance, type) {
    const Comp = instance.type;
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(Comp)) {
      return;
    }
    const extracted = {};
    for (const key in instance.ctx) {
      if (isKeyOfType(Comp, key, type)) {
        extracted[key] = instance.ctx[key];
      }
    }
    return extracted;
  }
  function isKeyOfType(Comp, key, type) {
    const opts = Comp[type];
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(opts) && opts.includes(key) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(opts) && key in opts) {
      return true;
    }
    if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
      return true;
    }
    if (Comp.mixins && Comp.mixins.some((m) => isKeyOfType(m, key, type))) {
      return true;
    }
  }
  function genRefFlag(v) {
    if (isShallow(v)) {
      return `ShallowRef`;
    }
    if (v.effect) {
      return `ComputedRef`;
    }
    return `Ref`;
  }
  if (window.devtoolsFormatters) {
    window.devtoolsFormatters.push(formatter);
  } else {
    window.devtoolsFormatters = [formatter];
  }
}

function withMemo(memo, render, cache, index) {
  const cached = cache[index];
  if (cached && isMemoSame(cached, memo)) {
    return cached;
  }
  const ret = render();
  ret.memo = memo.slice();
  return cache[index] = ret;
}
function isMemoSame(cached, memo) {
  const prev = cached.memo;
  if (prev.length != memo.length) {
    return false;
  }
  for (let i = 0; i < prev.length; i++) {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hasChanged)(prev[i], memo[i])) {
      return false;
    }
  }
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(cached);
  }
  return true;
}

const version = "3.3.9";
const _ssrUtils = {
  createComponentInstance,
  setupComponent,
  renderComponentRoot,
  setCurrentRenderingInstance,
  isVNode: isVNode,
  normalizeVNode
};
const ssrUtils = _ssrUtils ;
const resolveFilter = null;
const compatUtils = null;




/***/ }),

/***/ "./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseTransition: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.BaseTransition; },
/* harmony export */   BaseTransitionPropsValidators: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.BaseTransitionPropsValidators; },
/* harmony export */   Comment: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Comment; },
/* harmony export */   EffectScope: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.EffectScope; },
/* harmony export */   Fragment: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Fragment; },
/* harmony export */   KeepAlive: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.KeepAlive; },
/* harmony export */   ReactiveEffect: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.ReactiveEffect; },
/* harmony export */   Static: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Static; },
/* harmony export */   Suspense: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Suspense; },
/* harmony export */   Teleport: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Teleport; },
/* harmony export */   Text: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Text; },
/* harmony export */   Transition: function() { return /* binding */ Transition; },
/* harmony export */   TransitionGroup: function() { return /* binding */ TransitionGroup; },
/* harmony export */   VueElement: function() { return /* binding */ VueElement; },
/* harmony export */   assertNumber: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.assertNumber; },
/* harmony export */   callWithAsyncErrorHandling: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.callWithAsyncErrorHandling; },
/* harmony export */   callWithErrorHandling: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.callWithErrorHandling; },
/* harmony export */   camelize: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.camelize; },
/* harmony export */   capitalize: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.capitalize; },
/* harmony export */   cloneVNode: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.cloneVNode; },
/* harmony export */   compatUtils: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.compatUtils; },
/* harmony export */   computed: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.computed; },
/* harmony export */   createApp: function() { return /* binding */ createApp; },
/* harmony export */   createBlock: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createBlock; },
/* harmony export */   createCommentVNode: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode; },
/* harmony export */   createElementBlock: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createElementBlock; },
/* harmony export */   createElementVNode: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createElementVNode; },
/* harmony export */   createHydrationRenderer: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createHydrationRenderer; },
/* harmony export */   createPropsRestProxy: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createPropsRestProxy; },
/* harmony export */   createRenderer: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createRenderer; },
/* harmony export */   createSSRApp: function() { return /* binding */ createSSRApp; },
/* harmony export */   createSlots: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createSlots; },
/* harmony export */   createStaticVNode: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode; },
/* harmony export */   createTextVNode: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createTextVNode; },
/* harmony export */   createVNode: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createVNode; },
/* harmony export */   customRef: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.customRef; },
/* harmony export */   defineAsyncComponent: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.defineAsyncComponent; },
/* harmony export */   defineComponent: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.defineComponent; },
/* harmony export */   defineCustomElement: function() { return /* binding */ defineCustomElement; },
/* harmony export */   defineEmits: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.defineEmits; },
/* harmony export */   defineExpose: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.defineExpose; },
/* harmony export */   defineModel: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.defineModel; },
/* harmony export */   defineOptions: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.defineOptions; },
/* harmony export */   defineProps: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.defineProps; },
/* harmony export */   defineSSRCustomElement: function() { return /* binding */ defineSSRCustomElement; },
/* harmony export */   defineSlots: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.defineSlots; },
/* harmony export */   devtools: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.devtools; },
/* harmony export */   effect: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.effect; },
/* harmony export */   effectScope: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.effectScope; },
/* harmony export */   getCurrentInstance: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance; },
/* harmony export */   getCurrentScope: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope; },
/* harmony export */   getTransitionRawChildren: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.getTransitionRawChildren; },
/* harmony export */   guardReactiveProps: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.guardReactiveProps; },
/* harmony export */   h: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.h; },
/* harmony export */   handleError: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.handleError; },
/* harmony export */   hasInjectionContext: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.hasInjectionContext; },
/* harmony export */   hydrate: function() { return /* binding */ hydrate; },
/* harmony export */   initCustomFormatter: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.initCustomFormatter; },
/* harmony export */   initDirectivesForSSR: function() { return /* binding */ initDirectivesForSSR; },
/* harmony export */   inject: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.inject; },
/* harmony export */   isMemoSame: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.isMemoSame; },
/* harmony export */   isProxy: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.isProxy; },
/* harmony export */   isReactive: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.isReactive; },
/* harmony export */   isReadonly: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.isReadonly; },
/* harmony export */   isRef: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.isRef; },
/* harmony export */   isRuntimeOnly: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.isRuntimeOnly; },
/* harmony export */   isShallow: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.isShallow; },
/* harmony export */   isVNode: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.isVNode; },
/* harmony export */   markRaw: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.markRaw; },
/* harmony export */   mergeDefaults: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.mergeDefaults; },
/* harmony export */   mergeModels: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.mergeModels; },
/* harmony export */   mergeProps: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.mergeProps; },
/* harmony export */   nextTick: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.nextTick; },
/* harmony export */   normalizeClass: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.normalizeClass; },
/* harmony export */   normalizeProps: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.normalizeProps; },
/* harmony export */   normalizeStyle: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle; },
/* harmony export */   onActivated: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onActivated; },
/* harmony export */   onBeforeMount: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onBeforeMount; },
/* harmony export */   onBeforeUnmount: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount; },
/* harmony export */   onBeforeUpdate: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onBeforeUpdate; },
/* harmony export */   onDeactivated: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onDeactivated; },
/* harmony export */   onErrorCaptured: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onErrorCaptured; },
/* harmony export */   onMounted: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onMounted; },
/* harmony export */   onRenderTracked: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onRenderTracked; },
/* harmony export */   onRenderTriggered: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onRenderTriggered; },
/* harmony export */   onScopeDispose: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onScopeDispose; },
/* harmony export */   onServerPrefetch: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onServerPrefetch; },
/* harmony export */   onUnmounted: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onUnmounted; },
/* harmony export */   onUpdated: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onUpdated; },
/* harmony export */   openBlock: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.openBlock; },
/* harmony export */   popScopeId: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.popScopeId; },
/* harmony export */   provide: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.provide; },
/* harmony export */   proxyRefs: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.proxyRefs; },
/* harmony export */   pushScopeId: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.pushScopeId; },
/* harmony export */   queuePostFlushCb: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.queuePostFlushCb; },
/* harmony export */   reactive: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.reactive; },
/* harmony export */   readonly: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.readonly; },
/* harmony export */   ref: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.ref; },
/* harmony export */   registerRuntimeCompiler: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.registerRuntimeCompiler; },
/* harmony export */   render: function() { return /* binding */ render; },
/* harmony export */   renderList: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.renderList; },
/* harmony export */   renderSlot: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.renderSlot; },
/* harmony export */   resolveComponent: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.resolveComponent; },
/* harmony export */   resolveDirective: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.resolveDirective; },
/* harmony export */   resolveDynamicComponent: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.resolveDynamicComponent; },
/* harmony export */   resolveFilter: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.resolveFilter; },
/* harmony export */   resolveTransitionHooks: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.resolveTransitionHooks; },
/* harmony export */   setBlockTracking: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.setBlockTracking; },
/* harmony export */   setDevtoolsHook: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.setDevtoolsHook; },
/* harmony export */   setTransitionHooks: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.setTransitionHooks; },
/* harmony export */   shallowReactive: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.shallowReactive; },
/* harmony export */   shallowReadonly: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly; },
/* harmony export */   shallowRef: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.shallowRef; },
/* harmony export */   ssrContextKey: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.ssrContextKey; },
/* harmony export */   ssrUtils: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.ssrUtils; },
/* harmony export */   stop: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.stop; },
/* harmony export */   toDisplayString: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.toDisplayString; },
/* harmony export */   toHandlerKey: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.toHandlerKey; },
/* harmony export */   toHandlers: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.toHandlers; },
/* harmony export */   toRaw: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.toRaw; },
/* harmony export */   toRef: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.toRef; },
/* harmony export */   toRefs: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.toRefs; },
/* harmony export */   toValue: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.toValue; },
/* harmony export */   transformVNodeArgs: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.transformVNodeArgs; },
/* harmony export */   triggerRef: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.triggerRef; },
/* harmony export */   unref: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.unref; },
/* harmony export */   useAttrs: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.useAttrs; },
/* harmony export */   useCssModule: function() { return /* binding */ useCssModule; },
/* harmony export */   useCssVars: function() { return /* binding */ useCssVars; },
/* harmony export */   useModel: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.useModel; },
/* harmony export */   useSSRContext: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.useSSRContext; },
/* harmony export */   useSlots: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.useSlots; },
/* harmony export */   useTransitionState: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.useTransitionState; },
/* harmony export */   vModelCheckbox: function() { return /* binding */ vModelCheckbox; },
/* harmony export */   vModelDynamic: function() { return /* binding */ vModelDynamic; },
/* harmony export */   vModelRadio: function() { return /* binding */ vModelRadio; },
/* harmony export */   vModelSelect: function() { return /* binding */ vModelSelect; },
/* harmony export */   vModelText: function() { return /* binding */ vModelText; },
/* harmony export */   vShow: function() { return /* binding */ vShow; },
/* harmony export */   version: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.version; },
/* harmony export */   warn: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn; },
/* harmony export */   watch: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.watch; },
/* harmony export */   watchEffect: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.watchEffect; },
/* harmony export */   watchPostEffect: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.watchPostEffect; },
/* harmony export */   watchSyncEffect: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.watchSyncEffect; },
/* harmony export */   withAsyncContext: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.withAsyncContext; },
/* harmony export */   withCtx: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.withCtx; },
/* harmony export */   withDefaults: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.withDefaults; },
/* harmony export */   withDirectives: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.withDirectives; },
/* harmony export */   withKeys: function() { return /* binding */ withKeys; },
/* harmony export */   withMemo: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.withMemo; },
/* harmony export */   withModifiers: function() { return /* binding */ withModifiers; },
/* harmony export */   withScopeId: function() { return /* reexport safe */ _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.withScopeId; }
/* harmony export */ });
/* harmony import */ var _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vue/runtime-core */ "./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js");
/* harmony import */ var _vue_shared__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vue/shared */ "./node_modules/@vue/shared/dist/shared.esm-bundler.js");
/* harmony import */ var _vue_runtime_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @vue/runtime-core */ "./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js");




const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props && props.multiple != null) {
      el.setAttribute("multiple", props.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(content, parent, anchor, isSVG, start, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start && (start === end || start.nextSibling)) {
      while (true) {
        parent.insertBefore(start.cloneNode(true), anchor);
        if (start === end || !(start = start.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};

const TRANSITION = "transition";
const ANIMATION = "animation";
const vtcKey = Symbol("_vtc");
const Transition = (props, { slots }) => (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.h)(_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.BaseTransition, resolveTransitionProps(props), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
const TransitionPropsValidators = Transition.props = /* @__PURE__ */ (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(
  {},
  _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.BaseTransitionPropsValidators,
  DOMTransitionPropsValidators
);
const callHook = (hook, args = []) => {
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve);
        }
      });
    };
  };
  return (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve);
        }
      });
      callHook(onLeave, [el, resolve]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isObject)(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toNumber)(val);
  if (true) {
    (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.assertNumber)(res, "<transition> explicit duration");
  }
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el[vtcKey] || (el[vtcKey] = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el[vtcKey] = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(
    getStyleProperties(`${TRANSITION}Property`).toString()
  );
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  if (s === "auto")
    return 0;
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}

function patchClass(el, value, isSVG) {
  const transitionClasses = el[vtcKey];
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}

const vShowOldKey = Symbol("_vod");
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el[vShowOldKey] = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el[vShowOldKey] : "none";
}
function initVShowForSSR() {
  vShow.getSSRProps = ({ value }) => {
    if (!value) {
      return { style: { display: "none" } };
    }
  };
}

function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(next);
  if (next && !isCssString) {
    if (prev && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if (vShowOldKey in el) {
      style.display = currentDisplay;
    }
  }
}
const semicolonRE = /[^\\];\s*$/;
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    if (true) {
      if (semicolonRE.test(val)) {
        (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(
          `Unexpected semicolon at the end of '${name}' style value: '${val}'`
        );
      }
    }
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.capitalize)(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}

const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isSpecialBooleanAttr)(key);
    if (value == null || isBoolean && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.includeBooleanAttr)(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}

function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && // custom elements may use _value internally
  !tag.includes("-")) {
    el._value = value;
    const oldValue = tag === "OPTION" ? el.getAttribute("value") : el.value;
    const newValue = value == null ? "" : value;
    if (oldValue !== newValue) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.includeBooleanAttr)(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
    if ( true && !needRemove) {
      (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(
        `Failed setting prop "${key}" on <${tag.toLowerCase()}>: value ${value} is invalid.`,
        e
      );
    }
  }
  needRemove && el.removeAttribute(key);
}

function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
const veiKey = Symbol("_vei");
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el[veiKey] || (el[veiKey] = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.callWithAsyncErrorHandling)(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
}

const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isOn)(key)) {
    if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isModelListener)(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(
      el,
      key,
      nextValue,
      prevChildren,
      parentComponent,
      parentSuspense,
      unmountChildren
    );
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(value)) {
    return false;
  }
  return key in el;
}

/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineCustomElement(options, hydrate2) {
  const Comp = (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.defineComponent)(options);
  class VueCustomElement extends VueElement {
    constructor(initialProps) {
      super(Comp, initialProps, hydrate2);
    }
  }
  VueCustomElement.def = Comp;
  return VueCustomElement;
}
/*! #__NO_SIDE_EFFECTS__ */
const defineSSRCustomElement = /* @__NO_SIDE_EFFECTS__ */ (options) => {
  return /* @__PURE__ */ defineCustomElement(options, hydrate);
};
const BaseClass = typeof HTMLElement !== "undefined" ? HTMLElement : class {
};
class VueElement extends BaseClass {
  constructor(_def, _props = {}, hydrate2) {
    super();
    this._def = _def;
    this._props = _props;
    /**
     * @internal
     */
    this._instance = null;
    this._connected = false;
    this._resolved = false;
    this._numberProps = null;
    this._ob = null;
    if (this.shadowRoot && hydrate2) {
      hydrate2(this._createVNode(), this.shadowRoot);
    } else {
      if ( true && this.shadowRoot) {
        (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(
          `Custom element has pre-rendered declarative shadow root but is not defined as hydratable. Use \`defineSSRCustomElement\`.`
        );
      }
      this.attachShadow({ mode: "open" });
      if (!this._def.__asyncLoader) {
        this._resolveProps(this._def);
      }
    }
  }
  connectedCallback() {
    this._connected = true;
    if (!this._instance) {
      if (this._resolved) {
        this._update();
      } else {
        this._resolveDef();
      }
    }
  }
  disconnectedCallback() {
    this._connected = false;
    if (this._ob) {
      this._ob.disconnect();
      this._ob = null;
    }
    (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
      if (!this._connected) {
        render(null, this.shadowRoot);
        this._instance = null;
      }
    });
  }
  /**
   * resolve inner component definition (handle possible async component)
   */
  _resolveDef() {
    this._resolved = true;
    for (let i = 0; i < this.attributes.length; i++) {
      this._setAttr(this.attributes[i].name);
    }
    this._ob = new MutationObserver((mutations) => {
      for (const m of mutations) {
        this._setAttr(m.attributeName);
      }
    });
    this._ob.observe(this, { attributes: true });
    const resolve = (def, isAsync = false) => {
      const { props, styles } = def;
      let numberProps;
      if (props && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(props)) {
        for (const key in props) {
          const opt = props[key];
          if (opt === Number || opt && opt.type === Number) {
            if (key in this._props) {
              this._props[key] = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toNumber)(this._props[key]);
            }
            (numberProps || (numberProps = /* @__PURE__ */ Object.create(null)))[(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(key)] = true;
          }
        }
      }
      this._numberProps = numberProps;
      if (isAsync) {
        this._resolveProps(def);
      }
      this._applyStyles(styles);
      this._update();
    };
    const asyncDef = this._def.__asyncLoader;
    if (asyncDef) {
      asyncDef().then((def) => resolve(def, true));
    } else {
      resolve(this._def);
    }
  }
  _resolveProps(def) {
    const { props } = def;
    const declaredPropKeys = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(props) ? props : Object.keys(props || {});
    for (const key of Object.keys(this)) {
      if (key[0] !== "_" && declaredPropKeys.includes(key)) {
        this._setProp(key, this[key], true, false);
      }
    }
    for (const key of declaredPropKeys.map(_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)) {
      Object.defineProperty(this, key, {
        get() {
          return this._getProp(key);
        },
        set(val) {
          this._setProp(key, val);
        }
      });
    }
  }
  _setAttr(key) {
    let value = this.getAttribute(key);
    const camelKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.camelize)(key);
    if (this._numberProps && this._numberProps[camelKey]) {
      value = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.toNumber)(value);
    }
    this._setProp(camelKey, value, false);
  }
  /**
   * @internal
   */
  _getProp(key) {
    return this._props[key];
  }
  /**
   * @internal
   */
  _setProp(key, val, shouldReflect = true, shouldUpdate = true) {
    if (val !== this._props[key]) {
      this._props[key] = val;
      if (shouldUpdate && this._instance) {
        this._update();
      }
      if (shouldReflect) {
        if (val === true) {
          this.setAttribute((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(key), "");
        } else if (typeof val === "string" || typeof val === "number") {
          this.setAttribute((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(key), val + "");
        } else if (!val) {
          this.removeAttribute((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(key));
        }
      }
    }
  }
  _update() {
    render(this._createVNode(), this.shadowRoot);
  }
  _createVNode() {
    const vnode = (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createVNode)(this._def, (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, this._props));
    if (!this._instance) {
      vnode.ce = (instance) => {
        this._instance = instance;
        instance.isCE = true;
        if (true) {
          instance.ceReload = (newStyles) => {
            if (this._styles) {
              this._styles.forEach((s) => this.shadowRoot.removeChild(s));
              this._styles.length = 0;
            }
            this._applyStyles(newStyles);
            this._instance = null;
            this._update();
          };
        }
        const dispatch = (event, args) => {
          this.dispatchEvent(
            new CustomEvent(event, {
              detail: args
            })
          );
        };
        instance.emit = (event, ...args) => {
          dispatch(event, args);
          if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(event) !== event) {
            dispatch((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(event), args);
          }
        };
        let parent = this;
        while (parent = parent && (parent.parentNode || parent.host)) {
          if (parent instanceof VueElement) {
            instance.parent = parent._instance;
            instance.provides = parent._instance.provides;
            break;
          }
        }
      };
    }
    return vnode;
  }
  _applyStyles(styles) {
    if (styles) {
      styles.forEach((css) => {
        const s = document.createElement("style");
        s.textContent = css;
        this.shadowRoot.appendChild(s);
        if (true) {
          (this._styles || (this._styles = [])).push(s);
        }
      });
    }
  }
}

function useCssModule(name = "$style") {
  {
    const instance = (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();
    if (!instance) {
       true && (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(`useCssModule must be called inside setup()`);
      return _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
    }
    const modules = instance.type.__cssModules;
    if (!modules) {
       true && (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(`Current instance does not have CSS modules injected.`);
      return _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
    }
    const mod = modules[name];
    if (!mod) {
       true && (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(`Current instance does not have CSS module named "${name}".`);
      return _vue_shared__WEBPACK_IMPORTED_MODULE_1__.EMPTY_OBJ;
    }
    return mod;
  }
}

function useCssVars(getter) {
  const instance = (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();
  if (!instance) {
     true && (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(`useCssVars is called without current active component instance.`);
    return;
  }
  const updateTeleports = instance.ut = (vars = getter(instance.proxy)) => {
    Array.from(
      document.querySelectorAll(`[data-v-owner="${instance.uid}"]`)
    ).forEach((node) => setVarsOnNode(node, vars));
  };
  const setVars = () => {
    const vars = getter(instance.proxy);
    setVarsOnVNode(instance.subTree, vars);
    updateTeleports(vars);
  };
  (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.watchPostEffect)(setVars);
  (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onMounted)(() => {
    const ob = new MutationObserver(setVars);
    ob.observe(instance.subTree.el.parentNode, { childList: true });
    (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onUnmounted)(() => ob.disconnect());
  });
}
function setVarsOnVNode(vnode, vars) {
  if (vnode.shapeFlag & 128) {
    const suspense = vnode.suspense;
    vnode = suspense.activeBranch;
    if (suspense.pendingBranch && !suspense.isHydrating) {
      suspense.effects.push(() => {
        setVarsOnVNode(suspense.activeBranch, vars);
      });
    }
  }
  while (vnode.component) {
    vnode = vnode.component.subTree;
  }
  if (vnode.shapeFlag & 1 && vnode.el) {
    setVarsOnNode(vnode.el, vars);
  } else if (vnode.type === _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Fragment) {
    vnode.children.forEach((c) => setVarsOnVNode(c, vars));
  } else if (vnode.type === _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Static) {
    let { el, anchor } = vnode;
    while (el) {
      setVarsOnNode(el, vars);
      if (el === anchor)
        break;
      el = el.nextSibling;
    }
  }
}
function setVarsOnNode(el, vars) {
  if (el.nodeType === 1) {
    const style = el.style;
    for (const key in vars) {
      style.setProperty(`--${key}`, vars[key]);
    }
  }
}

const positionMap = /* @__PURE__ */ new WeakMap();
const newPositionMap = /* @__PURE__ */ new WeakMap();
const moveCbKey = Symbol("_moveCb");
const enterCbKey = Symbol("_enterCb");
const TransitionGroupImpl = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props, { slots }) {
    const instance = (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance)();
    const state = (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.useTransitionState)();
    let prevChildren;
    let children;
    (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.onUpdated)(() => {
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props.moveClass || `${props.name || "v"}-move`;
      if (!hasCSSTransform(
        prevChildren[0].el,
        instance.vnode.el,
        moveClass
      )) {
        return;
      }
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation);
      forceReflow();
      movedChildren.forEach((c) => {
        const el = c.el;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = "";
        const cb = el[moveCbKey] = (e) => {
          if (e && e.target !== el) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener("transitionend", cb);
            el[moveCbKey] = null;
            removeTransitionClass(el, moveClass);
          }
        };
        el.addEventListener("transitionend", cb);
      });
    });
    return () => {
      const rawProps = (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_2__.toRaw)(props);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag = rawProps.tag || _vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.Fragment;
      prevChildren = children;
      children = slots.default ? (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.getTransitionRawChildren)(slots.default()) : [];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.key != null) {
          (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.setTransitionHooks)(
            child,
            (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.resolveTransitionHooks)(child, cssTransitionProps, state, instance)
          );
        } else if (true) {
          (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(`<TransitionGroup> children must be keyed.`);
        }
      }
      if (prevChildren) {
        for (let i = 0; i < prevChildren.length; i++) {
          const child = prevChildren[i];
          (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.setTransitionHooks)(
            child,
            (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.resolveTransitionHooks)(child, cssTransitionProps, state, instance)
          );
          positionMap.set(child, child.el.getBoundingClientRect());
        }
      }
      return (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createVNode)(tag, null, children);
    };
  }
};
const removeMode = (props) => delete props.mode;
/* @__PURE__ */ removeMode(TransitionGroupImpl.props);
const TransitionGroup = TransitionGroupImpl;
function callPendingCbs(c) {
  const el = c.el;
  if (el[moveCbKey]) {
    el[moveCbKey]();
  }
  if (el[enterCbKey]) {
    el[enterCbKey]();
  }
}
function recordPosition(c) {
  newPositionMap.set(c, c.el.getBoundingClientRect());
}
function applyTranslation(c) {
  const oldPos = positionMap.get(c);
  const newPos = newPositionMap.get(c);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const s = c.el.style;
    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = "0s";
    return c;
  }
}
function hasCSSTransform(el, root, moveClass) {
  const clone = el.cloneNode();
  const _vtc = el[vtcKey];
  if (_vtc) {
    _vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
    });
  }
  moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
  clone.style.display = "none";
  const container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  const { hasTransform } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}

const getModelAssigner = (vnode) => {
  const fn = vnode.props["onUpdate:modelValue"] || false;
  return (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(fn) ? (value) => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.invokeArrayFns)(fn, value) : fn;
};
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  const target = e.target;
  if (target.composing) {
    target.composing = false;
    target.dispatchEvent(new Event("input"));
  }
}
const assignKey = Symbol("_assign");
const vModelText = {
  created(el, { modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    const castToNumber = number || vnode.props && vnode.props.type === "number";
    addEventListener(el, lazy ? "change" : "input", (e) => {
      if (e.target.composing)
        return;
      let domValue = el.value;
      if (trim) {
        domValue = domValue.trim();
      }
      if (castToNumber) {
        domValue = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseToNumber)(domValue);
      }
      el[assignKey](domValue);
    });
    if (trim) {
      addEventListener(el, "change", () => {
        el.value = el.value.trim();
      });
    }
    if (!lazy) {
      addEventListener(el, "compositionstart", onCompositionStart);
      addEventListener(el, "compositionend", onCompositionEnd);
      addEventListener(el, "change", onCompositionEnd);
    }
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(el, { value }) {
    el.value = value == null ? "" : value;
  },
  beforeUpdate(el, { value, modifiers: { lazy, trim, number } }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (el.composing)
      return;
    const elValue = number || el.type === "number" ? (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseToNumber)(el.value) : el.value;
    const newValue = value == null ? "" : value;
    if (elValue === newValue) {
      return;
    }
    if (document.activeElement === el && el.type !== "range") {
      if (lazy) {
        return;
      }
      if (trim && el.value.trim() === newValue) {
        return;
      }
    }
    el.value = newValue;
  }
};
const vModelCheckbox = {
  // #4096 array checkboxes need to be deep traversed
  deep: true,
  created(el, _, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    addEventListener(el, "change", () => {
      const modelValue = el._modelValue;
      const elementValue = getValue(el);
      const checked = el.checked;
      const assign = el[assignKey];
      if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(modelValue)) {
        const index = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseIndexOf)(modelValue, elementValue);
        const found = index !== -1;
        if (checked && !found) {
          assign(modelValue.concat(elementValue));
        } else if (!checked && found) {
          const filtered = [...modelValue];
          filtered.splice(index, 1);
          assign(filtered);
        }
      } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isSet)(modelValue)) {
        const cloned = new Set(modelValue);
        if (checked) {
          cloned.add(elementValue);
        } else {
          cloned.delete(elementValue);
        }
        assign(cloned);
      } else {
        assign(getCheckboxValue(el, checked));
      }
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: setChecked,
  beforeUpdate(el, binding, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    setChecked(el, binding, vnode);
  }
};
function setChecked(el, { value, oldValue }, vnode) {
  el._modelValue = value;
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(value)) {
    el.checked = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseIndexOf)(value, vnode.props.value) > -1;
  } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isSet)(value)) {
    el.checked = value.has(vnode.props.value);
  } else if (value !== oldValue) {
    el.checked = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseEqual)(value, getCheckboxValue(el, true));
  }
}
const vModelRadio = {
  created(el, { value }, vnode) {
    el.checked = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseEqual)(value, vnode.props.value);
    el[assignKey] = getModelAssigner(vnode);
    addEventListener(el, "change", () => {
      el[assignKey](getValue(el));
    });
  },
  beforeUpdate(el, { value, oldValue }, vnode) {
    el[assignKey] = getModelAssigner(vnode);
    if (value !== oldValue) {
      el.checked = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseEqual)(value, vnode.props.value);
    }
  }
};
const vModelSelect = {
  // <select multiple> value need to be deep traversed
  deep: true,
  created(el, { value, modifiers: { number } }, vnode) {
    const isSetModel = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isSet)(value);
    addEventListener(el, "change", () => {
      const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map(
        (o) => number ? (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseToNumber)(getValue(o)) : getValue(o)
      );
      el[assignKey](
        el.multiple ? isSetModel ? new Set(selectedVal) : selectedVal : selectedVal[0]
      );
    });
    el[assignKey] = getModelAssigner(vnode);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(el, { value }) {
    setSelected(el, value);
  },
  beforeUpdate(el, _binding, vnode) {
    el[assignKey] = getModelAssigner(vnode);
  },
  updated(el, { value }) {
    setSelected(el, value);
  }
};
function setSelected(el, value) {
  const isMultiple = el.multiple;
  if (isMultiple && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(value) && !(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isSet)(value)) {
     true && (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(
      `<select multiple v-model> expects an Array or Set value for its binding, but got ${Object.prototype.toString.call(value).slice(8, -1)}.`
    );
    return;
  }
  for (let i = 0, l = el.options.length; i < l; i++) {
    const option = el.options[i];
    const optionValue = getValue(option);
    if (isMultiple) {
      if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(value)) {
        option.selected = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseIndexOf)(value, optionValue) > -1;
      } else {
        option.selected = value.has(optionValue);
      }
    } else {
      if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseEqual)(getValue(option), value)) {
        if (el.selectedIndex !== i)
          el.selectedIndex = i;
        return;
      }
    }
  }
  if (!isMultiple && el.selectedIndex !== -1) {
    el.selectedIndex = -1;
  }
}
function getValue(el) {
  return "_value" in el ? el._value : el.value;
}
function getCheckboxValue(el, checked) {
  const key = checked ? "_trueValue" : "_falseValue";
  return key in el ? el[key] : checked;
}
const vModelDynamic = {
  created(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, "created");
  },
  mounted(el, binding, vnode) {
    callModelHook(el, binding, vnode, null, "mounted");
  },
  beforeUpdate(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, "beforeUpdate");
  },
  updated(el, binding, vnode, prevVNode) {
    callModelHook(el, binding, vnode, prevVNode, "updated");
  }
};
function resolveDynamicModel(tagName, type) {
  switch (tagName) {
    case "SELECT":
      return vModelSelect;
    case "TEXTAREA":
      return vModelText;
    default:
      switch (type) {
        case "checkbox":
          return vModelCheckbox;
        case "radio":
          return vModelRadio;
        default:
          return vModelText;
      }
  }
}
function callModelHook(el, binding, vnode, prevVNode, hook) {
  const modelToUse = resolveDynamicModel(
    el.tagName,
    vnode.props && vnode.props.type
  );
  const fn = modelToUse[hook];
  fn && fn(el, binding, vnode, prevVNode);
}
function initVModelForSSR() {
  vModelText.getSSRProps = ({ value }) => ({ value });
  vModelRadio.getSSRProps = ({ value }, vnode) => {
    if (vnode.props && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseEqual)(vnode.props.value, value)) {
      return { checked: true };
    }
  };
  vModelCheckbox.getSSRProps = ({ value }, vnode) => {
    if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isArray)(value)) {
      if (vnode.props && (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.looseIndexOf)(value, vnode.props.value) > -1) {
        return { checked: true };
      }
    } else if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isSet)(value)) {
      if (vnode.props && value.has(vnode.props.value)) {
        return { checked: true };
      }
    } else if (value) {
      return { checked: true };
    }
  };
  vModelDynamic.getSSRProps = (binding, vnode) => {
    if (typeof vnode.type !== "string") {
      return;
    }
    const modelToUse = resolveDynamicModel(
      // resolveDynamicModel expects an uppercase tag name, but vnode.type is lowercase
      vnode.type.toUpperCase(),
      vnode.props && vnode.props.type
    );
    if (modelToUse.getSSRProps) {
      return modelToUse.getSSRProps(binding, vnode);
    }
  };
}

const systemModifiers = ["ctrl", "shift", "alt", "meta"];
const modifierGuards = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
};
const withModifiers = (fn, modifiers) => {
  return (event, ...args) => {
    for (let i = 0; i < modifiers.length; i++) {
      const guard = modifierGuards[modifiers[i]];
      if (guard && guard(event, modifiers))
        return;
    }
    return fn(event, ...args);
  };
};
const keyNames = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
};
const withKeys = (fn, modifiers) => {
  return (event) => {
    if (!("key" in event)) {
      return;
    }
    const eventKey = (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.hyphenate)(event.key);
    if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) {
      return fn(event);
    }
  };
};

const rendererOptions = /* @__PURE__ */ (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.extend)({ patchProp }, nodeOps);
let renderer;
let enabledHydration = false;
function ensureRenderer() {
  return renderer || (renderer = (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createRenderer)(rendererOptions));
}
function ensureHydrationRenderer() {
  renderer = enabledHydration ? renderer : (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.createHydrationRenderer)(rendererOptions);
  enabledHydration = true;
  return renderer;
}
const render = (...args) => {
  ensureRenderer().render(...args);
};
const hydrate = (...args) => {
  ensureHydrationRenderer().hydrate(...args);
};
const createApp = (...args) => {
  const app = ensureRenderer().createApp(...args);
  if (true) {
    injectNativeTagCheck(app);
    injectCompilerOptionsCheck(app);
  }
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app._component;
    if (!(0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isFunction)(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app;
};
const createSSRApp = (...args) => {
  const app = ensureHydrationRenderer().createApp(...args);
  if (true) {
    injectNativeTagCheck(app);
    injectCompilerOptionsCheck(app);
  }
  const { mount } = app;
  app.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (container) {
      return mount(container, true, container instanceof SVGElement);
    }
  };
  return app;
};
function injectNativeTagCheck(app) {
  Object.defineProperty(app.config, "isNativeTag", {
    value: (tag) => (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isHTMLTag)(tag) || (0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isSVGTag)(tag),
    writable: false
  });
}
function injectCompilerOptionsCheck(app) {
  if ((0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.isRuntimeOnly)()) {
    const isCustomElement = app.config.isCustomElement;
    Object.defineProperty(app.config, "isCustomElement", {
      get() {
        return isCustomElement;
      },
      set() {
        (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(
          `The \`isCustomElement\` config option is deprecated. Use \`compilerOptions.isCustomElement\` instead.`
        );
      }
    });
    const compilerOptions = app.config.compilerOptions;
    const msg = `The \`compilerOptions\` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, \`compilerOptions\` must be passed to \`@vue/compiler-dom\` in the build setup instead.
- For vue-loader: pass it via vue-loader's \`compilerOptions\` loader option.
- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader
- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-sfc`;
    Object.defineProperty(app.config, "compilerOptions", {
      get() {
        (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(msg);
        return compilerOptions;
      },
      set() {
        (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(msg);
      }
    });
  }
}
function normalizeContainer(container) {
  if ((0,_vue_shared__WEBPACK_IMPORTED_MODULE_1__.isString)(container)) {
    const res = document.querySelector(container);
    if ( true && !res) {
      (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(
        `Failed to mount app: mount target selector "${container}" returned null.`
      );
    }
    return res;
  }
  if ( true && window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === "closed") {
    (0,_vue_runtime_core__WEBPACK_IMPORTED_MODULE_0__.warn)(
      `mounting on a ShadowRoot with \`{mode: "closed"}\` may lead to unpredictable bugs`
    );
  }
  return container;
}
let ssrDirectiveInitialized = false;
const initDirectivesForSSR = () => {
  if (!ssrDirectiveInitialized) {
    ssrDirectiveInitialized = true;
    initVModelForSSR();
    initVShowForSSR();
  }
} ;




/***/ }),

/***/ "./node_modules/@vue/shared/dist/shared.esm-bundler.js":
/*!*************************************************************!*\
  !*** ./node_modules/@vue/shared/dist/shared.esm-bundler.js ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EMPTY_ARR: function() { return /* binding */ EMPTY_ARR; },
/* harmony export */   EMPTY_OBJ: function() { return /* binding */ EMPTY_OBJ; },
/* harmony export */   NO: function() { return /* binding */ NO; },
/* harmony export */   NOOP: function() { return /* binding */ NOOP; },
/* harmony export */   PatchFlagNames: function() { return /* binding */ PatchFlagNames; },
/* harmony export */   camelize: function() { return /* binding */ camelize; },
/* harmony export */   capitalize: function() { return /* binding */ capitalize; },
/* harmony export */   def: function() { return /* binding */ def; },
/* harmony export */   escapeHtml: function() { return /* binding */ escapeHtml; },
/* harmony export */   escapeHtmlComment: function() { return /* binding */ escapeHtmlComment; },
/* harmony export */   extend: function() { return /* binding */ extend; },
/* harmony export */   genPropsAccessExp: function() { return /* binding */ genPropsAccessExp; },
/* harmony export */   generateCodeFrame: function() { return /* binding */ generateCodeFrame; },
/* harmony export */   getGlobalThis: function() { return /* binding */ getGlobalThis; },
/* harmony export */   hasChanged: function() { return /* binding */ hasChanged; },
/* harmony export */   hasOwn: function() { return /* binding */ hasOwn; },
/* harmony export */   hyphenate: function() { return /* binding */ hyphenate; },
/* harmony export */   includeBooleanAttr: function() { return /* binding */ includeBooleanAttr; },
/* harmony export */   invokeArrayFns: function() { return /* binding */ invokeArrayFns; },
/* harmony export */   isArray: function() { return /* binding */ isArray; },
/* harmony export */   isBooleanAttr: function() { return /* binding */ isBooleanAttr; },
/* harmony export */   isBuiltInDirective: function() { return /* binding */ isBuiltInDirective; },
/* harmony export */   isDate: function() { return /* binding */ isDate; },
/* harmony export */   isFunction: function() { return /* binding */ isFunction; },
/* harmony export */   isGloballyAllowed: function() { return /* binding */ isGloballyAllowed; },
/* harmony export */   isGloballyWhitelisted: function() { return /* binding */ isGloballyWhitelisted; },
/* harmony export */   isHTMLTag: function() { return /* binding */ isHTMLTag; },
/* harmony export */   isIntegerKey: function() { return /* binding */ isIntegerKey; },
/* harmony export */   isKnownHtmlAttr: function() { return /* binding */ isKnownHtmlAttr; },
/* harmony export */   isKnownSvgAttr: function() { return /* binding */ isKnownSvgAttr; },
/* harmony export */   isMap: function() { return /* binding */ isMap; },
/* harmony export */   isModelListener: function() { return /* binding */ isModelListener; },
/* harmony export */   isObject: function() { return /* binding */ isObject; },
/* harmony export */   isOn: function() { return /* binding */ isOn; },
/* harmony export */   isPlainObject: function() { return /* binding */ isPlainObject; },
/* harmony export */   isPromise: function() { return /* binding */ isPromise; },
/* harmony export */   isRegExp: function() { return /* binding */ isRegExp; },
/* harmony export */   isReservedProp: function() { return /* binding */ isReservedProp; },
/* harmony export */   isSSRSafeAttrName: function() { return /* binding */ isSSRSafeAttrName; },
/* harmony export */   isSVGTag: function() { return /* binding */ isSVGTag; },
/* harmony export */   isSet: function() { return /* binding */ isSet; },
/* harmony export */   isSpecialBooleanAttr: function() { return /* binding */ isSpecialBooleanAttr; },
/* harmony export */   isString: function() { return /* binding */ isString; },
/* harmony export */   isSymbol: function() { return /* binding */ isSymbol; },
/* harmony export */   isVoidTag: function() { return /* binding */ isVoidTag; },
/* harmony export */   looseEqual: function() { return /* binding */ looseEqual; },
/* harmony export */   looseIndexOf: function() { return /* binding */ looseIndexOf; },
/* harmony export */   looseToNumber: function() { return /* binding */ looseToNumber; },
/* harmony export */   makeMap: function() { return /* binding */ makeMap; },
/* harmony export */   normalizeClass: function() { return /* binding */ normalizeClass; },
/* harmony export */   normalizeProps: function() { return /* binding */ normalizeProps; },
/* harmony export */   normalizeStyle: function() { return /* binding */ normalizeStyle; },
/* harmony export */   objectToString: function() { return /* binding */ objectToString; },
/* harmony export */   parseStringStyle: function() { return /* binding */ parseStringStyle; },
/* harmony export */   propsToAttrMap: function() { return /* binding */ propsToAttrMap; },
/* harmony export */   remove: function() { return /* binding */ remove; },
/* harmony export */   slotFlagsText: function() { return /* binding */ slotFlagsText; },
/* harmony export */   stringifyStyle: function() { return /* binding */ stringifyStyle; },
/* harmony export */   toDisplayString: function() { return /* binding */ toDisplayString; },
/* harmony export */   toHandlerKey: function() { return /* binding */ toHandlerKey; },
/* harmony export */   toNumber: function() { return /* binding */ toNumber; },
/* harmony export */   toRawType: function() { return /* binding */ toRawType; },
/* harmony export */   toTypeString: function() { return /* binding */ toTypeString; }
/* harmony export */ });
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}

const EMPTY_OBJ =  true ? Object.freeze({}) : 0;
const EMPTY_ARR =  true ? Object.freeze([]) : 0;
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap(
  "bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
const toHandlerKey = cacheStringFunction((str) => {
  const s = str ? `on${capitalize(str)}` : ``;
  return s;
});
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
const toNumber = (val) => {
  const n = isString(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof __webpack_require__.g !== "undefined" ? __webpack_require__.g : {});
};
const identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
function genPropsAccessExp(name) {
  return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
}

const PatchFlagNames = {
  [1]: `TEXT`,
  [2]: `CLASS`,
  [4]: `STYLE`,
  [8]: `PROPS`,
  [16]: `FULL_PROPS`,
  [32]: `NEED_HYDRATION`,
  [64]: `STABLE_FRAGMENT`,
  [128]: `KEYED_FRAGMENT`,
  [256]: `UNKEYED_FRAGMENT`,
  [512]: `NEED_PATCH`,
  [1024]: `DYNAMIC_SLOTS`,
  [2048]: `DEV_ROOT_FRAGMENT`,
  [-1]: `HOISTED`,
  [-2]: `BAIL`
};

const slotFlagsText = {
  [1]: "STABLE",
  [2]: "DYNAMIC",
  [3]: "FORWARDED"
};

const GLOBALS_ALLOWED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console";
const isGloballyAllowed = /* @__PURE__ */ makeMap(GLOBALS_ALLOWED);
const isGloballyWhitelisted = isGloballyAllowed;

const range = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
  let lines = source.split(/(\r?\n)/);
  const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
  lines = lines.filter((_, idx) => idx % 2 === 0);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        const line = j + 1;
        res.push(
          `${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`
        );
        const lineLength = lines[j].length;
        const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
        if (j === i) {
          const pad = start - (count - (lineLength + newLineSeqLength));
          const length = Math.max(
            1,
            end > count ? lineLength - pad : end - start
          );
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + newLineSeqLength;
        }
      }
      break;
    }
  }
  return res.join("\n");
}

function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value) || isObject(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function stringifyStyle(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
    if (isString(value) || typeof value === "number") {
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props)
    return null;
  let { class: klass, style } = props;
  if (klass && !isString(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}

const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);

const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
const isBooleanAttr = /* @__PURE__ */ makeMap(
  specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {};
function isSSRSafeAttrName(name) {
  if (attrValidationCache.hasOwnProperty(name)) {
    return attrValidationCache[name];
  }
  const isUnsafe = unsafeAttrCharRE.test(name);
  if (isUnsafe) {
    console.error(`unsafe attribute name: ${name}`);
  }
  return attrValidationCache[name] = !isUnsafe;
}
const propsToAttrMap = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv"
};
const isKnownHtmlAttr = /* @__PURE__ */ makeMap(
  `accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,inert,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`
);
const isKnownSvgAttr = /* @__PURE__ */ makeMap(
  `xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`
);

const escapeRE = /["'&<>]/;
function escapeHtml(string) {
  const str = "" + string;
  const match = escapeRE.exec(str);
  if (!match) {
    return str;
  }
  let html = "";
  let escaped;
  let index;
  let lastIndex = 0;
  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34:
        escaped = "&quot;";
        break;
      case 38:
        escaped = "&amp;";
        break;
      case 39:
        escaped = "&#39;";
        break;
      case 60:
        escaped = "&lt;";
        break;
      case 62:
        escaped = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index) {
      html += str.slice(lastIndex, index);
    }
    lastIndex = index + 1;
    html += escaped;
  }
  return lastIndex !== index ? html + str.slice(lastIndex, index) : html;
}
const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(src) {
  return src.replace(commentStripRE, "");
}

function looseCompareArrays(a, b) {
  if (a.length !== b.length)
    return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b)
    return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray(a);
  bValidType = isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject(a);
  bValidType = isObject(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}

const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};




/***/ }),

/***/ "./assets/styles/styles.scss":
/*!***********************************!*\
  !*** ./assets/styles/styles.scss ***!
  \***********************************/
/***/ (function() {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nHookWebpackError: Cannot find module '../images/roffey-logo.svg'\n    at tryRunOrWebpackError (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/HookWebpackError.js:88:9)\n    at __webpack_require_module__ (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/Compilation.js:5067:12)\n    at __webpack_require__ (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/Compilation.js:5024:18)\n    at /Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/Compilation.js:5095:20\n    at symbolIterator (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/neo-async/async.js:3485:9)\n    at done (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/neo-async/async.js:3527:9)\n    at Hook.eval [as callAsync] (eval at create (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at /Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/Compilation.js:5002:43\n    at symbolIterator (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/neo-async/async.js:3482:9)\n    at timesSync (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/neo-async/async.js:2297:7)\n-- inner error --\nError: Cannot find module '../images/roffey-logo.svg'\n    at webpackMissingModule (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/css-loader/dist/cjs.js??clonedRuleSet-1.use[1]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-1.use[2]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-1.use[3]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/assets/styles/styles.scss:18:113)\n    at Module.<anonymous> (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/css-loader/dist/cjs.js??clonedRuleSet-1.use[1]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-1.use[2]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-1.use[3]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/assets/styles/styles.scss:18:213)\n    at /Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/javascript/JavascriptModulesPlugin.js:452:10\n    at Hook.eval [as call] (eval at create (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/tapable/lib/HookCodeFactory.js:19:10), <anonymous>:7:1)\n    at /Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/Compilation.js:5069:39\n    at tryRunOrWebpackError (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/HookWebpackError.js:83:7)\n    at __webpack_require_module__ (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/Compilation.js:5067:12)\n    at __webpack_require__ (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/Compilation.js:5024:18)\n    at /Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/Compilation.js:5095:20\n    at symbolIterator (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/neo-async/async.js:3485:9)\n\nGenerated code for /Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/css-loader/dist/cjs.js??clonedRuleSet-1.use[1]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-1.use[2]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-1.use[3]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/assets/styles/styles.scss\n 1 | __webpack_require__.r(__webpack_exports__);\n 2 | /* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ \"/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/css-loader/dist/runtime/sourceMaps.js\");\n 3 | /* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n 4 | /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/css-loader/dist/runtime/api.js\");\n 5 | /* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n 6 | /* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/css-loader/dist/runtime/getUrl.js\");\n 7 | /* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n 8 | // Imports\n 9 | \n10 | \n11 | \n12 | var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../images/union-gardens-logo.svg */ \"asset/resource|/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/image-minimizer-webpack-plugin/dist/loader.js??ruleSet[1].rules[9]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/assets/images/union-gardens-logo.svg\"), __webpack_require__.b);\n13 | var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../images/quote-open.svg */ \"asset/resource|/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/image-minimizer-webpack-plugin/dist/loader.js??ruleSet[1].rules[9]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/assets/images/quote-open.svg\"), __webpack_require__.b);\n14 | var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../images/quote-close.svg */ \"asset/resource|/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/image-minimizer-webpack-plugin/dist/loader.js??ruleSet[1].rules[9]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/assets/images/quote-close.svg\"), __webpack_require__.b);\n15 | var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../images/quote-open-dark.svg */ \"asset/resource|/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/image-minimizer-webpack-plugin/dist/loader.js??ruleSet[1].rules[9]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/assets/images/quote-open-dark.svg\"), __webpack_require__.b);\n16 | var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ../images/quote-close-dark.svg */ \"asset/resource|/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/image-minimizer-webpack-plugin/dist/loader.js??ruleSet[1].rules[9]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/assets/images/quote-close-dark.svg\"), __webpack_require__.b);\n17 | var ___CSS_LOADER_URL_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ../images/spinner.png */ \"asset/resource|/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/image-minimizer-webpack-plugin/dist/loader.js??ruleSet[1].rules[9]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/assets/images/spinner.png\"), __webpack_require__.b);\n18 | var ___CSS_LOADER_URL_IMPORT_6___ = new URL(/* asset import */ Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '../images/roffey-logo.svg'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), __webpack_require__.b);\n19 | var ___CSS_LOADER_URL_IMPORT_7___ = new URL(/* asset import */ __webpack_require__(/*! ../images/wbc-logo.svg */ \"asset/resource|/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/image-minimizer-webpack-plugin/dist/loader.js??ruleSet[1].rules[9]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/assets/images/wbc-logo.svg\"), __webpack_require__.b);\n20 | var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n21 | ___CSS_LOADER_EXPORT___.push([module.id, \"@import url(https://fonts.googleapis.com/css2?family=Amiko:wght@400;600&display=swap);\"]);\n22 | var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n23 | var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);\n24 | var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);\n25 | var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);\n26 | var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___);\n27 | var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_5___);\n28 | var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_6___);\n29 | var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_7___);\n30 | // Module\n31 | ___CSS_LOADER_EXPORT___.push([module.id, \":root{--color--white:#fff;--color--black:#000;--color--panel_grey:#f8f6f0;--color--panel_green:#f8faf4;--color--brand_grey:#8e8e8e;--color--brand_red:#e74913;--color--brand_green:#1b8d3a;--color--brand_yellow:#feb909;--color--brand_blue:#5cabe0;--color--light_grey:#d9d9d9;--color--pale_yellow:#ffefd2;--color--pale_orange:#fde5de;--color--brand_purple:#371538;--color--brand_gold:#cbbba0;--color--brand_light_purple:#e0dce1;--color--brand_light_gold:#f1eee8;--color--brand_mid_gold:#d6ccba;--color-rgb--white:255 255 255;--color-rgb--black:0 0 0;--color-rgb--brand_red:231 73 19;--color-rgb--brand_blue:92 171 224;--color-rgb--brand_green:27 141 58;--color-rgb--brand_yellow:254 185 9;--color-rgb--brand_purple:55 21 56;--color-rgb--brand_gold:203 187 160}\\n/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{-webkit-text-size-adjust:100%;line-height:1.15}main{display:block}h1{font-size:2em;margin:.67em 0}hr{-webkit-box-sizing:content-box;box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}[hidden],template{display:none}html{-webkit-box-sizing:border-box;box-sizing:border-box;color:#371538;font-family:Amiko,sans-serif;font-size:16px;height:100%;line-height:1.6em;min-height:100%}:focus{outline:0!important}*,:after,:before{-webkit-box-sizing:inherit;box-sizing:inherit}body{background-color:var(--color--white);height:100%;margin:0;padding:0}p{font-weight:300;margin-bottom:15px;margin-top:0}ol,ul{list-style:none;margin:0;padding:0}a{text-decoration:none}a,a:hover{color:#000}a.underline{text-decoration:underline}a.no-style,a.no-style:hover{color:inherit}img{height:auto;width:100%}h1{font-size:38px}h2{font-size:28px}h3{font-size:22px}h4,h5{font-size:20px}h6{font-size:18px}h1,h2,h3,h4,h5,h6{font-family:Amiko,sans-serif;font-weight:800;line-height:1.2em;margin-bottom:.6em;margin-top:0}h1.large-bottom,h2.large-bottom,h3.large-bottom,h4.large-bottom,h5.large-bottom,h6.large-bottom{margin-bottom:1.8em}.no-wrap{white-space:nowrap}.hide-mobile{display:none!important}.hide-desktop{display:unset!important}.pt-40{padding-top:40px}.mt-40{margin-top:40px}.mt-60{margin-top:60px}.mb-20{margin-bottom:20px}.mb-30{margin-bottom:30px}.mb-40{margin-bottom:40px}.image-wrapper{display:block;margin:10px auto}.image-wrapper--500{max-width:500px}.image-wrapper--600{max-width:600px}.image-wrapper--800{max-width:800px}.image-wrapper--900{max-width:900px}hr{border:0;clear:both;height:1px;margin:40px auto}hr.max-width{max-width:840px}hr.-small{margin:40px auto;width:20%}hr.white{background-color:var(--color--white)}hr.height-3{height:3px}ul.styled-list{list-style:none;margin-bottom:20px;margin-left:20px;text-align:left}ul.styled-list li{margin-bottom:15px;padding-left:20px;position:relative}ul.styled-list li:before{background:#371538;border-radius:50%;content:\\\"\\\";display:block;height:5px;left:0;position:absolute;top:10px;width:5px}ul.styled-list li ul li{padding-left:10px}ul.styled-list li ul li:before{background-color:inherit;border-radius:none;content:\\\"-\\\";display:block;height:5px;left:0;position:absolute;top:0;width:5px}ul.styled-list--white li{color:var(--color--white)}ul.styled-list--white li:before{background:var(--color--white)}.panel{background-color:var(--color--white);padding:40px 10px}.panel--ext-bot{padding-bottom:60px}.container{display:block;float:none;margin:0 auto;overflow:auto;padding:0 10px;width:auto}.container--no-padding-mobile{padding:0}.animate,.animate-1,.animate-2,.animate-3,.animate-fade,.animate-fade-slow,.animate-left,.animate-left-1,.animate-left-2,.animate-left-3,.animate-pulse,.animate-right,.animate-right-1,.animate-right-2,.animate-right-3{opacity:0}.bounce{-webkit-animation:bounce 3s infinite;animation:bounce 3s infinite}.fade-up,.fade-up-1{-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeInUp;animation-name:fadeInUp}.fade-up,.fade-up-1,.fade-up-2{-webkit-animation-duration:1s;animation-duration:1s}.fade-up-2{-webkit-animation-delay:.3s;animation-delay:.3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeInUp;animation-name:fadeInUp}.fade-up-3{-webkit-animation-delay:.6s;animation-delay:.6s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeInUp;animation-name:fadeInUp}.fade-in,.fade-up-3{-webkit-animation-duration:1s;animation-duration:1s}.fade-in{-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeIn;animation-name:fadeIn}.fade-left-full{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeInLeftFull;animation-name:fadeInLeftFull;opacity:0}.fade-left,.fade-left-1,.fade-left-2,.fade-left-3{-webkit-animation-duration:.3s;animation-duration:.3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeIn;animation-name:fadeIn}.fade-right{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeInRight;animation-name:fadeInRight}.fade-in-slow{-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeIn;animation-name:fadeIn}@-webkit-keyframes bounce{0%,20%,50%,80%,to{-webkit-transform:translateY(0);transform:translateY(0)}40%{-webkit-transform:translateY(15px);transform:translateY(15px)}60%{-webkit-transform:translateY(5px);transform:translateY(5px)}}@keyframes bounce{0%,20%,50%,80%,to{-webkit-transform:translateY(0);transform:translateY(0)}40%{-webkit-transform:translateY(15px);transform:translateY(15px)}60%{-webkit-transform:translateY(5px);transform:translateY(5px)}}.bounce3{-webkit-animation-name:bounce3;animation-name:bounce3;-webkit-animation-timing-function:ease;animation-timing-function:ease}@-webkit-keyframes bounce3{0%{-webkit-transform:translateY(0);transform:translateY(0)}30%{-webkit-transform:translateY(-20px);transform:translateY(-20px)}50%{-webkit-transform:translateY(0);transform:translateY(0)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes bounce3{0%{-webkit-transform:translateY(0);transform:translateY(0)}30%{-webkit-transform:translateY(-20px);transform:translateY(-20px)}50%{-webkit-transform:translateY(0);transform:translateY(0)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes fadeInUp{0%{opacity:0;-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInUp{0%{opacity:0;-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}to{opacity:1;-webkit-transform:none;transform:none}}@-webkit-keyframes fadeInLeft{0%{opacity:0;-webkit-transform:translate3d(-30px,0,0);transform:translate3d(-30px,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInLeft{0%{opacity:0;-webkit-transform:translate3d(-30px,0,0);transform:translate3d(-30px,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@-webkit-keyframes fadeInLeftFull{0%{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInLeftFull{0%{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@-webkit-keyframes fadeInRight{0%{opacity:0;-webkit-transform:translate3d(30px,0,0);transform:translate3d(30px,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes fadeInRight{0%{opacity:0;-webkit-transform:translate3d(30px,0,0);transform:translate3d(30px,0,0)}to{opacity:1;-webkit-transform:none;transform:none}}@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@-webkit-keyframes wobbleVert{0%{-webkit-transform:translateY(0);transform:translateY(0)}30%{-webkit-transform:translateY(-5px);transform:translateY(-5px)}50%{-webkit-transform:translateY(0);transform:translateY(0)}70%{-webkit-transform:translateY(5px);transform:translateY(5px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes wobbleVert{0%{-webkit-transform:translateY(0);transform:translateY(0)}30%{-webkit-transform:translateY(-5px);transform:translateY(-5px)}50%{-webkit-transform:translateY(0);transform:translateY(0)}70%{-webkit-transform:translateY(5px);transform:translateY(5px)}to{-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes wobbleHoriz{0%{-webkit-transform:translateX(0);transform:translateX(0)}30%{-webkit-transform:translateX(-5px);transform:translateX(-5px)}50%{-webkit-transform:translateX(0);transform:translateX(0)}70%{-webkit-transform:translateX(5px);transform:translateX(5px)}to{-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes wobbleHoriz{0%{-webkit-transform:translateX(0);transform:translateX(0)}30%{-webkit-transform:translateX(-5px);transform:translateX(-5px)}50%{-webkit-transform:translateX(0);transform:translateX(0)}70%{-webkit-transform:translateX(5px);transform:translateX(5px)}to{-webkit-transform:translateX(0);transform:translateX(0)}}@-webkit-keyframes pulse-white{0%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}70%{-webkit-transform:scale(1);transform:scale(1)}85%{-webkit-transform:scale(.95);transform:scale(.95)}to{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes pulse-white{0%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}70%{-webkit-transform:scale(1);transform:scale(1)}85%{-webkit-transform:scale(.95);transform:scale(.95)}to{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}.pulse-in{-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:pulse-white;animation-name:pulse-white}@-webkit-keyframes bounce_right{0%,20%,50%,80%,to{-webkit-transform:translateX(0);transform:translateX(0)}40%{-webkit-transform:translateX(15px);transform:translateX(15px)}60%{-webkit-transform:translateX(5px);transform:translateX(5px)}}@keyframes bounce_right{0%,20%,50%,80%,to{-webkit-transform:translateX(0);transform:translateX(0)}40%{-webkit-transform:translateX(15px);transform:translateX(15px)}60%{-webkit-transform:translateX(5px);transform:translateX(5px)}}.cookie-accept{background-color:rgba(92,61,82,.4);bottom:0;left:0;opacity:0;padding:10px;pointer-events:none;position:fixed;right:0;-webkit-transition:max-height .3s linear,opacity .3s linear;transition:max-height .3s linear,opacity .3s linear;z-index:10002}.cookie-accept--show{display:block!important;max-height:400px;opacity:1;pointer-events:auto}.cookie-accept__container{background-color:var(--color--white);display:block;padding:10px}.cookie-accept__content{font-family:Amiko,sans-serif;font-size:12px;font-weight:200;line-height:1.4em;padding-right:0}.cookie-accept__controls{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;justify-content:center;margin:10px 0 0}.cookie-accept__controls a{text-decoration:underline}.cookie-accept__allow,.cookie-accept__deny{background-color:var(--color--black);border:2px solid var(--color--black);border-radius:5px;color:var(--color--white);font-size:14px;font-weight:600;letter-spacing:.08em;line-height:1em;padding:5px 15px;text-align:center;text-decoration:none;text-transform:uppercase;-webkit-transition:all .1s ease-in-out;transition:all .1s ease-in-out;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:nowrap}.cookie-accept__allow:hover,.cookie-accept__deny:hover{background-color:var(--color--white);border:2px solid var(--color--black);color:var(--color--black);-webkit-transition:all .2s ease-in-out;transition:all .2s ease-in-out}.cookie-accept__deny{background-color:var(--color--black);color:var(--color--white);margin-right:10px}.cookie-accept__content p{color:#525758;margin-bottom:0}.page-header{background-color:hsla(0,0%,100%,.5);display:block;height:100px;overflow:visible;position:absolute;top:40px;width:100%;z-index:500;z-index:99999}.page-header__main-menu{background-color:var(--color--black);bottom:0;left:100%;overflow:auto;padding-top:100px;position:fixed;top:0;-webkit-transition:left .2s ease-out;transition:left .2s ease-out;width:100%;z-index:9999}.page-header__main-menu--open{left:0;width:100%}.page-header__mobile-logo-container{display:block;margin:0 auto;padding-top:10px;z-index:10000}.page-header__mobile-logo{background-image:url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \");background-repeat:no-repeat;background-size:contain;height:53px;margin:0 auto;padding-top:10px;width:357px}.page-header__menu-button-container{display:block;z-index:10000}.page-header .hamburger-toggle{height:30px;position:absolute;right:15px;top:15px;-webkit-transition-duration:.5s;transition-duration:.5s;width:30px;z-index:999}.page-header .hamburger-toggle__left,.page-header .hamburger-toggle__right{background-color:var(--color--black);height:4px;position:absolute;top:15px;-webkit-transition-duration:.5s;transition-duration:.5s;width:15px}.page-header .hamburger-toggle__left:after,.page-header .hamburger-toggle__left:before,.page-header .hamburger-toggle__right:after,.page-header .hamburger-toggle__right:before{background-color:var(--color--black);content:\\\"\\\";height:4px;position:absolute;-webkit-transition-duration:.5s;transition-duration:.5s;width:15px}.page-header .hamburger-toggle__left:before,.page-header .hamburger-toggle__right:before{top:-10px}.page-header .hamburger-toggle__left:after,.page-header .hamburger-toggle__right:after{top:10px}.page-header .hamburger-toggle__left{left:0}.page-header .hamburger-toggle__right{left:15px}.page-header .hamburger-toggle:hover{cursor:pointer}.page-header .js-mobile-menu-open{color:var(--color--white);z-index:99999}.page-header .js-mobile-menu-open .hamburger-toggle__left,.page-header .js-mobile-menu-open .hamburger-toggle__right{background:transparent!important;-webkit-transition-duration:.5s;transition-duration:.5s}.page-header .js-mobile-menu-open .hamburger-toggle__left:before{background-color:var(--color--white);-webkit-transform:rotate(45deg) scaleX(1.4) translate(2px,2px);-ms-transform:rotate(45deg) scaleX(1.4) translate(2px,2px);transform:rotate(45deg) scaleX(1.4) translate(2px,2px)}.page-header .js-mobile-menu-open .hamburger-toggle__left:after{background-color:var(--color--white);-webkit-transform:rotate(-45deg) scaleX(1.4) translate(2px,-2px);-ms-transform:rotate(-45deg) scaleX(1.4) translate(2px,-2px);transform:rotate(-45deg) scaleX(1.4) translate(2px,-2px)}.page-header .js-mobile-menu-open .hamburger-toggle__right:before{background-color:var(--color--white);-webkit-transform:rotate(-45deg) scaleX(1.4) translate(-2px,2px);-ms-transform:rotate(-45deg) scaleX(1.4) translate(-2px,2px);transform:rotate(-45deg) scaleX(1.4) translate(-2px,2px)}.page-header .js-mobile-menu-open .hamburger-toggle__right:after{background-color:var(--color--white);-webkit-transform:rotate(45deg) scaleX(1.4) translate(-2px,-2px);-ms-transform:rotate(45deg) scaleX(1.4) translate(-2px,-2px);transform:rotate(45deg) scaleX(1.4) translate(-2px,-2px)}.main-menu{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-box-align:end;-ms-flex-align:end;align-items:flex-end;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;padding-top:0}.main-menu .mobile-only{display:block}.main-menu .site-header-logo--container{display:none}.main-menu .site-header-logo--container .site-header-logo{background-image:url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \");background-repeat:no-repeat;background-size:contain;height:60px;margin-left:20px;margin-right:20px;width:150px}.main-menu>.menu-item{color:var(--color--black);font-family:Amiko,sans-serif;font-size:20px;font-weight:400;letter-spacing:0;line-height:1em;position:relative;text-align:center}.main-menu>.menu-item>a{color:var(--color--white);display:block;padding:15px 20px;position:relative;text-decoration:none;-webkit-transition:color .3s linear;transition:color .3s linear}.main-menu>.menu-item:hover>a{color:var(--color--mid_grey)}.content h1{color:var(--color--white);font-weight:600}.content h1,.content h2{color:var(--color--brand_purple)}.content h2{font-weight:500;line-height:normal;margin-bottom:30px;text-align:center}.content h3{color:var(--color--brand_purple);font-weight:700;line-height:39px;margin-bottom:40px;text-align:left}.content p.introduction{font-size:18px;line-height:1.4;margin:0 auto 20px;max-width:900px;text-align:center}.content div.introduction{margin:0 auto 20px;max-width:730px;text-align:center}.content__hero{background-position:50%;background-repeat:no-repeat;background-size:cover;padding-bottom:56%}.content__introduction{background-color:var(--color--panel_grey)}.content__introduction h1{text-align:center}.content__introduction .content-container{margin:0 auto;max-width:880px}.content__introduction .layout-image{margin:0 auto;width:30%}.content__gallery{background-color:var(--color--white)}.content__gallery--floorplans{background-color:var(--color--panel_green)}.content__gallery .gallery-slider-container{margin:0 auto;overflow:visible;position:relative;width:100%;z-index:2}.content__gallery .gallery-slider-container .swiper{height:100%}.content__gallery .gallery-slider-container .swiper-slide{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;font-size:18px;justify-content:center;text-align:center}.content__gallery .gallery-slider-container .swiper{height:300px;margin-left:auto;margin-right:auto;width:100%}.content__gallery .gallery-slider-container .swiper-slide{background-position:50%;background-size:cover}.content__gallery .gallery-slider-container .fp-gallery-slider,.content__gallery .gallery-slider-container .gallery-slider{height:80%;width:100%}.content__gallery .gallery-slider-container .fp-thumbs-slider,.content__gallery .gallery-slider-container .thumbs-slider{-webkit-box-sizing:border-box;box-sizing:border-box;height:20%;padding:10px 0}.content__gallery .gallery-slider-container .fp-thumbs-slider .swiper-slide,.content__gallery .gallery-slider-container .thumbs-slider .swiper-slide{height:100%;opacity:.4;width:25%}.content__gallery .gallery-slider-container .fp-thumbs-slider .swiper-slide-thumb-active,.content__gallery .gallery-slider-container .thumbs-slider .swiper-slide-thumb-active{opacity:1}.content__gallery .gallery-slider-container .swiper-slide img{display:block;height:100%;-o-object-fit:cover;object-fit:cover;width:100%}.content__internal-hero{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:var(--color--brand_purple);display:-webkit-box;display:-ms-flexbox;display:flex;height:270px;justify-content:center}.content__internal-hero .container{overflow:visible}.content__internal-hero--small{height:170px}.content__internal-hero .content-container{overflow:visible}.content__internal-hero .content-container h1{color:var(--color--white);font-weight:600;margin-bottom:0;text-align:center;text-shadow:0 0 10px rgba(0,0,0,.5)}.content__content-panel{position:relative}.content__content-panel--light-purple{background-color:var(--color--brand_light_purple)}.content__content-panel--light-gold{background-color:var(--color--brand_light_gold)}.content__content-panel h2{margin:0 auto 20px;max-width:730px}.content__content-panel .content{margin:0 auto 40px;max-width:600px;text-align:center}.content__background-image-content-panel{background-attachment:fixed;background-position:50%;background-repeat:none;background-size:cover}.content__background-image-content-panel .content-container{background-color:var(--color--white);padding:50px;width:50%}.content__background-image-content-panel .content-container h2{text-align:left}.content__image-content-panel--light-purple{background-color:var(--color--brand_light_purple)}.content__image-content-panel--light-gold{background-color:var(--color--brand_light_gold)}.content__image-content-panel .content-container{-webkit-box-pack:justify;-ms-flex-pack:justify;display:-webkit-box;display:-ms-flexbox;display:flex;justify-content:space-between}.content__image-content-panel .content-container__col{-webkit-box-ordinal-group:3;-ms-flex-order:2;-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%;order:2}.content__image-content-panel .content-container__col--left{-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.content__image-content-panel .content-container__col--right{-webkit-box-ordinal-group:4;-ms-flex-order:3;order:3}.content__image-content-panel .content-container__col .image{background-position:50%;background-repeat:no-repeat;background-size:cover;height:100%;min-height:490px;width:100%}.content__image-content-panel .content-container__col .content-panel{padding:60px 50px 50px}.content__image-content-panel .content-container__col .content-panel h2{text-align:left}.content__image-content-panel .content-container__col .content-panel h3{margin-bottom:15px;text-align:left}.content__image-content-panel .content-container__col .content-panel .button{margin-top:40px}.content__team-panel{background-color:var(--color--brand_light_gold)}.content__team-panel .tp-introduction{margin:0 auto 60px;max-width:500px;text-align:center}.content__team-panel .team-container__col{margin:0 auto 40px;max-width:500px}.content__team-panel .team-container__col img{border:3px solid var(--color--brand_purple);border-radius:50%;display:block;margin:0 auto 20px;max-width:240px}.content__team-panel .team-container__col h3{margin-bottom:10px}.content__image-slider-content-panel{background-color:var(--color--white)}.content__image-slider-content-panel .content-container__col1{position:relative}.content__image-slider-content-panel .content-container__col1 .background-image,.content__image-slider-content-panel .content-container__col1 .background-images{bottom:0;left:0;position:absolute;right:0;top:0;z-index:0}.content__image-slider-content-panel .content-container__col1 .background-image img,.content__image-slider-content-panel .content-container__col1 .background-images img{display:block;height:100%;-o-object-fit:cover;object-fit:cover;-o-object-position:center;object-position:center;width:100%}.content__image-slider-content-panel .content-container__col1 .background-images__image{bottom:0;left:0;position:absolute;right:0;top:0}.content__image-slider-content-panel .content-container__col1 .background-images__image:first-child{-webkit-animation-delay:3s;animation-delay:3s;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-name:fader;animation-name:fader;z-index:20}.content__image-slider-content-panel .content-container__col1 .background-images__image:nth-child(2){z-index:10}.content__image-slider-content-panel .content-container__col1 .background-images__image:nth-child(n+3){display:none}.content__image-slider-content-panel .content-container__col2{padding:50px 20px}.content__image-slider-content-panel .content-container__col2 h2{text-align:left}.content__portfolio-promo-panel{background-color:var(--color--brand_light_gold)}.content__portfolio-promo-panel--white{background-color:var(--color--white)}.content__portfolio-promo-panel--light-purple{background-color:var(--color--brand_light_purple)}.content__portfolio-promo-panel--light-gold{background-color:var(--color--brand_light_gold)}.content__portfolio-promo-panel .property-container__col{height:100%;margin:0 auto 40px;max-width:600px}.content__portfolio-promo-panel .property-container__col .property-container{height:100%}.content__portfolio-promo-panel .property-container__col .property-container .property-block{display:block;margin-bottom:20px;padding-bottom:56%;position:relative;width:100%}.content__portfolio-promo-panel .property-container__col .property-container .property-block__main-image{background-position:50%;background-repeat:none;background-size:cover;bottom:0;height:100%;left:0;opacity:1;padding-bottom:56%;position:absolute;right:0;top:0;width:100%}.content__portfolio-promo-panel .property-container__col .property-container .property-block__hover-image{background-position:50%;background-repeat:none;background-size:cover;bottom:0;height:100%;left:0;opacity:0;padding-bottom:56%;position:absolute;right:0;top:0;-webkit-transition:all .4s ease-in-out;transition:all .4s ease-in-out;width:100%}.content__portfolio-promo-panel .property-container__col .property-container:hover .property-block__hover-image{opacity:1;-webkit-transition:all .4s ease-in-out;transition:all .4s ease-in-out}.content__portfolio-promo-panel .property-container__col .property-container h3{margin-bottom:10px}.content__portfolio-promo-panel .property-container__col .property-container .caption{margin-bottom:0}.content__portfolio-promo-panel .property-container__col .button{margin-top:30px}.content__content-promo{background-color:rgb(var(--color-rgb--brand_purple)/15%)}.content__content-promo .content-promo-container__col{margin:0 auto 40px;max-width:600px}.content__content-promo .content-promo-container__col .content-promo-block{height:100%;padding-bottom:56%;position:relative}.content__content-promo .content-promo-container__col .content-promo-block__image{background-position:50%;background-repeat:none;background-size:cover;bottom:0;height:100%;left:0;padding-bottom:56%;position:absolute;right:0;top:0;width:100%}.content__content-promo .content-promo-container__col .content-promo-block__image:before{background:-webkit-gradient(linear,left bottom,left top,color-stop(28.13%,rgba(55,21,56,.6)),to(rgba(55,21,56,0)));background:linear-gradient(0deg,rgba(55,21,56,.6) 28.13%,rgba(55,21,56,0));bottom:0;content:\\\"\\\";height:100%;left:0;opacity:1;position:absolute;right:0;top:0;width:100%}.content__content-promo .content-promo-container__col .content-promo-block__image:after{background:-webkit-gradient(linear,left top,left bottom,color-stop(28.13%,rgba(55,21,56,.6)),to(rgba(55,21,56,0)));background:linear-gradient(180deg,rgba(55,21,56,.6) 28.13%,rgba(55,21,56,0));bottom:0;content:\\\"\\\";height:100%;left:0;opacity:0;position:absolute;right:0;top:0;-webkit-transition:all .4s ease-in-out;transition:all .4s ease-in-out;width:100%}.content__content-promo .content-promo-container__col .content-promo-block:hover .content-promo-block__image:after{opacity:1;-webkit-transition:all .4s ease-in-out;transition:all .4s ease-in-out}.content__content-promo .content-promo-container__col .content-promo-block__content{-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-box-pack:center;-ms-flex-pack:center;bottom:0;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;height:100%;justify-content:center;left:0;position:absolute;right:0;top:0;width:100%}.content__content-promo .content-promo-container__col .content-promo-block__content p.meta-heading{color:var(--color--white);font-size:20px;font-weight:700;margin-bottom:2px;text-align:center}.content__content-promo .content-promo-container__col .content-promo-block__content h3{color:var(--color--white);font-size:35px;font-weight:700;margin-bottom:20px;text-align:center}.content__content-promo .content-promo-container__col .content-promo-block__content .button-container{margin:2% auto 0;text-align:center}.content__form-panel{padding-bottom:0!important}.content__form-panel .heading{font-size:25px;margin:0 auto 20px;max-width:830px}.content__form-panel .sub-heading{font-size:22px;font-weight:600;margin:0 auto 40px;max-width:830px;text-align:center}.content__quotes{background-color:var(--color--brand_purple);position:relative}.content__quotes .quote-marks-open{background-image:url(\" + ___CSS_LOADER_URL_REPLACEMENT_1___ + \")}.content__quotes .quote-marks-close,.content__quotes .quote-marks-open{background-repeat:no-repeat;background-size:contain;display:block;height:64px;margin:0 auto;position:absolute;position:relative;width:90px}.content__quotes .quote-marks-close{background-image:url(\" + ___CSS_LOADER_URL_REPLACEMENT_2___ + \")}.content__quotes .quotes-slider{background-color:var(--color--brand_purple);margin:0 auto;overflow:visible;position:relative;width:100%;z-index:2}.content__quotes .quotes-slider__slides-wrapper{display:block;list-style:none;margin-left:auto;margin-right:auto;overflow:hidden;padding:0;position:relative;z-index:1}.content__quotes .quotes-slider__slides{-webkit-box-sizing:content-box;box-sizing:content-box;display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;position:relative;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-transition-timing-function:var(--swiper-wrapper-transition-timing-function,initial);transition-timing-function:var(--swiper-wrapper-transition-timing-function,initial);width:100%;z-index:1}.content__quotes .quotes-slider__slide{-ms-flex-negative:0;display:block;flex-shrink:0;height:100%;position:relative;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;width:100%}.content__quotes .quotes-slider__slide .quote-slide-container{padding:20px}.content__quotes .quotes-slider__slide .quote-slide-container p.quote{color:var(--color--white);font-size:16px;font-weight:400;margin-bottom:24px;text-align:center}.content__quotes .quotes-slider__slide .quote-slide-container p.quote-by{color:var(--color--white);display:block;font-size:16px;font-weight:700;text-align:center}.content__quotes .quotes-slider__pagination{gap:1rem;left:0;margin-bottom:20px;position:absolute;right:0;z-index:2}.content__quotes .quotes-slider__pagination,.content__quotes .quotes-slider__pagination__bullet{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;justify-content:center}.content__quotes .quotes-slider__pagination__bullet{background-color:var(--color--light_grey);border-radius:50%;cursor:pointer;height:1.2rem;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:1.2rem}.content__quotes .quotes-slider__pagination__bullet--active{background-color:var(--color--black)}.content__quotes--white{background-color:var(--color--white)}.content__quotes--white .quote-marks-open{background-image:url(\" + ___CSS_LOADER_URL_REPLACEMENT_3___ + \")}.content__quotes--white .quote-marks-close{background-image:url(\" + ___CSS_LOADER_URL_REPLACEMENT_4___ + \")}.content__quotes--white .quotes-slider{background-color:var(--color--white)}.content__quotes--white .quotes-slider__slide .quote-slide-container p.quote,.content__quotes--white .quotes-slider__slide .quote-slide-container p.quote-by{color:var(--color--brand_purple)}.content__cta-panel{background-color:var(--color--brand_purple)}.content__cta-panel h2{color:var(--color--white)}.content__cta-panel .cta-introduction{color:var(--color--white);margin:0 auto;max-width:780px;text-align:center}.content__dynamic_content{background-color:var(--color--white)}.content__dynamic_content h1{color:var(--color--brand_purple);font-size:24px;font-weight:500;margin:0 auto;max-width:800px;text-align:center}.content__dynamic_content h1 span{font-weight:700}.content__simple-content-panel .content{margin:0 auto;max-width:600px}.content__simple-content-panel .content--wide{margin:0 auto;max-width:730px}.content__simple-content-panel .content .back-to-archives{font-size:14px;font-weight:500;margin-bottom:50px}.content__simple-content-panel .content .back-to-archives a{font-size:14px;font-weight:500;text-transform:uppercase}.content__simple-content-panel .content .back-to-archives a:hover{text-decoration:underline}.content__property-detail{background-color:var(--color--white);padding:40px 10px 10px}.content__property-detail h1{color:var(--color--brand_purple);font-size:24px;font-weight:500;margin-bottom:0;text-align:center}.content__property-detail h1 span{font-weight:700}.content__property-detail .detail-description{color:var(--color--brand_purple);font-size:19px;font-weight:500;line-height:1.3;margin:0 auto;max-width:800px;text-align:center}.content__property-detail .detail-description p{font-size:16px;font-weight:500;line-height:1.3;margin-bottom:10px!important}.content__property-detail-nav{background-color:var(--color--white);padding-bottom:30px!important;padding-top:0!important}.content__property-detail-nav .nav-container__col1{margin-bottom:10px;text-align:center}.content__property-detail-nav .nav-container__col1 a{font-size:16px}.content__property-detail-nav .nav-container__col2{text-align:center}.content__property-detail-nav .nav-container__col2 a{font-size:16px}.content__property-detail-nav .nav-container__col2 .disabled{color:#ccc;font-size:16px}.content__property-detail-nav .nav-container__col2 .disabled--prev:before{background-color:red;content:\\\"\\\";font-size:14px;margin-right:5px}.content__property-detail-nav .nav-container__col2 .disabled--next:after{background-color:red;content:\\\"\\\";font-size:14px;margin-left:5px}.content__property-detail-content{background-color:var(--color--white);padding-top:0!important}.content__property-detail-content .content-container{margin:0 auto;max-width:1200px}.content__property-detail-content .content-container__col h3{font-size:22px;margin-bottom:10px}.content__property-detail-content .content-container__col h3 span{font-size:18px;font-weight:400;padding-left:5px}.content__property-detail-content .content-container__col h3 p{margin-bottom:20px}.content__property-detail-images{padding-top:0!important}.content__property-detail-images .full-width{display:block;margin-bottom:10px;width:100%}.content__property-detail-images .two-images{-webkit-box-pack:justify;-ms-flex-pack:justify;display:-webkit-box;display:-ms-flexbox;display:flex;justify-content:space-between;margin-bottom:18px}.content__property-detail-images .two-images__col{-webkit-box-flex:0;background-position:50%;background-repeat:no-repeat;background-size:cover;-ms-flex:0 0 49%;flex:0 0 49%;padding-bottom:49%}.content__property-detail-images .two-images__col.stack-mobile{display:block;margin-bottom:18px}.content__property-detail-images .two-images.stack-mobile{display:block}.content__property-detail-images .three-images__col2{-webkit-box-flex:0;-webkit-box-pack:justify;-ms-flex-pack:justify;-webkit-box-orient:vertical;-webkit-box-direction:normal;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex:0 0 32.5%;flex:0 0 32.5%;-ms-flex-direction:column;flex-direction:column;justify-content:space-between}.content__property-detail-images .three-images__col2__col{-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%}.content__404{background-color:var(--color--white)}.content__404,.content__404 h4,.content__404 p{text-align:center}.property-results__no-results{margin-top:50px;text-align:center}.property-results__list{display:block;overflow:visible;width:100%}.property-results__list__article{background-color:var(--color--white);margin-bottom:20px;position:relative;-webkit-transition:all .5s ease-in-out;transition:all .5s ease-in-out}.property-container{display:block;overflow:hidden}.property-container:hover:after{background-color:hsla(0,0%,100%,.1);bottom:0;content:\\\"\\\";height:100%;left:0;position:absolute;right:0;top:0;-webkit-transition:all .5s ease-in-out;transition:all .5s ease-in-out;width:100%}.property-container:hover .featured-image{height:105%;margin:0 auto 0 -2.5%;width:105%}.property-container .featured-image,.property-container:hover .featured-image{background-position:50%;-webkit-transition:all .4s ease-in-out;transition:all .4s ease-in-out}.property-container .featured-image{background-repeat:no-repeat;background-size:cover;height:100%;padding-bottom:56%;width:100%}.property-container .description{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;background-color:var(--color--brand_purple);display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;justify-content:center;min-height:120px;padding:10px 20px;text-align:center}.property-container .description h2{color:var(--color--brand_gold);font-size:24px;margin-bottom:0;text-align:center}.property-container .description p{color:var(--color--white);font-size:16px;margin-bottom:0;text-align:center}.no-results{text-align:center}@-webkit-keyframes loading_spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes loading_spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.generic-controls{padding-bottom:20px;padding-top:30px;text-align:center}.generic-controls__loading-spinner{height:40px;margin:0 auto 20px;position:relative;width:40px}.generic-controls__loading-spinner:after{-webkit-animation:loading_spinner .8s linear infinite;animation:loading_spinner .8s linear infinite;background-image:url(\" + ___CSS_LOADER_URL_REPLACEMENT_5___ + \");background-position:50%;background-size:contain;content:\\\"\\\";display:block;font-size:40px;height:40px;line-height:40px;-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg);width:40px}.generic-controls__show-more-button{background-color:transparent;border:3px solid var(--color--brand_purple);border-radius:5px;color:var(--color--brand_purple);display:inline-block;font-family:Amiko,sans-serif;font-size:16px;font-weight:700;line-height:1.2;padding:10px 30px;text-align:center;-webkit-transition:all .3s ease-out;transition:all .3s ease-out;white-space:nowrap;z-index:5}.generic-controls__show-more-button:hover{background-color:var(--color--brand_purple);color:var(--color--white);-webkit-transition:all .4s ease-in-out;transition:all .4s ease-in-out}.generic-results__info{display:block;margin:20px auto 10px;text-align:center}.generic-results__info__count{-webkit-box-flex:0;-ms-flex:0 0 100%;flex:0 0 100%;font-size:16px;font-weight:400}.generic-results__info__count span{font-weight:700}.generic-results__no-results{margin-top:50px;text-align:center}.generic-results__list{display:block}.generic-results__list__article{margin-bottom:40px}.generic-results__list__article--yellow{background-color:rgb(var(--color-rgb--brand_yellow)/15%);padding:20px 10px}.generic-results__list__article .post-date{font-size:12px;font-weight:600;line-height:1.3;margin-bottom:5px;text-transform:uppercase}.generic-results__list__article h3.news{line-height:1.3;margin-bottom:0}.generic-results__list__article--two-no-gutter{margin-bottom:60px;margin-right:0;width:100%}.generic-dialog{-webkit-box-pack:center;-ms-flex-pack:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;justify-content:center;margin:20px auto 40px;max-width:300px}.generic-dialog__group{position:relative}.generic-dialog__group__keywords{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;margin-bottom:15px}.generic-dialog__group__label{color:#371538;font-size:16px;font-weight:400;height:100%;left:0;line-height:50px;padding:0 15px;pointer-events:none;position:absolute;top:0;-webkit-transition:-webkit-transform .3s;transition:-webkit-transform .3s;transition:transform .3s;transition:transform .3s,-webkit-transform .3s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.generic-dialog__group__input,.generic-dialog__group__select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--color--white);border:1px solid var(--color--brand_purple);border-radius:10px;color:#371538;display:block;font-size:18px;height:50px;padding:0 6px 0 15px;width:100%}.generic-dialog__group__input:focus,.generic-dialog__group__select:focus{border-color:var(--color--white);border:1px solid var(--color--brand_purple);outline:0}.generic-dialog__group__select__input{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:transparent;border:none;color:#371538;cursor:pointer;display:block;font-family:Amiko,sans-serif;font-size:16px;font-weight:600;height:46px;margin-right:30px;margin-top:2px;padding-right:20px;position:relative;text-align:center;text-overflow:ellipsis;width:98%}.generic-dialog__group__select__input:focus{outline:0}.generic-dialog__group__select__input::-ms-expand{display:none}.generic-dialog__group__input--dirty+.generic-dialog__group__label,.generic-dialog__group__input:focus+.generic-dialog__group__label{-webkit-transform:translate3d(-20%,-70%,0) scale3d(.8,.8,1) translateZ(1px);transform:translate3d(-20%,-70%,0) scale3d(.8,.8,1) translateZ(1px)}.generic-dialog__group__search-button{background-color:var(--color--brand_purple);border:2px solid var(--color--brand_purple);color:#fff;cursor:pointer;font-family:Amiko,sans-serif;font-size:18px;line-height:1em;padding:14px 55px;position:relative;-webkit-transition:all .1s ease-in-out;transition:all .1s ease-in-out;white-space:nowrap;width:100%}.generic-dialog__group__search-button:hover{background-color:var(--color--white);border:2px solid var(--color--brand_purple);color:var(--color--brand_purple);-webkit-transition:all .2s ease-in-out;transition:all .2s ease-in-out}.generic-dialog__group__search-button:focus{outline:0}.global-detail-container{margin:0 auto}.global-detail-container--narrow{max-width:600px}.global-detail-container h1{color:#371538;font-size:30px;font-weight:400;margin-bottom:30px;margin-top:30px;text-align:left}.global-detail-container h2{font-size:24px}.global-detail-container h2,.global-detail-container h3{color:#371538;line-height:1.4;margin-bottom:10px;margin-top:30px;text-align:left}.global-detail-container h3{font-size:18px}.global-detail-container h4{color:#371538;font-size:16px;margin-bottom:10px;margin-top:30px;text-align:left}.global-detail-container a:hover{text-decoration:underline}.global-detail-container .thumbnail{background-position:50%;background-repeat:no-repeat;background-size:cover;border:1px solid hsla(0,0%,67%,.2);height:300px;margin-bottom:40px;margin-top:40px;width:300px}.global-detail-container p:last-of-type{margin-bottom:0}.global-detail-container span.highlight{color:var(--color--brand_grey);font-style:italic;font-weight:500}.global-detail-container--margin-top{margin-top:40px}.global-detail-container img{display:block;margin:20px auto;max-width:500px}.global-detail-container img.max-width{max-width:unset}.global-detail-container table{border-collapse:collapse}.global-detail-container table th{border:1px solid hsla(0,0%,100%,.2);font-weight:400;padding:5px;text-align:left}.global-detail-container table td{border:1px solid hsla(0,0%,100%,.2);font-weight:300;padding:5px;text-align:left}.global-detail-container b,.global-detail-container strong{font-weight:700}.global-detail-container ul{font-weight:200;list-style:none;margin-bottom:20px;margin-left:20px;text-align:left}.global-detail-container ul.columns2{-webkit-columns:1;-moz-columns:1;column-count:1}.global-detail-container ul li{font-weight:200;margin-bottom:5px;padding-left:20px;position:relative}.global-detail-container ul li:before{background:var(--color--brand_purple);border-radius:50%;content:\\\"\\\";display:block;height:5px;left:0;position:absolute;top:12px;width:5px}.global-detail-container ul li ul{font-weight:200}.global-detail-container ul li ul li{font-weight:200;padding-left:10px}.global-detail-container ul li ul li:before{background-color:inherit;background:var(--color--brand_purple);content:\\\"-\\\";display:block;height:2px;left:0;position:absolute;top:0;width:5px}.global-detail-container ol{font-weight:200;list-style:auto;margin-bottom:20px;margin-left:20px;text-align:left}.global-detail-container ol li{font-weight:200;margin-bottom:15px;padding-left:20px;position:relative}.gravity-form-container .gform_required_legend{display:none}.gravity-form-container p{margin-bottom:0;text-align:left}.gravity-form-container .privacy{font-size:12px;line-height:1.4}.gravity-form-container .gform_wrapper .gform_body{text-align:left}.gravity-form-container .gform_wrapper .gfield_html{color:#371538;font-family:Amiko,sans-serif!important;font-size:14px!important;line-height:1.4;margin:20px auto;max-width:630px;text-align:center}.gravity-form-container .gform_wrapper .gfield_label{font-size:14px!important;margin-bottom:0!important}.gravity-form-container .gform_wrapper input[type=email],.gravity-form-container .gform_wrapper input[type=text]{background-color:rgb(var(--color-rgb--brand_purple)/15%);border:none!important;border-radius:0!important;color:var(--color--black)!important;font-family:Amiko,sans-serif!important;line-height:1!important;min-height:25px!important;padding:15px 10px!important}.gravity-form-container .gform_wrapper input::-webkit-input-placeholder{color:var(--color--black)}.gravity-form-container .gform_wrapper input::-moz-placeholder{color:var(--color--black)}.gravity-form-container .gform_wrapper input:-ms-input-placeholder{color:var(--color--black)}.gravity-form-container .gform_wrapper input::-ms-input-placeholder{color:var(--color--black)}.gravity-form-container .gform_wrapper input::placeholder{color:var(--color--black)}.gravity-form-container .gform_wrapper .gfield--type-radio .ginput_container{background-color:rgb(var(--color-rgb--brand_purple)/15%)}.gravity-form-container .gform_wrapper .gfield--type-radio .ginput_container .gfield_radio{padding:5px 10px!important}.gravity-form-container .gform_wrapper .gfield--type-radio .ginput_container .gchoice{display:inline-block;padding-right:20px}.gravity-form-container .gform_wrapper input[type=radio]:before{border:1px solid rgb(var(--color-rgb--brand_purple)/15%);border-radius:50%;color:transparent!important;display:block;font-size:14px;height:20px;margin-right:7px;padding:2px;width:20px}.gravity-form-container .gform_wrapper textarea{font-family:Amiko,sans-serif!important;height:150px!important;padding:15px 10px!important}.gravity-form-container .gform_wrapper .ginput_container_select,.gravity-form-container .gform_wrapper textarea{background-color:rgb(var(--color-rgb--brand_purple)/15%);border:none!important;border-radius:0!important;color:#371538!important}.gravity-form-container .gform_wrapper .ginput_container_select{display:block!important;height:52px!important;min-height:52px!important;padding:0!important}.gravity-form-container .gform_wrapper .ginput_container_select select{background-color:transparent!important;border:none!important;border-radius:0!important;color:var(--color--black)!important;font-family:Amiko,sans-serif!important;padding:15px 10px!important}.gravity-form-container .gform_wrapper .gform_ajax_spinner{-webkit-animation:spinner 1.1s linear infinite;animation:spinner 1.1s linear infinite;border-left:3px solid rgb(var(--color-rgb--brand_purple));border:3px solid rgb(var(--color-rgb--brand_purple));border-left-color:rgb(var(--color-rgb--brand_purple)/0);border-radius:50%;border-right:3px solid rgb(var(--color-rgb--brand_purple)/50%);border-top:3px solid rgb(var(--color-rgb--brand_purple)/15%);-webkit-box-sizing:border-box;box-sizing:border-box;height:20px;margin-left:160px;margin-top:27px;position:absolute;width:20px;z-index:1}@-webkit-keyframes spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes spinner{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.gravity-form-container .gform_wrapper .gform_button{background-color:transparent;border:2px solid var(--color--brand_purple);color:var(--color--brand_purple);display:block;font-family:Amiko,sans-serif;font-size:18px;font-weight:400;line-height:1.2;margin:0 auto 40px!important;padding:10px 30px;position:relative!important;text-align:center;text-transform:uppercase;-webkit-transition:all .3s ease-out;transition:all .3s ease-out;white-space:nowrap;width:100%;z-index:5}.gravity-form-container .gform_wrapper .gform_button:hover{background-color:var(--color--brand_purple);border:2px solid var(--color--brand_purple);color:var(--color--white);-webkit-transition:all .4s ease-in-out;transition:all .4s ease-in-out}.gravity-form-container .gform_wrapper .gform_button:focus{outline:0}.gravity-form-container .margin-bottom{margin-bottom:60px}.gravity-form-container .gform_wrapper.gravity-theme .gfield_label{margin-bottom:2px!important}.gravity-form-container .gform_wrapper.gravity-theme #field_submit{-webkit-box-ordinal-group:2;-ms-flex-order:1;-ms-flex-item-align:start!important;align-self:flex-start!important;order:1}.gravity-form-container .gform_wrapper.gravity-theme .gfield.gfield--width-half.position-right{-webkit-box-ordinal-group:3!important;-ms-flex-order:2!important;color:var(--color--brand_purple);font-size:16px;line-height:1.3;order:2!important;text-align:center}.gravity-form-container .no-resize textarea{resize:none}.gravity-form-container .gform_wrapper.gravity-theme #field_submit input{background-color:var(--color--white);border:2px solid var(--color--brand_purple);border-radius:0!important;color:var(--color--brand_purple);display:block;font-size:20px;font-weight:700;line-height:1em!important;margin:0 auto 20px;padding:15px 37px;text-align:center;-webkit-transition:all .1s ease-in-out;transition:all .1s ease-in-out;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:nowrap;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;z-index:5}.gravity-form-container .gform_wrapper.gravity-theme #field_submit input:hover{background-color:var(--color--brand_purple);border:2px solid var(--color--brand_purple);color:var(--color--white);-webkit-transition:all .2s ease-in-out;transition:all .2s ease-in-out}.page-footer .footer-container__col{-webkit-box-flex:0;border:1px solid red;-ms-flex:0 0 50%;flex:0 0 50%}.page-footer .footer-container__col .logo-container__col{-webkit-box-flex:0;border:1px solid blue;-ms-flex:0 0 50%;flex:0 0 50%}.page-footer .footer-container__col .logo-container__col .roffey-logo{background-image:url(\" + ___CSS_LOADER_URL_REPLACEMENT_6___ + \");background-repeat:no-repeat;background-size:contain;height:78px;width:192px}.page-footer .footer-container__col .logo-container__col .wbc-logo{background-image:url(\" + ___CSS_LOADER_URL_REPLACEMENT_7___ + \");background-repeat:no-repeat;background-size:contain;height:78px;width:192px}.button-center-container{margin:0 auto;text-align:center}.button-center-container--mt-40{margin-top:40px}a.button,button.button,div.button{background-color:transparent;border:3px solid var(--color--brand_purple);border-radius:5px;color:var(--color--brand_purple);display:inline-block;font-family:Amiko,sans-serif;font-size:16px;font-weight:700;line-height:1.2;padding:10px 30px;text-align:center;-webkit-transition:all .3s ease-out;transition:all .3s ease-out;white-space:nowrap;z-index:5}a.button:hover,button.button:hover,div.button:hover{background-color:var(--color--brand_purple);color:var(--color--white);-webkit-transition:all .4s ease-in-out;transition:all .4s ease-in-out}a.button:focus,button.button:focus,div.button:focus{outline:0}a.button--white,button.button--white,div.button--white{background:transparent;border:3px solid var(--color--white);color:var(--color--white)}a.button--white:hover,button.button--white:hover,div.button--white:hover{background-color:var(--color--white);color:var(--color--brand_purple)}a.button--mt-40,button.button--mt-40,div.button--mt-40{margin-top:40px}div.button:hover{pointer-events:none}@media (min-width:500px){.generic-results__info{-webkit-box-pack:justify;-ms-flex-pack:justify;-webkit-box-orient:horizontal;-webkit-box-direction:normal;border:1px solid red;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;justify-content:space-between;margin:30px 0 20px;text-align:left}}@media (min-width:550px){.property-results__list{-webkit-box-pack:start;-ms-flex-pack:start;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;justify-content:flex-start;margin:auto}.property-results__list__article{-webkit-box-flex:0;-ms-flex:0 0 calc(50% - 10px);flex:0 0 calc(50% - 10px);margin-right:15px}.property-results__list__article:nth-child(2n){margin-right:0}.property-results__list__article:nth-child(3n){margin-right:15px}.property-results__list__article:last-of-type{margin-right:0}}@media (min-width:600px){.container{max-width:1560px;padding:0 45px}.container--narrow{max-width:1090px;padding:0 45px}}@media (min-width:640px){.gravity-form-container .gform_wrapper.gravity-theme .gfield.gfield--width-half{grid-column:span 4!important}.gravity-form-container .gform_wrapper.gravity-theme .gfield.gfield--width-half.position-right{grid-column:span 8!important;margin:0;text-align:left}.gravity-form-container .gform_wrapper.gravity-theme #field_submit input{margin:unset}}@media (min-width:950px){html{font-size:18px}h1{font-size:55px}h2{font-size:35px}h3{font-size:24px}h4,h5{font-size:20px}h6{font-size:18px}.hide-mobile{display:unset!important}.hide-desktop{display:none!important}.panel{padding:60px 0}.panel--ext-bot{padding-bottom:110px}.fade-left,.fade-left-1{-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeInLeft;animation-name:fadeInLeft}.fade-left,.fade-left-1,.fade-left-2{-webkit-animation-duration:1s;animation-duration:1s}.fade-left-2{-webkit-animation-delay:.3s;animation-delay:.3s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeInLeft;animation-name:fadeInLeft}.fade-left-3{-webkit-animation-delay:.6s;animation-delay:.6s;-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both;-webkit-animation-name:fadeInLeft;animation-name:fadeInLeft}.cookie-accept__container{-webkit-box-pack:justify;-ms-flex-pack:justify;-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;justify-content:space-between;margin:0 auto;padding:20px}.cookie-accept__content{font-size:14px;padding-right:15px}.cookie-accept__controls{margin-top:0}.cookie-accept__allow,.cookie-accept__deny{padding:10px 20px}.cookie-accept__deny{margin:0 15px 10px}.cookie-accept__content p{margin-bottom:20px}.main-menu .site-header-logo--container .site-header-logo{height:53px;width:357px}.content h2{margin-bottom:35px}.content h3{font-weight:700;margin-bottom:40px}.content p.introduction{font-size:22px}.content__gallery .gallery-slider-container{margin:0 auto;width:60%}.content__internal-hero{height:370px}.content__internal-hero--small{height:270px}.content__team-panel .tp-introduction{max-width:780px}.content__team-panel .team-container{-webkit-box-pack:justify;-ms-flex-pack:justify;display:-webkit-box;display:-ms-flexbox;display:flex;justify-content:space-between;margin:40px 0 0}.content__team-panel .team-container__col{-webkit-box-flex:0;-ms-flex:0 0 28%;flex:0 0 28%}.content__image-slider-content-panel .content-container{-webkit-box-pack:justify;-ms-flex-pack:justify;display:-webkit-box;display:-ms-flexbox;display:flex;justify-content:space-between}.content__image-slider-content-panel .content-container__col1{-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%}.content__image-slider-content-panel .content-container__col2{-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%;padding:50px}.content__portfolio-promo-panel .property-container{-webkit-box-pack:justify;-ms-flex-pack:justify;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;justify-content:space-between}.content__portfolio-promo-panel .property-container__col{-webkit-box-flex:0;-ms-flex:0 0 calc(33% - 10px);flex:0 0 calc(33% - 10px);margin-right:19px}.content__portfolio-promo-panel .property-container__col:nth-child(3n){margin-right:0}.content__content-promo .content-promo-container{-webkit-box-pack:justify;-ms-flex-pack:justify;display:-webkit-box;display:-ms-flexbox;display:flex;justify-content:space-between}.content__content-promo .content-promo-container__col{-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%;margin:0;max-width:unset;padding:20px}.content__content-promo .content-promo-container__col .content-promo-block__content p.meta-heading{font-size:30px}.content__content-promo .content-promo-container__col .content-promo-block__content h3{font-size:50px}.content__content-promo .content-promo-container__col .content-promo-block__content .button-container{margin-top:4%}.content__quotes .quote-marks-open{height:82px;left:10%;position:absolute;top:10%;width:116px}.content__quotes .quote-marks-close{bottom:10%;height:82px;position:absolute;right:10%;width:116px}.content__quotes .quotes-slider{margin:0 auto;width:60%}.content__quotes .quotes-slider__slide .quote-slide-container{padding:50px 50px 70px}.content__quotes .quotes-slider__slide .quote-slide-container p.quote{font-size:20px;text-align:left}.content__quotes .quotes-slider__slide .quote-slide-container p.quote-by{font-size:20px;text-align:right}.content__dynamic_content h1{font-size:30px}.content__property-detail{padding:60px 0 20px}.content__property-detail h1{font-size:30px}.content__property-detail .detail-description{font-size:20px}.content__property-detail .detail-description p{font-size:18px;margin-bottom:5px!important}.content__property-detail-nav .nav-container{-webkit-box-pack:justify;-ms-flex-pack:justify;display:-webkit-box;display:-ms-flexbox;display:flex;justify-content:space-between}.content__property-detail-nav .nav-container__col1{-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%;margin-bottom:0;text-align:left}.content__property-detail-nav .nav-container__col1 a{font-size:18px}.content__property-detail-nav .nav-container__col2{-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%;text-align:right}.content__property-detail-nav .nav-container__col2 .disabled,.content__property-detail-nav .nav-container__col2 a{font-size:18px}.content__property-detail-nav .nav-container__col2 .disabled--next:after,.content__property-detail-nav .nav-container__col2 .disabled--prev:before{font-size:16px}.content__property-detail-content .content-container{-webkit-box-pack:justify;-ms-flex-pack:justify;display:-webkit-box;display:-ms-flexbox;display:flex;justify-content:space-between}.content__property-detail-content .content-container__col{-webkit-box-flex:0;-ms-flex:0 0 48%;flex:0 0 48%}.content__property-detail-images .two-images__col.stack-mobile{-webkit-box-flex:0;-ms-flex:0 0 49%;flex:0 0 49%;margin-bottom:0}.content__property-detail-images .three-images,.content__property-detail-images .two-images.stack-mobile{display:-webkit-box;display:-ms-flexbox;display:flex}.content__property-detail-images .three-images{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:20px}.content__property-detail-images .three-images__col1{-webkit-box-flex:0;-ms-flex:0 0 66.5%;flex:0 0 66.5%}.property-results__list{-webkit-box-pack:start;-ms-flex-pack:start;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;justify-content:flex-start;margin:auto}.property-results__list__article{-webkit-box-flex:0;-ms-flex:0 0 calc(33.3% - 10px);flex:0 0 calc(33.3% - 10px);margin-right:15px}.property-results__list__article:nth-child(2n){margin-right:15px}.property-results__list__article:last-of-type,.property-results__list__article:nth-child(3n){margin-right:0}.property-container .description h2{font-size:30px}.property-container .description p{font-size:18px}.generic-controls__show-more-button{font-size:22px;line-height:1em;padding:10px 40px}.generic-dialog{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.generic-dialog__group__keywords{-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;margin-right:10px}.global-detail-container h1{font-size:45px;text-align:left}.global-detail-container h2{font-size:30px;text-align:left}.global-detail-container h3{font-size:20px;margin-bottom:10px;text-align:left}.global-detail-container table td,.global-detail-container table th{padding:10px}.global-detail-container ul.columns2{-webkit-columns:2;-moz-columns:2;column-count:2}.gravity-form-container .gform_wrapper .gform_button{font-size:18px;line-height:1em;margin:0 auto 60px!important;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.gravity-form-container .gform_wrapper.gravity-theme #field_submit input{font-size:30px;padding:15px 67px}a.button,button.button,div.button{font-size:22px;line-height:1em;padding:10px 40px}}@media (min-width:970px){.generic-results__list{-webkit-box-pack:start;-ms-flex-pack:start;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;justify-content:flex-start}.generic-results__list__article{-webkit-box-flex:0;-ms-flex:0 0 calc(50% - 20px);flex:0 0 calc(50% - 20px);margin-right:40px}.generic-results__list__article:nth-child(4n){margin-right:40px}.generic-results__list__article:nth-child(2n){margin-right:0}.generic-results__list__article--two-no-gutter{-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%;margin-right:0}}@media (min-width:1025px){.panel{padding:70px 0}.panel--ext-bot{padding-bottom:120px}.content__property-detail{padding:70px 0 30px}}@media (min-width:1150px){.generic-results__list__article{-webkit-box-flex:0;-ms-flex:0 0 calc(33% - 24px);flex:0 0 calc(33% - 24px);margin-right:40px}.generic-results__list__article:nth-child(2n){margin-right:40px}.generic-results__list__article:nth-child(3n){margin-right:0}.generic-results__list__article--two{-webkit-box-flex:0;-ms-flex:0 0 calc(50% - 20px);flex:0 0 calc(50% - 20px);margin-right:40px}.generic-results__list__article--two:nth-child(4n){margin-right:40px}.generic-results__list__article--two:nth-child(2n){margin-right:0}.generic-results__list__article--two-no-gutter{-webkit-box-flex:0;-ms-flex:0 0 50%;flex:0 0 50%;margin-right:0}}@media (min-width:1160px){.main-menu .mobile-only{display:none}.main-menu .site-header-logo--container{display:block;padding-top:20px}.main-menu{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-box-pack:center;-ms-flex-pack:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-direction:row;flex-direction:row;justify-content:center}.main-menu>.menu-item{color:var(--color--black);font-size:16px;height:100px;height:auto;line-height:30px;margin:0;text-align:left}.main-menu>.menu-item>a{color:var(--color--black);padding:10px 20px}.main-menu>.menu-item>a.no-padding{padding:0}.main-menu>.menu-item:hover>a{color:var(--color--black);-webkit-transform:1s solid ease-in-out;-ms-transform:1s solid ease-in-out;transform:1s solid ease-in-out}.main-menu>.menu-item:hover>a:after{background-color:var(--color--black);bottom:10px;content:\\\"\\\";height:1px;left:0;position:absolute;right:0;width:auto;width:100%;z-index:999999}.main-menu>.menu-item:hover>a.no-padding:after{content:none}}@media (min-width:1200px){.content__content-promo .content-promo-container__col .content-promo-block__content .button-container{margin-top:10%}}@media (min-width:1240px){.page-header{height:100px}.page-header__main-menu{background-color:transparent;display:block;margin:0 auto;overflow:visible;padding-top:10px;position:static;text-align:center}.page-header .hamburger-toggle,.page-header__menu-button-container,.page-header__mobile-logo-container{display:none}}\", \"\",{\"version\":3,\"sources\":[\"webpack://./assets/styles/setup/_variables.scss\",\"webpack://./assets/styles/styles.scss\",\"webpack://./assets/styles/generic/_normalize.scss\",\"webpack://./assets/styles/base/_base.scss\",\"webpack://./assets/styles/setup/_colors.scss\",\"webpack://./assets/styles/setup/_typography.scss\",\"webpack://./assets/styles/base/_headings.scss\",\"webpack://./assets/styles/base/_helpers.scss\",\"webpack://./assets/styles/objects/_panel.scss\",\"webpack://./assets/styles/objects/_containers.scss\",\"webpack://./assets/styles/core-components/_animate.scss\",\"webpack://./assets/styles/core-components/_cookie-accept.scss\",\"webpack://./assets/styles/components/_header.scss\",\"webpack://./assets/styles/components/_primary-nav-menu.scss\",\"webpack://./assets/styles/components/_content.scss\",\"webpack://./assets/styles/setup/_global.scss\",\"webpack://./assets/styles/components/_property-search-results.scss\",\"webpack://./assets/styles/components/_search-results.scss\",\"webpack://./assets/styles/components/_search-dialog.scss\",\"webpack://./assets/styles/components/_global-detail-container.scss\",\"webpack://./assets/styles/components/_gravity-form-container.scss\",\"webpack://./assets/styles/components/_footer.scss\",\"webpack://./assets/styles/elements/_button.scss\",\"webpack://./assets/styles/tools/mixins/_breakpoints.scss\"],\"names\":[],\"mappings\":\"AACI,MAEI,mBAAA,CAAA,mBAAA,CAAA,2BAAA,CAAA,4BAAA,CAAA,2BAAA,CAAA,0BAAA,CAAA,4BAAA,CAAA,6BAAA,CAAA,2BAAA,CAAA,2BAAA,CAAA,4BAAA,CAAA,4BAAA,CAAA,6BAAA,CAAA,2BAAA,CAAA,mCAAA,CAAA,iCAAA,CAAA,+BAAA,CAAA,8BAAA,CAAA,wBAAA,CAAA,gCAAA,CAAA,kCAAA,CAAA,kCAAA,CAAA,mCAAA,CAAA,kCAAA,CAAA,mCC2CR;AC9CA,2EAAA,CAUC,KAEC,6BAAA,CADA,gBDkFF,CC/DA,KACE,aD8EF,CCtEA,GACE,aAAA,CACA,cD6EF,CClEA,GACE,8BAAA,CAAA,sBAAA,CACA,QAAA,CACA,gBD2EF,CCnEA,IACE,+BAAA,CACA,aD0EF,CChEA,EACE,4BDwEF,CChEA,YACE,kBAAA,CACA,yBAAA,CACA,wCAAA,CAAA,gCDuEF,CChEA,SAEE,kBDsEF,CC9DA,cAGE,+BAAA,CACA,aDqEF,CC9DA,MACE,aDoEF,CC5DA,QAEE,aAAA,CACA,aAAA,CACA,iBAAA,CACA,uBDmEF,CChEA,IACE,aDmEF,CChEA,IACE,SDmEF,CCzDA,IACE,iBDiEF,CCtDA,sCAKE,mBAAA,CACA,cAAA,CACA,gBAAA,CACA,QD+DF,CCvDA,aAEE,gBD8DF,CCtDA,cAEE,mBD6DF,CCtDA,gDAIE,yBD4DF,CCrDA,wHAIE,iBAAA,CACA,SD2DF,CCpDA,4GAIE,6BD0DF,CCnDA,SACE,0BDyDF,CC/CA,OACE,6BAAA,CAAA,qBAAA,CACA,aAAA,CACA,aAAA,CACA,cAAA,CACA,SAAA,CACA,kBDwDF,CCjDA,SACE,uBDuDF,CChDA,SACE,aDsDF,CC9CA,6BAEE,6BAAA,CAAA,qBAAA,CACA,SDqDF,CC9CA,kFAEE,WDoDF,CC5CA,cACE,4BAAA,CACA,mBDmDF,CC5CA,yCACE,uBDkDF,CC1CA,6BACE,yBAAA,CACA,YDiDF,CCvCA,QACE,aD+CF,CCxCA,QACE,iBD8CF,CC5BA,kBACE,YD2CF,CErYA,KACC,6BAAA,CAAA,qBAAA,CAMA,aCCoB,CDLpB,4BEmBa,CFpBb,cEakB,CFTlB,WAAA,CAFA,iBEca,CFbb,eF0YD,CEjYC,OACC,mBFyYF,CEpYC,iBAGC,0BAAA,CAAA,kBFqYF,CEjYA,KAIC,oCAAA,CADA,WAAA,CAFA,QAAA,CACA,SFsYD,CExXA,EAGC,eAAA,CADA,kBAAA,CADA,YF6XD,CExXA,MAIC,eAAA,CAFA,QAAA,CACA,SF4XD,CExXA,EACC,oBF4XD,CEzXC,UAFA,UF8XD,CExXC,YACC,yBF0XF,CEpXE,4BACC,aFyXH,CE9WA,IAEC,WAAA,CADA,UFkXD,CKtcA,GACC,cLycD,CKlcA,GACC,cL0cD,CKncA,GACC,cL2cD,CK5bA,MACC,cL6cD,CKtcA,GACC,cL8cD,CKvcA,kBAMC,4BDjCqB,CCqCrB,eAAA,CAHA,iBDpCqB,CCsCrB,kBAAA,CADA,YLidD,CK5cC,gGACC,mBLmdF,CMlhBA,SACE,kBNqhBF,CMlhBA,aACE,sBNqhBF,CM9gBA,cACE,uBNshBF,CM7gBA,OACE,gBNqhBF,CMlhBA,OACE,eNqhBF,CMlhBA,OACE,eNqhBF,CMlhBA,OACE,kBNqhBF,CMlhBA,OACE,kBNqhBF,CMlhBA,OACE,kBNqhBF,CMhhBA,eACE,aAAA,CACA,gBNmhBF,CMjhBE,oBACE,eNmhBJ,CMhhBE,oBACE,eNkhBJ,CM/gBE,oBACE,eNihBJ,CM9gBE,oBACE,eNghBJ,CM5gBA,GACE,QAAA,CAIA,UAAA,CAHA,UAAA,CAEA,gBN+gBF,CM5gBE,aACE,eN8gBJ,CM3gBE,UAEE,gBAAA,CADA,SN8gBJ,CM1gBE,SACE,oCN4gBJ,CMzgBE,YACE,UN2gBJ,CMvgBA,eACE,eAAA,CAEA,kBAAA,CACA,gBAAA,CAFA,eN4gBF,CMxgBE,kBAEE,kBAAA,CADA,iBAAA,CAEA,iBN0gBJ,CMxgBI,yBAME,kBHtGe,CGqGf,iBAAA,CAJA,UAAA,CACA,aAAA,CACA,UAAA,CAMA,MAAA,CAFA,iBAAA,CACA,QAAA,CAJA,SN+gBN,CMtgBM,wBACE,iBNwgBR,CMtgBQ,+BAKE,wBAAA,CACA,kBAAA,CALA,WAAA,CACA,aAAA,CACA,UAAA,CAOA,MAAA,CAFA,iBAAA,CACA,KAAA,CALA,SN6gBV,CMhgBI,yBACE,yBNkgBN,CMhgBM,gCACE,8BNkgBR,CO/oBA,OAEC,oCAAA,CAEA,iBPgpBD,COtoBC,gBACC,mBPkpBF,CQlqBA,WAEE,aAAA,CAEA,UAAA,CACA,aAAA,CACA,aAAA,CACA,cAAA,CAJA,URkrBF,CQ5qBE,8BACE,SR8qBJ,CSlpBA,0NACE,STosBF,CSjsBA,QACE,oCAAA,CAAA,4BTosBF,CS3rBA,oBAEE,gCAAA,CAAA,wBAAA,CACA,+BAAA,CAAA,uBTosBF,CSjsBA,+BALE,6BAAA,CAAA,qBT6sBF,CSxsBA,WACE,2BAAA,CAAA,mBAAA,CAEA,gCAAA,CAAA,wBAAA,CACA,+BAAA,CAAA,uBTosBF,CSjsBA,WACE,2BAAA,CAAA,mBAAA,CAEA,gCAAA,CAAA,wBAAA,CACA,+BAAA,CAAA,uBTosBF,CSjsBA,oBALE,6BAAA,CAAA,qBT4sBF,CSvsBA,SAEE,gCAAA,CAAA,wBAAA,CACA,6BAAA,CAAA,qBTosBF,CSjsBA,gBAEE,6BAAA,CAAA,qBAAA,CACA,gCAAA,CAAA,wBAAA,CACA,qCAAA,CAAA,6BAAA,CAHA,STusBF,CSxpBA,kDAEE,8BAAA,CAAA,sBAAA,CACA,gCAAA,CAAA,wBAAA,CACA,6BAAA,CAAA,qBTksBF,CSvrBA,YACE,6BAAA,CAAA,qBAAA,CACA,gCAAA,CAAA,wBAAA,CACA,kCAAA,CAAA,0BTksBF,CS/rBA,cACE,6BAAA,CAAA,qBAAA,CACA,gCAAA,CAAA,wBAAA,CACA,6BAAA,CAAA,qBTksBF,CS/rBA,0BACE,kBAKE,+BAAA,CAAA,uBT8rBF,CS5rBA,IACE,kCAAA,CAAA,0BT8rBF,CS5rBA,IACE,iCAAA,CAAA,yBT8rBF,CACF,CS3sBA,kBACE,kBAKE,+BAAA,CAAA,uBT8rBF,CS5rBA,IACE,kCAAA,CAAA,0BT8rBF,CS5rBA,IACE,iCAAA,CAAA,yBT8rBF,CACF,CS3rBA,SACE,8BAAA,CAAA,sBAAA,CACA,sCAAA,CAAA,8BT6rBF,CS3rBA,2BACE,GACE,+BAAA,CAAA,uBT8rBF,CS5rBA,IACE,mCAAA,CAAA,2BT8rBF,CS5rBA,IACE,+BAAA,CAAA,uBT8rBF,CS5rBA,GACE,+BAAA,CAAA,uBT8rBF,CACF,CS1sBA,mBACE,GACE,+BAAA,CAAA,uBT8rBF,CS5rBA,IACE,mCAAA,CAAA,2BT8rBF,CS5rBA,IACE,+BAAA,CAAA,uBT8rBF,CS5rBA,GACE,+BAAA,CAAA,uBT8rBF,CACF,CS3rBA,4BACE,GACE,SAAA,CACA,uCAAA,CAAA,+BT6rBF,CS1rBA,GACE,SAAA,CACA,sBAAA,CAAA,cT4rBF,CACF,CSrsBA,oBACE,GACE,SAAA,CACA,uCAAA,CAAA,+BT6rBF,CS1rBA,GACE,SAAA,CACA,sBAAA,CAAA,cT4rBF,CACF,CSzrBA,8BACE,GACE,SAAA,CACA,wCAAA,CAAA,gCT2rBF,CSxrBA,GACE,SAAA,CACA,sBAAA,CAAA,cT0rBF,CACF,CSnsBA,sBACE,GACE,SAAA,CACA,wCAAA,CAAA,gCT2rBF,CSxrBA,GACE,SAAA,CACA,sBAAA,CAAA,cT0rBF,CACF,CSvrBA,kCACE,GACE,SAAA,CACA,wCAAA,CAAA,gCTyrBF,CStrBA,GACE,SAAA,CACA,sBAAA,CAAA,cTwrBF,CACF,CSjsBA,0BACE,GACE,SAAA,CACA,wCAAA,CAAA,gCTyrBF,CStrBA,GACE,SAAA,CACA,sBAAA,CAAA,cTwrBF,CACF,CSrrBA,+BACE,GACE,SAAA,CACA,uCAAA,CAAA,+BTurBF,CSprBA,GACE,SAAA,CACA,sBAAA,CAAA,cTsrBF,CACF,CS/rBA,uBACE,GACE,SAAA,CACA,uCAAA,CAAA,+BTurBF,CSprBA,GACE,SAAA,CACA,sBAAA,CAAA,cTsrBF,CACF,CSnrBA,0BACE,GACE,STqrBF,CSlrBA,GACE,STorBF,CACF,CS3rBA,kBACE,GACE,STqrBF,CSlrBA,GACE,STorBF,CACF,CSjrBA,8BACE,GACE,+BAAA,CAAA,uBTmrBF,CShrBA,IACE,kCAAA,CAAA,0BTkrBF,CShrBA,IACE,+BAAA,CAAA,uBTkrBF,CShrBA,IACE,iCAAA,CAAA,yBTkrBF,CShrBA,GACE,+BAAA,CAAA,uBTkrBF,CACF,CSlsBA,sBACE,GACE,+BAAA,CAAA,uBTmrBF,CShrBA,IACE,kCAAA,CAAA,0BTkrBF,CShrBA,IACE,+BAAA,CAAA,uBTkrBF,CShrBA,IACE,iCAAA,CAAA,yBTkrBF,CShrBA,GACE,+BAAA,CAAA,uBTkrBF,CACF,CS/qBA,+BACE,GACE,+BAAA,CAAA,uBTirBF,CS9qBA,IACE,kCAAA,CAAA,0BTgrBF,CS9qBA,IACE,+BAAA,CAAA,uBTgrBF,CS9qBA,IACE,iCAAA,CAAA,yBTgrBF,CS9qBA,GACE,+BAAA,CAAA,uBTgrBF,CACF,CShsBA,uBACE,GACE,+BAAA,CAAA,uBTirBF,CS9qBA,IACE,kCAAA,CAAA,0BTgrBF,CS9qBA,IACE,+BAAA,CAAA,uBTgrBF,CS9qBA,IACE,iCAAA,CAAA,yBTgrBF,CS9qBA,GACE,+BAAA,CAAA,uBTgrBF,CACF,CS7qBA,+BACE,GAEE,SAAA,CADA,0BAAA,CAAA,kBTgrBF,CS5qBA,IACE,0BAAA,CAAA,kBT8qBF,CS3qBA,IACE,4BAAA,CAAA,oBT6qBF,CS1qBA,GAEE,SAAA,CADA,0BAAA,CAAA,kBT6qBF,CACF,CS7rBA,uBACE,GAEE,SAAA,CADA,0BAAA,CAAA,kBTgrBF,CS5qBA,IACE,0BAAA,CAAA,kBT8qBF,CS3qBA,IACE,4BAAA,CAAA,oBT6qBF,CS1qBA,GAEE,SAAA,CADA,0BAAA,CAAA,kBT6qBF,CACF,CSzqBA,UAKE,6BAAA,CAAA,qBAAA,CAEA,gCAAA,CAAA,wBAAA,CADA,kCAAA,CAAA,0BTwqBF,CStjBA,gCACE,kBAKE,+BAAA,CAAA,uBTqjBF,CSnjBA,IACE,kCAAA,CAAA,0BTqjBF,CSnjBA,IACE,iCAAA,CAAA,yBTqjBF,CACF,CSlkBA,wBACE,kBAKE,+BAAA,CAAA,uBTqjBF,CSnjBA,IACE,kCAAA,CAAA,0BTqjBF,CSnjBA,IACE,iCAAA,CAAA,yBTqjBF,CACF,CUl+BA,eAME,kCAAA,CAJA,QAAA,CACA,MAAA,CAMA,SAAA,CAJA,YAAA,CAOA,mBAAA,CAXA,cAAA,CAGA,OAAA,CAMA,2DAAA,CAAA,mDAAA,CACA,aVm+BF,CUh+BE,qBAIE,uBAAA,CAHA,gBAAA,CACA,SAAA,CACA,mBVm+BJ,CU39BE,0BACE,oCAlCU,CAoCV,aAAA,CADA,YV89BJ,CUj9BE,wBAEE,4BN3BU,CM0BV,cAAA,CAEA,eAAA,CAGA,iBAAA,CADA,eV49BJ,CUn9BE,yBAGE,uBAAA,CAAA,oBAAA,CACA,wBAAA,CAAA,qBAAA,CAAA,kBAAA,CAHA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CACA,kBAAA,CAAA,cAAA,CACA,sBAAA,CAQA,eVs9BJ,CU19BI,2BACE,yBV49BN,CUl9BE,2CA8BE,oCA5GwB,CA6GxB,oCAAA,CACA,iBAAA,CAEA,yBAAA,CAaA,cAAA,CACA,eAAA,CACA,oBAAA,CAbA,eAAA,CAEA,gBAAA,CATA,iBAAA,CAiBA,oBAAA,CAbA,wBAAA,CAmBA,sCAAA,CAAA,8BAAA,CADA,wBAAA,CAAA,qBAAA,CAAA,oBAAA,CAAA,gBAAA,CAPA,kBV47BJ,CUl7BI,uDACE,oCAAA,CACA,oCAAA,CACA,yBAAA,CACA,sCAAA,CAAA,8BVy7BN,CUr7BE,qBACE,oCA1IsB,CA2ItB,yBA1IwB,CA4IxB,iBVs7BJ,CU/6BE,0BAEE,aAAA,CADA,eVu7BJ,CWjlCA,aASE,mCAAA,CANA,aAAA,CASD,YAAA,CAEA,gBAAA,CATC,iBAAA,CACA,QAAA,CAKD,UAAA,CATC,WAAA,CAaD,aXolCD,CW3kCE,wBAGA,oCAAA,CAIA,QAAA,CACA,SAAA,CAIA,aAAA,CADA,iBAAA,CANA,cAAA,CACA,KAAA,CAOA,oCAAA,CAAA,4BAAA,CAJA,UAAA,CACA,YXklCF,CWlkCE,8BAEC,MAAA,CADA,UXglCH,CWtkCC,oCAGC,aAAA,CACE,aAAA,CACA,gBAAA,CAHF,aX0kCF,CWhkCC,0BAKC,wDAAA,CAEA,2BAAA,CADA,uBAAA,CAMA,WAAA,CATA,aAAA,CADA,gBAAA,CASA,WXmkCF,CW9jCC,oCAGC,aAAA,CADA,aXgkCF,CWtjCC,+BAME,WAAA,CAJD,iBAAA,CAEC,UAAA,CADA,QAAA,CAIA,+BAAA,CAAA,uBAAA,CAFA,UAAA,CAGA,WX4jCH,CWzjCG,2EAOC,oCAAA,CAHA,UAAA,CADA,iBAAA,CAGA,QAAA,CAJA,+BAAA,CAAA,uBAAA,CAGA,UX4jCJ,CWxjCI,gLAMC,oCAAA,CACA,UAAA,CAHA,UAAA,CADA,iBAAA,CADA,+BAAA,CAAA,uBAAA,CAGA,UX2jCL,CWtjCI,yFACC,SXwjCL,CWrjCI,uFACC,QXujCL,CWnjCG,qCACC,MXqjCJ,CWljCG,sCACC,SXojCJ,CWjjCG,qCACK,cXmjCR,CW1iCC,kCAEC,yBAAA,CACA,aXgjCF,CW7iCE,qHAGC,gCAAA,CADA,+BAAA,CAAA,uBXgjCH,CWziCG,iEAAW,oCAAA,CAAqC,8DAAA,CAAA,0DAAA,CAAA,sDX6iCnD,CW5iCG,gEAAU,oCAAA,CAAqC,gEAAA,CAAA,4DAAA,CAAA,wDXgjClD,CW5iCG,kEAAW,oCAAA,CAAqC,gEAAA,CAAA,4DAAA,CAAA,wDXgjCnD,CW/iCG,iEAAU,oCAAA,CAAqC,gEAAA,CAAA,4DAAA,CAAA,wDXmjClD,CYruCA,WAGC,2BAAA,CAAA,4BAAA,CACA,qBAAA,CAAA,kBAAA,CAAA,oBAAA,CAFA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CACA,yBAAA,CAAA,qBAAA,CAIA,aZquCD,CYnuCC,wBAEC,aZouCF,CY9tCC,wCAEC,YZouCF,CY7tCE,0DAKE,wDAAA,CAED,2BAAA,CADA,uBAAA,CAIA,WAAA,CARA,gBAAA,CACA,iBAAA,CAMA,WZmuCH,CYjtCC,sBAGC,yBAAA,CAFA,4BRhCY,CQmCZ,cAAA,CAFA,eAAA,CAGA,gBAAA,CACA,eAAA,CAEA,iBAAA,CADA,iBZiuCF,CY9sCE,wBAEC,yBAAA,CADA,aAAA,CAEA,iBAAA,CACA,iBAAA,CAEA,oBAAA,CADA,mCAAA,CAAA,2BZ4tCH,CYtsCG,8BACC,4BZitCJ,CaxzCE,YAEE,yBAAA,CADA,ebk1CJ,Ca70CE,wBAHE,gCbu1CJ,Cap1CE,YACE,eAAA,CAEA,kBAAA,CADA,kBAAA,CAGA,iBb+0CJ,Caz0CE,YAKE,gCAAA,CAJA,eAAA,CACA,gBAAA,CACA,kBAAA,CACA,ebi1CJ,Cax0CE,wBAEE,cAAA,CADA,eAAA,CAIA,kBAAA,CADA,eAAA,CADA,iBbk1CJ,Caz0CE,0BAGE,kBAAA,CADA,eCzCqB,CDwCrB,iBbk1CJ,Cax0CE,eAEE,uBAAA,CACA,2BAAA,CAEA,qBAAA,CADA,kBb00CJ,Cal0CE,uBACE,yCbo0CJ,Cal0CI,0BACE,iBbo0CN,Caj0CI,0CAEE,aAAA,CADA,ebo0CN,Cah0CI,qCAEE,aAAA,CADA,Sbm0CN,Ca5zCE,kBACE,oCb8zCJ,Ca5zCI,8BACE,0Cb8zCN,Ca3zCI,4CASE,aAAA,CAHA,gBAAA,CAHA,iBAAA,CAKA,UAAA,CAJA,Sb+zCN,CalzCM,oDAEE,Wb0zCR,CavzCM,0DAKE,uBAAA,CAAA,oBAAA,CACA,wBAAA,CAAA,qBAAA,CAAA,kBAAA,CAHA,eAAA,CACA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CAFA,cAAA,CAGA,sBAAA,CAJA,iBb8zCR,Ca9yCM,oDAEE,YAAA,CACA,gBAAA,CACA,iBAAA,CAHA,UbyzCR,CanzCM,0DAEE,uBAAA,CADA,qBbszCR,CalzCM,2HACE,UAAA,CACA,UbozCR,CajzCM,yHAEE,6BAAA,CAAA,qBAAA,CADA,UAAA,CAEA,cbmzCR,CajzCQ,qJAEE,WAAA,CACA,UAAA,CAFA,SbqzCV,CahzCQ,+KACE,SbkzCV,Ca3yCM,8DACE,aAAA,CAEA,WAAA,CACA,mBAAA,CAAA,gBAAA,CAFA,Ub+yCR,Ca/xCE,wBAoBE,uBAAA,CAAA,oBAAA,CACA,wBAAA,CAAA,qBAAA,CAAA,kBAAA,CAEA,2CAAA,CAJA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CAbA,YAAA,CAcA,sBbkxCJ,CapyCI,mCACE,gBbsyCN,Ca7xCI,+BACE,YboyCN,CazxCI,2CAEE,gBb+xCN,Ca7xCM,8CACE,yBAAA,CACA,eAAA,CACA,eAAA,CACA,iBAAA,CACA,mCb+xCR,CapxCE,wBAEE,iBbqxCJ,CanxCI,sCACE,iDbqxCN,CalxCI,oCACE,+CboxCN,CahxCI,2BAEE,kBAAA,CADA,ebmxCN,Ca/wCI,iCAEE,kBAAA,CADA,eCtPc,CD0Pd,iBb+wCN,CarwCE,yCAME,2BAAA,CAJA,uBAAA,CACA,sBAAA,CACA,qBbuwCJ,CanwCI,4DACE,oCAAA,CAEA,YAAA,CADA,SbswCN,CanwCM,+DACE,ebqwCR,CaxvCI,4CACE,iDb0vCN,CavvCI,0CACE,+CbyvCN,CarvCI,iDAEE,wBAAA,CAAA,qBAAA,CADA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CACA,6BbuvCN,CarvCM,sDAEE,2BAAA,CAAA,gBAAA,CAUA,kBAAA,CAAA,gBAAA,CAAA,YAAA,CAVA,ObuvCR,CarvCQ,4DACE,2BAAA,CAAA,gBAAA,CAAA,ObuvCV,CapvCQ,6DACE,2BAAA,CAAA,gBAAA,CAAA,ObsvCV,CajvCQ,6DAKE,uBAAA,CACA,2BAAA,CAFA,qBAAA,CAFA,WAAA,CACA,gBAAA,CAFA,UbwvCV,CahvCQ,qEACE,sBbkvCV,CajvCU,wEACE,ebmvCZ,CahvCU,wEAEE,kBAAA,CADA,ebmvCZ,Ca/uCU,6EACE,ebivCZ,CajuCE,qBAEE,+CbkuCJ,CahuCI,sCAME,kBAAA,CALA,eAAA,CAMA,iBb8tCN,CaltCM,0CAGE,kBAAA,CADA,ebiuCR,Ca1tCQ,8CAKE,2CAAA,CADA,iBAAA,CAHA,aAAA,CAKA,kBAAA,CAJA,ebquCV,Ca9tCQ,6CACE,kBbguCV,CattCE,qCAEE,oCbutCJ,Ca9sCM,8DAME,iBbitCR,Ca/sCQ,iKAKE,QAAA,CACA,MAAA,CAHA,iBAAA,CAIA,OAAA,CAHA,KAAA,CAIA,SbqtCV,CantCU,yKACE,aAAA,CAEA,WAAA,CACA,mBAAA,CAAA,gBAAA,CACA,yBAAA,CAAA,sBAAA,CAHA,UbytCZ,CahtCU,wFAGE,QAAA,CACA,MAAA,CAHA,iBAAA,CAIA,OAAA,CAHA,KbqtCZ,CahtCY,oGAEE,0BAAA,CAAA,kBAAA,CACA,6BAAA,CAAA,qBAAA,CAFA,4BAAA,CAAA,oBAAA,CAGA,UbktCd,Ca/sCY,qGACE,UbitCd,Ca9sCY,uGACE,YbgtCd,CazsCM,8DAEE,iBb0sCR,CarsCQ,iEACE,eb4sCV,CazrCE,gCAEE,+Cb+rCJ,Ca7rCI,uCACE,oCb+rCN,Ca5rCI,8CACE,iDb8rCN,Ca3rCI,4CACE,+Cb6rCN,CajrCM,yDAIE,WAAA,CADA,kBAAA,CADA,eb2rCR,Ca1qCQ,6EAEE,WborCV,CalrCU,6FAEE,aAAA,CAIA,kBAAA,CADA,kBAAA,CADA,iBAAA,CADA,UbsrCZ,CahrCY,yGASE,uBAAA,CACA,sBAAA,CACA,qBAAA,CALA,QAAA,CAEA,WAAA,CAJA,MAAA,CASA,SAAA,CADA,kBAAA,CAVA,iBAAA,CAGA,OAAA,CAFA,KAAA,CAIA,UburCd,Ca5qCY,0GASE,uBAAA,CACA,sBAAA,CACA,qBAAA,CALA,QAAA,CAEA,WAAA,CAJA,MAAA,CASA,SAAA,CADA,kBAAA,CAVA,iBAAA,CAGA,OAAA,CAFA,KAAA,CAYA,sCAAA,CAAA,8BAAA,CARA,UborCd,Ca/pCY,gHAGI,SAAA,CADA,sCAAA,CAAA,8BbiqChB,Ca5pCU,gFACE,kBb8pCZ,Ca3pCU,sFACE,eb6pCZ,CavpCQ,iEACE,ebypCV,Ca5oCE,wBAEE,wDb6oCJ,CapoCM,sDAGE,kBAAA,CADA,eb4oCR,CaloCQ,2EAEE,WAAA,CAGA,kBAAA,CADA,iBb2oCV,CaxoCU,kFASE,uBAAA,CACA,sBAAA,CACA,qBAAA,CALA,QAAA,CAEA,WAAA,CAJA,MAAA,CAQA,kBAAA,CAVA,iBAAA,CAGA,OAAA,CAFA,KAAA,CAIA,Ub8oCZ,CatoCY,yFASE,kHAAA,CAAA,0EAAA,CAHA,QAAA,CALA,UAAA,CAOA,WAAA,CAJA,MAAA,CAMA,SAAA,CARA,iBAAA,CAGA,OAAA,CAFA,KAAA,CAIA,Ub2oCd,CaroCY,wFAWE,kHAAA,CAAA,4EAAA,CALA,QAAA,CALA,UAAA,CAOA,WAAA,CAJA,MAAA,CAQA,SAAA,CAVA,iBAAA,CAGA,OAAA,CAFA,KAAA,CAMA,sCAAA,CAAA,8BAAA,CAFA,Ub2oCd,Ca5nCc,mHAEE,SAAA,CADA,sCAAA,CAAA,8Bb+nChB,CaxnCU,oFAWE,2BAAA,CAAA,4BAAA,CACA,uBAAA,CAAA,oBAAA,CANA,QAAA,CAIA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CACA,yBAAA,CAAA,qBAAA,CAHA,WAAA,CAIA,sBAAA,CARA,MAAA,CAFA,iBAAA,CAGA,OAAA,CAFA,KAAA,CAIA,Ub6nCZ,CatnCY,mGAGE,yBAAA,CAEA,cAAA,CAHA,eAAA,CAIA,iBAAA,CALA,iBb4nCd,CahnCY,uFAGE,yBAAA,CAEA,cAAA,CAHA,eAAA,CAIA,kBAAA,CALA,iBb2nCd,Ca/mCY,sGAIE,gBAAA,CAHA,iBbwnCd,Ca3lCE,qBAEE,0BbsmCJ,CapmCI,8BACE,cAAA,CAEA,kBAAA,CADA,ebumCN,CanmCI,kCACE,cAAA,CACA,eAAA,CAEA,kBAAA,CADA,eAAA,CAEA,iBbqmCN,Ca1lCE,iBAEE,2CAAA,CA8DA,iBb+hCJ,CazlCI,mCAME,wDb8lCN,CazkCI,uEAnBE,2BAAA,CADA,uBAAA,CAJA,aAAA,CASA,WAAA,CACA,aAAA,CAXA,iBAAA,CAQA,iBAAA,CACA,Ub6mCN,Ca7lCI,oCAOE,wDbslCN,Ca5jCI,gCAKE,2CAAA,CAOA,aAAA,CANA,gBAAA,CAJA,iBAAA,CASA,UAAA,CARA,Sb2kCN,CaxjCM,gDAQE,aAAA,CAHA,eAAA,CAJA,gBAAA,CACA,iBAAA,CAEA,eAAA,CAEA,SAAA,CAHA,iBAAA,CAIA,SbikCR,Ca7jCM,wCAWE,8BAAA,CAAA,sBAAA,CANA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CAFA,WAAA,CAFA,iBAAA,CAKA,6CAAA,CAAA,qCAAA,CAAA,6BAAA,CAAA,+CAAA,CACA,2FAAA,CAAA,mFAAA,CALA,UAAA,CAEA,SbmkCR,CazjCM,uCACE,mBAAA,CACA,aAAA,CADA,aAAA,CAGA,WAAA,CACA,iBAAA,CACA,6CAAA,CAAA,qCAAA,CAAA,6BAAA,CAAA,+CAAA,CAHA,Ub8jCR,CaxjCQ,8DAGE,YbwjCV,Ca9iCc,sEAYE,yBAAA,CAVA,cAAA,CAOA,eAAA,CACA,kBAAA,CAPA,iBbwjChB,Ca3iCc,yEAUE,yBAAA,CACA,aAAA,CARA,cAAA,CASA,eAAA,CAVA,iBbsjChB,CaniCM,4CAME,QAAA,CAGA,MAAA,CAIA,kBAAA,CANA,iBAAA,CAGA,OAAA,CACA,SbyiCR,Ca7hCQ,gGAnBA,uBAAA,CAAA,oBAAA,CACA,wBAAA,CAAA,qBAAA,CAAA,kBAAA,CAFA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CACA,sBb2jCR,CaxiCQ,oDAME,yCAAA,CACA,iBAAA,CAEA,cAAA,CAJA,aAAA,CAGA,wBAAA,CAAA,qBAAA,CAAA,oBAAA,CAAA,gBAAA,CAJA,YboiCV,Ca5hCU,4DAEI,oCb6hCd,CalhCI,wBACE,oCbohCN,CalhCM,0CACE,wDbohCR,CajhCM,2CACE,wDbmhCR,CahhCM,uCACE,oCbkhCR,Ca3gCc,6JACE,gCbghChB,CalgCE,oBAEI,2CbmgCN,CajgCM,uBACE,yBbmgCR,CajgCM,sCAGE,yBAAA,CADA,aAAA,CADA,eAAA,CAGA,iBbmgCR,Cax/BE,0BAEE,oCby/BJ,Car/BI,6BAIE,gCAAA,CADA,cAAA,CADA,eAAA,CAKA,aAAA,CADA,eAAA,CALA,iBb6/BN,Caj/BM,kCACE,ebw/BR,Caz+BI,wCAGE,aAAA,CADA,eb2+BN,Cax+BM,8CAEE,aAAA,CADA,eb2+BR,Cav+BM,0DAEE,cAAA,CACA,eAAA,CAYA,kBb69BR,Cav+BQ,4DAEE,cAAA,CACA,eAAA,CAFA,wBb2+BV,Cav+BU,kEACE,yBby+BZ,Cax9BC,0BAEG,oCAAA,CAEA,sBbw9BJ,Ca98BE,6BACC,gCAAA,CAGA,cAAA,CAOA,eAAA,CANG,eAAA,CAHH,iBb69BH,Can9BG,kCACC,eb09BJ,Cat9BE,8CACC,gCAAA,CAGA,cAAA,CAFA,eAAA,CAOA,eAAA,CAGA,aAAA,CADA,eAAA,CADA,iBbq9BH,Caj9BG,gDAGC,cAAA,CAFA,eAAA,CASA,eAAA,CANA,4Bbw9BJ,Ca38BC,8BAEG,oCAAA,CAGF,6BAAA,CADA,uBbk9BF,Cax8BG,mDAGC,kBAAA,CADA,iBbg9BJ,Cat8BI,qDAEC,cb88BL,Ca17BG,mDAEC,iBbg8BJ,Ca17BI,qDAEC,cbi8BL,Caj6BI,6DAEC,UAAA,CACA,cbu6BL,Caj6BM,0EAEQ,oBAAA,CADA,UAAA,CAKP,cAAA,CADA,gBbu6BP,Ca75BM,yEAKQ,oBAAA,CADA,UAAA,CAIP,cAAA,CADA,ebi6BP,Cal5BE,kCAEE,oCAAA,CAEA,uBbu5BJ,Car5BI,qDAEE,aAAA,CADA,gBbw5BN,Caz4BQ,6DAGE,cAAA,CAFA,kBbu5BV,Cap5BU,kEAGE,cAAA,CADA,eAAA,CADA,gBbw5BZ,Can5BU,+DACE,kBbq5BZ,Ca94BC,iCAEC,uBb+4BF,Ca74BE,6CACC,aAAA,CAEA,kBAAA,CADA,Ubg5BH,Ca34BE,6CAGC,wBAAA,CAAA,qBAAA,CADA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CACA,6BAAA,CACA,kBb44BH,Ca14BG,kDAEC,kBAAA,CAEA,uBAAA,CAEA,2BAAA,CADA,qBAAA,CAHA,gBAAA,CAAA,YAAA,CAKA,kBb04BJ,Cax4BI,+DAEC,aAAA,CACA,kBby4BL,Ca73BG,0DAEC,abo4BJ,Cat2BG,qDACC,kBAAA,CAGA,wBAAA,CAAA,qBAAA,CACA,2BAAA,CAAA,4BAAA,CAFA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CAFA,kBAAA,CAAA,cAAA,CAIA,yBAAA,CAAA,qBAAA,CADA,6Bby3BJ,Cat3BI,0DACC,kBAAA,CAAA,gBAAA,CAAA,Ybw3BL,Cap2BE,cACE,oCbu2BJ,Cah2BI,+CACE,iBbq2BN,Ceh1EC,8BAGI,eAAA,CADH,iBfm1EF,Ce90EC,wBAEC,aAAA,CAEA,gBAAA,CADA,Ufg1EF,Ce7zEE,iCAGC,oCAAA,CADA,kBAAA,CAGA,iBAAA,CAiDA,sCAAA,CAAA,8Bf6xEH,CelxEA,oBAEC,aAAA,CACA,efkzED,Ce7yEE,gCASC,mCAAA,CALA,QAAA,CAHA,UAAA,CAOA,WAAA,CAHA,MAAA,CAHA,iBAAA,CAIA,OAAA,CAHA,KAAA,CAOA,sCAAA,CAAA,8BAAA,CAHA,UfkzEH,Ce1yEE,0CAIC,WAAA,CAIA,qBAAA,CALA,Uf+yEH,CehyEC,8EAZE,uBAAA,CAJA,sCAAA,CAAA,8BfyzEH,CezyEC,oCAIC,2BAAA,CACA,qBAAA,CAEA,WAAA,CAEA,kBAAA,CAHA,UfmyEF,Ce5xEC,iCAQC,uBAAA,CAAA,oBAAA,CACA,2BAAA,CAAA,4BAAA,CAPA,2CAAA,CAKA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CAEA,yBAAA,CAAA,qBAAA,CADA,sBAAA,CAHA,gBAAA,CAJA,iBAAA,CAEA,iBfkyEF,Ce1xEE,oCACC,8BAAA,CAEA,cAAA,CAKA,eAAA,CADA,iBfyxEH,CerxEE,mCAEC,yBAAA,CAEA,cAAA,CAIA,eAAA,CAPA,iBf+xEH,CgB98EA,YACE,iBhBs9EF,CgBn9EA,mCACE,GACE,8BAAA,CAAA,sBhBs9EF,CgBp9EA,GACE,+BAAA,CAAA,uBhBs9EF,CACF,CgB59EA,2BACE,GACE,8BAAA,CAAA,sBhBs9EF,CgBp9EA,GACE,+BAAA,CAAA,uBhBs9EF,CACF,CgBn9EA,kBAGE,mBAAA,CADA,gBAAA,CADA,iBhBu9EF,CgBn9EE,mCAGE,WAFe,CAGf,kBAAA,CACA,iBAAA,CAHA,UhBu9EJ,CgBl9EI,yCAaE,qDAAA,CAAA,6CAAA,CAVD,wDAAA,CAEC,uBAAA,CACA,uBAAA,CAJD,UAAA,CAKC,aAAA,CAGA,cAhBa,CAeb,WAfa,CAiBb,gBAjBa,CAkBb,8BAAA,CAAA,0BAAA,CAAA,sBAAA,CAJA,UhBu9EN,CgB98EE,oCAGE,4BAAA,CACA,2CAAA,CACA,iBAAA,CACA,gCAAA,CALA,oBAAA,CAOA,4BZ5BkB,CYoClB,cAAA,CAPA,eAAA,CAEA,eAAA,CAMA,iBAAA,CAfA,iBAAA,CAYA,mCAAA,CAAA,2BAAA,CAFA,kBAAA,CACA,ShBi9EJ,CgBr8EI,0CAEE,2CAAA,CADA,yBAAA,CAEA,sCAAA,CAAA,8BhB88EN,CgBx8EE,uBAGE,aAAA,CAEA,qBAAA,CADA,iBhB28EJ,CgB97EI,8BACE,kBAAA,CAAA,iBAAA,CAAA,aAAA,CACA,cAAA,CACA,ehB28EN,CgBz8EM,mCACE,ehB28ER,CgBt8EE,6BAEE,eAAA,CADA,iBhBy8EJ,CgB/7EE,uBACE,ahBi8EJ,CgBx7EI,gCACE,kBhBi8EN,CgB/7EM,wCACE,wDAAA,CACA,iBhBi8ER,CgB97EM,2CACE,cAAA,CAIA,eAAA,CADA,eAAA,CADA,iBAAA,CADA,wBhBm8ER,CgB77EM,wCACE,eAAA,CACA,ehB+7ER,CgBj5EI,+CAGE,kBAAA,CADA,cAAA,CADA,UhBy7EN,CiBvnFA,gBAGE,uBAAA,CAAA,oBAAA,CACA,2BAAA,CAAA,4BAAA,CAFA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CAEA,yBAAA,CAAA,qBAAA,CADA,sBAAA,CAQA,qBAAA,CADA,ejBioFF,CiB9nFE,uBACE,iBjBqoFJ,CiBnoFI,iCAEC,kBAAA,CAAA,iBAAA,CAAA,aAAA,CAQA,kBjB8nFL,CiBvnFI,8BAYC,adpCgB,Cc0BhB,cAAA,CADA,eAAA,CAEA,WAAA,CAGA,MAAA,CACA,gBAAA,CACA,cAAA,CAGA,mBAAA,CAPA,iBAAA,CACA,KAAA,CAIA,wCAAA,CAAA,gCAAA,CAAA,wBAAA,CAAA,8CAAA,CACA,wBAAA,CAAA,qBAAA,CAAA,oBAAA,CAAA,gBjBioFL,CiB5nFI,6DAGE,uBAAA,CAAA,oBAAA,CAAA,eAAA,CAIA,oCAAA,CACA,2CAAA,CACA,kBAAA,CAPA,adzCe,Cc2Cf,aAAA,CAQA,cAAA,CANA,WAAA,CAKA,oBAAA,CANA,UjBooFN,CiB3nFM,yEAEE,gCAAA,CACA,2CAAA,CAFA,SjB+nFR,CiBznFI,sCAGE,uBAAA,CAAA,oBAAA,CAAA,eAAA,CAMA,4BAAA,CAEA,WAAA,CATA,ad9De,CcmFf,cAAA,CAnBA,aAAA,CAgBA,4BblEQ,CaoER,cAAA,CADA,eAAA,CAfA,WAAA,CAEA,iBAAA,CADA,cAAA,CAkBA,kBAAA,CADA,iBAAA,CAEA,iBAAA,CAbA,sBAAA,CARA,SjBuoFN,CiB5nFM,4CACE,SjB8nFR,CiBlnFM,kDACE,YjBonFR,CiB1mFQ,qIACE,2EAAA,CAAA,mEjB4mFV,CiBtmFI,sCAeC,2CAAA,CACA,2CAAA,CACA,UAAA,CANA,cAAA,CAFA,4BbtGS,CauGT,cAAA,CANA,eAAA,CACA,iBAAA,CAQA,iBAAA,CANA,sCAAA,CAAA,8BAAA,CADA,kBAAA,CAJA,UjBknFL,CiBjmFK,4CACC,oCAAA,CACA,2CAAA,CACA,gCAAA,CACA,sCAAA,CAAA,8BjBmmFN,CiBhmFK,4CACC,SjBkmFN,CkB/uFA,yBAKE,alB8uFF,CkBlvFE,iCACE,elBovFJ,CkB7uFE,4BACE,afHiB,CeOjB,cAAA,CAFA,eAAA,CASA,kBAAA,CADA,eAAA,CATA,elBmvFJ,CkBtuFE,4BAIE,clBgvFJ,CkBruFE,wDAdE,aflBiB,CesBjB,eAAA,CAOA,kBAAA,CADA,eAAA,CATA,elBgwFJ,CkBnvFE,4BAIE,clB+uFJ,CkBnuFE,4BACE,afjDiB,CemDjB,cAAA,CAEA,kBAAA,CADA,eAAA,CAFA,elB+uFJ,CkBxuFI,iCACE,yBlB0uFN,CkBtuFE,oCAIE,uBAAA,CAEA,2BAAA,CADA,qBAAA,CAEA,kCAAA,CANA,YAAA,CAQA,kBAAA,CADA,eAAA,CANA,WlB8uFJ,CkBpuFE,wCACE,elBsuFJ,CkBnuFE,wCACE,8BAAA,CAEA,iBAAA,CADA,elBsuFJ,CkBluFE,qCACE,elBouFJ,CkBjuFE,6BACE,aAAA,CACA,gBAAA,CACA,elBmuFJ,CkBjuFI,uCACE,elBmuFN,CkB/tFE,+BACE,wBlBiuFJ,CkB/tFI,kCAGE,mCAAA,CAFA,eAAA,CAGA,WAAA,CAFA,elBmuFN,CkB3tFI,kCAIE,mCAAA,CAFA,eAAA,CAIA,WAAA,CALA,elBsuFN,CkB1tFE,2DAEE,elBiuFJ,CkB9tFE,4BAKE,eAAA,CAJA,eAAA,CAEA,kBAAA,CACA,gBAAA,CAFA,elBmuFJ,CkB9tFI,qCACE,iBAAA,CAAA,cAAA,CAAA,clBguFN,CkB1tFI,+BAIE,eAAA,CAFA,iBAAA,CADA,iBAAA,CAEA,iBlBkuFN,CkB/tFM,sCAME,qCAAA,CADA,iBAAA,CAJA,UAAA,CACA,aAAA,CACA,UAAA,CAMA,MAAA,CAFA,iBAAA,CACA,QAAA,CAJA,SlBsuFR,CkB9tFM,kCACE,elBguFR,CkB5tFQ,qCAEE,eAAA,CADA,iBlB+tFV,CkB5tFU,4CAKE,wBAAA,CAEA,qCAAA,CANA,WAAA,CACA,aAAA,CACA,UAAA,CAOA,MAAA,CAFA,iBAAA,CACA,KAAA,CALA,SlBmuFZ,CkBttFE,4BAKE,eAAA,CAJA,eAAA,CAEA,kBAAA,CACA,gBAAA,CAFA,elB2tFJ,CkBttFI,+BAIE,eAAA,CAFA,kBAAA,CADA,iBAAA,CAEA,iBlBytFN,CmBn6FE,+CACE,YnBs6FJ,CmBn6FE,0BAEE,eAAA,CADA,enBs6FJ,CmBl6FE,iCACE,cAAA,CACA,enBo6FJ,CmBh6FI,mDACE,enBk6FN,CmB/5FI,oDAGE,ahBjBe,CgBgBf,sCAAA,CAGA,wBAAA,CACA,eAAA,CAEA,gBAAA,CADA,eAAA,CAHA,iBnBo6FN,CmB75FI,qDAEE,wBAAA,CADA,yBnBg6FN,CmB55FI,iHAEE,wDAAA,CACA,qBAAA,CACA,yBAAA,CACA,mCAAA,CAEA,sCAAA,CAEA,uBAAA,CADA,yBAAA,CAFA,2BnBi6FN,CmB15FI,wEACE,yBnB45FN,CmB75FI,+DACE,yBnB45FN,CmB75FI,mEACE,yBnB45FN,CmB75FI,oEACE,yBnB45FN,CmB75FI,0DACE,yBnB45FN,CmBr5FM,6EACE,wDnBu5FR,CmBt5FQ,2FACE,0BnBw5FV,CmBp5FQ,sFACE,oBAAA,CACA,kBnBs5FV,CmBj5FI,gEAQE,wDAAA,CAEA,iBAAA,CAPA,2BAAA,CACA,aAAA,CAFA,cAAA,CAIA,WAAA,CAGA,gBAAA,CAFA,WAAA,CAFA,UnBu5FN,CmB74FI,gDAQE,sCAAA,CADA,sBAAA,CADA,2BnBi5FN,CmB54FI,gHAVE,wDAAA,CAEA,qBAAA,CACA,yBAAA,CACA,uBnB45FN,CmBt5FI,gEAME,uBAAA,CAEA,qBAAA,CADA,yBAAA,CAHA,mBnBk5FN,CmB34FM,uEAOE,sCAAA,CALA,qBAAA,CACA,yBAAA,CACA,mCAAA,CAEA,sCAAA,CADA,2BnB84FR,CmB13FI,2DAQE,8CAAA,CAAA,sCAAA,CAJA,yDAAA,CACA,oDAAA,CAAA,uDAAA,CAIA,iBAAA,CAFA,8DAAA,CADA,4DAAA,CALA,6BAAA,CAAA,qBAAA,CAUA,WAAA,CARA,iBAAA,CADA,eAAA,CAUA,iBAAA,CAFA,UAAA,CAGA,SnB43FN,CmB13FI,2BACE,GACE,8BAAA,CAAA,sBnB43FN,CmB13FI,GACE,+BAAA,CAAA,uBnB43FN,CACF,CmBl4FI,mBACE,GACE,8BAAA,CAAA,sBnB43FN,CmB13FI,GACE,+BAAA,CAAA,uBnB43FN,CACF,CmBz3FI,qDAGE,4BAAA,CACA,2CAAA,CACA,gCAAA,CAJA,aAAA,CAOA,4BflJgB,CemJhB,cAAA,CACA,eAAA,CAGA,eAAA,CAMA,4BAAA,CALA,iBAAA,CAGA,2BAAA,CAfA,iBAAA,CASA,wBAAA,CASA,mCAAA,CAAA,2BAAA,CALA,kBAAA,CARA,UAAA,CASA,SnB43FN,CmB92FM,2DACE,2CAAA,CACA,2CAAA,CACA,yBAAA,CACA,sCAAA,CAAA,8BnBw3FR,CmBr3FM,2DACE,SnBu3FR,CmBj3FE,uCACE,kBnBm3FJ,CmBh3FE,mEACE,2BnBk3FJ,CmB72FE,mEACE,2BAAA,CAAA,gBAAA,CACA,mCAAA,CAAA,+BAAA,CADA,OnBg3FJ,CmBl2FI,+FACI,qCAAA,CAAA,0BAAA,CAGA,gCAAA,CAFA,cAAA,CACA,eAAA,CAFA,iBAAA,CAKA,iBnBw2FR,CmB51FI,4CAAW,WnBs2Ff,CmBn2FE,yEAKE,oCAAA,CACA,2CAAA,CAEE,yBAAA,CADF,gCAAA,CALA,aAAA,CAcA,cAAA,CAQA,eAAA,CAbA,yBAAA,CAgBA,kBAAA,CAVA,iBAAA,CAdA,iBAAA,CAuBA,sCAAA,CAAA,8BAAA,CADA,wBAAA,CAAA,qBAAA,CAAA,oBAAA,CAAA,gBAAA,CAZA,kBAAA,CAHA,yBAAA,CAAA,sBAAA,CAAA,iBAAA,CAIA,SnBw2FJ,CmBr1FI,+EACE,2CAAA,CACA,2CAAA,CACA,yBAAA,CACA,sCAAA,CAAA,8BnBk2FN,CoB7nGI,oCAEE,kBAAA,CADA,oBAAA,CACA,gBAAA,CAAA,YpBgoGN,CoB7nGQ,yDAEE,kBAAA,CADA,qBAAA,CACA,gBAAA,CAAA,YpB+nGV,CoB7nGU,sEACE,wDAAA,CAEA,2BAAA,CADA,uBAAA,CAGA,WAAA,CADA,WpBgoGZ,CoB5nGU,mEACE,wDAAA,CAEA,2BAAA,CADA,uBAAA,CAGA,WAAA,CADA,WpB+nGZ,CqBxpGA,yBAEE,aAAA,CADA,iBrB4pGF,CqBzpGE,gCACE,erB2pGJ,CqBtpGA,kCAIE,4BAAA,CACA,2CAAA,CACA,iBAAA,CACA,gCAAA,CALA,oBAAA,CAOA,4BjBGoB,CiBKpB,cAAA,CAPA,eAAA,CAEA,eAAA,CAMA,iBAAA,CAfA,iBAAA,CAYA,mCAAA,CAAA,2BAAA,CAFA,kBAAA,CACA,SrB0pGF,CqB9oGE,oDAEE,2CAAA,CADA,yBAAA,CAEA,sCAAA,CAAA,8BrBypGJ,CqBtpGE,oDACE,SrBypGJ,CqBrpGE,uDAEE,sBAAA,CADA,oCAAA,CAEA,yBrBwpGJ,CqBtpGI,yEAEE,oCAAA,CADA,gCrB0pGN,CqBppGE,uDACE,erBupGJ,CqBhpGE,iBACE,mBrBmpGJ,CsB5sGE,yBNiEA,uBAUI,wBAAA,CAAA,qBAAA,CACA,6BAAA,CAAA,4BAAA,CAGA,oBAAA,CALA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CAEA,sBAAA,CAAA,kBAAA,CADA,6BAAA,CAEA,kBAAA,CACA,ehB48EJ,CACF,CsB3hFE,yBPAD,wBASE,sBAAA,CAAA,mBAAA,CADA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CAEA,kBAAA,CAAA,cAAA,CADA,0BAAA,CAFA,Wfm1ED,Cep0EA,iCAQE,kBAAA,CAAA,6BAAA,CAAA,yBAAA,CAEA,iBf80EF,Ce50EE,+CAEC,cf60EH,Ce10EE,+CAEC,iBf20EH,Cex0EE,8CAEC,cfy0EH,CA5BF,CsB31EE,yBdXF,WAeI,gBAAA,CACA,cR6qBF,CQzqBA,mBAGI,gBAAA,CACA,cR2qBJ,CALF,CsBnrBE,yBHgNA,gFAGM,4BnB62FN,CmBt2FE,+FAUQ,4BAAA,CACA,QAAA,CAFA,enB22FV,CmB/1FA,yEA8BM,YnBk2FN,CA9CF,CsBrkGE,yBpBNF,KAUE,cFyYA,CKnZF,GAIE,cL0cA,CKtcF,GAIE,cL2cA,CKvcF,GAIE,cL4cA,CKhcF,MAIE,cL8cA,CK1cF,GAIE,cL+cA,CMxfF,aAII,uBNshBF,CMlhBF,cAII,sBNuhBF,COtiBF,OAOE,cPipBA,CO1oBD,gBAIE,oBPmpBD,CSpkBF,wBAOI,gCAAA,CAAA,wBAAA,CACA,iCAAA,CAAA,yBTqsBF,CSjsBF,qCANI,6BAAA,CAAA,qBTqtBF,CS/sBF,aAOI,2BAAA,CAAA,mBAAA,CAEA,gCAAA,CAAA,wBAAA,CACA,iCAAA,CAAA,yBTqsBF,CS/rBF,aAOI,2BAAA,CAAA,mBAAA,CACA,6BAAA,CAAA,qBAAA,CACA,gCAAA,CAAA,wBAAA,CACA,iCAAA,CAAA,yBTmsBF,CU1yBA,0BAWI,wBAAA,CAAA,qBAAA,CACA,wBAAA,CAAA,qBAAA,CAAA,kBAAA,CAFA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CACA,6BAAA,CAJA,aAAA,CACA,YVg+BJ,CUz9BA,wBASI,cAAA,CACA,kBV49BJ,CUx9BA,yBAcI,YV09BJ,CUt9BA,2CAyCI,iBVm8BJ,CU96BA,qBAOI,kBVu7BJ,CUn7BA,0BAKI,kBVu7BJ,CY1jCA,0DAcE,WAAA,CADA,WZouCF,CajwCA,YAOI,kBbi1CJ,Ca70CA,YAQI,eAAA,CACA,kBbi1CJ,Ca70CA,wBAQI,cbi1CJ,Ca3xCE,4CAaI,aAAA,CADA,Sb4zCN,Ca3uCA,wBASI,YboyCJ,CajyCE,+BAGI,YbsyCN,CazoCE,sCAII,ebquCN,Ca/tCE,qCAII,wBAAA,CAAA,qBAAA,CADA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CACA,6BAAA,CAEA,ebiuCN,Ca9tCI,0CAMI,kBAAA,CAAA,gBAAA,CAAA,YbiuCR,CatsCE,wDAII,wBAAA,CAAA,qBAAA,CADA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CACA,6BbstCN,CantCI,8DAGI,kBAAA,CAAA,gBAAA,CAAA,YbwtCR,CapqCI,8DAYI,kBAAA,CAAA,gBAAA,CAAA,YAAA,CARA,Yb4sCR,CapqCE,oDAII,wBAAA,CAAA,qBAAA,CADA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CAEA,kBAAA,CAAA,cAAA,CADA,6Bb2rCN,CavrCI,yDAOI,kBAAA,CAAA,6BAAA,CAAA,yBAAA,CACA,iBb0rCR,CatrCQ,uEAEE,cburCV,CanlCE,iDAII,wBAAA,CAAA,qBAAA,CADA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CACA,6Bb4oCN,CazoCI,sDAMI,kBAAA,CAAA,gBAAA,CAAA,YAAA,CAEA,QAAA,CACA,eAAA,CAFA,Yb8oCR,Ca1jCU,mGAQI,cbynCd,CapnCU,uFASI,cbunCd,CannCU,sGAOI,absnCd,Ca/jCE,mCAuBI,WAAA,CAJA,QAAA,CAFA,iBAAA,CACA,OAAA,CAIA,WbslCN,CajlCE,oCAmBI,UAAA,CAIA,WAAA,CALA,iBAAA,CAEA,SAAA,CAEA,Wb+kCN,CapkCE,gCAgBI,aAAA,CADA,SbokCN,Ca3hCM,8DAQQ,sBbwjCd,CanjCY,sEAOI,cAAA,CADA,eb0jChB,CahjCY,yEAOI,cAAA,CADA,gBbujChB,Ca17BE,6BAUI,cbw/BN,Ca/7BD,0BAOK,mBby9BJ,Cal9BA,6BAQE,cb29BF,Cal9BA,8CAOE,cb49BF,Car9BC,gDAOE,cAAA,CACA,2Bby9BH,Caz8BA,6CAIE,wBAAA,CAAA,qBAAA,CADA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CACA,6Bbg9BF,Ca78BC,mDAKE,kBAAA,CAAA,gBAAA,CAAA,YAAA,CAEA,eAAA,CADA,ebk9BH,Ca58BE,qDAIE,cbg9BJ,Ca97BC,mDAIE,kBAAA,CAAA,gBAAA,CAAA,YAAA,CACA,gBbk8BH,Ca75BE,kHAKE,cby6BJ,Cat5BI,mJAUE,cbk6BN,Cah5BE,qDAMI,wBAAA,CAAA,qBAAA,CADA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CACA,6Bbw5BN,Car5BI,0DAGI,kBAAA,CAAA,gBAAA,CAAA,Ybu5BR,Cav2BE,+DAME,kBAAA,CAAA,gBAAA,CAAA,YAAA,CACA,eb04BJ,Can3BA,yGATG,mBAAA,CAAA,mBAAA,CAAA,Yb24BH,Cal4BA,+CAIE,wBAAA,CAAA,qBAAA,CAAA,6BAAA,CACA,kBb63BF,Ca13BC,qDAGE,kBAAA,CAAA,kBAAA,CAAA,cb43BH,CerzED,wBAgBE,sBAAA,CAAA,mBAAA,CADA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CAEA,kBAAA,CAAA,cAAA,CADA,0BAAA,CAFA,Wfo1ED,Ce50EA,iCA8BE,kBAAA,CAAA,+BAAA,CAAA,2BAAA,CAEA,iBfu0EF,Cer0EE,+CAEC,iBfs0EH,Ce9zEE,6FAGC,cfi0EH,Ce9uEA,oCAKE,cf+xEF,CezxEA,mCAME,cf8xEF,CgBx6EA,oCAqBI,cAAA,CACA,eAAA,CAFA,iBhBg9EJ,CiB9gFF,gBAOI,6BAAA,CAAA,4BAAA,CAAA,sBAAA,CAAA,kBjBwoFF,CiB/nFE,iCAME,kBAAA,CAAA,iBAAA,CAAA,aAAA,CACE,iBjBsoFN,CkBlpFA,4BAQI,cAAA,CACA,elBivFJ,CkB3uFA,4BAQI,cAAA,CACA,elBgvFJ,CkB1uFA,4BAUI,cAAA,CACA,kBAAA,CACA,elB6uFJ,CkB1qFE,oEAQI,YlBmuFN,CkBltFE,qCAGI,iBAAA,CAAA,cAAA,CAAA,clBkuFN,CmBttFE,qDAwBI,cAAA,CACA,eAAA,CAEA,4BAAA,CADA,yBAAA,CAAA,sBAAA,CAAA,iBnBy3FN,CmBzzFA,yEAoBM,cAAA,CACA,iBnBs2FN,CqB3mGF,kCAsBI,cAAA,CACA,eAAA,CAFA,iBrB0pGF,CApyFF,CsB1YE,yBNwGA,uBAMI,sBAAA,CAAA,mBAAA,CADA,mBAAA,CAAA,mBAAA,CAAA,YAAA,CAEA,kBAAA,CAAA,cAAA,CADA,0BhBk8EJ,CgB97EE,gCAuBI,kBAAA,CAAA,6BAAA,CAAA,yBAAA,CACA,iBhB87EN,CgB57EM,8CACE,iBhB87ER,CgB37EM,8CACE,chB67ER,CgB55EE,+CAQI,kBAAA,CAAA,gBAAA,CAAA,YAAA,CACA,chBs7EN,CAhEF,CsBvjFE,0BfJF,OAWE,cPkpBA,CO/oBD,gBAQE,oBPopBD,CaweD,0BAWK,mBb09BJ,CAz9CF,CsBppBE,0BNkHE,gCAoCI,kBAAA,CAAA,6BAAA,CAAA,yBAAA,CACA,iBhB67EN,CgB37EM,8CACE,iBhB67ER,CgB17EM,8CACE,chB47ER,CgBx7EI,qCAEI,kBAAA,CAAA,6BAAA,CAAA,yBAAA,CACA,iBhB27ER,CgBz7EQ,mDACE,iBhB27EV,CgBx7EQ,mDACE,chB07EV,CgBp7EE,+CAYI,kBAAA,CAAA,gBAAA,CAAA,YAAA,CACA,chBw7EN,CA5BF,CsB3lFE,0BVDD,wBAIE,YZsuCD,CYluCD,wCAKE,aAAA,CACG,gBZquCJ,CY5vCF,WAgDE,6BAAA,CAAA,4BAAA,CACA,uBAAA,CAAA,oBAAA,CACE,wBAAA,CAAA,qBAAA,CAAA,kBAAA,CAFF,sBAAA,CAAA,kBAAA,CACA,sBZiuCA,CY7tCD,sBAcE,yBAAA,CAEA,cAAA,CAEA,YAAA,CAEA,WAAA,CADA,gBAAA,CAJA,QAAA,CAFA,eZquCD,CYxtCA,wBAUE,yBAAA,CACA,iBZ2tCF,CYvtCE,mCACC,SZytCH,CY9sCC,8BAKE,yBAAA,CACQ,sCAAA,CAAA,kCAAA,CAAA,8BZitCX,CY/sCG,oCAWC,oCAAA,CARG,WAAA,CAOH,UAAA,CALG,UAAA,CAEA,MAAA,CALH,iBAAA,CAMG,OAAA,CAJA,UAAA,CAEA,UAAA,CAGA,cZktCP,CY1sCI,+CAEC,YZ2sCL,CA5FF,CsB1uCE,0BTmvBU,sGAWI,cbunCd,CACF,CsBt3DE,0BXXF,aAkBE,YXqlCA,CW/kCA,wBAgBC,4BAAA,CACA,aAAA,CAIA,aAAA,CAEA,gBAAA,CAJA,gBAAA,CACA,eAAA,CAEA,iBXglCD,CWzhCD,uGAoDM,YXmjCL,CApGF\",\"sourcesContent\":[\"@mixin setvars($variables, $prefix: pf) {\\n    :root {\\n        @each $name, $value in $variables {\\n        --#{$prefix}--#{$name}: #{$value};\\n        }\\n    }\\n}\\n\\n@function getvar($name, $prefix: pf) {\\n@return var(--#{$prefix}--#{$name});\\n}\\n\\n@function getrgb($color) {\\n@return #{red($color)} + ' ' + #{green($color)} + ' ' + #{blue($color)};\\n}\\n\\n@function getcolor($name) {\\n@return getvar($name, 'color');\\n}\\n\\n@function getcolorrgb($name) {\\n@return getvar($name, 'color-rgb');\\n}\\n  \",\"@charset 'UTF-8';\\n\\n/* ITCSS style config\\n\\n- Settings - Globally-available settings, config switches, brand colours, etc.\\n- Tools - Globally-available tools, public mixins, and helper functions.\\n- Generic - Ground zero styles, low-specificity, far-reaching, resets, Normalize.css, etc.\\n- Base - Unclassed HTML elements, H1–H6, basic links, lists, etc. Last layer we see type selectors (e.g. a {}, blockquote {}).\\n- Objects - OOCSS, design patterns, no cosmetics. Begin using classes exclusively, agnostically named (e.g. .ui-list {}).\\n- Components - Designed pieces of UI. Still only using classes. More explicitly named (e.g. .products-list {}).\\n- Trumps - Overrides, helpers, utilities. Only affect one piece of the DOM at a time. Usually carry !important.\\n*/\\n\\n// Settings\\n@import 'setup/setup';\\n\\n// Tools\\n@import 'tools/tools';\\n\\n// Generic\\n@import 'generic/generic';\\n\\n// Base\\n@import 'base/base';\\n\\n// Objects\\n@import 'objects/objects';\\n\\n// Core Components\\n@import 'core-components/core-components';\\n\\n// Components\\n@import 'components/components';\\n\\n// Elements\\n@import 'elements/elements';\\n\\n// Trumps\\n@import 'trumps/trumps';\\n\",\"/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\\n\\n/* Document\\n   ========================================================================== */\\n\\n/**\\n * 1. Correct the line height in all browsers.\\n * 2. Prevent adjustments of font size after orientation changes in iOS.\\n */\\n\\n html {\\n  line-height: 1.15; /* 1 */\\n  -webkit-text-size-adjust: 100%; /* 2 */\\n}\\n\\n/* Sections\\n   ========================================================================== */\\n\\n/**\\n * Remove the margin in all browsers.\\n */\\n\\nbody {\\n  margin: 0;\\n}\\n\\n/**\\n * Render the `main` element consistently in IE.\\n */\\n\\nmain {\\n  display: block;\\n}\\n\\n/**\\n * Correct the font size and margin on `h1` elements within `section` and\\n * `article` contexts in Chrome, Firefox, and Safari.\\n */\\n\\nh1 {\\n  font-size: 2em;\\n  margin: 0.67em 0;\\n}\\n\\n/* Grouping content\\n   ========================================================================== */\\n\\n/**\\n * 1. Add the correct box sizing in Firefox.\\n * 2. Show the overflow in Edge and IE.\\n */\\n\\nhr {\\n  box-sizing: content-box; /* 1 */\\n  height: 0; /* 1 */\\n  overflow: visible; /* 2 */\\n}\\n\\n/**\\n * 1. Correct the inheritance and scaling of font size in all browsers.\\n * 2. Correct the odd `em` font sizing in all browsers.\\n */\\n\\npre {\\n  font-family: monospace, monospace; /* 1 */\\n  font-size: 1em; /* 2 */\\n}\\n\\n/* Text-level semantics\\n   ========================================================================== */\\n\\n/**\\n * Remove the gray background on active links in IE 10.\\n */\\n\\na {\\n  background-color: transparent;\\n}\\n\\n/**\\n * 1. Remove the bottom border in Chrome 57-\\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\\n */\\n\\nabbr[title] {\\n  border-bottom: none; /* 1 */\\n  text-decoration: underline; /* 2 */\\n  text-decoration: underline dotted; /* 2 */\\n}\\n\\n/**\\n * Add the correct font weight in Chrome, Edge, and Safari.\\n */\\n\\nb,\\nstrong {\\n  font-weight: bolder;\\n}\\n\\n/**\\n * 1. Correct the inheritance and scaling of font size in all browsers.\\n * 2. Correct the odd `em` font sizing in all browsers.\\n */\\n\\ncode,\\nkbd,\\nsamp {\\n  font-family: monospace, monospace; /* 1 */\\n  font-size: 1em; /* 2 */\\n}\\n\\n/**\\n * Add the correct font size in all browsers.\\n */\\n\\nsmall {\\n  font-size: 80%;\\n}\\n\\n/**\\n * Prevent `sub` and `sup` elements from affecting the line height in\\n * all browsers.\\n */\\n\\nsub,\\nsup {\\n  font-size: 75%;\\n  line-height: 0;\\n  position: relative;\\n  vertical-align: baseline;\\n}\\n\\nsub {\\n  bottom: -0.25em;\\n}\\n\\nsup {\\n  top: -0.5em;\\n}\\n\\n/* Embedded content\\n   ========================================================================== */\\n\\n/**\\n * Remove the border on images inside links in IE 10.\\n */\\n\\nimg {\\n  border-style: none;\\n}\\n\\n/* Forms\\n   ========================================================================== */\\n\\n/**\\n * 1. Change the font styles in all browsers.\\n * 2. Remove the margin in Firefox and Safari.\\n */\\n\\nbutton,\\ninput,\\noptgroup,\\nselect,\\ntextarea {\\n  font-family: inherit; /* 1 */\\n  font-size: 100%; /* 1 */\\n  line-height: 1.15; /* 1 */\\n  margin: 0; /* 2 */\\n}\\n\\n/**\\n * Show the overflow in IE.\\n * 1. Show the overflow in Edge.\\n */\\n\\nbutton,\\ninput { /* 1 */\\n  overflow: visible;\\n}\\n\\n/**\\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\\n * 1. Remove the inheritance of text transform in Firefox.\\n */\\n\\nbutton,\\nselect { /* 1 */\\n  text-transform: none;\\n}\\n\\n/**\\n * Correct the inability to style clickable types in iOS and Safari.\\n */\\n\\nbutton,\\n[type=\\\"button\\\"],\\n[type=\\\"reset\\\"],\\n[type=\\\"submit\\\"] {\\n  -webkit-appearance: button;\\n}\\n\\n/**\\n * Remove the inner border and padding in Firefox.\\n */\\n\\nbutton::-moz-focus-inner,\\n[type=\\\"button\\\"]::-moz-focus-inner,\\n[type=\\\"reset\\\"]::-moz-focus-inner,\\n[type=\\\"submit\\\"]::-moz-focus-inner {\\n  border-style: none;\\n  padding: 0;\\n}\\n\\n/**\\n * Restore the focus styles unset by the previous rule.\\n */\\n\\nbutton:-moz-focusring,\\n[type=\\\"button\\\"]:-moz-focusring,\\n[type=\\\"reset\\\"]:-moz-focusring,\\n[type=\\\"submit\\\"]:-moz-focusring {\\n  outline: 1px dotted ButtonText;\\n}\\n\\n/**\\n * Correct the padding in Firefox.\\n */\\n\\nfieldset {\\n  padding: 0.35em 0.75em 0.625em;\\n}\\n\\n/**\\n * 1. Correct the text wrapping in Edge and IE.\\n * 2. Correct the color inheritance from `fieldset` elements in IE.\\n * 3. Remove the padding so developers are not caught out when they zero out\\n *    `fieldset` elements in all browsers.\\n */\\n\\nlegend {\\n  box-sizing: border-box; /* 1 */\\n  color: inherit; /* 2 */\\n  display: table; /* 1 */\\n  max-width: 100%; /* 1 */\\n  padding: 0; /* 3 */\\n  white-space: normal; /* 1 */\\n}\\n\\n/**\\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\\n */\\n\\nprogress {\\n  vertical-align: baseline;\\n}\\n\\n/**\\n * Remove the default vertical scrollbar in IE 10+.\\n */\\n\\ntextarea {\\n  overflow: auto;\\n}\\n\\n/**\\n * 1. Add the correct box sizing in IE 10.\\n * 2. Remove the padding in IE 10.\\n */\\n\\n[type=\\\"checkbox\\\"],\\n[type=\\\"radio\\\"] {\\n  box-sizing: border-box; /* 1 */\\n  padding: 0; /* 2 */\\n}\\n\\n/**\\n * Correct the cursor style of increment and decrement buttons in Chrome.\\n */\\n\\n[type=\\\"number\\\"]::-webkit-inner-spin-button,\\n[type=\\\"number\\\"]::-webkit-outer-spin-button {\\n  height: auto;\\n}\\n\\n/**\\n * 1. Correct the odd appearance in Chrome and Safari.\\n * 2. Correct the outline style in Safari.\\n */\\n\\n[type=\\\"search\\\"] {\\n  -webkit-appearance: textfield; /* 1 */\\n  outline-offset: -2px; /* 2 */\\n}\\n\\n/**\\n * Remove the inner padding in Chrome and Safari on macOS.\\n */\\n\\n[type=\\\"search\\\"]::-webkit-search-decoration {\\n  -webkit-appearance: none;\\n}\\n\\n/**\\n * 1. Correct the inability to style clickable types in iOS and Safari.\\n * 2. Change font properties to `inherit` in Safari.\\n */\\n\\n::-webkit-file-upload-button {\\n  -webkit-appearance: button; /* 1 */\\n  font: inherit; /* 2 */\\n}\\n\\n/* Interactive\\n   ========================================================================== */\\n\\n/*\\n * Add the correct display in Edge, IE 10+, and Firefox.\\n */\\n\\ndetails {\\n  display: block;\\n}\\n\\n/*\\n * Add the correct display in all browsers.\\n */\\n\\nsummary {\\n  display: list-item;\\n}\\n\\n/* Misc\\n   ========================================================================== */\\n\\n/**\\n * Add the correct display in IE 10+.\\n */\\n\\ntemplate {\\n  display: none;\\n}\\n\\n/**\\n * Add the correct display in IE 10.\\n */\\n\\n[hidden] {\\n  display: none;\\n}\",\"\\nhtml {\\n\\tbox-sizing: border-box;\\n\\tfont-size: $font-size-mobile;\\n\\tfont-family: $font-family;\\n\\tline-height: $line-height;\\n\\tmin-height: 100%;\\n\\theight: 100%;\\n\\tcolor: $c-body-text;\\n\\n\\t@include bp(lap) {\\n\\t\\tfont-size: $font-size;\\n\\t}\\n}\\n\\n :focus {\\n \\toutline: 0 !important;\\n//    box-shadow: 0 0 5px #aaa;\\n }\\n\\n* {\\n\\t&,\\n\\t&::before,\\n\\t&::after {\\n\\t\\tbox-sizing: inherit;\\n\\t}\\n}\\n\\nbody {\\n\\tmargin: 0;\\n\\tpadding: 0;\\n\\theight: 100%;\\n\\tbackground-color: getcolor('white');\\n\\n\\t// Adjust body height for fixed menu\\n\\t// padding: $menu-mobile-height 0 0;\\n\\n\\t// @include bp($mobile-menu-snap) {\\n\\t// \\tpadding: $menu-height 0 0;\\n\\t// }\\n\\t\\n\\n}\\n\\np {\\n\\tmargin-top: 0;\\n\\tmargin-bottom: 15px;\\n\\tfont-weight: 300;\\n}\\n\\nul,\\nol {\\n\\tmargin: 0;\\n\\tpadding: 0;\\n\\tlist-style: none;\\n}\\n\\na {\\n\\ttext-decoration: none;\\n\\tcolor: $c_hyperlink;\\n\\n\\t&:hover {\\n\\t\\tcolor: $c_hyperlink_hover;\\n\\t}\\n\\n\\t&.underline {\\n\\t\\ttext-decoration: underline;\\n\\t}\\n\\n\\t&.no-style {\\n\\t\\tcolor: inherit;\\n\\n\\t\\t&:hover {\\n\\t\\t\\tcolor: inherit;\\n\\t\\t}\\n\\t}\\n\\n\\n\\t\\n}\\n\\n\\n\\n\\nimg {\\n\\twidth: 100%;\\n\\theight: auto;\\n}\\n\\n\\n\\n@import 'headings';\\n@import 'helpers';\\n\",\"// Site Colours\\n\\n$color-white: #ffffff;\\n$color-black: #000000;\\n\\n\\n$color-panel-grey: #F8F6F0;\\n$color-panel-green: #F8FAF4;\\n\\n$color-brand-purple: #371538;\\n$color-brand-light-purple: #E0DCE1;\\n$color-brand-gold: #CBBBA0;\\n$color-brand-mid-gold: #d6ccba;\\n$color-brand-light-gold: #F1EEE8;\\n\\n\\n$color-brand-grey: #8E8E8E;\\n$color-brand-red: #E74913;\\n$color-brand-blue: #5CABE0;\\n$color-brand-green: #1B8D3A;\\n$color-brand-yellow: #FEB909;\\n\\n$color-light-grey: #D9D9D9;\\n$color-pale-yellow: #FFEFD2;\\n$color-pale-orange: #fde5de;\\n\\n// Generic Colours\\n$c-body-text: $color-brand-purple;\\n$c_hyperlink: $color-black;\\n$c_hyperlink_hover: $color-black;\\n\\n\\n/*\\nRGB values.\\n*/\\n$color-rgb-white: getrgb($color-white);\\n$color-rgb-black: getrgb($color-black);\\n$color-rgb-red: getrgb($color-brand-red);\\n$color-rgb-blue: getrgb($color-brand-blue);\\n$color-rgb-green: getrgb($color-brand-green);\\n$color-rgb-yellow: getrgb($color-brand-yellow);\\n$color-rgb-purple: getrgb($color-brand-purple);\\n$color-rgb-gold: getrgb($color-brand-gold);\\n\\n\\n@include setvars(\\n  (\\n    'white': $color-white,\\n    'black': $color-black,\\n    'panel_grey': $color-panel-grey,\\n    'panel_green': $color-panel-green,\\n    'brand_grey': $color-brand-grey,\\n    'brand_red': $color-brand-red,\\n    'brand_green': $color-brand-green,\\n    'brand_yellow': $color-brand-yellow,\\n    'brand_blue': $color-brand-blue,\\n    'light_grey': $color-light-grey,\\n    'pale_yellow': $color-pale-yellow,\\n    'pale_orange': $color-pale-orange,\\n    'brand_purple': $color-brand-purple,\\n    'brand_gold': $color-brand-gold,\\n    'brand_light_purple': $color-brand-light-purple,\\n    'brand_light_gold': $color-brand-light-gold,\\n    'brand_mid_gold': $color-brand-mid-gold\\n  ),\\n  'color'\\n);\\n\\n\\n\\n@include setvars(\\n  (\\n    'white': $color-rgb-white,\\n    'black': $color-rgb-black,\\n    'brand_red': $color-rgb-red,\\n    'brand_blue': $color-rgb-blue,\\n    'brand_green': $color-rgb-green,\\n    'brand_yellow': $color-rgb-yellow,\\n    'brand_purple': $color-rgb-purple,\\n    'brand_gold': $color-rgb-gold,\\n  ),\\n  'color-rgb'\\n);\",\"/*\\nFont Weight Ref:\\n\\n100 Thin (Hairline)\\n200 Extra Light (Ultra Light)\\n300 Light\\n400 Normal\\n500 Medium\\n600 Semi Bold (Demi Bold)\\n700 Bold\\n800 Extra Bold (Ultra Bold)\\n900 Black (Heavy)\\n*/\\n\\n@import url('https://fonts.googleapis.com/css2?family=Amiko:wght@400;600&display=swap');\\n\\n$font-size-mobile: 16px;\\n$font-size: 18px;\\n\\n$line-height: 1.6em;\\n$heading-line-height: 1.2em;\\n\\n$heading-font-family: 'Amiko', sans-serif;\\n$font-family: 'Amiko', sans-serif;\\n\\n$h1-size: 55px; // .alpha\\n$h2-size: 35px; // .beta\\n$h3-size: 24px; // .gamma\\n$h4-size: 20px; // .delta\\n$h5-size: 20px; // .epsilon\\n$h6-size: 18px; // .zeta\\n\\n$h1-size-mobile: 38px; // .alpha\\n$h2-size-mobile: 28px; // .beta\\n$h3-size-mobile: 22px; // .gamma\\n$h4-size-mobile: 20px; // .delta\\n$h5-size-mobile: 20px; // .epsilon\\n$h6-size-mobile: 18px; // .zeta\\n\",\"\\nh1 {\\n\\tfont-size: $h1-size-mobile;\\n\\n\\t@include bp(lap) {\\n\\t\\tfont-size: $h1-size;\\n\\t}\\n}\\n\\nh2 {\\n\\tfont-size: $h2-size-mobile;\\n\\n\\t@include bp(lap) {\\n\\t\\tfont-size: $h2-size;\\n\\t}\\n}\\n\\nh3 {\\n\\tfont-size: $h3-size-mobile;\\n\\n\\t@include bp(lap) {\\n\\t\\tfont-size: $h3-size;\\n\\t}\\n}\\n\\nh4 {\\n\\tfont-size: $h4-size-mobile;\\n\\n\\t@include bp(lap) {\\n\\t\\tfont-size: $h4-size;\\n\\t}\\n}\\n\\nh5 {\\n\\tfont-size: $h5-size-mobile;\\n\\n\\t@include bp(lap) {\\n\\t\\tfont-size: $h5-size;\\n\\t}\\n}\\n\\nh6 {\\n\\tfont-size: $h6-size-mobile;\\n\\n\\t@include bp(lap) {\\n\\t\\tfont-size: $h6-size;\\n\\t}\\n}\\n\\nh1,\\nh2,\\nh3,\\nh4,\\nh5,\\nh6 {\\n\\tfont-family: $heading-font-family;\\n\\tline-height: $heading-line-height;\\n\\tmargin-top: 0;\\n\\tmargin-bottom: .6em;\\n\\tfont-weight: 800;\\n\\t//letter-spacing: -0.03em;\\n\\t\\n\\t&.large-bottom {\\n\\t\\tmargin-bottom: 1.8em;\\n\\t}\\n}\\n\",\".no-wrap {\\n  white-space: nowrap;\\n}\\n\\n.hide-mobile {\\n  display: none !important;\\n\\n  @include bp(lap) {\\n    display: unset !important;\\n  }\\n}\\n\\n.hide-desktop {\\n  display: unset !important;\\n\\n  @include bp(lap) {\\n    display: none !important;\\n  }\\n}\\n\\n// Spacing\\n\\n.pt-40 {\\n  padding-top: 40px;\\n}\\n\\n.mt-40 {\\n  margin-top: 40px;\\n}\\n\\n.mt-60 {\\n  margin-top: 60px;\\n}\\n\\n.mb-20 {\\n  margin-bottom: 20px;\\n}\\n\\n.mb-30 {\\n  margin-bottom: 30px;\\n}\\n\\n.mb-40 {\\n  margin-bottom: 40px;\\n}\\n\\n// Styles for content areas across site\\n\\n.image-wrapper {\\n  display: block;\\n  margin: 10px auto;\\n\\n  &--500 {\\n    max-width: 500px;\\n  }\\n\\n  &--600 {\\n    max-width: 600px;\\n  }\\n\\n  &--800 {\\n    max-width: 800px;\\n  }\\n\\n  &--900 {\\n    max-width: 900px;\\n  }\\n}\\n\\nhr {\\n  border: 0;\\n  height: 1px;\\n  //background-color: $brand_dark_blue;\\n  margin: 40px auto;\\n  clear: both;\\n\\n  &.max-width {\\n    max-width: 840px;\\n  }\\n\\n  &.-small {\\n    width: 20%;\\n    margin: 40px auto;\\n  }\\n\\n  &.white {\\n    background-color: getcolor('white');\\n  }\\n\\n  &.height-3 {\\n    height: 3px;\\n  }\\n}\\n\\nul.styled-list {\\n  list-style: none;\\n  text-align: left;\\n  margin-bottom: 20px;\\n  margin-left: 20px;\\n\\n  li {\\n    padding-left: 20px;\\n    margin-bottom: 15px;\\n    position: relative;\\n\\n    &:before {\\n      content: '';\\n      display: block;\\n      height: 5px;\\n      width: 5px;\\n      border-radius: 50%;\\n      background: $c-body-text;\\n      position: absolute;\\n      top: 10px;\\n      left: 0;\\n    }\\n\\n    ul {\\n      li {\\n        padding-left: 10px;\\n\\n        &:before {\\n          content: '-';\\n          display: block;\\n          height: 5px;\\n          width: 5px;\\n          background-color: inherit;\\n          border-radius: none;\\n          //background: red;\\n          position: absolute;\\n          top: 0px;\\n          left: 0;\\n        }\\n      }\\n    }\\n  }\\n\\n  &--white {\\n    li {\\n      color: getcolor('white');\\n\\n      &:before {\\n        background: getcolor('white');\\n      }\\n    }\\n  }\\n}\\n\",\"\\n.panel {\\n\\n\\tbackground-color: getcolor('white');\\n\\n\\tpadding: 40px 10px;\\n\\t\\n\\t@include bp(lap) {\\t\\t\\n\\t\\tpadding: 60px 0px;\\n\\t}\\n\\n\\t@include bp(desk) {\\n\\t\\tpadding: 70px 0px;\\n\\t}\\n\\n\\t&--ext-bot {\\n\\t\\tpadding-bottom: 60px;\\n\\t\\n\\t\\t@include bp(lap) {\\t\\t\\n\\t\\t\\tpadding-bottom: 110px;\\n\\t\\t}\\n\\t\\n\\t\\t@include bp(desk) {\\n\\t\\t\\tpadding-bottom: 120px;\\n\\t\\t}\\t\\n\\t}\\n\\n}\\n\",\".container {\\n\\n  display: block;\\n  width: auto;\\n  float: none;\\n  margin: 0 auto;\\n  overflow: auto;\\n  padding: 0px 10px;\\n\\n  &--no-padding-mobile {\\n    padding: 0px 0px;\\n  }\\n\\n\\n  @include bp(600px) {\\n    max-width: 1560px;\\n    padding: 0px 45px;\\n    \\n  }\\n\\n  &--narrow {\\n\\n    @include bp(600px) {\\n      max-width: 1090px;\\n      padding: 0px 45px;\\n    }\\n  }\\n  \\n\\n\\n}\\n\",\".animate {\\n  opacity: 0;\\n\\n  &-1 {\\n    opacity: 0;\\n  }\\n\\n  &-2 {\\n    opacity: 0;\\n  }\\n\\n  &-3 {\\n    opacity: 0;\\n  }\\n}\\n\\n.animate-fade,\\n.animate-fade-slow {\\n  opacity: 0;\\n}\\n\\n.animate-left,\\n.animate-right {\\n  opacity: 0;\\n\\n  &-1 {\\n    opacity: 0;\\n  }\\n\\n  &-2 {\\n    opacity: 0;\\n  }\\n\\n  &-3 {\\n    opacity: 0;\\n  }\\n}\\n\\n.animate-pulse {\\n  opacity: 0;\\n}\\n\\n.bounce {\\n  animation: bounce 3s infinite;\\n}\\n\\n.fade-up {\\n  animation-duration: 1s;\\n  animation-fill-mode: both;\\n  animation-name: fadeInUp;\\n}\\n\\n.fade-up-1 {\\n  animation-duration: 1s;\\n  animation-fill-mode: both;\\n  animation-name: fadeInUp;\\n}\\n\\n.fade-up-2 {\\n  animation-delay: 0.3s;\\n  animation-duration: 1s;\\n  animation-fill-mode: both;\\n  animation-name: fadeInUp;\\n}\\n\\n.fade-up-3 {\\n  animation-delay: 0.6s;\\n  animation-duration: 1s;\\n  animation-fill-mode: both;\\n  animation-name: fadeInUp;\\n}\\n\\n.fade-in {\\n  animation-duration: 1s;\\n  animation-fill-mode: both;\\n  animation-name: fadeIn;\\n}\\n\\n.fade-left-full {\\n  opacity: 0;\\n  animation-duration: 1s;\\n  animation-fill-mode: both;\\n  animation-name: fadeInLeftFull;\\n}\\n\\n.fade-left {\\n\\n  animation-duration: .3s;\\n  animation-fill-mode: both;\\n  animation-name: fadeIn;\\n\\n  @include bp(lap) {\\n    animation-duration: 1s;\\n    animation-fill-mode: both;\\n    animation-name: fadeInLeft;\\n  }\\n}\\n\\n.fade-left-1 {\\n  animation-duration: .3s;\\n  animation-fill-mode: both;\\n  animation-name: fadeIn;\\n\\n  @include bp(lap) {\\n    animation-duration: 1s;\\n    animation-fill-mode: both;\\n    animation-name: fadeInLeft;\\n  }\\n}\\n\\n.fade-left-2 {\\n\\n  animation-duration: .3s;\\n  animation-fill-mode: both;\\n  animation-name: fadeIn;\\n\\n  @include bp(lap) {\\n    animation-delay: 0.3s;\\n    animation-duration: 1s;\\n    animation-fill-mode: both;\\n    animation-name: fadeInLeft;\\n  }\\n\\n  \\n}\\n\\n.fade-left-3 {\\n\\n  animation-duration: .3s;\\n  animation-fill-mode: both;\\n  animation-name: fadeIn;\\n\\n  @include bp(lap) {\\n    animation-delay: 0.6s;\\n    animation-duration: 1s;\\n    animation-fill-mode: both;\\n    animation-name: fadeInLeft;\\n  }\\n\\n}\\n\\n.fade-right {\\n  animation-duration: 1s;\\n  animation-fill-mode: both;\\n  animation-name: fadeInRight;\\n}\\n\\n.fade-in-slow {\\n  animation-duration: 2s;\\n  animation-fill-mode: both;\\n  animation-name: fadeIn;\\n}\\n\\n@keyframes bounce {\\n  0%,\\n  20%,\\n  50%,\\n  80%,\\n  100% {\\n    transform: translateY(0);\\n  }\\n  40% {\\n    transform: translateY(15px);\\n  }\\n  60% {\\n    transform: translateY(5px);\\n  }\\n}\\n\\n.bounce3 {\\n  animation-name: bounce3;\\n  animation-timing-function: ease;\\n}\\n@keyframes bounce3 {\\n  0% {\\n    transform: translateY(0);\\n  }\\n  30% {\\n    transform: translateY(-20px);\\n  }\\n  50% {\\n    transform: translateY(0);\\n  }\\n  100% {\\n    transform: translateY(0);\\n  }\\n}\\n\\n@keyframes fadeInUp {\\n  from {\\n    opacity: 0;\\n    transform: translate3d(0, 10px, 0);\\n  }\\n\\n  to {\\n    opacity: 1;\\n    transform: none;\\n  }\\n}\\n\\n@keyframes fadeInLeft {\\n  from {\\n    opacity: 0;\\n    transform: translate3d(-30px, 0, 0);\\n  }\\n\\n  to {\\n    opacity: 1;\\n    transform: none;\\n  }\\n}\\n\\n@keyframes fadeInLeftFull {\\n  from {\\n    opacity: 0;\\n    transform: translate3d(-100%, 0, 0);\\n  }\\n\\n  to {\\n    opacity: 1;\\n    transform: none;\\n  }\\n}\\n\\n@keyframes fadeInRight {\\n  from {\\n    opacity: 0;\\n    transform: translate3d(30px, 0, 0);\\n  }\\n\\n  to {\\n    opacity: 1;\\n    transform: none;\\n  }\\n}\\n\\n@keyframes fadeIn {\\n  from {\\n    opacity: 0;\\n  }\\n\\n  to {\\n    opacity: 1;\\n  }\\n}\\n\\n@keyframes wobbleVert {\\n  0% {\\n    transform: translateY(0);\\n  }\\n\\n  30% {\\n    transform: translateY(-5px);\\n  }\\n  50% {\\n    transform: translateY(0px);\\n  }\\n  70% {\\n    transform: translateY(5px);\\n  }\\n  100% {\\n    transform: translateY(0);\\n  }\\n}\\n\\n@keyframes wobbleHoriz{\\n  0% {\\n    transform: translateX(0);\\n  }\\n\\n  30% {\\n    transform: translateX(-5px);\\n  }\\n  50% {\\n    transform: translateX(0px);\\n  }\\n  70% {\\n    transform: translateX(5px);\\n  }\\n  100% {\\n    transform: translateX(0);\\n  }\\n}\\n\\n@keyframes pulse-white {\\n  0% {\\n    transform: scale(0);\\n    opacity: 0;\\n  }\\n\\n  70% {\\n    transform: scale(1);\\n  }\\n\\n  85% {\\n    transform: scale(0.95);\\n  }\\n\\n  100% {\\n    transform: scale(1);\\n    opacity: 1;\\n  }\\n}\\n\\n.pulse-in {\\n  // animation-duration: 2s;\\n  // animation-fill-mode: both;\\n  // animation-name: fadeIn;\\n\\n  animation-duration: 2s;\\n  animation-name: pulse-white;\\n  animation-fill-mode: both;\\n\\n  // &--1 {\\n  // \\tanimation-delay: 1s;\\n  // }\\n\\n  // &--2 {\\n  // \\tanimation-delay: 1.5s;\\n  // }\\n\\n  // &--3 {\\n  // \\tanimation-delay: 2s;\\n  // }\\n}\\n\\n//\\n// This was the pulsing arrow, replaced by bounding one\\n//\\n\\n// .arrow-down {\\n//   display: block;\\n//   margin: 0 auto;\\n//   width: 12px;\\n//   height: 40px;\\n// }\\n// .arrow-down:after {\\n//   content: '';\\n//   display: block;\\n//   margin: 0;\\n//   padding: 0;\\n//   width: 16.5px;\\n//   height: 16.5px;\\n//   border-top: 3px solid $white;\\n//   border-right: 3px solid $white;\\n//   transform: rotate(135deg);\\n// }\\n\\n// .scroll-down::before {\\n//   animation: elasticus 1.2s cubic-bezier(1, 0, 0, 1) infinite;\\n\\n//   position: absolute;\\n//   top: 0px;\\n//   left: 50%;\\n//   margin-left: 1px;\\n//   width: 2px;\\n//   height: 53px;\\n//   background: $white;\\n//   content: ' ';\\n// }\\n\\n// @keyframes elasticus {\\n//   0% {\\n//     transform-origin: 0% 0%;\\n//     transform: scale(1, 0);\\n//   }\\n//   50% {\\n//     transform-origin: 0% 0%;\\n//     transform: scale(1, 1);\\n//   }\\n//   50.1% {\\n//     transform-origin: 0% 100%;\\n//     transform: scale(1, 1);\\n//   }\\n\\n//   95% {\\n//     opacity: 0.9;\\n//     transform-origin: 0% 100%;\\n//     transform: scale(0.5, 0);\\n//   }\\n\\n//   97% {\\n//     opacity: 0.7;\\n//     transform-origin: 0% 100%;\\n//     transform: scale(0.7, 0);\\n//   }\\n\\n//   98% {\\n//     opacity: 0.5;\\n//     transform-origin: 0% 100%;\\n//     transform: scale(0.9, 0);\\n//   }\\n\\n//   100% {\\n//     opacity: 0.2;\\n//     transform-origin: 0% 100%;\\n//     transform: scale(1, 0);\\n//   }\\n// }\\n\\n// @keyframes animate_right {\\n//   0% {\\n//     opacity: 1;\\n//     left: 0;\\n//     width: 100%;\\n//   }\\n\\n//   50% {\\n//     opacity: 1;\\n//   }\\n\\n//   70% {\\n//     opacity: 0;\\n//     left: 95%;\\n//     width: 5%;\\n//   }\\n\\n//   100% {\\n//     opacity: 1;\\n//     left: 0%;\\n//     width: 100%;\\n//   }\\n// }\\n\\n@keyframes bounce_right {\\n  0%,\\n  20%,\\n  50%,\\n  80%,\\n  100% {\\n    transform: translateX(0);\\n  }\\n  40% {\\n    transform: translateX(15px);\\n  }\\n  60% {\\n    transform: translateX(5px);\\n  }\\n}\\n\",\"$c_cookie_bg: getcolor('white');\\n\\n$c_cookie_accept_button_bg: getcolor('black');\\n$c_cookie_accept_button_text: getcolor('white');\\n\\n$c_cookie_deny_button_bg: getcolor('black');\\n$c_cookie_deny_button_text: getcolor('white');\\n\\n.cookie-accept {\\n  position: fixed;\\n  bottom: 0;\\n  left: 0;\\n  right: 0;\\n  padding: 10px;\\n  background-color: hsla(320, 20%, 30%, 0.4);\\n  //background-color: $mid_purple;\\n\\n  opacity: 0;\\n  transition: max-height 0.3s linear, opacity 0.3s linear;\\n  z-index: 10002;\\n  pointer-events: none;\\n\\n  &--show {\\n    max-height: 400px;\\n    opacity: 1;\\n    pointer-events: auto;\\n    display: block !important;\\n  }\\n\\n  &__wrapper {\\n    //background-color: color('red');\\n  }\\n\\n  &__container {\\n    background-color: $c_cookie_bg;\\n    padding: 10px;\\n    display: block;\\n\\n    @include bp(lap) {\\n      //max-width: 1480px;\\n      margin: 0 auto;\\n      padding: 20px;\\n\\n      display: flex;\\n      justify-content: space-between;\\n      align-items: center;\\n    }\\n  }\\n  &__content {\\n    font-size: 12px;\\n    font-family: $font-family;\\n    font-weight: 200;\\n\\n    padding-right: 0px;\\n    line-height: 1.4em;\\n\\n    @include bp(lap) {\\n      font-size: 14px;\\n      padding-right: 15px;\\n    }\\n  }\\n\\n  &__controls {\\n    display: flex;\\n    flex-wrap: wrap;\\n    justify-content: center;\\n    align-items: center;\\n    margin: 0 0px;\\n\\n    a {\\n      text-decoration: underline;\\n    }\\n\\n    margin-top: 10px;\\n\\n    @include bp(lap) {\\n      margin-top: 0;\\n    }\\n  }\\n\\n  &__allow,\\n  &__deny {\\n    //    display: inline-block;\\n    //    background-color: $brand_orange;\\n    //    color: getcolor('white');\\n    //    border: 0;\\n    //    border-radius: 0;\\n\\n    //    line-height: 2em;\\n    //    letter-spacing: .1em;\\n    //    text-transform: uppercase;\\n\\n    //    width: 130px;\\n    //    box-sizing: border-box;\\n    //    border: 1px solid #aaa;\\n    //    cursor: pointer;\\n\\n    //    font-size: 10px;\\n    //    padding: 5px 5px;\\n\\n    // @include bp(lap) {\\n    // \\tmargin-left: 25px;\\n    // \\tmin-width: 180px;\\n    // \\tmargin-bottom: 0;\\n    // \\tfont-size: 11px;\\n    // \\tpadding: 5px 20px;\\n    // \\tletter-spacing: .2em;\\n    //    }\\n\\n    text-align: center;\\n    background-color: $c_cookie_accept_button_bg;\\n    border: solid 2px $c_cookie_accept_button_bg;\\n    border-radius: 5px;\\n    text-transform: uppercase;\\n    color: getcolor('white');\\n\\n    line-height: 1em;\\n\\n    padding: 5px 15px;\\n\\n    @include bp(lap) {\\n      padding: 10px 20px;\\n    }\\n\\n    white-space: nowrap;\\n\\n    text-decoration: none;\\n    font-size: 14px;\\n    font-weight: 600;\\n    letter-spacing: 0.08em;\\n\\n    user-select: none;\\n    transition: all 0.1s ease-in-out;\\n\\n    &:hover {\\n      background-color: getcolor('white');\\n      border: solid 2px getcolor('black');\\n      color: getcolor('black');\\n      transition: all 0.2s ease-in-out;\\n    }\\n  }\\n\\n  &__deny {\\n    background-color: $c_cookie_deny_button_bg;\\n    color: $c_cookie_deny_button_text;\\n\\n    margin-right: 10px;\\n\\n    @include bp(lap) {\\n      margin: 0 15px 10px;\\n    }\\n  }\\n\\n  &__content p {\\n    margin-bottom: 0;\\n    color: #525758;\\n\\n    @include bp(lap) {\\n      margin-bottom: 20px;\\n    }\\n  }\\n}\\n\",\".page-header {\\n  width: 100%;\\n  z-index: 500;\\n  display: block;\\n  \\n  position: absolute;\\n  top: 40px;\\n\\n\\n  background-color: rgba(255,255,255,.5);\\n\\n\\twidth: 100%;\\n\\theight: 100px;\\n\\n\\toverflow: visible;\\n\\tz-index: 99999;\\n\\n\\t@include bp($mobile-menu-snap) {\\n\\t\\theight: 100px;\\n\\t}\\n\\n\\n  \\n\\n  &__main-menu {\\n\\n\\t\\t// Mobile Menu\\n\\t\\tbackground-color: getcolor('black');\\n\\n\\t\\tposition: fixed;\\n\\t\\ttop: 0px;\\n\\t\\tbottom: 0;\\n\\t\\tleft: 100%;\\n\\t\\twidth: 100%;\\n\\t\\tz-index: 9999;\\n\\t\\tpadding-top: 100px;\\n\\t\\toverflow: auto;\\n\\t\\ttransition: left .2s ease-out;\\n\\n\\t\\t@include bp($mobile-menu-snap) {\\n\\t\\t\\tbackground-color: transparent;\\n\\t\\t\\tdisplay: block;\\n\\t\\t\\t\\n\\t\\t\\tpadding-top: 10px;\\n\\t\\t\\tposition: static;\\n\\t\\t\\tmargin: 0 auto;\\n\\t\\t\\ttext-align: center;\\n\\t\\t\\toverflow: visible;\\n\\t\\t}\\n\\n\\t\\t&--open {\\n\\t\\t\\twidth: 100%;\\n\\t\\t\\tleft: 0px;\\n\\t\\t}\\n\\n\\n\\t\\t\\n\\n\\t}\\n\\n\\n\\t&__mobile-logo-container {\\n\\n\\t\\tz-index: 10000;\\n\\t\\tdisplay: block;\\n    margin: 0 auto;\\n    padding-top: 10px;\\n\\n\\t\\t@include bp($mobile-menu-snap) {\\n\\t\\t\\tdisplay: none;\\n\\t\\t}\\n\\n\\t}\\n\\t&__mobile-logo {\\n\\n\\t\\tpadding-top: 10px;\\n\\t\\tmargin: 0px auto 0px;\\n\\n\\t\\tbackground-image: url('../images/union-gardens-logo.svg');\\n\\t\\tbackground-size: contain;\\n\\t\\tbackground-repeat: no-repeat;\\n\\n\\t\\t// width: 260px;\\n\\t\\t// height: 112px;\\n\\t\\twidth: 357px;\\n\\t\\theight: 53px;\\n\\n\\t}\\n\\n\\t&__menu-button-container {\\n\\n\\t\\tz-index: 10000;\\n\\t\\tdisplay: block;\\n\\n\\t\\t@include bp($mobile-menu-snap) {\\n\\t\\t\\tdisplay: none;\\n\\t\\t}\\n\\n\\t}\\n\\n\\n\\t.hamburger-toggle {\\n\\n\\t\\tposition: absolute;\\n\\t\\t\\ttop: 15px;\\n\\t\\t\\tright: 15px;\\n\\t\\t\\twidth: 30px;\\n\\t\\t\\theight: 30px;\\n\\t\\t\\ttransition-duration: 0.5s;\\n\\t\\t\\tz-index: 999;\\n\\t\\t\\t\\n\\t\\t  \\n\\t\\t\\t&__left,\\n\\t\\t\\t&__right {\\n\\t\\t\\t\\ttransition-duration: 0.5s;\\n\\t\\t\\t\\tposition: absolute;\\n\\t\\t\\t\\theight: 4px;\\n\\t\\t\\t\\twidth: 15px;\\n\\t\\t\\t\\ttop: 15px;\\n\\t\\t\\t\\tbackground-color: getcolor('black');\\n\\n\\t\\t\\t\\t&:before,\\n\\t\\t\\t\\t&:after {\\n\\t\\t\\t\\t\\ttransition-duration: 0.5s;\\n\\t\\t\\t\\t\\tposition: absolute;\\n\\t\\t\\t\\t\\theight: 4px;\\n\\t\\t\\t\\t\\twidth: 15px;\\n\\t\\t\\t\\t\\tbackground-color: getcolor('black');\\n\\t\\t\\t\\t\\tcontent: \\\"\\\";\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t&:before {\\n\\t\\t\\t\\t\\ttop: -10px;\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t&:after {\\n\\t\\t\\t\\t\\ttop: 10px;\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\n\\t\\t\\t&__left {\\n\\t\\t\\t\\tleft: 0px; \\n\\t\\t\\t}\\n\\n\\t\\t\\t&__right {\\n\\t\\t\\t\\tleft: 15px;\\n\\t\\t\\t}\\n\\n\\t\\t\\t&:hover{\\n\\t\\t      cursor: pointer;\\n\\t\\t    } \\n\\n\\t\\t    @include bp($mobile-menu-snap) {\\n\\t\\t    \\tdisplay: none;\\n\\t\\t    }\\n\\n\\t}\\n\\n\\t.js-mobile-menu-open { \\n\\n\\t\\tcolor: getcolor('white');\\n\\t\\tz-index: 99999;\\n\\n\\n\\t\\t.hamburger-toggle__left,\\n\\t\\t.hamburger-toggle__right {\\n\\t\\t\\ttransition-duration: 0.5s;\\n\\t\\t\\tbackground: transparent !important;\\n\\n\\t\\t}\\n\\n\\t\\t.hamburger-toggle__left {\\n\\t\\t\\t\\n\\t\\t\\t&:before { background-color: getcolor('white'); transform: rotateZ(45deg) scaleX(1.4) translate(2px, 2px); }\\n\\t\\t\\t&:after { background-color: getcolor('white'); transform: rotateZ(-45deg) scaleX(1.4) translate(2px, -2px); }\\n\\t\\t}\\n\\n\\t\\t.hamburger-toggle__right {\\n\\t\\t\\t&:before { background-color: getcolor('white'); transform: rotateZ(-45deg) scaleX(1.4) translate(-2px, 2px); }\\n\\t\\t\\t&:after { background-color: getcolor('white'); transform: rotateZ(45deg) scaleX(1.4) translate(-2px, -2px); }\\n\\t\\t}\\n\\t}\\n}\\n\",\"\\n.main-menu {\\n\\t\\n\\tdisplay: flex;\\n\\tflex-direction: column;\\n\\talign-items: flex-end;\\n\\n\\n\\tpadding-top: 0px;\\n\\n\\t.mobile-only {\\n\\n\\t\\tdisplay: block;\\n\\t\\t@include bp($menu-snap) {\\n\\t\\t\\tdisplay: none;\\n\\t\\t}\\n\\t}\\n\\n\\t.site-header-logo--container {\\n\\n\\t\\tdisplay: none;\\n\\n\\t\\t@include bp($menu-snap) {\\n\\t\\t\\tdisplay: block;\\n      padding-top: 20px;\\n\\t\\t}\\n\\n\\t\\t.site-header-logo {\\n\\t\\n\\t\\t\\tmargin-left: 20px;\\n\\t\\t\\tmargin-right: 20px;\\n\\n\\t\\t  background-image: url('../images/union-gardens-logo.svg');\\n\\t\\t\\tbackground-size: contain;\\n\\t\\t\\tbackground-repeat: no-repeat;\\n\\n\\t\\t\\twidth: 150px;\\n\\t\\t\\theight: 60px;\\n\\n\\t\\t\\t@include bp(lap) {\\n\\t\\t\\t\\twidth: 357px;\\n\\t\\t\\t\\theight: 53px;\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t}\\n\\n\\t\\t}\\n\\t}\\n\\n\\t@include bp($menu-snap) {\\n\\t\\tflex-direction: row;\\n\\t\\tjustify-content: center;\\n    align-items: center;\\n\\t}\\n\\n\\t> .menu-item {\\n\\t\\tfont-family: $font-family;\\n\\t\\tfont-weight: 400;\\n\\t\\tcolor: getcolor('black');\\n\\t\\tfont-size: 20px;\\n\\t\\tletter-spacing: 0px;\\n\\t\\tline-height: 1em;\\n\\t\\ttext-align: center;\\n\\t\\tposition: relative;\\n\\n\\t\\t\\n\\n\\t\\t@include bp($menu-snap) {\\n\\t\\t\\ttext-align: left;\\n\\t\\t\\tcolor: getcolor('black');\\n\\t\\t\\tmargin: 0px 0 0px;\\n\\t\\t\\tfont-size: 16px;\\n\\t\\t//\\tbackground-color: red;\\n\\t\\t\\theight: 100px;\\n\\t\\t\\tline-height: 30px;\\n\\t\\t\\theight: auto;\\n\\n\\t\\t}\\n\\n\\t\\t\\n\\n\\t\\t> a {\\n\\t\\t\\tdisplay: block;\\n\\t\\t\\tcolor: getcolor('white');\\n\\t\\t\\tpadding: 15px 20px;\\n\\t\\t\\tposition: relative;\\n\\t\\t\\ttransition: color .3s linear;\\n\\t\\t\\ttext-decoration: none;\\n\\n\\n\\t\\t\\t@include bp($menu-snap) {\\n\\t\\t\\t\\tcolor: getcolor('black');\\n\\t\\t\\t\\tpadding: 10px 20px;\\n\\n\\t\\t\\t\\t//background-color: green;\\n\\n\\t\\t\\t\\t&.no-padding {\\n\\t\\t\\t\\t\\tpadding: 0px 0px 0px;\\n\\n\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t}\\n\\n\\t\\t\\t\\n\\t\\t}\\n\\n\\t\\t&:hover {\\n\\t\\t\\t> a {\\n\\t\\t\\t\\tcolor: getcolor('mid_grey');\\n\\n\\t\\t\\t\\t@include bp($menu-snap) {\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\tcolor: getcolor('black');\\n          \\t\\t\\ttransform: 1s solid ease-in-out;\\n\\n\\t\\t\\t\\t\\t&::after {\\n\\t\\n\\t\\t\\t\\t\\t\\tposition: absolute;\\n\\t\\t\\t\\t\\t    bottom: 10px;\\n\\t\\t\\t\\t\\t    width: auto;\\n\\t\\t\\t\\t\\t    height: 1px;\\n\\t\\t\\t\\t\\t    width: 100%;\\n\\t\\t\\t\\t\\t    left: 0;\\n\\t\\t\\t\\t\\t    right: 0;\\n\\t\\t\\t\\t\\t    z-index: 999999;\\n\\t\\t\\t\\t\\t\\tcontent: '';\\n\\t\\t\\t\\t\\t\\tbackground-color: getcolor('black');\\n\\n\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t&.no-padding {\\n\\n\\t\\t\\t\\t\\t\\t&::after {\\n\\t\\n\\t\\t\\t\\t\\t\\t\\tcontent: none;\\n\\n\\t\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t}\\n\\n\\n\\t\\t\\t}\\n\\n\\n\\n\\t\\t\\t// .sub-menu {\\n\\t\\t\\t// \\t@include bp($menu-snap) {\\n\\t\\t\\t// \\t\\tdisplay: block;\\n\\t\\t\\t// \\t\\t//border: solid 1px green;\\n\\n\\t\\t\\t// \\t\\t> .menu-item {\\n\\t\\t\\t// \\t\\t\\theight: auto;\\n\\t\\t\\t// \\t\\t\\tline-height: 1em;\\n\\t\\t\\t// \\t\\t}\\n\\n\\t\\t\\t// \\t}\\n\\t\\t\\t// }\\n\\t\\t}\\n\\n\\n\\n\\n\\t\\t// .sub-menu {\\n\\t\\t// \\tdisplay: none;\\n\\t\\t\\t\\n\\t\\t// \\t// Mobile\\n\\t\\t// \\tbackground-color: getcolor('dark');\\n\\t\\t// \\tcolor: getcolor('black');\\n\\t\\t// \\tmin-width: 10em;\\n\\n\\n\\t\\t// \\t@include bp($menu-snap) {\\n\\n\\t\\t// \\t\\tbackground-color: getcolor('mid_grey');\\n\\t\\t// \\t\\tcolor: white;\\n\\t\\t// \\t\\tposition: absolute;\\n\\t\\t// \\t\\ttop: calc(100%);\\n\\t\\t// \\t\\tleft: 0;\\n\\t\\t// \\t\\tz-index: 100;\\n\\t\\t// \\t\\ttransition: opacity .2s linear;\\n\\t\\t// \\t\\tleft: 50%;\\n\\t\\t// \\t\\ttransform: translateX(-50%);\\n\\n\\t\\t\\t\\t\\n\\n\\t\\t// \\t}\\n\\t\\n\\t\\t// \\t> .menu-item {\\n\\t\\t// \\t\\twhite-space: nowrap;\\n\\n\\t\\n\\t\\t// \\t\\t> a {\\n\\t\\t// \\t\\t\\tdisplay: block;\\n\\t\\t// \\t\\t\\tcolor: white;\\n\\t\\t// \\t\\t\\ttext-decoration: none;\\n\\t\\t// \\t\\t\\tpadding: 12px 20px;\\n\\t\\t\\t\\t\\t\\n\\t\\t\\n\\t\\t// \\t\\t\\t@include bp($menu-snap) {\\n\\t\\t// \\t\\t\\t\\tcolor: getcolor('dark');\\n\\t\\t// \\t\\t\\t}\\n\\n\\t\\t// \\t\\t\\t&:hover {\\n\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t\\n\\t\\t// \\t\\t\\t\\tcolor: getcolor('mid_grey');\\n\\t\\t// \\t\\t\\t\\t@include bp($menu-snap) {\\n\\t\\t// \\t\\t\\t\\t\\tcolor: getcolor('dark');\\n\\t\\t// \\t\\t\\t\\t}\\n\\t\\t// \\t\\t\\t}\\n\\t\\t// \\t\\t}\\n\\t\\t// \\t}\\n\\t\\t// }\\n\\t}\\n}\\n\",\"$max-mobile-width: 500px;\\n\\n.content {\\n  // Global Styles\\n\\n  h1 {\\n    font-weight: 600;\\n    color: getcolor('white');\\n    color: getcolor('brand_purple');\\n  }\\n  \\n  h2 {\\n    font-weight: 500;\\n    margin-bottom: 30px;\\n    line-height: normal;\\n    color: getcolor('brand_purple');\\n    text-align: center;\\n    @include bp(lap) {\\n      margin-bottom: 35px;\\n    }\\n  }\\n\\n  h3 {\\n    font-weight: 700;\\n    line-height: 39px;\\n    margin-bottom: 40px;\\n    text-align: left;\\n    color: getcolor('brand_purple');\\n\\n    @include bp(lap) {\\n      font-weight: 700;\\n      margin-bottom: 40px;\\n    }\\n  }\\n\\n  p.introduction {\\n    line-height: 1.4;\\n    font-size: 18px;\\n    text-align: center;\\n    max-width: 900px;\\n    margin: 0 auto 20px;\\n\\n    @include bp(lap) {\\n      font-size: 22px;\\n    }\\n  }\\n\\n  div.introduction {  \\n    text-align: center;\\n    max-width: $content-wide-max-width;\\n    margin: 0 auto 20px;\\n  }\\n\\n  \\n  //\\n  // Home Hero \\n  //\\n  \\n  &__hero {\\n    \\n    background-position: center;\\n    background-repeat: no-repeat;\\n    padding-bottom: 56%;\\n    background-size: cover;\\n    \\n\\n  }\\n\\n\\n\\n  &__introduction {\\n    background-color: getcolor('panel_grey');\\n\\n    h1 {\\n      text-align: center;\\n    }\\n\\n    .content-container {\\n      max-width: 880px;\\n      margin: 0 auto;\\n    }\\n\\n    .layout-image {\\n      width: 30%;\\n      margin: 0 auto;      \\n    }\\n\\n  }\\n\\n\\n  &__gallery {\\n    background-color: getcolor('white');\\n\\n    &--floorplans {\\n      background-color: getcolor('panel_green');\\n    }\\n\\n    .gallery-slider-container {\\n\\n\\n      position: relative;\\n      z-index: 2;\\n      margin-top: 100px;\\n      overflow: visible;\\n      \\n      width: 100%;\\n      margin: 0 auto;\\n\\n      @include bp(lap) {\\t\\n        width: 60%;\\n        margin: 0 auto;\\n  \\n      }\\n\\n      .swiper {\\n        width: 100%;\\n        height: 100%;\\n      }\\n  \\n      .swiper-slide {\\n        text-align: center;\\n        font-size: 18px;\\n        background: #fff;\\n        display: flex;\\n        justify-content: center;\\n        align-items: center;\\n      }\\n  \\n      .swiper-slide img {\\n        display: block;\\n        width: 100%;\\n        height: 100%;\\n        object-fit: cover;\\n      }\\n      \\n\\n      .swiper {\\n        width: 100%;\\n        height: 300px;\\n        margin-left: auto;\\n        margin-right: auto;\\n      }\\n  \\n      .swiper-slide {\\n        background-size: cover;\\n        background-position: center;\\n      }\\n  \\n      .gallery-slider, .fp-gallery-slider { \\n        height: 80%;\\n        width: 100%;\\n      }\\n  \\n      .thumbs-slider, .fp-thumbs-slider {\\n        height: 20%;\\n        box-sizing: border-box;\\n        padding: 10px 0;\\n\\n        .swiper-slide {\\n          width: 25%;\\n          height: 100%;\\n          opacity: 0.4;\\n        }\\n\\n        .swiper-slide-thumb-active {\\n          opacity: 1;\\n          \\n        }\\n\\n      }\\n  \\n    \\n      .swiper-slide img {\\n        display: block;\\n        width: 100%;\\n        height: 100%;\\n        object-fit: cover;\\n      }\\n\\n\\n    }\\n  }\\n  \\n\\n\\n\\n  //\\n  // Internal Hero\\n  //\\n\\n  &__internal-hero {\\n\\n    .container {\\n      overflow: visible;\\n    }\\n    \\n    height: 270px;\\n\\n    @include bp(lap) {\\t\\t\\n      height: 370px;\\n    }\\n\\n    &--small {\\n      height: 170px;\\n      @include bp(lap) {\\t\\t\\n        height: 270px;\\n      }\\n    }\\n\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n\\n    background-color: getcolor('brand_purple');\\n    .content-container {\\n\\n      overflow: visible;\\n\\n      h1 {    \\n        color: getcolor('white');\\n        font-weight: 600;\\n        margin-bottom: 0px;\\n        text-align: center;\\n        text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.50);\\n      }\\n    }\\n\\n  }\\n\\n  \\n  //\\n  // Content Panel\\n  //\\n\\n  &__content-panel {\\n\\n    position: relative;\\n\\n    &--light-purple {\\n      background-color: getcolor('brand_light_purple');\\n    }\\n\\n    &--light-gold {\\n      background-color: getcolor('brand_light_gold');\\n    }\\n\\n\\n    h2 {\\n      max-width: $content-wide-max-width;\\n      margin: 0 auto 20px;\\n    }\\n\\n    .content {\\n      max-width: $content-max-width;\\n      margin: 0 auto 40px;\\n\\n          \\n      text-align: center;\\n    }\\n    \\n  }\\n\\n\\n  //\\n  // Background Image Content Panel\\n  //\\n\\n  &__background-image-content-panel {\\n\\n    background-position: center;\\n    background-repeat: none;\\n    background-size: cover;\\n\\n    background-attachment: fixed;\\n  \\n    .content-container {\\n      background-color: getcolor('white');\\n      width: 50%;\\n      padding: 50px;\\n\\n      h2 {\\n        text-align: left;\\n      }\\n\\n    }\\n\\n  }\\n\\n  //\\n  // Image Content Panel\\n  //\\n\\n  &__image-content-panel {\\n\\n    &--light-purple {\\n      background-color: getcolor('brand_light_purple');\\n    }\\n\\n    &--light-gold {\\n      background-color: getcolor('brand_light_gold');\\n    }\\n\\n\\n    .content-container {\\n      display: flex;\\n      justify-content: space-between;\\n\\n      &__col {\\n\\n        order: 2;\\n\\n        &--left {\\n          order: 1;\\n        }\\n\\n        &--right {\\n          order: 3;\\n        }\\n\\n        flex: 0 0 50%;\\n\\n        .image {\\n          width: 100%;\\n          height: 100%;\\n          min-height: 490px;\\n          background-size: cover;\\n          background-position: center;\\n          background-repeat: no-repeat;\\n\\n        }\\n        .content-panel {\\n          padding: 60px 50px 50px;\\n          h2 {\\n            text-align: left;\\n          }\\n\\n          h3 {\\n            text-align: left;\\n            margin-bottom: 15px;\\n          }\\n\\n          .button {\\n            margin-top: 40px;\\n          }\\n        }\\n        \\n      }\\n      \\n\\n    }\\n\\n\\n  }\\n\\n  // \\n  // Team Panel\\n  //\\n\\n  &__team-panel {\\n\\n    background-color: getcolor('brand_light_gold');\\n\\n    .tp-introduction {\\n      max-width: 500px;\\n\\n      @include bp(lap) {\\t\\t\\n        max-width: 780px;\\n      }\\n      margin: 0 auto 60px;\\n      text-align: center;\\n    }\\n\\n    .team-container {\\n\\n      @include bp(lap) {\\t\\t\\n        display: flex;\\n        justify-content: space-between;\\n        margin: 0;\\n        margin-top: 40px;\\n      }\\n\\n      &__col {\\n\\n        max-width: 500px;\\n        margin: 0 auto 40px;\\n        \\n        @include bp(lap) {\\t\\t\\n          flex: 0 0 28%;\\n        }\\n\\n        img {\\n          display: block;\\n          max-width: 240px;\\n          margin: 0 auto;\\n          border-radius: 50%;\\n          border: solid 3px getcolor('brand_purple');\\n          margin-bottom: 20px;\\n        }\\n\\n        h3 {\\n          margin-bottom: 10px;\\n        }\\n      }\\n    }\\n  }\\n\\n  //\\n  // image-slider-content-panel\\n  //\\n\\n  &__image-slider-content-panel {\\n\\n    background-color: getcolor('white');\\n\\n    .content-container {\\n\\n      @include bp(lap) {\\t\\n        display: flex;\\n        justify-content: space-between;\\n      }\\n\\n      &__col1 {\\n\\n        @include bp(lap) {\\t\\n          flex: 0 0 50%;\\n        }\\n\\n        position: relative;\\n\\n        .background-image,\\n        .background-images {\\n\\n          position: absolute;\\n          top: 0;\\n          bottom: 0;\\n          left: 0;\\n          right: 0;\\n          z-index: 0;\\n      \\n          img {\\n            display: block;\\n            width: 100%;\\n            height: 100%;\\n            object-fit: cover;\\n            object-position: center;\\n          }\\n        }\\n\\n        .background-images {\\n\\n          &__image {\\n            position: absolute;\\n            top: 0;\\n            bottom: 0;\\n            left: 0;\\n            right: 0;\\n      \\n            &:nth-child(1) {\\n              animation-name: fader;\\n              animation-delay: 3s;\\n              animation-duration: 1s;\\n              z-index: 20;\\n            }\\n      \\n            &:nth-child(2) {\\n              z-index: 10;\\n            }\\n      \\n            &:nth-child(n+3) {\\n              display: none;\\n            }\\n          }\\n\\n        }\\n      }\\n\\n      &__col2 {\\n\\n        padding: 50px 20px;\\n        @include bp(lap) {\\t\\n          padding: 50px;\\n        }\\n\\n        h2 {\\n          text-align: left;\\n        }\\n\\n        @include bp(lap) {\\t\\n          flex: 0 0 50%;\\n        }\\n      }\\n\\n\\n    }\\n\\n  }\\n\\n\\n\\n  //\\n  // Portfolio-promo-panel\\n  //\\n\\n  &__portfolio-promo-panel {\\n\\n    background-color: getcolor('brand_light_gold');\\n\\n    &--white {\\n      background-color: getcolor('white');\\n    }\\n\\n    &--light-purple {\\n      background-color: getcolor('brand_light_purple');\\n    }\\n\\n    &--light-gold {\\n      background-color: getcolor('brand_light_gold');\\n    }\\n    \\n\\n    .property-container {\\n      \\n      @include bp(lap) {\\n        display: flex;\\n        justify-content: space-between;\\n        flex-wrap: wrap;\\n      }\\n\\n      &__col {\\n\\n        max-width: 600px;\\n        margin: 0 auto 40px;\\n        height: 100%;\\n\\n        @include bp(lap) {\\n          flex: 0 0 calc(33% - 10px);\\n          margin-right: 19px;\\n          \\n          \\n\\n          &:nth-child(3n)\\n          {\\n            margin-right: 0px;\\n          }\\n          \\n        }\\n\\n        .property-container {\\n\\n          height: 100%;\\n\\n          .property-block {\\n\\n            display: block;\\n            width: 100%;\\n            position: relative;\\n            padding-bottom: 56%;\\n            margin-bottom: 20px;\\n          \\n\\n            &__main-image {\\n              \\n              position: absolute;\\n              top: 0;\\n              left:0;\\n              right: 0;\\n              bottom: 0;\\n              width: 100%;\\n              height: 100%;\\n              background-position: center;\\n              background-repeat: none;\\n              background-size: cover;\\n              padding-bottom: 56%;\\n              opacity: 1;\\n            \\n              \\n            }  \\n            \\n            &__hover-image {\\n              \\n              position: absolute;\\n              top: 0;\\n              left:0;\\n              right: 0;\\n              bottom: 0;\\n              width: 100%;\\n              height: 100%;\\n              background-position: center;\\n              background-repeat: none;\\n              background-size: cover;\\n              padding-bottom: 56%;\\n              opacity: 0;\\n\\n              transition: all .4s ease-in-out;\\n            \\n              \\n            }  \\n\\n\\n           \\n    \\n    \\n          }\\n\\n          &:hover {\\n\\n            .property-block__hover-image {\\n        \\n                transition: all .4s ease-in-out;\\n                opacity: 1;\\n            }\\n          }\\n\\n          h3 {\\n            margin-bottom: 10px;\\n          }\\n  \\n          .caption {\\n            margin-bottom: 0px;\\n          }\\n\\n\\n        }\\n\\n        .button {\\n          margin-top: 30px;\\n        }\\n\\n      }\\n\\n    }\\n  }\\n\\n\\n  //\\n  // Content Promo\\n  //\\n\\n  &__content-promo {\\n\\n    background-color: rgb(getcolorrgb('brand_purple') / 15%);\\n\\n    .content-promo-container {\\n      \\n      @include bp(lap) {\\n        display: flex;\\n        justify-content: space-between;\\n      }\\n\\n      &__col {\\n\\n        max-width: 600px;\\n        margin: 0 auto 40px;\\n\\n        @include bp(lap) {\\n          flex: 0 0 50%;\\n          padding: 20px 20px 20px;\\n          margin: 0;\\n          max-width: unset;\\n        }\\n\\n        .content-promo-block {\\n\\n          height: 100%;\\n\\n          position: relative;\\n          padding-bottom: 56%;\\n\\n          &__image {\\n            \\n            position: absolute;\\n            top: 0;\\n            left:0;\\n            right: 0;\\n            bottom: 0;\\n            width: 100%;\\n            height: 100%;\\n            background-position: center;\\n            background-repeat: none;\\n            background-size: cover;\\n            padding-bottom: 56%;\\n            \\n\\n            &:before {\\n              content: '';\\n              position: absolute;\\n              top: 0;\\n              left:0;\\n              right: 0;\\n              bottom: 0;\\n              width: 100%;\\n              height: 100%;\\n              background: linear-gradient(0deg, rgba(55, 21, 56, 0.60) 28.13%, rgba(55, 21, 56, 0.00) 100%);\\n              opacity: 1;\\n            }\\n\\n            &:after {\\n              content: '';\\n              position: absolute;\\n              top: 0;\\n              left:0;\\n              right: 0;\\n              bottom: 0;\\n              width: 100%;\\n              height: 100%;\\n              transition: all .4s ease-in-out;\\n              //background: linear-gradient(0deg, rgba(55, 21, 56, 0.75) 28.13%, rgba(55, 21, 56, 0.50) 100%);\\n              background: linear-gradient(180deg, rgba(55, 21, 56, 0.60) 28.13%, rgba(55, 21, 56, 0.00) 100%);\\n              opacity: 0;\\n            }\\n            \\n          }   \\n\\n\\n          &:hover {\\n\\n            .content-promo-block__image {     \\n\\n              &::after {\\n                transition: all .4s ease-in-out;\\n                opacity: 1;\\n              } \\n            }\\n          }\\n    \\n    \\n          &__content {\\n\\n            position: absolute;\\n            top: 0;\\n            left:0;\\n            right: 0;\\n            bottom: 0;\\n            width: 100%;\\n            height: 100%;\\n            \\n            display: flex;\\n            flex-direction: column;\\n            justify-content: center;\\n\\n            p.meta-heading {\\n              text-align: center;\\n              font-weight: bold;\\n              color: getcolor('white');\\n              \\n              font-size: 20px;         \\n              margin-bottom: 2px;     \\n              @include bp(lap) {\\n                font-size: 30px;              \\n              }\\n\\n            }\\n            \\n            h3 {\\n              text-align: center;\\n              font-weight: bold;\\n              color: getcolor('white');\\n\\n              font-size: 35px;    \\n              margin-bottom: 20px;          \\n\\n              @include bp(lap) {\\n                font-size: 50px;              \\n              }\\n            }\\n\\n            .button-container {\\n              text-align: center;\\n              margin: 0 auto;\\n              \\n              margin-top: 2%;\\n\\n              @include bp(lap) {\\n                margin-top: 4%;\\n              }\\n\\n              @include bp(1200px) {\\n                margin-top: 10%;\\n              }\\n\\n            }\\n\\n          }\\n  \\n        }\\n\\n      }\\n\\n    }\\n  }\\n  \\n\\n  //\\n  // Form Panel\\n  //\\n\\n  &__form-panel {\\n\\n    padding-bottom: 0px !important;\\n\\n    .heading {\\n      font-size: 25px;\\n      max-width: 830px;\\n      margin: 0 auto 20px;\\n    }\\n     \\n    .sub-heading {\\n      font-size: 22px;\\n      font-weight: 600;\\n      max-width: 830px;\\n      margin: 0 auto 40px;\\n      text-align: center;\\n    }\\n\\n  }\\n\\n  \\n\\n  //\\n  // Quotes Panel\\n  //\\n\\n  &__quotes {\\n\\n    background-color: getcolor('brand_purple');\\n \\n    position: relative;\\n\\n    .quote-marks-open {\\n\\n      position: absolute;\\n      display: block;\\n      \\n      \\n      background-image: url('../images/quote-open.svg');\\n      background-size: contain;\\n      background-repeat: no-repeat;\\n\\n      position: relative;\\n      width: 90px;\\n      height: 64px;\\n      margin: 0 auto;\\n\\n      @include bp(lap) {\\n\\n        position: absolute;\\n        top: 10%;\\n        left: 10%;\\n\\n        \\n        width: 116px;\\n        height: 82px;\\n      }\\n    }\\n\\n    .quote-marks-close {\\n\\n      position: absolute;\\n      display: block;\\n      \\n      \\n\\n      background-image: url('../images/quote-close.svg');\\n      background-size: contain;\\n      background-repeat: no-repeat;\\n\\n      position: relative;\\n      width: 90px;\\n      height: 64px;\\n      margin: 0 auto;\\n\\n      @include bp(lap) {\\n\\n        position: absolute;\\n        bottom: 10%;\\n        right: 10%;\\n\\n        width: 116px;\\n        height: 82px;\\n      }\\n\\n     \\n\\n    }\\n\\n\\n    position: relative;\\n\\n    .quotes-slider {\\n\\n      position: relative;\\n      z-index: 2;\\n      margin-top: 100px;\\n      background-color: getcolor('brand_purple');\\n      overflow: visible;\\n      \\n      // Spacing for navigation\\n      //margin-bottom: 60px;\\n\\n      width: 100%;\\n      margin: 0 auto;\\n\\n      @include bp(lap) {\\t\\n        width: 60%;\\n        margin: 0 auto;\\n  \\n      }\\n\\n      \\n\\n      &__slides-wrapper {\\n        margin-left: auto;\\n        margin-right: auto;\\n        position: relative;\\n        overflow: hidden;\\n        list-style: none;\\n        padding: 0;\\n        z-index: 1;\\n        display: block;\\n      }\\n\\n      &__slides {\\n        position: relative;\\n        width: 100%;\\n        height: 100%;\\n        z-index: 1;\\n        display: flex;\\n        transition-property: transform;\\n        transition-timing-function: var(\\n          --swiper-wrapper-transition-timing-function,\\n          initial\\n        );\\n        box-sizing: content-box;\\n      }\\n\\n      &__slide {\\n        flex-shrink: 0;\\n        display: block;\\n        width: 100%;\\n        height: 100%;\\n        position: relative;\\n        transition-property: transform;\\n        \\n\\n        .quote-slide-container {\\n\\n        \\n          padding: 20px;\\n        //  padding-bottom: 40px;\\n\\n              @include bp(lap) {\\n                padding: 50px;\\n                padding-bottom: 70px;\\n              }\\n\\n             \\n\\n              p.quote {\\n\\n                font-size: 16px;\\n                text-align: center;\\n\\n                @include bp(lap) {\\n                  text-align: left;\\n                  font-size: 20px;\\n                }\\n                font-weight: 400;\\n                margin-bottom: 24px;\\n              \\n                color: getcolor('white');\\n                \\n              }\\n\\n              p.quote-by {\\n                \\n                text-align: center;\\n                font-size: 16px;\\n\\n                @include bp(lap) {\\n                  text-align: right;\\n                  font-size: 20px;\\n                }\\n\\n                color: getcolor('white');\\n                display: block;\\n                font-weight: 700;            \\n              }\\n          \\n        }\\n\\n\\n      }\\n\\n\\n      &__pagination {\\n\\n\\n        display: flex;\\n        justify-content: center;\\n        align-items: center;\\n        gap: 1rem;\\n        position: absolute;\\n        \\n        left: 0;\\n        right: 0;\\n        z-index: 2;\\n        \\n        margin-bottom: 20px;\\n\\n        // .swiper-pagination-horizontal {\\n        //   bottom: 10px;\\n        //   left: 0;\\n        //   width: 100%;\\n        //   background-color: red;\\n        // }\\n      \\n\\n        &__bullet {\\n          display: flex;\\n          justify-content: center;\\n          align-items: center;\\n          width: 1.2rem;\\n          height: 1.2rem;\\n          background-color: getcolor('light_grey');\\n          border-radius: 50%;\\n          user-select: none;\\n          cursor: pointer;\\n\\n          \\n          &--active {\\n            // &::before {\\n              background-color: getcolor('black');\\n            // }\\n          }\\n\\n        \\n        }\\n\\n      }\\n    \\n    }\\n\\n    &--white {\\n      background-color: getcolor('white');\\n\\n      .quote-marks-open {\\n        background-image: url('../images/quote-open-dark.svg');\\n      }\\n\\n      .quote-marks-close {\\n        background-image: url('../images/quote-close-dark.svg');\\n      }\\n\\n      .quotes-slider {\\n        background-color: getcolor('white');\\n        &__slide {\\n          .quote-slide-container {\\n              p.quote {          \\n                color: getcolor('brand_purple');\\n              }\\n\\n              p.quote-by {                \\n                color: getcolor('brand_purple');\\n              }\\n          }\\n        }\\n      }\\n    }\\n\\n  }\\n\\n\\n  //\\n  // CTA Panel\\n  //\\n\\n  &__cta-panel {\\n\\n      background-color: getcolor('brand_purple');\\n\\n      h2 {\\n        color: getcolor('white');\\n      }\\n      .cta-introduction {\\n        max-width: 780px;\\n        margin: 0 auto;\\n        color: getcolor('white');\\n        text-align: center;\\n      }\\n  }\\n\\n\\n\\n\\n  //\\n  // Dynamic Content\\n  // \\n\\n  &__dynamic_content {\\n\\n    background-color: getcolor('white');\\n\\n   // Properties main heading\\n\\n    h1 {\\n      text-align: center;\\n      font-weight: 500;\\n      font-size: 24px;\\n      color: getcolor('brand_purple');\\n      margin-bottom: 40px;\\n      max-width: 800px;\\n      margin: 0 auto;\\n\\n      @include bp(lap) {\\t\\n        font-size: 30px;\\n      }\\n      \\n      span {\\n        font-weight: 700;\\n      }\\n    }\\n    \\n  }\\n\\n\\n\\n\\n  //\\n  // Simple Content Panel\\n  //\\n\\n  &__simple-content-panel {\\n\\n    .content {\\n\\n      max-width: $content-max-width;\\n      margin: 0 auto;\\n\\n      &--wide {\\n        max-width: $content-wide-max-width;\\n        margin: 0 auto;\\n      }\\n\\n      .back-to-archives {\\n\\n        font-size: 14px;\\n        font-weight: 500;\\n\\n        a {\\n          text-transform: uppercase;\\n          font-size: 14px;\\n          font-weight: 500;\\n\\n          &:hover {\\n            text-decoration: underline;\\n          }\\n        }\\n\\n        margin-bottom: 50px;\\n      }\\n\\n    }\\n  }\\n\\n\\n\\n\\t//\\n\\t// Detail Page\\n\\t//\\n\\n\\n\\t&__property-detail {\\n\\n    background-color: getcolor('white');\\n\\n    padding: 40px 10px 10px;\\n\\t\\n    @include bp(lap) {\\t\\t\\n      padding: 60px 0px 20px;\\n    }\\n  \\n    @include bp(desk) {\\n      padding: 70px 0px 30px;\\n    }\\n\\n\\t\\th1 {\\n\\t\\t\\tcolor: getcolor('brand_purple');\\n\\t\\t\\ttext-align: center;\\n\\n\\t\\t\\tfont-size: 24px;\\n      margin-bottom: 0px;\\n\\n\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\tfont-size: 30px;\\n\\t\\t\\t}\\n\\n\\t\\t\\tfont-weight: 500;\\n\\t\\t\\tspan {\\n\\t\\t\\t\\tfont-weight: 700;\\n\\t\\t\\t}\\n\\t\\t}\\n\\n\\t\\t.detail-description {\\n\\t\\t\\tcolor: getcolor('brand_purple');\\n\\t\\t\\tfont-weight: 500;\\n\\n\\t\\t\\tfont-size: 19px;\\n\\n\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\tfont-size: 20px;\\n\\t\\t\\t}\\n\\t\\t\\tline-height: 1.3;\\n\\t\\t\\ttext-align: center;\\n\\t\\t\\tmax-width: 800px;\\n\\t\\t\\tmargin: 0 auto;\\n\\n\\t\\t\\tp {\\n\\t\\t\\t\\tfont-weight: 500;\\n\\t\\t\\t\\t\\n\\t\\t\\t\\tfont-size: 16px;\\n\\t\\t\\t\\tmargin-bottom: 10px !important;\\n\\n\\t\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\t\\tfont-size: 18px;\\n\\t\\t\\t\\t\\tmargin-bottom: 5px !important;\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\tline-height: 1.3;\\n\\n\\t\\t\\t\\t\\n\\t\\t\\t}\\n\\t\\t}\\n\\t}\\n\\n\\t&__property-detail-nav {\\n\\n    background-color: getcolor('white');\\n\\n\\t\\tpadding-top: 0px !important;\\n\\t\\tpadding-bottom: 30px !important;\\n\\n\\t\\t.nav-container {\\n\\n\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\tdisplay: flex;\\n\\t\\t\\t\\tjustify-content: space-between;\\n\\t\\t\\t}\\n\\n\\t\\t\\t&__col1 {\\n\\n\\t\\t\\t\\ttext-align: center;\\n\\t\\t\\t\\tmargin-bottom: 10px;\\n\\t\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\t\\tflex: 0 0 50%;\\n\\t\\t\\t\\t\\ttext-align: left;\\n\\t\\t\\t\\t\\tmargin-bottom: 0px;\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\n\\n\\t\\t\\t\\ta {\\n\\n\\t\\t\\t\\t\\tfont-size: 16px;\\n\\t\\t\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\t\\t\\tfont-size: 18px;\\n\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t// &::before {\\n\\t\\t\\t\\t\\t// \\t@extend .fas;\\n\\t\\t\\t\\t\\t// \\tcontent: fa-content($fa-var-chevron-left);\\n\\t\\t\\t\\t\\t// \\tmargin-right: 5px;\\n\\n\\t\\t\\t\\t\\t// \\tfont-size: 14px;\\n\\t\\t\\t\\t\\t// \\t@include bp(lap) {\\t\\n\\t\\t\\t\\t\\t// \\t\\tfont-size: 16px;\\n\\t\\t\\t\\t\\t// \\t}\\n\\t\\t\\t\\t\\t// }\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\n\\t\\t\\t}\\n\\n\\t\\t\\t&__col2 {\\n\\n\\t\\t\\t\\ttext-align: center;\\n\\t\\t\\t\\t@include bp(lap) {\\n\\t\\t\\t\\t\\tflex: 0 0 50%;\\n\\t\\t\\t\\t\\ttext-align: right;\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\ta {\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\tfont-size: 16px;\\n\\t\\t\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\t\\t\\tfont-size: 18px;\\n\\t\\t\\t\\t\\t}\\n\\n\\n\\t\\t\\t\\t\\t&.prev {\\n\\t\\t\\t\\t\\t\\t// &::before {\\n\\t\\t\\t\\t\\t\\t// \\t@extend .fas;\\n\\t\\t\\t\\t\\t\\t// \\tcontent: fa-content($fa-var-chevron-left);\\n\\t\\t\\t\\t\\t\\t// \\tmargin-right: 5px;\\n\\t\\t\\t\\t\\t\\t// \\tfont-size: 14px;\\n\\t\\t\\t\\t\\t\\t// \\t@include bp(lap) {\\t\\n\\t\\t\\t\\t\\t\\t// \\t\\tfont-size: 16px;\\n\\t\\t\\t\\t\\t\\t// \\t}\\n\\t\\t\\t\\t\\t\\t// }\\n\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t&.next {\\n\\t\\t\\t\\t\\t\\t// &::after {\\n\\t\\t\\t\\t\\t\\t// \\t@extend .fas;\\n\\t\\t\\t\\t\\t\\t// \\tcontent: fa-content($fa-var-chevron-right);\\n\\t\\t\\t\\t\\t\\t// \\tmargin-left: 5px;\\n\\t\\t\\t\\t\\t\\t// \\tfont-size: 14px;\\n\\t\\t\\t\\t\\t\\t// \\t@include bp(lap) {\\t\\n\\t\\t\\t\\t\\t\\t// \\t\\tfont-size: 16px;\\n\\t\\t\\t\\t\\t\\t// \\t}\\n\\t\\t\\t\\t\\t\\t// }\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t.disabled {\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\tcolor: #ccc;\\n\\t\\t\\t\\t\\tfont-size: 16px;\\n\\t\\t\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\t\\t\\tfont-size: 18px;\\n\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t&--prev {\\n\\t\\t\\t\\t\\t\\t&::before {\\n              content:\\\"\\\";\\n              background-color: red;\\n\\t\\t\\t\\t\\t\\t\\t// @extend .fas;\\n\\t\\t\\t\\t\\t\\t\\t// content: fa-content($fa-var-chevron-left);\\n\\t\\t\\t\\t\\t\\t\\tmargin-right: 5px;\\n\\t\\t\\t\\t\\t\\t\\tfont-size: 14px;\\n\\t\\t\\t\\t\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\t\\t\\t\\t\\tfont-size: 16px;\\n\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t\\t&--next {\\n\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t\\t&::after {\\n\\t\\t\\t\\t\\t\\t\\t// @extend .fas;\\n\\t\\t\\t\\t\\t\\t\\t// content: fa-content($fa-var-chevron-right);\\n\\n              content:\\\"\\\";\\n              background-color: red;\\n\\n\\t\\t\\t\\t\\t\\t\\tmargin-left: 5px;\\n\\t\\t\\t\\t\\t\\t\\tfont-size: 14px;\\n\\t\\t\\t\\t\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\t\\t\\t\\t\\tfont-size: 16px;\\n\\t\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\n\\t\\t}\\n\\t}\\n\\n  &__property-detail-content {\\n\\n    background-color: getcolor('white');\\n\\n    padding-top: 0px !important;\\n\\n    .content-container {\\n      max-width: 1200px;\\n      margin: 0 auto;\\n\\n      @include bp(lap) {\\t\\n        display: flex;\\n        justify-content: space-between;\\n      }\\n\\n      &__col {\\n      \\n        @include bp(lap) {\\t\\n          flex: 0 0 48%;\\n        }\\n        //border: solid 1px red;\\n\\n        h3 {\\n          margin-bottom: 10px;\\n\\n          font-size: 22px;\\n          span {\\n            padding-left: 5px;\\n            font-weight: 400;\\n            font-size: 18px;\\n          }\\n\\n          p {\\n            margin-bottom: 20px;\\n          }\\n        }\\n      };\\n    }\\n  }\\n\\n\\t&__property-detail-images {\\n\\n\\t\\tpadding-top: 0px !important;\\n\\n\\t\\t.full-width {\\n\\t\\t\\tdisplay: block;\\n\\t\\t\\twidth: 100%;\\n\\t\\t\\tmargin-bottom: 10px;\\n\\t\\t}\\n\\n\\n\\t\\t.two-images {\\n\\n\\t\\t\\tdisplay: flex;\\n\\t\\t\\tjustify-content: space-between;\\n\\t\\t\\tmargin-bottom: 18px;\\t\\t\\t\\n\\n\\t\\t\\t&__col {\\n\\n\\t\\t\\t\\tflex: 0 0 49%;\\n\\t\\t\\t\\t\\n\\t\\t\\t\\tbackground-position: center;\\n\\t\\t\\t\\tbackground-size: cover;\\n\\t\\t\\t\\tbackground-repeat: no-repeat;\\n\\t\\t\\t\\tpadding-bottom: 49%;\\n\\n\\t\\t\\t\\t&.stack-mobile {\\n\\n\\t\\t\\t\\t\\tdisplay: block;\\n\\t\\t\\t\\t\\tmargin-bottom: 18px;\\n\\n\\t\\t\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\t\\t\\tflex: 0 0 49%;\\n\\t\\t\\t\\t\\t\\tmargin-bottom: 0px;\\n\\t\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t}\\n\\n\\n\\t\\t\\t}\\n\\n\\t\\t\\t&.stack-mobile {\\n\\n\\t\\t\\t\\tdisplay: block;\\n\\t\\t\\t\\t\\n\\n\\t\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\t\\tdisplay: flex;\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t}\\n\\n\\n\\t\\t}\\n\\n\\t\\t.three-images {\\n\\t\\t\\t\\n\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\tdisplay: flex;\\n\\t\\t\\t\\tjustify-content: space-between;\\n\\t\\t\\t\\tmargin-bottom: 20px;\\n\\t\\t\\t}\\n\\n\\t\\t\\t&__col1 {\\n\\n\\t\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\t\\tflex: 0 0 66.5%\\n\\t\\t\\t\\t}\\n\\n\\n\\t\\t\\t}\\n\\n\\t\\t\\t&__col2 {\\n\\t\\t\\t\\tflex: 0 0 32.5%;\\n\\n\\t\\t\\t\\tdisplay: flex;\\n\\t\\t\\t\\tjustify-content: space-between;\\n\\t\\t\\t\\tflex-direction: column;\\n\\n\\t\\t\\t\\t&__col {\\n\\t\\t\\t\\t\\tflex: 0 0 50%;\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t}\\n\\n\\t\\t}\\n\\n\\n\\t}\\n\\n\\n\\n\\t\\n\\n\\n\\n  //\\n  // 404 Panel\\n  //\\n\\n  &__404 {\\n    background-color: getcolor('white');\\n    text-align: center;\\n\\n    h4 {\\n      text-align: center;\\n    }\\n\\n    p {\\n      text-align: center;\\n    }\\n  }\\n\\n}\",\"$border-radius: 4px;\\n\\n$menu-height: 116px;\\n$menu-mobile-height: 74px;\\n\\n$mobile-menu-snap: 1240px;\\n\\n$content-max-width: 600px;\\n$content-wide-max-width: 730px;\\n\\n\",\".property-results {\\n\\t\\n\\n\\n\\t&__no-results\\n\\t{\\n\\t\\ttext-align: center;\\n    \\tmargin-top: 50px;\\n\\t}\\n\\n\\n\\t&__list {\\n\\n\\t\\tdisplay: block;\\n\\t\\twidth: 100%;\\n\\t\\toverflow: visible;\\n\\n\\t\\t@include bp('550px') {\\n\\t\\t\\tmargin: auto;\\n\\t\\t\\tdisplay: flex;\\n\\t\\t\\tjustify-content: flex-start;\\n\\t\\t\\tflex-wrap: wrap;\\n\\t\\t}\\n\\n\\t\\t@include bp(lap) {\\n\\t\\t\\tmargin: auto;\\n\\t\\t\\tdisplay: flex;\\n\\t\\t\\tjustify-content: flex-start;\\n\\t\\t\\tflex-wrap: wrap;\\n\\t\\t}\\n\\n\\n\\n\\t\\t&__article {\\n\\t\\t\\t\\n\\t\\t\\tmargin-bottom: 20px;\\n\\t\\t\\tbackground-color: getcolor('white');\\n\\n\\t\\t\\tposition: relative;\\n\\n\\t\\t\\t@include bp('550px') {\\t\\n\\t\\t\\t\\tflex: 0 0 calc(50% - 10px);\\n\\n\\t\\t\\t\\tmargin-right: 15px;\\n\\n\\t\\t\\t\\t&:nth-child(2n)\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\tmargin-right: 0px;\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t&:nth-child(3n)\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\tmargin-right: 15px;\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t&:last-of-type\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\tmargin-right: 0px;\\n\\t\\t\\t\\t}\\n\\t\\t\\t}\\n\\n\\n\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\tflex: 0 0 calc(33.3% - 10px);\\n\\n\\t\\t\\t\\tmargin-right: 15px;\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t&:nth-child(2n)\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\tmargin-right: 15px;\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t&:nth-child(3n)\\n\\t\\t\\t\\t{\\n\\t\\t\\t\\t\\tmargin-right: 0px;\\n\\t\\t\\t\\t}\\n\\n\\t\\t\\t\\t&:last-of-type\\n\\t\\t\\t\\t{\\n\\n\\t\\t\\t\\t\\tmargin-right: 0px;\\n\\t\\t\\t\\t}\\n\\t\\t\\t\\t\\n\\n\\n\\t\\t\\t}\\n\\n\\t\\t\\ttransition: all .5s ease-in-out;\\n\\t\\t\\n\\t\\t}\\n\\n\\t\\t\\n\\n\\t}\\n\\t\\n}\\n\\n\\n.property-container {\\n\\n\\tdisplay: block;\\n\\toverflow: hidden;\\n\\n\\t&:hover {\\n\\t\\t\\n\\t\\n\\t\\t&:after {\\n\\t\\t\\tcontent:\\\"\\\";\\n\\t\\t\\tposition: absolute;\\n\\t\\t\\ttop: 0;\\n\\t\\t\\tbottom: 0;\\n\\t\\t\\tleft: 0;\\n\\t\\t\\tright: 0;\\n\\t\\t\\twidth: 100%;\\n\\t\\t\\theight: 100%;\\n\\t\\t\\tbackground-color: rgba(255,255,255,.1);\\n\\t\\t\\ttransition: all .5s ease-in-out;\\n\\t\\t}\\n\\n\\n\\n\\t\\t.featured-image {\\n\\n\\t\\t\\ttransition: all .4s ease-in-out;\\n\\t\\t\\twidth: 105%;\\n\\t\\t\\theight: 105%;\\n\\t\\t\\t//border: solid 1px red;\\n\\t\\t\\tbackground-position: center;\\n\\t\\t\\tmargin: 0 auto;\\n\\t\\t\\tmargin-left: -2.5%;\\n\\t\\t}\\n\\n\\t\\t\\n\\n\\t\\t//opacity: .5;\\n\\t\\t//border:solid 1px red;\\n\\t\\n\\t}\\n\\t\\n\\t.featured-image {\\n\\n\\t\\ttransition: all .4s ease-in-out;\\n\\t\\tbackground-position: center;\\n\\t\\tbackground-repeat: no-repeat;\\n\\t\\tbackground-size: cover;\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\n\\t\\tpadding-bottom: 56%;\\n\\n\\t}\\n\\n\\t.description {\\n\\t\\tpadding: 10px 20px;\\n\\t\\tbackground-color: getcolor('brand_purple');\\n\\t\\ttext-align: center;\\n\\n\\t\\tmin-height: 120px;\\n\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\tflex-direction: column;\\n\\n\\t\\th2 {\\n\\t\\t\\tcolor: getcolor('brand_gold');;\\n\\n\\t\\t\\tfont-size: 24px;\\n\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\tfont-size: 30px;\\n\\t\\t\\t}\\n\\t\\t\\ttext-align: center;\\n\\t\\t\\tmargin-bottom: 0px;\\n\\t\\t}\\n\\n\\t\\tp {\\n\\t\\t\\ttext-align: center;\\n\\t\\t\\tcolor: getcolor('white');\\n\\n\\t\\t\\tfont-size: 16px;\\n\\t\\t\\t@include bp(lap) {\\t\\n\\t\\t\\t\\tfont-size: 18px;\\n\\t\\t\\t}\\n\\t\\t\\tmargin-bottom: 0px;\\n\\t\\t}\\n\\t}\\n\\n\\n\\n\\n}\\n\\n\\n\",\".no-results {\\n  text-align: center;\\n}\\n\\n@keyframes loading_spinner {\\n  0% {\\n    transform: rotate(0deg);\\n  }\\n  100% {\\n    transform: rotate(360deg);\\n  }\\n}\\n\\n.generic-controls {\\n  text-align: center;\\n  padding-top: 30px;\\n  padding-bottom: 20px;\\n\\n  &__loading-spinner {\\n    $spinner-size: 40px;\\n    width: $spinner-size;\\n    height: $spinner-size;\\n    margin: 0 auto 20px;\\n    position: relative;\\n\\n    &::after {\\n      // @extend .fas;\\n     content: '';\\n     background-image: url('../images/spinner.png');\\n     //background-color: red;\\n      background-position: center;\\n      background-size: contain;\\n      display: block;\\n      width: $spinner-size;\\n      height: $spinner-size;\\n      font-size: $spinner-size;\\n      line-height: $spinner-size;\\n      transform: rotate(0deg);\\n      animation: loading_spinner 0.8s linear infinite;\\n    }\\n  }\\n\\n  &__show-more-button {\\n    display: inline-block;\\n    text-align: center;\\n    background-color: transparent;\\n    border: solid 3px getcolor('brand_purple');\\n    border-radius: 5px;\\n    color: getcolor('brand_purple');\\n\\n    font-family: $heading-font-family;\\n    font-weight: bold;\\n\\n    line-height: 1.2;\\n    white-space: nowrap;\\n    z-index: 5;\\n    transition: all .3s ease-out;\\n\\n    font-size: 16px;\\n    padding: 10px 30px;\\n\\n    @include bp(lap) {\\n      padding: 10px 40px;\\n      font-size: 22px;\\n      line-height: 1em;\\n    }\\n\\n    &:hover {\\n      color: getcolor('white');\\n      background-color: getcolor('brand_purple');\\n      transition: all 0.4s ease-in-out;\\n    }\\n  }\\n}\\n\\n.generic-results {\\n  &__info {\\n    margin: 20px auto;\\n\\n    display: block;\\n    text-align: center;\\n    margin-bottom: 10px;\\n\\n    @include bp(500px) {\\n      margin: 20px 0px;\\n      display: flex;\\n      justify-content: space-between;\\n      flex-direction: row;\\n      margin-top: 30px;\\n      text-align: left;\\n      border: solid 1px red;\\n    }\\n\\n    &__count {\\n      flex: 0 0 100%;\\n      font-size: 16px;\\n      font-weight: 400;\\n\\n      span {\\n        font-weight: 700;\\n      }\\n    }\\n  }\\n\\n  &__no-results {\\n    text-align: center;\\n    margin-top: 50px;\\n  }\\n\\n  $large_gutter1: 20px;\\n  $large_gutter1: 40px;\\n\\n  $mid_snap1: 970px;\\n  $top_snap1: 1150px;\\n\\n  &__list {\\n    display: block;\\n    //border: solid 1px red;\\n\\n    @include bp($mid_snap1) {\\n      display: flex;\\n      justify-content: flex-start;\\n      flex-wrap: wrap;\\n    }\\n\\n    &__article {\\n      margin-bottom: $large_gutter1;\\n\\n      &--yellow {\\n        background-color: rgb(getcolorrgb('brand_yellow') / 15%);\\n        padding: 20px 10px;\\n      }\\n\\n      .post-date {\\n        font-size: 12px;\\n        text-transform: uppercase;\\n        margin-bottom: 5px;\\n        line-height: 1.3;\\n        font-weight: 600;\\n      }\\n\\n      h3.news {\\n        line-height: 1.3;\\n        margin-bottom: 0px;\\n      }\\n     // border: solid 1px yellow;\\n\\n      @include bp($mid_snap1) {\\n        flex: 0 0 calc(50% - 20px);\\n        margin-right: $large_gutter1;\\n\\n        &:nth-child(4n) {\\n          margin-right: $large_gutter1;\\n        }\\n\\n        &:nth-child(2n) {\\n          margin-right: 0px;\\n        }\\n      }\\n\\n      @include bp($top_snap1) {\\n        flex: 0 0 calc(33% - 24px);\\n        margin-right: $large_gutter1;\\n\\n        &:nth-child(2n) {\\n          margin-right: $large_gutter1;\\n        }\\n\\n        &:nth-child(3n) {\\n          margin-right: 0px;\\n        }\\n      }\\n\\n      &--two {\\n        @include bp($top_snap1) {\\n          flex: 0 0 calc(50% - 20px);\\n          margin-right: $large_gutter1;\\n\\n          &:nth-child(4n) {\\n            margin-right: $large_gutter1;\\n          }\\n\\n          &:nth-child(2n) {\\n            margin-right: 0px;\\n          }\\n        }\\n      }\\n    }\\n\\n    &__article--two-no-gutter {\\n      width: 100%;\\n      margin-right: 0px;\\n      margin-bottom: 60px;\\n\\n      // border: solid 1px yellow;\\n\\n      @include bp($mid_snap1) {\\n        flex: 0 0 50%;\\n        margin-right: 0px;\\n      }\\n      @include bp($top_snap1) {\\n        flex: 0 0 50%;\\n        margin-right: 0px;\\n      }\\n    }\\n  }\\n}\\n\",\".generic-dialog {\\n\\n  display: flex;\\n  justify-content: center;\\n  flex-direction: column;\\n\\n  @include bp(lap) {\\n    flex-direction: row;\\n  }\\n  \\n  max-width: 300px;\\n  margin: 20px auto 40px;\\n\\n  &__group {\\n    position: relative;\\n\\n    &__keywords {\\n\\n    \\tflex: 0 0 auto;\\n    \\tmargin-bottom: 15px;\\n\\n    \\t@include bp(lap) {\\n    \\t\\tflex: 0 0 auto;\\n        margin-right: 10px;\\n    \\t}\\n\\n    \\tmargin-bottom: 15px;\\n      \\n    }\\n\\n\\n    // Fields\\n\\n    &__label {\\n    \\tfont-weight: 400;\\n    \\tfont-size: 16px;\\n    \\theight: 100%;\\n    \\tposition: absolute;\\n    \\ttop: 0px;\\n    \\tleft: 0;\\n    \\tline-height: 50px;\\n    \\tpadding: 0 15px;\\n    \\ttransition: transform .3s;\\n    \\tuser-select: none;\\n    \\tpointer-events: none;\\n    \\tcolor: $c-body-text;\\n    }\\n\\n    &__input,\\n    &__select {\\n      color: $c-body-text;\\n      appearance: none;\\n      display: block;\\n      width: 100%;\\n      height: 50px;\\n      background-color: getcolor('white');\\n      border: solid 1px getcolor('brand_purple');\\n      border-radius: 10px;\\n      padding: 0 6px;\\n      padding-left: 15px;\\n      font-size: 18px;\\n\\n      &:focus {\\n        outline: 0;\\n        border-color: getcolor('white');\\n        border: solid 1px getcolor('brand_purple');\\n      }\\n    }\\n\\n    &__select__input {\\n      //border: solid 1px red !important;\\n      color: $c-body-text;\\n      appearance: none;\\n      display: block;\\n      width: 98%;\\n      height: 46px;\\n      margin-top: 2px;\\n      margin-right: 30px;\\n      background-color: transparent;\\n      //border: solid 1px #ccc;\\n      border: none;\\n      //padding: 0 6px;\\n      text-overflow: ellipsis;\\n      //padding-left: 15px;\\n\\n      &:focus {\\n        outline: 0;\\n      }\\n\\n      font-family: $font-family;\\n      font-weight: 600;\\n      font-size: 16px;\\n      cursor: pointer;\\n      position: relative;\\n      padding-right: 20px;\\n      text-align: center;\\n\\n      // IE11 remove select arrow.\\n      &::-ms-expand {\\n        display: none;\\n      }\\n\\n      // option {\\n      // }\\n    }\\n\\n    &__input {\\n      &--dirty,\\n      &:focus {\\n        + .generic-dialog__group__label {\\n          transform: translate3d(-20%, -70%, 0) scale3d(0.8, 0.8, 1)\\n            translateZ(1px);\\n        }\\n      }\\n    }\\n\\n    &__search-button {\\n\\n    \\twidth: 100%;\\n\\n    \\tline-height: 1em;\\n    \\tpadding: 14px 55px;\\n    \\twhite-space: nowrap;\\n    \\ttransition: all .1s ease-in-out;\\n\\n    \\tfont-family: $font-family;\\n    \\tfont-size: 18px;\\n    \\tcursor: pointer;\\n\\n    \\tposition: relative;\\n\\n    \\tbackground-color: getcolor('brand_purple');\\n    \\tborder: solid 2px getcolor('brand_purple');\\n    \\tcolor: white;\\n\\n    \\t&:hover {\\n    \\t\\tbackground-color: getcolor('white');\\n    \\t\\tborder: solid 2px getcolor('brand_purple');\\n    \\t\\tcolor: getcolor('brand_purple');\\n    \\t\\ttransition: all .2s ease-in-out;\\n    \\t}\\n\\n    \\t&:focus {\\n    \\t\\toutline: 0;\\n    \\t}\\n\\n    }\\n\\n    \\n  }\\n}\\n\",\"// Styles for all WYSIWYG content areas.\\n\\n.global-detail-container {\\n  &--narrow {\\n    max-width: $content-max-width;\\n  }\\n\\n  margin: 0 auto 0px;\\n\\n  //border: solid 1px red;\\n\\n  h1 {\\n    color: $c-body-text;\\n    text-align: left;\\n    font-weight: 400;\\n\\n    font-size: 30px;\\n\\n    @include bp(lap) {\\n      font-size: 45px;\\n      text-align: left;\\n    }\\n    margin-top: 30px;\\n    margin-bottom: 30px;\\n  }\\n\\n  h2 {\\n    color: $c-body-text;\\n    text-align: left;\\n\\n    font-size: 24px;\\n    line-height: 1.4;\\n\\n    @include bp(lap) {\\n      font-size: 30px;\\n      text-align: left;\\n    }\\n    margin-top: 30px;\\n    margin-bottom: 10px;\\n  }\\n\\n  h3 {\\n    color: $c-body-text;\\n    text-align: left;\\n\\n    font-size: 18px;\\n    margin-top: 30px;\\n    margin-bottom: 10px;\\n    line-height: 1.4;\\n\\n    @include bp(lap) {\\n      font-size: 20px;\\n      margin-bottom: 10px;\\n      text-align: left;\\n    }\\n  }\\n\\n  h4 {\\n    color: $c-body-text;\\n    text-align: left;\\n    font-size: 16px;\\n    margin-top: 30px;\\n    margin-bottom: 10px;\\n  }\\n\\n  a {\\n    &:hover {\\n      text-decoration: underline;\\n    }\\n  }\\n\\n  .thumbnail {\\n    height: 300px;\\n    width: 300px;\\n\\n    background-position: center;\\n    background-size: cover;\\n    background-repeat: no-repeat;\\n    border: 1px solid hsla(0, 0%, 67%, 0.2);\\n    margin-top: 40px;\\n    margin-bottom: 40px;\\n  }\\n\\n  p:last-of-type {\\n    margin-bottom: 0;\\n  }\\n\\n  span.highlight {\\n    color: getcolor('brand_grey');\\n    font-weight: 500;\\n    font-style: italic;\\n  }\\n\\n  &--margin-top {\\n    margin-top: 40px;\\n  }\\n\\n  img {\\n    display: block;\\n    margin: 20px auto 20px;\\n    max-width: 500px;\\n\\n    &.max-width {\\n      max-width: unset;\\n    }\\n  }\\n\\n  table {\\n    border-collapse: collapse;\\n\\n    th {\\n      font-weight: 400;\\n      text-align: left;\\n      border: solid 1px rgba(255, 255, 255, 0.2);\\n      padding: 5px;\\n      @include bp(lap) {\\n        padding: 10px;\\n      }\\n    }\\n\\n    td {\\n      text-align: left;\\n      font-weight: 300;\\n      padding: 5px;\\n      border: solid 1px rgba(255, 255, 255, 0.2);\\n\\n      padding: 5px;\\n      @include bp(lap) {\\n        padding: 10px;\\n      }\\n    }\\n  }\\n\\n  b,\\n  strong {\\n    font-weight: 700;\\n  }\\n\\n  ul {\\n    list-style: none;\\n    text-align: left;\\n    margin-bottom: 20px;\\n    margin-left: 20px;\\n    font-weight: 200;\\n\\n    &.columns2 {\\n      columns: 1;\\n      @include bp(lap) {\\n        columns: 2;\\n      }\\n    }\\n\\n    li {\\n      padding-left: 20px;\\n      margin-bottom: 5px;\\n      position: relative;\\n      font-weight: 200;\\n\\n      &:before {\\n        content: '';\\n        display: block;\\n        height: 5px;\\n        width: 5px;\\n        border-radius: 50%;\\n        background: getcolor('brand_purple');\\n        position: absolute;\\n        top: 12px;\\n        left: 0;\\n      }\\n\\n      ul {\\n        font-weight: 200;\\n\\n       \\n\\n        li {\\n          padding-left: 10px;\\n          font-weight: 200;\\n\\n          &:before {\\n            content: '-';\\n            display: block;\\n            height: 2px;\\n            width: 5px;\\n            background-color: inherit;\\n           // border-radius: none;\\n            background: getcolor('brand_purple');\\n            position: absolute;\\n            top: 0px;\\n            left: 0;\\n          }\\n        }\\n      }\\n    }\\n  }\\n\\n  ol {\\n    list-style: auto;\\n    text-align: left;\\n    margin-bottom: 20px;\\n    margin-left: 20px;\\n    font-weight: 200;\\n\\n    li {\\n      padding-left: 20px;\\n      margin-bottom: 15px;\\n      position: relative;\\n      font-weight: 200;\\n    }\\n  }\\n}\\n\",\".gravity-form-container {\\n  // max-width: 800px;\\n  // margin: 0 auto;\\n\\n  .gform_required_legend {\\n    display: none;\\n  }\\n\\n  p {\\n    text-align: left;\\n    margin-bottom: 0px;\\n  }\\n\\n  .privacy {\\n    font-size: 12px;\\n    line-height: 1.4;\\n  }\\n\\n  .gform_wrapper {\\n    .gform_body {\\n      text-align: left;\\n    }\\n\\n    .gfield_html {\\n\\n      font-family: $font-family !important;\\n      color: $c-body-text;\\n      text-align: center;\\n      font-size: 14px !important;\\n      line-height: 1.4;\\n      max-width: 630px;\\n      margin: 20px auto;\\n    }\\n\\n    .gfield_label {\\n      margin-bottom: 0px !important;\\n      font-size: 14px !important;\\n    }\\n\\n    input[type='text'],\\n    input[type='email'] {\\n      background-color: rgb(getcolorrgb('brand_purple') / 15%);\\n      border: none !important;\\n      border-radius: 0 !important;\\n      color: getcolor('black') !important;\\n      padding: 15px 10px !important;\\n      font-family: $font-family !important;\\n      min-height: 25px !important;\\n      line-height: 1 !important;\\n    }\\n\\n\\n    input::placeholder {\\n      color: getcolor('black');\\n    }\\n\\n\\n    .gfield--type-radio {\\n\\n\\n      .ginput_container {\\n        background-color: rgb(getcolorrgb('brand_purple') / 15%);\\n        .gfield_radio {\\n          padding: 5px 10px !important;\\n\\n          \\n        }\\n        .gchoice {\\n          display: inline-block;\\n          padding-right: 20px;\\n        }\\n      }\\n    }\\n\\n    input[type='radio']:before {\\n\\n      font-size: 14px;\\n      color: transparent !important;\\n      display: block;\\n      width: 20px;\\n      height: 20px;\\n      padding: 2px;\\n      border: solid 1px rgb(getcolorrgb('brand_purple') / 15%);\\n      margin-right: 7px;\\n      border-radius: 50%;\\n    }\\n\\n\\n\\n    textarea {\\n      background-color: rgb(getcolorrgb('brand_purple') / 15%);\\n      border: none !important;\\n      border: none !important;\\n      border-radius: 0 !important;\\n      color: $c-body-text !important;\\n      padding: 15px 10px !important;\\n      height: 150px !important;\\n      font-family: $font-family !important;\\n    }\\n\\n    .ginput_container_select {\\n      border: none !important;\\n      border-radius: 0 !important;\\n      color: $c-body-text !important;\\n      padding: 0px !important;\\n\\n      display: block !important;\\n      min-height: 52px !important;\\n      height: 52px !important;\\n      background-color: rgb(getcolorrgb('brand_purple') / 15%);\\n\\n      select {\\n        \\n        border: none !important;\\n        border-radius: 0 !important;\\n        color: getcolor('black') !important;\\n        padding: 15px 10px !important;\\n        font-family: $font-family !important;\\n        background-color: transparent !important;\\n      }\\n\\n    }\\n\\n   \\n\\n   \\n\\n    // .ginput_container_date {\\n    //   border: none !important;\\n    //   border-bottom: none !important;\\n\\n    //   > input {\\n    //     border: none !important;\\n    //   }\\n    // }\\n\\n    .gform_ajax_spinner {\\n      box-sizing: border-box;\\n      margin-top: 27px;\\n      margin-left: 160px;\\n      border: 3px solid rgb(getcolorrgb('brand_purple'));\\n      border-left: 3px solid rgb(getcolorrgb('brand_purple') / 0%);\\n      border-top: 3px solid rgb(getcolorrgb('brand_purple') / 15%);\\n      border-right: 3px solid rgb(getcolorrgb('brand_purple') / 50%);\\n      animation: spinner 1.1s infinite linear;\\n      border-radius: 50%;\\n      width: 20px;\\n      height: 20px;\\n      position: absolute;\\n      z-index: 1;\\n    }\\n    @keyframes spinner {\\n      0% {\\n        transform: rotate(0deg);\\n      }\\n      100% {\\n        transform: rotate(360deg);\\n      }\\n    }\\n\\n    .gform_button {\\n      display: block;\\n      text-align: center;\\n      background-color: transparent;\\n      border: solid 2px getcolor('brand_purple');\\n      color: getcolor('brand_purple');\\n\\n      width: 100%;\\n      font-family: $heading-font-family;\\n      font-size: 18px;\\n      font-weight: 400;\\n      text-transform: uppercase;\\n    \\n      line-height: 1.2;\\n      padding: 10px 30px;\\n      white-space: nowrap;\\n      z-index: 5;\\n      position: relative !important;\\n    \\n      margin: 0px auto 40px !important;\\n      transition: all .3s ease-out;\\n    \\n      \\n      @include bp(lap) {\\n        font-size: 18px;\\n        line-height: 1em;\\n        width: fit-content;\\n        margin: 0px auto 60px !important;\\n      }\\n    \\n      &:hover {\\n        background-color: getcolor('brand_purple');\\n        border: solid 2px getcolor('brand_purple');\\n        color: getcolor('white');\\n        transition: all 0.4s ease-in-out;\\n      }\\n    \\n      &:focus {\\n        outline: 0;\\n      }\\n    }\\n  }\\n\\n\\n  .margin-bottom {\\n    margin-bottom: 60px;\\n  }\\n\\n  .gform_wrapper.gravity-theme .gfield_label {\\n    margin-bottom: 2px !important;\\n\\n    \\n  }\\n\\n  .gform_wrapper.gravity-theme #field_submit {\\n    order: 1;\\n    align-self: flex-start !important;\\n  }\\n\\n  .gform_wrapper.gravity-theme .gfield.gfield--width-half {\\n    \\n    @include bp(640px) {\\n        grid-column: span 4 !important\\n    }\\n\\n\\n  }\\n\\n  .gform_wrapper.gravity-theme .gfield.gfield--width-half {\\n    &.position-right {\\n        order: 2 !important;\\n        font-size: 16px;\\n        line-height: 1.3;\\n        color: getcolor('brand_purple');\\n\\n        text-align: center;\\n\\n        @include bp(640px) {\\n            text-align: left;\\n            grid-column: span 8 !important;\\n            margin: 0px;\\n        }\\n    }\\n\\n  }\\n\\n  .no-resize {\\n    textarea { resize: none; }\\n  }\\n\\n  .gform_wrapper.gravity-theme #field_submit input {\\n\\n    display: block;\\n    text-align: center;\\n\\n    background-color: getcolor('white');\\n    border: solid 2px getcolor('brand_purple');\\n    color: getcolor('brand_purple');\\n      border-radius: 0px !important;\\n\\n    width: fit-content;\\n    line-height: 1em !important;\\n    padding: 10px 40px;\\t\\n    white-space: nowrap;\\n    z-index: 5;\\n\\n    font-size: 20px;\\n    padding: 15px 37px;\\n\\n    @include bp(lap) {\\n        font-size: 30px;\\n        padding: 15px 67px;\\n    }\\n    \\n    font-weight: 700;\\n    user-select: none;\\n    transition: all .1s ease-in-out;\\n    margin: 0 auto 20px;\\n\\n    @include bp(640px) {\\n        margin: unset;\\n    }\\n\\n    &:hover {\\n      background-color: getcolor('brand_purple');\\n      border: solid 2px getcolor('brand_purple');\\n      color: getcolor('white');\\n      transition: all .2s ease-in-out;\\n\\n    }\\n\\n  }\\n\\n}\\n\",\"\\n.page-footer {\\n  \\n  .footer-container {\\n    &__col {\\n      border: solid 1px red;  \\n      flex: 0 0 50%;\\n\\n      .logo-container {\\n        &__col {\\n          border: solid 1px blue;  \\n          flex: 0 0 50%;\\n\\n          .roffey-logo {\\n            background-image: url('../images/roffey-logo.svg');\\n            background-size: contain;\\n            background-repeat: no-repeat;\\n            width: 192px;\\n            height: 78px;\\n          }\\n\\n          .wbc-logo {\\n            background-image: url('../images/wbc-logo.svg');\\n            background-size: contain;\\n            background-repeat: no-repeat;\\n            width: 192px;\\n            height: 78px;\\n          }\\n    \\n    \\n        }\\n      }\\n\\n\\n    }\\n  }\\n\\n}\\n\",\".button-center-container {\\n  text-align: center;\\n  margin: 0 auto;\\n\\n  &--mt-40 {\\n    margin-top: 40px;\\n  }\\n}\\n\\n\\nbutton.button,\\na.button, div.button {\\n  display: inline-block;\\n  text-align: center;\\n  background-color: transparent;\\n  border: solid 3px getcolor('brand_purple');\\n  border-radius: 5px;\\n  color: getcolor('brand_purple');\\n\\n  font-family: $heading-font-family;\\n  font-weight: bold;\\n\\n  line-height: 1.2;\\n  white-space: nowrap;\\n  z-index: 5;\\n  transition: all .3s ease-out;\\n\\n  font-size: 16px;\\n  padding: 10px 30px;\\n\\n  @include bp(lap) {\\n    padding: 10px 40px;\\n    font-size: 22px;\\n    line-height: 1em;\\n  }\\n\\n  &:hover {\\n    color: getcolor('white');\\n    background-color: getcolor('brand_purple');\\n    transition: all 0.4s ease-in-out;\\n  }\\n\\n  &:focus {\\n    outline: 0;\\n  }\\n\\n  \\n  &--white {\\n    border: solid 3px getcolor('white');\\n    background: transparent;\\n    color: getcolor('white');\\n\\n    &:hover {\\n      color: getcolor('brand_purple');\\n      background-color: getcolor('white');\\n    }\\n\\n  }\\n\\n  &--mt-40 {\\n    margin-top: 40px;\\n  }\\n\\n}\\n\\ndiv.button {\\n\\n  &:hover {\\n    pointer-events: none;\\n  }\\n}\\n\\n\\n\\n\",\"\\n@mixin bp($point) {\\n\\t@if $point == 'wide' {\\n\\t\\t@media (min-width: $wide-min-width) { @content; }\\n\\t} @else if $point == 'desk' {\\n\\t\\t@media (min-width: $desk-min-width) { @content; }\\n\\t} @else if $point == 'lap' {\\n\\t\\t@media (min-width: $lap-min-width) { @content; }\\n\\t} @else if $point == 'mobile' {\\n\\t\\t@media (max-width: $mobile-max-width) { @content; }\\n\\t} @else {\\n\\t\\t@media (min-width: $point) { @content; }\\n\\t}\\n}\\n\\n@mixin twox {\\n\\t@media (min-device-pixel-ratio: 1.5), (min-resolution: 144dpi), (min-resolution: 1.5dppx) { @content; }\\n}\\n\"],\"sourceRoot\":\"\"}]);\n32 | // Exports\n33 | /* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n34 | ");

/***/ }),

/***/ "./node_modules/vue-axios/dist/vue-axios.esm.min.js":
/*!**********************************************************!*\
  !*** ./node_modules/vue-axios/dist/vue-axios.esm.min.js ***!
  \**********************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ plugin; }
/* harmony export */ });
/* module decorator */ module = __webpack_require__.hmd(module);
function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function plugin(e,n){if(!e.vueAxiosInstalled){var o=isAxiosLike(n)?migrateToMultipleInstances(n):n;if(isValidConfig(o)){var t=getVueVersion(e);if(t){var i=t<3?registerOnVue2:registerOnVue3;Object.keys(o).forEach((function(n){i(e,n,o[n])})),e.vueAxiosInstalled=!0}else console.error("[vue-axios] unknown Vue version")}else console.error("[vue-axios] configuration is invalid, expected options are either <axios_instance> or { <registration_key>: <axios_instance> }")}}function registerOnVue2(e,n,o){Object.defineProperty(e.prototype,n,{get:function(){return o}}),e[n]=o}function registerOnVue3(e,n,o){e.config.globalProperties[n]=o,e[n]=o}function isAxiosLike(e){return e&&"function"==typeof e.get&&"function"==typeof e.post}function migrateToMultipleInstances(e){return{axios:e,$http:e}}function isValidConfig(e){return"object"===_typeof(e)&&Object.keys(e).every((function(n){return isAxiosLike(e[n])}))}function getVueVersion(e){return e&&e.version&&Number(e.version.split(".")[0])}"object"==("undefined"==typeof exports?"undefined":_typeof(exports))?module.exports=plugin:"function"==typeof define&&__webpack_require__.amdO?define([],(function(){return plugin})):window.Vue&&window.axios&&window.Vue.use&&Vue.use(plugin,window.axios);

/***/ }),

/***/ "./node_modules/vue-loader/dist/exportHelper.js":
/*!******************************************************!*\
  !*** ./node_modules/vue-loader/dist/exportHelper.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
// runtime helper for setting properties on components
// in a tree-shakable way
exports["default"] = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ }),

/***/ "./assets/js/components/PropertiesSearch.vue":
/*!***************************************************!*\
  !*** ./assets/js/components/PropertiesSearch.vue ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PropertiesSearch_vue_vue_type_template_id_72f91548__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PropertiesSearch.vue?vue&type=template&id=72f91548 */ "./assets/js/components/PropertiesSearch.vue?vue&type=template&id=72f91548");
/* harmony import */ var _PropertiesSearch_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PropertiesSearch.vue?vue&type=script&lang=js */ "./assets/js/components/PropertiesSearch.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_PropertiesSearch_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PropertiesSearch_vue_vue_type_template_id_72f91548__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"assets/js/components/PropertiesSearch.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./assets/js/components/PropertiesSearch.vue?vue&type=script&lang=js":
/*!***********************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./assets/js/components/PropertiesSearch.vue?vue&type=script&lang=js ***!
  \***********************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PropertiesSearchResults_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PropertiesSearchResults.vue */ "./assets/js/components/PropertiesSearchResults.vue");

  

  /* harmony default export */ __webpack_exports__["default"] = ({
    components: {
      PropertiesSearchResults: _PropertiesSearchResults_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    },
    props: {
      category: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        properties: [],
        categories: [],
        params: {
          page: 1,
          per_page: 12,
          orderby: 'date',
          order: 'desc',
          selected_category: 0,
        },
        clientId: '',
        total_pages: 0,
        total: 0,
        loading: false,
      };
    },
    mounted() {
      this.params.selected_category = this.category;
      console.log('cat');
      console.log(this.category);
      this.getCategories();
      this.search();
    },
    computed: {
      showMore() {
        return this.params.page < this.total_pages;
      },
      show_no_results() {
        return !this.loading && this.total === 0;
      },
    },
    methods: {
      async search() {
        this.properties = [];
        this.loading = true;

        if (
          this.params.selected_category !== 0 &&
          this.params.selected_category !== '0'
        ) {
          this.params.nsm_properties_category = this.params.selected_category;
        } else {
          delete this.params.nsm_properties_category;
        }

        await this.axios
          .get('nsm_properties', {
            params: this.params,
          })
          .then((response) => {
            this.properties = response.data;
            this.total = parseInt(response.headers['x-wp-total'], 10);
            this.total_pages = parseInt(
              response.headers['x-wp-totalpages'],
              10,
            );
          });

        this.loading = false;
      },
      async getMorePosts() {
        this.params.page += 1;
        this.loading = true;

        await this.axios
          .get('nsm_properties', {
            params: this.params,
          })
          .then((response) => {
            this.properties = this.properties.concat(response.data);
          });

        this.loading = false;
      },
      async getCategories() {
        await this.axios
          .get('nsm_properties_category', {
            params: { orderby: 'term_group', hide_empty: 1 },
          })
          .then((response) => {
            this.categories = response.data;
          });
      },
    },
  });


/***/ }),

/***/ "./assets/js/components/PropertiesSearchResults.vue":
/*!**********************************************************!*\
  !*** ./assets/js/components/PropertiesSearchResults.vue ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PropertiesSearchResults_vue_vue_type_template_id_4e47f7ac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PropertiesSearchResults.vue?vue&type=template&id=4e47f7ac */ "./assets/js/components/PropertiesSearchResults.vue?vue&type=template&id=4e47f7ac");
/* harmony import */ var _PropertiesSearchResults_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PropertiesSearchResults.vue?vue&type=script&lang=js */ "./assets/js/components/PropertiesSearchResults.vue?vue&type=script&lang=js");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_PropertiesSearchResults_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PropertiesSearchResults_vue_vue_type_template_id_4e47f7ac__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"assets/js/components/PropertiesSearchResults.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ __webpack_exports__["default"] = (__exports__);

/***/ }),

/***/ "./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./assets/js/components/PropertiesSearchResults.vue?vue&type=script&lang=js":
/*!******************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./assets/js/components/PropertiesSearchResults.vue?vue&type=script&lang=js ***!
  \******************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

  /* harmony default export */ __webpack_exports__["default"] = ({
    props: {
      properties: Array,
    },
    data() {
      return {
        stagger_delay: 50,
      };
    },
    methods: {
      beforeEnter(el) {
        // eslint-disable-next-line no-param-reassign
        el.style.opacity = 0;
      },
      enter(el) {
        const delay = el.dataset.index * this.stagger_delay;
        setTimeout(() => {
          // eslint-disable-next-line no-param-reassign
          el.style.opacity = 1;
        }, delay);
      },
      leave(el) {
        // eslint-disable-next-line no-param-reassign
        el.style.display = 'none';
      },
    },
  });


/***/ }),

/***/ "./assets/js/components/PropertiesSearch.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./assets/js/components/PropertiesSearch.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_5_use_0_PropertiesSearch_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_5_use_0_PropertiesSearch_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./PropertiesSearch.vue?vue&type=script&lang=js */ "./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./assets/js/components/PropertiesSearch.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./assets/js/components/PropertiesSearchResults.vue?vue&type=script&lang=js":
/*!**********************************************************************************!*\
  !*** ./assets/js/components/PropertiesSearchResults.vue?vue&type=script&lang=js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* reexport safe */ _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_5_use_0_PropertiesSearchResults_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"]; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_dist_index_js_ruleSet_1_rules_5_use_0_PropertiesSearchResults_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./PropertiesSearchResults.vue?vue&type=script&lang=js */ "./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./assets/js/components/PropertiesSearchResults.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./assets/js/components/PropertiesSearch.vue?vue&type=template&id=72f91548":
/*!*********************************************************************************!*\
  !*** ./assets/js/components/PropertiesSearch.vue?vue&type=template&id=72f91548 ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_5_use_0_PropertiesSearch_vue_vue_type_template_id_72f91548__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_5_use_0_PropertiesSearch_vue_vue_type_template_id_72f91548__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./PropertiesSearch.vue?vue&type=template&id=72f91548 */ "./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./assets/js/components/PropertiesSearch.vue?vue&type=template&id=72f91548");


/***/ }),

/***/ "./assets/js/components/PropertiesSearchResults.vue?vue&type=template&id=4e47f7ac":
/*!****************************************************************************************!*\
  !*** ./assets/js/components/PropertiesSearchResults.vue?vue&type=template&id=4e47f7ac ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* reexport safe */ _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_5_use_0_PropertiesSearchResults_vue_vue_type_template_id_4e47f7ac__WEBPACK_IMPORTED_MODULE_0__.render; }
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_1_node_modules_vue_loader_dist_index_js_ruleSet_1_rules_5_use_0_PropertiesSearchResults_vue_vue_type_template_id_4e47f7ac__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!../../../node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./PropertiesSearchResults.vue?vue&type=template&id=4e47f7ac */ "./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./assets/js/components/PropertiesSearchResults.vue?vue&type=template&id=4e47f7ac");


/***/ }),

/***/ "./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./assets/js/components/PropertiesSearch.vue?vue&type=template&id=72f91548":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./assets/js/components/PropertiesSearch.vue?vue&type=template&id=72f91548 ***!
  \***************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; }
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");


const _hoisted_1 = { class: "content content__properties-panel" }
const _hoisted_2 = {
  id: "generic-dialog",
  class: "generic-dialog"
}
const _hoisted_3 = { class: "generic-dialog__group generic-dialog__group__select" }
const _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", { value: "0" }, "All properties", -1 /* HOISTED */)
const _hoisted_5 = ["value"]
const _hoisted_6 = { class: "content content__properties-results" }
const _hoisted_7 = { id: "properties-results" }
const _hoisted_8 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
  name: "results-top",
  id: "results-top"
}, null, -1 /* HOISTED */)
const _hoisted_9 = {
  key: 0,
  class: "no-results"
}
const _hoisted_10 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, "Sorry there are currently no upcoming properties listed.", -1 /* HOISTED */)
const _hoisted_11 = [
  _hoisted_10
]
const _hoisted_12 = { class: "generic-controls" }
const _hoisted_13 = { class: "generic-controls__loading-spinner" }

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_properties_search_results = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("properties-search-results")

  return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_2, [
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
          id: "cause",
          name: "cause",
          class: "generic-dialog__group__select__input",
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (($data.params.selected_category) = $event)),
          onChange: _cache[1] || (_cache[1] = $event => ($options.search()))
        }, [
          _hoisted_4,
          ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.categories, (category) => {
            return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
              key: category.id,
              value: category.id
            }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(category.name), 9 /* TEXT, PROPS */, _hoisted_5))
          }), 128 /* KEYED_FRAGMENT */))
        ], 544 /* NEED_HYDRATION, NEED_PATCH */), [
          [vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.params.selected_category]
        ])
      ])
    ]),
    (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("section", _hoisted_6, [
      (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [
        _hoisted_8,
        ($options.show_no_results)
          ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_9, [..._hoisted_11]))
          : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_properties_search_results, { properties: $data.properties }, null, 8 /* PROPS */, ["properties"]),
        (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [
          (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, null, 512 /* NEED_PATCH */), [
            [vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $data.loading]
          ]),
          ($options.showMore)
            ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
                key: 0,
                class: "generic-controls__show-more-button",
                onClick: _cache[2] || (_cache[2] = (...args) => ($options.getMorePosts && $options.getMorePosts(...args)))
              }, " View more "))
            : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)
        ])
      ])
    ])
  ]))
}

/***/ }),

/***/ "./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./assets/js/components/PropertiesSearchResults.vue?vue&type=template&id=4e47f7ac":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[1]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[5].use[0]!./assets/js/components/PropertiesSearchResults.vue?vue&type=template&id=4e47f7ac ***!
  \**********************************************************************************************************************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: function() { return /* binding */ render; }
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm-bundler.js");


const _hoisted_1 = ["data-index"]
const _hoisted_2 = { class: "property-container" }
const _hoisted_3 = { class: "description" }
const _hoisted_4 = { class: "property-title" }

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.TransitionGroup, {
    name: "stagged-fade",
    tag: "div",
    class: "property-results__list",
    onBeforeEnter: $options.beforeEnter,
    onEnter: $options.enter,
    onLeave: $options.leave
  }, {
    default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [
      ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(this.properties, (propertyItem, index) => {
        return ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("article", {
          class: "property-results__list__article",
          key: propertyItem.id,
          "data-index": index
        }, [
          ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)((0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveDynamicComponent)(propertyItem.hide_detail_page != 'Yes' ? 'a' : 'span'), {
            class: "no-underline",
            href: propertyItem.link
          }, {
            default: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(() => [
              (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
                  class: "featured-image",
                  style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({ backgroundImage: propertyItem.featuredImage })
                }, null, 4 /* STYLE */),
                (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [
                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(propertyItem.title.rendered), 1 /* TEXT */),
                  (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(propertyItem.location), 1 /* TEXT */)
                ])
              ])
            ]),
            _: 2 /* DYNAMIC */
          }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["href"]))
        ], 8 /* PROPS */, _hoisted_1))
      }), 128 /* KEYED_FRAGMENT */))
    ]),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["onBeforeEnter", "onEnter", "onLeave"]))
}

/***/ }),

/***/ "./node_modules/vue/dist/vue.runtime.esm-bundler.js":
/*!**********************************************************!*\
  !*** ./node_modules/vue/dist/vue.runtime.esm-bundler.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseTransition: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.BaseTransition; },
/* harmony export */   BaseTransitionPropsValidators: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.BaseTransitionPropsValidators; },
/* harmony export */   Comment: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.Comment; },
/* harmony export */   EffectScope: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.EffectScope; },
/* harmony export */   Fragment: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.Fragment; },
/* harmony export */   KeepAlive: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.KeepAlive; },
/* harmony export */   ReactiveEffect: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.ReactiveEffect; },
/* harmony export */   Static: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.Static; },
/* harmony export */   Suspense: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.Suspense; },
/* harmony export */   Teleport: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.Teleport; },
/* harmony export */   Text: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.Text; },
/* harmony export */   Transition: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.Transition; },
/* harmony export */   TransitionGroup: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.TransitionGroup; },
/* harmony export */   VueElement: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.VueElement; },
/* harmony export */   assertNumber: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.assertNumber; },
/* harmony export */   callWithAsyncErrorHandling: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.callWithAsyncErrorHandling; },
/* harmony export */   callWithErrorHandling: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.callWithErrorHandling; },
/* harmony export */   camelize: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.camelize; },
/* harmony export */   capitalize: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.capitalize; },
/* harmony export */   cloneVNode: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.cloneVNode; },
/* harmony export */   compatUtils: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.compatUtils; },
/* harmony export */   compile: function() { return /* binding */ compile; },
/* harmony export */   computed: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.computed; },
/* harmony export */   createApp: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createApp; },
/* harmony export */   createBlock: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createBlock; },
/* harmony export */   createCommentVNode: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode; },
/* harmony export */   createElementBlock: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createElementBlock; },
/* harmony export */   createElementVNode: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createElementVNode; },
/* harmony export */   createHydrationRenderer: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createHydrationRenderer; },
/* harmony export */   createPropsRestProxy: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createPropsRestProxy; },
/* harmony export */   createRenderer: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createRenderer; },
/* harmony export */   createSSRApp: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createSSRApp; },
/* harmony export */   createSlots: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createSlots; },
/* harmony export */   createStaticVNode: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode; },
/* harmony export */   createTextVNode: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createTextVNode; },
/* harmony export */   createVNode: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.createVNode; },
/* harmony export */   customRef: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.customRef; },
/* harmony export */   defineAsyncComponent: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.defineAsyncComponent; },
/* harmony export */   defineComponent: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.defineComponent; },
/* harmony export */   defineCustomElement: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.defineCustomElement; },
/* harmony export */   defineEmits: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.defineEmits; },
/* harmony export */   defineExpose: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.defineExpose; },
/* harmony export */   defineModel: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.defineModel; },
/* harmony export */   defineOptions: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.defineOptions; },
/* harmony export */   defineProps: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.defineProps; },
/* harmony export */   defineSSRCustomElement: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.defineSSRCustomElement; },
/* harmony export */   defineSlots: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.defineSlots; },
/* harmony export */   devtools: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.devtools; },
/* harmony export */   effect: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.effect; },
/* harmony export */   effectScope: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.effectScope; },
/* harmony export */   getCurrentInstance: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.getCurrentInstance; },
/* harmony export */   getCurrentScope: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.getCurrentScope; },
/* harmony export */   getTransitionRawChildren: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.getTransitionRawChildren; },
/* harmony export */   guardReactiveProps: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.guardReactiveProps; },
/* harmony export */   h: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.h; },
/* harmony export */   handleError: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.handleError; },
/* harmony export */   hasInjectionContext: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.hasInjectionContext; },
/* harmony export */   hydrate: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.hydrate; },
/* harmony export */   initCustomFormatter: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.initCustomFormatter; },
/* harmony export */   initDirectivesForSSR: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.initDirectivesForSSR; },
/* harmony export */   inject: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.inject; },
/* harmony export */   isMemoSame: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.isMemoSame; },
/* harmony export */   isProxy: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.isProxy; },
/* harmony export */   isReactive: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.isReactive; },
/* harmony export */   isReadonly: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.isReadonly; },
/* harmony export */   isRef: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.isRef; },
/* harmony export */   isRuntimeOnly: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.isRuntimeOnly; },
/* harmony export */   isShallow: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.isShallow; },
/* harmony export */   isVNode: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.isVNode; },
/* harmony export */   markRaw: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.markRaw; },
/* harmony export */   mergeDefaults: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.mergeDefaults; },
/* harmony export */   mergeModels: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.mergeModels; },
/* harmony export */   mergeProps: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.mergeProps; },
/* harmony export */   nextTick: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.nextTick; },
/* harmony export */   normalizeClass: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.normalizeClass; },
/* harmony export */   normalizeProps: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.normalizeProps; },
/* harmony export */   normalizeStyle: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle; },
/* harmony export */   onActivated: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onActivated; },
/* harmony export */   onBeforeMount: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onBeforeMount; },
/* harmony export */   onBeforeUnmount: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onBeforeUnmount; },
/* harmony export */   onBeforeUpdate: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onBeforeUpdate; },
/* harmony export */   onDeactivated: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onDeactivated; },
/* harmony export */   onErrorCaptured: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onErrorCaptured; },
/* harmony export */   onMounted: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onMounted; },
/* harmony export */   onRenderTracked: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onRenderTracked; },
/* harmony export */   onRenderTriggered: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onRenderTriggered; },
/* harmony export */   onScopeDispose: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onScopeDispose; },
/* harmony export */   onServerPrefetch: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onServerPrefetch; },
/* harmony export */   onUnmounted: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onUnmounted; },
/* harmony export */   onUpdated: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.onUpdated; },
/* harmony export */   openBlock: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.openBlock; },
/* harmony export */   popScopeId: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.popScopeId; },
/* harmony export */   provide: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.provide; },
/* harmony export */   proxyRefs: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.proxyRefs; },
/* harmony export */   pushScopeId: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.pushScopeId; },
/* harmony export */   queuePostFlushCb: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.queuePostFlushCb; },
/* harmony export */   reactive: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.reactive; },
/* harmony export */   readonly: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.readonly; },
/* harmony export */   ref: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.ref; },
/* harmony export */   registerRuntimeCompiler: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.registerRuntimeCompiler; },
/* harmony export */   render: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.render; },
/* harmony export */   renderList: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.renderList; },
/* harmony export */   renderSlot: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.renderSlot; },
/* harmony export */   resolveComponent: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.resolveComponent; },
/* harmony export */   resolveDirective: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.resolveDirective; },
/* harmony export */   resolveDynamicComponent: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.resolveDynamicComponent; },
/* harmony export */   resolveFilter: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.resolveFilter; },
/* harmony export */   resolveTransitionHooks: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.resolveTransitionHooks; },
/* harmony export */   setBlockTracking: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.setBlockTracking; },
/* harmony export */   setDevtoolsHook: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.setDevtoolsHook; },
/* harmony export */   setTransitionHooks: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.setTransitionHooks; },
/* harmony export */   shallowReactive: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.shallowReactive; },
/* harmony export */   shallowReadonly: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.shallowReadonly; },
/* harmony export */   shallowRef: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.shallowRef; },
/* harmony export */   ssrContextKey: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.ssrContextKey; },
/* harmony export */   ssrUtils: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.ssrUtils; },
/* harmony export */   stop: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.stop; },
/* harmony export */   toDisplayString: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.toDisplayString; },
/* harmony export */   toHandlerKey: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.toHandlerKey; },
/* harmony export */   toHandlers: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.toHandlers; },
/* harmony export */   toRaw: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.toRaw; },
/* harmony export */   toRef: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.toRef; },
/* harmony export */   toRefs: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.toRefs; },
/* harmony export */   toValue: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.toValue; },
/* harmony export */   transformVNodeArgs: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.transformVNodeArgs; },
/* harmony export */   triggerRef: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.triggerRef; },
/* harmony export */   unref: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.unref; },
/* harmony export */   useAttrs: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.useAttrs; },
/* harmony export */   useCssModule: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.useCssModule; },
/* harmony export */   useCssVars: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.useCssVars; },
/* harmony export */   useModel: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.useModel; },
/* harmony export */   useSSRContext: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.useSSRContext; },
/* harmony export */   useSlots: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.useSlots; },
/* harmony export */   useTransitionState: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.useTransitionState; },
/* harmony export */   vModelCheckbox: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.vModelCheckbox; },
/* harmony export */   vModelDynamic: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.vModelDynamic; },
/* harmony export */   vModelRadio: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.vModelRadio; },
/* harmony export */   vModelSelect: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.vModelSelect; },
/* harmony export */   vModelText: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.vModelText; },
/* harmony export */   vShow: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.vShow; },
/* harmony export */   version: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.version; },
/* harmony export */   warn: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.warn; },
/* harmony export */   watch: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.watch; },
/* harmony export */   watchEffect: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.watchEffect; },
/* harmony export */   watchPostEffect: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.watchPostEffect; },
/* harmony export */   watchSyncEffect: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.watchSyncEffect; },
/* harmony export */   withAsyncContext: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.withAsyncContext; },
/* harmony export */   withCtx: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.withCtx; },
/* harmony export */   withDefaults: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.withDefaults; },
/* harmony export */   withDirectives: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.withDirectives; },
/* harmony export */   withKeys: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.withKeys; },
/* harmony export */   withMemo: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.withMemo; },
/* harmony export */   withModifiers: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.withModifiers; },
/* harmony export */   withScopeId: function() { return /* reexport safe */ _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__.withScopeId; }
/* harmony export */ });
/* harmony import */ var _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vue/runtime-dom */ "./node_modules/@vue/runtime-core/dist/runtime-core.esm-bundler.js");
/* harmony import */ var _vue_runtime_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @vue/runtime-dom */ "./node_modules/@vue/runtime-dom/dist/runtime-dom.esm-bundler.js");



function initDev() {
  {
    (0,_vue_runtime_dom__WEBPACK_IMPORTED_MODULE_1__.initCustomFormatter)();
  }
}

if (true) {
  initDev();
}
const compile = () => {
  if (true) {
    (0,_vue_runtime_dom__WEBPACK_IMPORTED_MODULE_1__.warn)(
      `Runtime compilation is not supported in this build of Vue.` + (` Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".` )
      /* should not happen */
    );
  }
};




/***/ }),

/***/ "./node_modules/axios/lib/adapters/adapters.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/adapters/adapters.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _http_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http.js */ "./node_modules/axios/lib/helpers/null.js");
/* harmony import */ var _xhr_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xhr.js */ "./node_modules/axios/lib/adapters/xhr.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");





const knownAdapters = {
  http: _http_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  xhr: _xhr_js__WEBPACK_IMPORTED_MODULE_1__["default"]
}

_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

const renderReason = (reason) => `- ${reason}`;

const isResolvedHandle = (adapter) => _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(adapter) || adapter === null || adapter === false;

/* harmony default export */ __webpack_exports__["default"] = ({
  getAdapter: (adapters) => {
    adapters = _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    const rejectedReasons = {};

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      let id;

      adapter = nameOrAdapter;

      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

        if (adapter === undefined) {
          throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"](`Unknown adapter '${id}'`);
        }
      }

      if (adapter) {
        break;
      }

      rejectedReasons[id || '#' + i] = adapter;
    }

    if (!adapter) {

      const reasons = Object.entries(rejectedReasons)
        .map(([id, state]) => `adapter ${id} ` +
          (state === false ? 'is not supported by the environment' : 'is not available in the build')
        );

      let s = length ?
        (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
        'as no adapter specified';

      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_3__["default"](
        `There is no suitable adapter to dispatch the request ` + s,
        'ERR_NOT_SUPPORT'
      );
    }

    return adapter;
  },
  adapters: knownAdapters
});


/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_settle_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../core/settle.js */ "./node_modules/axios/lib/core/settle.js");
/* harmony import */ var _helpers_cookies_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../helpers/cookies.js */ "./node_modules/axios/lib/helpers/cookies.js");
/* harmony import */ var _helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../helpers/buildURL.js */ "./node_modules/axios/lib/helpers/buildURL.js");
/* harmony import */ var _core_buildFullPath_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/buildFullPath.js */ "./node_modules/axios/lib/core/buildFullPath.js");
/* harmony import */ var _helpers_isURLSameOrigin_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../helpers/isURLSameOrigin.js */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
/* harmony import */ var _defaults_transitional_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../defaults/transitional.js */ "./node_modules/axios/lib/defaults/transitional.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _helpers_parseProtocol_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../helpers/parseProtocol.js */ "./node_modules/axios/lib/helpers/parseProtocol.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _helpers_speedometer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/speedometer.js */ "./node_modules/axios/lib/helpers/speedometer.js");
















function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = (0,_helpers_speedometer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(50, 250);

  return e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };

    data[isDownloadStream ? 'download' : 'upload'] = true;

    listener(data);
  };
}

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

/* harmony default export */ __webpack_exports__["default"] = (isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(config.headers).normalize();
    let {responseType, withXSRFToken} = config;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    let contentType;

    if (_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isFormData(requestData)) {
      if (_platform_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].hasStandardBrowserEnv || _platform_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].hasStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false); // Let the browser set it
      } else if ((contentType = requestHeaders.getContentType()) !== false) {
        // fix semicolon duplication issue for ReactNative FormData implementation
        const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
        requestHeaders.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
      }
    }

    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }

    const fullPath = (0,_core_buildFullPath_js__WEBPACK_IMPORTED_MODULE_4__["default"])(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), (0,_helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_5__["default"])(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      (0,_core_settle_js__WEBPACK_IMPORTED_MODULE_6__["default"])(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"]('Request aborted', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"]('Network Error', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || _defaults_transitional_js__WEBPACK_IMPORTED_MODULE_8__["default"];
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"](
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ETIMEDOUT : _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if(_platform_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].hasStandardBrowserEnv) {
      withXSRFToken && _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(config));

      if (withXSRFToken || (withXSRFToken !== false && (0,_helpers_isURLSameOrigin_js__WEBPACK_IMPORTED_MODULE_9__["default"])(fullPath))) {
        // Add xsrf header
        const xsrfValue = config.xsrfHeaderName && config.xsrfCookieName && _helpers_cookies_js__WEBPACK_IMPORTED_MODULE_10__["default"].read(config.xsrfCookieName);

        if (xsrfValue) {
          requestHeaders.set(config.xsrfHeaderName, xsrfValue);
        }
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_11__["default"](null, config, request) : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = (0,_helpers_parseProtocol_js__WEBPACK_IMPORTED_MODULE_12__["default"])(fullPath);

    if (protocol && _platform_index_js__WEBPACK_IMPORTED_MODULE_3__["default"].protocols.indexOf(protocol) === -1) {
      reject(new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"]('Unsupported protocol ' + protocol + ':', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_7__["default"].ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
});


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_bind_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/bind.js */ "./node_modules/axios/lib/helpers/bind.js");
/* harmony import */ var _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/Axios.js */ "./node_modules/axios/lib/core/Axios.js");
/* harmony import */ var _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./helpers/formDataToJSON.js */ "./node_modules/axios/lib/helpers/formDataToJSON.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _cancel_CancelToken_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cancel/CancelToken.js */ "./node_modules/axios/lib/cancel/CancelToken.js");
/* harmony import */ var _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cancel/isCancel.js */ "./node_modules/axios/lib/cancel/isCancel.js");
/* harmony import */ var _env_data_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./env/data.js */ "./node_modules/axios/lib/env/data.js");
/* harmony import */ var _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _helpers_spread_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./helpers/spread.js */ "./node_modules/axios/lib/helpers/spread.js");
/* harmony import */ var _helpers_isAxiosError_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./helpers/isAxiosError.js */ "./node_modules/axios/lib/helpers/isAxiosError.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./adapters/adapters.js */ "./node_modules/axios/lib/adapters/adapters.js");
/* harmony import */ var _helpers_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./helpers/HttpStatusCode.js */ "./node_modules/axios/lib/helpers/HttpStatusCode.js");




















/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"](defaultConfig);
  const instance = (0,_helpers_bind_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.request, context);

  // Copy axios.prototype to instance
  _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].extend(instance, _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype, context, {allOwnKeys: true});

  // Copy context to instance
  _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance((0,_core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"])(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(_defaults_index_js__WEBPACK_IMPORTED_MODULE_4__["default"]);

// Expose Axios class to allow class inheritance
axios.Axios = _core_Axios_js__WEBPACK_IMPORTED_MODULE_0__["default"];

// Expose Cancel & CancelToken
axios.CanceledError = _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_5__["default"];
axios.CancelToken = _cancel_CancelToken_js__WEBPACK_IMPORTED_MODULE_6__["default"];
axios.isCancel = _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_7__["default"];
axios.VERSION = _env_data_js__WEBPACK_IMPORTED_MODULE_8__.VERSION;
axios.toFormData = _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_9__["default"];

// Expose AxiosError class
axios.AxiosError = _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_10__["default"];

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = _helpers_spread_js__WEBPACK_IMPORTED_MODULE_11__["default"];

// Expose isAxiosError
axios.isAxiosError = _helpers_isAxiosError_js__WEBPACK_IMPORTED_MODULE_12__["default"];

// Expose mergeConfig
axios.mergeConfig = _core_mergeConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"];

axios.AxiosHeaders = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_13__["default"];

axios.formToJSON = thing => (0,_helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_14__["default"])(_utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_15__["default"].getAdapter;

axios.HttpStatusCode = _helpers_HttpStatusCode_js__WEBPACK_IMPORTED_MODULE_16__["default"];

axios.default = axios;

// this module should only have a default export
/* harmony default export */ __webpack_exports__["default"] = (axios);


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CanceledError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");




/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new _CanceledError_js__WEBPACK_IMPORTED_MODULE_0__["default"](message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (CancelToken);


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CanceledError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CanceledError.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");





/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].call(this, message == null ? 'canceled' : message, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].inherits(CanceledError, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"], {
  __CANCEL__: true
});

/* harmony default export */ __webpack_exports__["default"] = (CanceledError);


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isCancel; }
/* harmony export */ });


function isCancel(value) {
  return !!(value && value.__CANCEL__);
}


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../helpers/buildURL.js */ "./node_modules/axios/lib/helpers/buildURL.js");
/* harmony import */ var _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InterceptorManager.js */ "./node_modules/axios/lib/core/InterceptorManager.js");
/* harmony import */ var _dispatchRequest_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dispatchRequest.js */ "./node_modules/axios/lib/core/dispatchRequest.js");
/* harmony import */ var _mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mergeConfig.js */ "./node_modules/axios/lib/core/mergeConfig.js");
/* harmony import */ var _buildFullPath_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./buildFullPath.js */ "./node_modules/axios/lib/core/buildFullPath.js");
/* harmony import */ var _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/validator.js */ "./node_modules/axios/lib/helpers/validator.js");
/* harmony import */ var _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");











const validators = _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_1__["default"](),
      response: new _InterceptorManager_js__WEBPACK_IMPORTED_MODULE_1__["default"]()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = (0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer != null) {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        }
      } else {
        _helpers_validator_js__WEBPACK_IMPORTED_MODULE_0__["default"].assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    // Flatten headers
    let contextHeaders = headers && _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].merge(
      headers.common,
      headers[config.method]
    );

    headers && _utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_4__["default"].concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [_dispatchRequest_js__WEBPACK_IMPORTED_MODULE_5__["default"].bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = _dispatchRequest_js__WEBPACK_IMPORTED_MODULE_5__["default"].call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = (0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this.defaults, config);
    const fullPath = (0,_buildFullPath_js__WEBPACK_IMPORTED_MODULE_6__["default"])(config.baseURL, config.url);
    return (0,_helpers_buildURL_js__WEBPACK_IMPORTED_MODULE_7__["default"])(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request((0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

_utils_js__WEBPACK_IMPORTED_MODULE_3__["default"].forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request((0,_mergeConfig_js__WEBPACK_IMPORTED_MODULE_2__["default"])(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

/* harmony default export */ __webpack_exports__["default"] = (Axios);


/***/ }),

/***/ "./node_modules/axios/lib/core/AxiosError.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosError.js ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

const prototype = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype);

  _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

/* harmony default export */ __webpack_exports__["default"] = (AxiosError);


/***/ }),

/***/ "./node_modules/axios/lib/core/AxiosHeaders.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosHeaders.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_parseHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/parseHeaders.js */ "./node_modules/axios/lib/helpers/parseHeaders.js");





const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(value)) return;

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite)
    } else if(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders((0,_helpers_parseHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"])(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this, (value, header) => {
      const key = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

// reserved names hotfix
_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  }
});

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].freezeMethods(AxiosHeaders);

/* harmony default export */ __webpack_exports__["default"] = (AxiosHeaders);


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");




class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (InterceptorManager);


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ buildFullPath; }
/* harmony export */ });
/* harmony import */ var _helpers_isAbsoluteURL_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/isAbsoluteURL.js */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
/* harmony import */ var _helpers_combineURLs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/combineURLs.js */ "./node_modules/axios/lib/helpers/combineURLs.js");





/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0,_helpers_isAbsoluteURL_js__WEBPACK_IMPORTED_MODULE_0__["default"])(requestedURL)) {
    return (0,_helpers_combineURLs_js__WEBPACK_IMPORTED_MODULE_1__["default"])(baseURL, requestedURL);
  }
  return requestedURL;
}


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ dispatchRequest; }
/* harmony export */ });
/* harmony import */ var _transformData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transformData.js */ "./node_modules/axios/lib/core/transformData.js");
/* harmony import */ var _cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../cancel/isCancel.js */ "./node_modules/axios/lib/cancel/isCancel.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cancel/CanceledError.js */ "./node_modules/axios/lib/cancel/CanceledError.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");
/* harmony import */ var _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../adapters/adapters.js */ "./node_modules/axios/lib/adapters/adapters.js");









/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new _cancel_CanceledError_js__WEBPACK_IMPORTED_MODULE_0__["default"](null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(config.headers);

  // Transform request data
  config.data = _transformData_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = _adapters_adapters_js__WEBPACK_IMPORTED_MODULE_3__["default"].getAdapter(config.adapter || _defaults_index_js__WEBPACK_IMPORTED_MODULE_4__["default"].adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = _transformData_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(
      config,
      config.transformResponse,
      response
    );

    response.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!(0,_cancel_isCancel_js__WEBPACK_IMPORTED_MODULE_5__["default"])(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = _transformData_js__WEBPACK_IMPORTED_MODULE_2__["default"].call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ mergeConfig; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");





const headersToObject = (thing) => thing instanceof _AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_0__["default"] ? thing.toJSON() : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, caseless) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isPlainObject(target) && _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isPlainObject(source)) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].merge.call({caseless}, target, source);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isPlainObject(source)) {
      return _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].merge({}, source);
    } else if (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };

  _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ settle; }
/* harmony export */ });
/* harmony import */ var _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");




/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"](
      'Request failed with status code ' + response.status,
      [_AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_BAD_REQUEST, _AxiosError_js__WEBPACK_IMPORTED_MODULE_0__["default"].ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ transformData; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _defaults_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../defaults/index.js */ "./node_modules/axios/lib/defaults/index.js");
/* harmony import */ var _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosHeaders.js */ "./node_modules/axios/lib/core/AxiosHeaders.js");






/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || _defaults_index_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  const context = response || config;
  const headers = _core_AxiosHeaders_js__WEBPACK_IMPORTED_MODULE_1__["default"].from(context.headers);
  let data = context.data;

  _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}


/***/ }),

/***/ "./node_modules/axios/lib/defaults/index.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _transitional_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transitional.js */ "./node_modules/axios/lib/defaults/transitional.js");
/* harmony import */ var _helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _helpers_toURLEncodedForm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/toURLEncodedForm.js */ "./node_modules/axios/lib/helpers/toURLEncodedForm.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");
/* harmony import */ var _helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/formDataToJSON.js */ "./node_modules/axios/lib/helpers/formDataToJSON.js");










/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: _transitional_js__WEBPACK_IMPORTED_MODULE_1__["default"],

  adapter: ['xhr', 'http'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(data);

    if (isObjectPayload && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFormData(data);

    if (isFormData) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify((0,_helpers_formDataToJSON_js__WEBPACK_IMPORTED_MODULE_2__["default"])(data)) : data;
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBuffer(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBuffer(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isStream(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFile(data) ||
      _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBlob(data)
    ) {
      return data;
    }
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBufferView(data)) {
      return data.buffer;
    }
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return (0,_helpers_toURLEncodedForm_js__WEBPACK_IMPORTED_MODULE_3__["default"])(data, this.formSerializer).toString();
      }

      if ((isFileList = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return (0,_helpers_toFormData_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (data && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_5__["default"].from(e, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_5__["default"].ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: _platform_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].classes.FormData,
    Blob: _platform_index_js__WEBPACK_IMPORTED_MODULE_6__["default"].classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': undefined
    }
  }
};

_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
  defaults.headers[method] = {};
});

/* harmony default export */ __webpack_exports__["default"] = (defaults);


/***/ }),

/***/ "./node_modules/axios/lib/defaults/transitional.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/* harmony default export */ __webpack_exports__["default"] = ({
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
});


/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VERSION: function() { return /* binding */ VERSION; }
/* harmony export */ });
const VERSION = "1.6.2";

/***/ }),

/***/ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js":
/*!****************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/AxiosURLSearchParams.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _toFormData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");




/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && (0,_toFormData_js__WEBPACK_IMPORTED_MODULE_0__["default"])(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode);
  } : encode;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/* harmony default export */ __webpack_exports__["default"] = (AxiosURLSearchParams);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/HttpStatusCode.js":
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/HttpStatusCode.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

/* harmony default export */ __webpack_exports__["default"] = (HttpStatusCode);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ bind; }
/* harmony export */ });


function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ buildURL; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/AxiosURLSearchParams.js */ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js");





/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode;

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isURLSearchParams(params) ?
      params.toString() :
      new _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_1__["default"](params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ combineURLs; }
/* harmony export */ });


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");



/* harmony default export */ __webpack_exports__["default"] = (_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasStandardBrowserEnv ?

  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + '=' + encodeURIComponent(value)];

      _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());

      _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(path) && cookie.push('path=' + path);

      _utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(domain) && cookie.push('domain=' + domain);

      secure === true && cookie.push('secure');

      document.cookie = cookie.join('; ');
    },

    read(name) {
      const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return (match ? decodeURIComponent(match[3]) : null);
    },

    remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  }

  :

  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {},
    read() {
      return null;
    },
    remove() {}
  });



/***/ }),

/***/ "./node_modules/axios/lib/helpers/formDataToJSON.js":
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/formDataToJSON.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");




/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(target) ? target.length : name;

    if (isLast) {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFormData(formData) && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(formData.entries)) {
    const obj = {};

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/* harmony default export */ __webpack_exports__["default"] = (formDataToJSON);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isAbsoluteURL; }
/* harmony export */ });


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ isAxiosError; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");




/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(payload) && (payload.isAxiosError === true);
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");





/* harmony default export */ __webpack_exports__["default"] = (_platform_index_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover its components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
          urlParsingNode.pathname :
          '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      const parsed = (_utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })());


/***/ }),

/***/ "./node_modules/axios/lib/helpers/null.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/null.js ***!
  \************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// eslint-disable-next-line strict
/* harmony default export */ __webpack_exports__["default"] = (null);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../utils.js */ "./node_modules/axios/lib/utils.js");




// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
/* harmony default export */ __webpack_exports__["default"] = (rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
});


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseProtocol.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseProtocol.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ parseProtocol; }
/* harmony export */ });


function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/speedometer.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/speedometer.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

/* harmony default export */ __webpack_exports__["default"] = (speedometer);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ spread; }
/* harmony export */ });


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/toFormData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toFormData.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");
/* harmony import */ var _platform_node_classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../platform/node/classes/FormData.js */ "./node_modules/axios/lib/helpers/null.js");




// temporary hotfix to avoid circular references until AxiosURLSearchParams is refactored


/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isPlainObject(thing) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(arr) && !arr.some(isVisitable);
}

const predicates = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"], {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (_platform_node_classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__["default"] || FormData)();

  // eslint-disable-next-line no-param-reassign
  options = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isSpecCompliantForm(formData);

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isBlob(value)) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_2__["default"]('Blob is not supported. Use a Buffer instead.');
    }

    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArrayBuffer(value) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isArray(value) && isFlatArray(value)) ||
        ((_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isFileList(value) || _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].endsWith(key, '[]')) && (arr = _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(value, function each(el, key) {
      const result = !(_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isUndefined(el) || el === null) && visitor.call(
        formData, el, _utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!_utils_js__WEBPACK_IMPORTED_MODULE_0__["default"].isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/* harmony default export */ __webpack_exports__["default"] = (toFormData);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/toURLEncodedForm.js":
/*!************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toURLEncodedForm.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ toURLEncodedForm; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils.js */ "./node_modules/axios/lib/utils.js");
/* harmony import */ var _toFormData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toFormData.js */ "./node_modules/axios/lib/helpers/toFormData.js");
/* harmony import */ var _platform_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../platform/index.js */ "./node_modules/axios/lib/platform/index.js");






function toURLEncodedForm(data, options) {
  return (0,_toFormData_js__WEBPACK_IMPORTED_MODULE_0__["default"])(data, new _platform_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (_platform_index_js__WEBPACK_IMPORTED_MODULE_1__["default"].isNode && _utils_js__WEBPACK_IMPORTED_MODULE_2__["default"].isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _env_data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../env/data.js */ "./node_modules/axios/lib/env/data.js");
/* harmony import */ var _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/AxiosError.js */ "./node_modules/axios/lib/core/AxiosError.js");





const validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + _env_data_js__WEBPACK_IMPORTED_MODULE_0__.VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"](
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('options must be an object', _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('option ' + opt + ' must be ' + result, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"]('Unknown option ' + opt, _core_AxiosError_js__WEBPACK_IMPORTED_MODULE_1__["default"].ERR_BAD_OPTION);
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = ({
  assertOptions,
  validators
});


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/classes/Blob.js":
/*!*****************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/Blob.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/* harmony default export */ __webpack_exports__["default"] = (typeof Blob !== 'undefined' ? Blob : null);


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/classes/FormData.js":
/*!*********************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/FormData.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);


/* harmony default export */ __webpack_exports__["default"] = (typeof FormData !== 'undefined' ? FormData : null);


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js":
/*!****************************************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/AxiosURLSearchParams.js */ "./node_modules/axios/lib/helpers/AxiosURLSearchParams.js");



/* harmony default export */ __webpack_exports__["default"] = (typeof URLSearchParams !== 'undefined' ? URLSearchParams : _helpers_AxiosURLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__["default"]);


/***/ }),

/***/ "./node_modules/axios/lib/platform/browser/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/axios/lib/platform/browser/index.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _classes_URLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/URLSearchParams.js */ "./node_modules/axios/lib/platform/browser/classes/URLSearchParams.js");
/* harmony import */ var _classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/FormData.js */ "./node_modules/axios/lib/platform/browser/classes/FormData.js");
/* harmony import */ var _classes_Blob_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Blob.js */ "./node_modules/axios/lib/platform/browser/classes/Blob.js");




/* harmony default export */ __webpack_exports__["default"] = ({
  isBrowser: true,
  classes: {
    URLSearchParams: _classes_URLSearchParams_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    FormData: _classes_FormData_js__WEBPACK_IMPORTED_MODULE_1__["default"],
    Blob: _classes_Blob_js__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
});


/***/ }),

/***/ "./node_modules/axios/lib/platform/common/utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/platform/common/utils.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasBrowserEnv: function() { return /* binding */ hasBrowserEnv; },
/* harmony export */   hasStandardBrowserEnv: function() { return /* binding */ hasStandardBrowserEnv; },
/* harmony export */   hasStandardBrowserWebWorkerEnv: function() { return /* binding */ hasStandardBrowserWebWorkerEnv; }
/* harmony export */ });
const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const hasStandardBrowserEnv = (
  (product) => {
    return hasBrowserEnv && ['ReactNative', 'NativeScript', 'NS'].indexOf(product) < 0
  })(typeof navigator !== 'undefined' && navigator.product);

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
const hasStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();




/***/ }),

/***/ "./node_modules/axios/lib/platform/index.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/platform/index.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node/index.js */ "./node_modules/axios/lib/platform/browser/index.js");
/* harmony import */ var _common_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common/utils.js */ "./node_modules/axios/lib/platform/common/utils.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  ..._common_utils_js__WEBPACK_IMPORTED_MODULE_0__,
  ..._node_index_js__WEBPACK_IMPORTED_MODULE_1__["default"]
});


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_bind_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/bind.js */ "./node_modules/axios/lib/helpers/bind.js");




// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
}

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
}

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  let kind;
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) || (
      isFunction(thing.append) && (
        (kind = kindOf(thing)) === 'formdata' ||
        // detect form-data instance
        (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
      )
    )
  )
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  }

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = (0,_helpers_bind_js__WEBPACK_IMPORTED_MODULE_0__["default"])(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
}

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
}

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
}

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
}

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
}

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  }

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
}

const noop = () => {}

const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
}

const ALPHA = 'abcdefghijklmnopqrstuvwxyz'

const DIGIT = '0123456789';

const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
}

const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = '';
  const {length} = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length|0]
  }

  return str;
}

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  }

  return visit(obj, 0);
}

const isAsyncFn = kindOfTest('AsyncFunction');

const isThenable = (thing) =>
  thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

/* harmony default export */ __webpack_exports__["default"] = ({
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/amd options */
/******/ 	!function() {
/******/ 		__webpack_require__.amdO = {};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.hmd = function(module) {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: function() {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!*************************!*\
  !*** ./assets/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/styles.scss */ "./assets/styles/styles.scss");
/* harmony import */ var _js_script__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/script */ "./assets/js/script.js");
/* harmony import */ var _js_script__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_script__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_cookie_accept__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/cookie-accept */ "./assets/js/cookie-accept.js");
/* harmony import */ var _js_cookie_accept__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_cookie_accept__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _js_jquery_viewportchecker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/jquery.viewportchecker */ "./assets/js/jquery.viewportchecker.js");
/* harmony import */ var _js_jquery_viewportchecker__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_jquery_viewportchecker__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _js_properties_search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/properties-search */ "./assets/js/properties-search.js");
// Styles


// Scripts




// Vue components


}();
/******/ })()
;