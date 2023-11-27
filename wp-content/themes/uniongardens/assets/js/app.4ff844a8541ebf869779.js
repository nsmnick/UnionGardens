/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/cookie-accept-v2.js":
/*!***************************************!*\
  !*** ./assets/js/cookie-accept-v2.js ***!
  \***************************************/
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

/***/ "./assets/js/script.js":
/*!*****************************!*\
  !*** ./assets/js/script.js ***!
  \*****************************/
/***/ (function() {

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


/***/ }),

/***/ "./assets/styles/styles.scss":
/*!***********************************!*\
  !*** ./assets/styles/styles.scss ***!
  \***********************************/
/***/ (function() {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nHookWebpackError: Module build failed (from ./node_modules/sass-loader/dist/cjs.js):\nexpected \"{\".\n    ╷\n167 │       .swiper-slide\n    │                    ^\n    ╵\n  assets/styles/components/_content.scss 167:20  @import\n  assets/styles/components/_components.scss 3:9  @import\n  assets/styles/styles.scss 33:9                 root stylesheet\n    at tryRunOrWebpackError (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/HookWebpackError.js:88:9)\n    at __webpack_require_module__ (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/Compilation.js:5067:12)\n    at __webpack_require__ (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/Compilation.js:5024:18)\n    at /Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/Compilation.js:5095:20\n    at symbolIterator (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/neo-async/async.js:3485:9)\n    at done (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/neo-async/async.js:3527:9)\n    at Hook.eval [as callAsync] (eval at create (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at Hook.CALL_ASYNC_DELEGATE [as _callAsync] (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/tapable/lib/Hook.js:18:14)\n    at /Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/Compilation.js:5002:43\n    at symbolIterator (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/neo-async/async.js:3482:9)\n-- inner error --\nError: Module build failed (from ./node_modules/sass-loader/dist/cjs.js):\nexpected \"{\".\n    ╷\n167 │       .swiper-slide\n    │                    ^\n    ╵\n  assets/styles/components/_content.scss 167:20  @import\n  assets/styles/components/_components.scss 3:9  @import\n  assets/styles/styles.scss 33:9                 root stylesheet\n    at Object.<anonymous> (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/css-loader/dist/cjs.js??clonedRuleSet-1.use[1]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-1.use[2]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-1.use[3]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/assets/styles/styles.scss:1:7)\n    at /Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/javascript/JavascriptModulesPlugin.js:452:10\n    at Hook.eval [as call] (eval at create (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/tapable/lib/HookCodeFactory.js:19:10), <anonymous>:7:1)\n    at Hook.CALL_DELEGATE [as _call] (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/tapable/lib/Hook.js:14:14)\n    at /Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/Compilation.js:5069:39\n    at tryRunOrWebpackError (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/HookWebpackError.js:83:7)\n    at __webpack_require_module__ (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/Compilation.js:5067:12)\n    at __webpack_require__ (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/Compilation.js:5024:18)\n    at /Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/webpack/lib/Compilation.js:5095:20\n    at symbolIterator (/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/neo-async/async.js:3485:9)\n\nGenerated code for /Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/css-loader/dist/cjs.js??clonedRuleSet-1.use[1]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-1.use[2]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/node_modules/sass-loader/dist/cjs.js??clonedRuleSet-1.use[3]!/Users/nickmorley/Sites/localhost/nsmprojects/unionGardens/wordpress-framework-master/assets/styles/styles.scss\n1 | throw new Error(\"Module build failed (from ./node_modules/sass-loader/dist/cjs.js):\\nexpected \\\"{\\\".\\n    ╷\\n167 │       .swiper-slide\\n    │                    ^\\n    ╵\\n  assets/styles/components/_content.scss 167:20  @import\\n  assets/styles/components/_components.scss 3:9  @import\\n  assets/styles/styles.scss 33:9                 root stylesheet\");");

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/* harmony import */ var _js_cookie_accept_v2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/cookie-accept-v2 */ "./assets/js/cookie-accept-v2.js");
/* harmony import */ var _js_cookie_accept_v2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_cookie_accept_v2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _js_jquery_viewportchecker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/jquery.viewportchecker */ "./assets/js/jquery.viewportchecker.js");
/* harmony import */ var _js_jquery_viewportchecker__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_jquery_viewportchecker__WEBPACK_IMPORTED_MODULE_3__);
// Styles


// Scripts




}();
/******/ })()
;