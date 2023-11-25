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
