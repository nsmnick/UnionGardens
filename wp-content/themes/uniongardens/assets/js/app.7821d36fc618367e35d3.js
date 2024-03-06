!function(){var t={124:function(){!function(){const t=function(){this.default_options={class_notice:"cookie-accept",class_allow:"cookie-accept__allow",class_deny:"cookie-accept__deny",cookie:{name:"accept_cookies",expiryDays:365,domain:"",path:"/"},attr_name:"cookie-accept",showNotice(t,e){t.classList.add(`${e.class_notice}--show`)},hideNotice(t,e){t.classList.remove(`${e.class_notice}--show`)}},this.status={allow:"allow",deny:"deny"},this.init.apply(this,arguments)};t.prototype.init=function(t){let e="";this.deepExtend(this.options={},this.default_options),this.isPlainObject(t)&&this.deepExtend(this.options,t),e=this.checkCookieStatus(),void 0===e?(this.el_notice=document.getElementsByClassName(this.options.class_notice)[0],void 0!==this.el_notice?(this.configureEvents(),this.showNotice()):console.log("Can't find cookie notice!")):e===this.status.allow&&this.enableCookies()},t.prototype.configureEvents=function(){const t=this,e=document.getElementsByClassName(this.options.class_allow)[0],o=document.getElementsByClassName(this.options.class_deny)[0];void 0!==e?e.addEventListener("click",(e=>{e.preventDefault(),t.allowCookies()}),!1):console.log("Allow button not found!"),void 0!==o?o.addEventListener("click",(e=>{e.preventDefault(),t.denyCookies()}),!1):console.log("Deny button not found!")},t.prototype.checkCookieStatus=function(){return this.getCookie(this.options.cookie.name)},t.prototype.allowCookies=function(){this.setCookie(this.options.cookie.name,this.status.allow,this.options.cookie.expiryDays,this.options.cookie.domain,this.options.cookie.path),this.hideNotice(),this.enableCookies()},t.prototype.denyCookies=function(){this.setCookie(this.options.cookie.name,this.status.deny,!1,this.options.cookie.domain,this.options.cookie.path),this.hideNotice()},t.prototype.showNotice=function(){this.options.showNotice(this.el_notice,this.options)},t.prototype.hideNotice=function(){this.options.hideNotice(this.el_notice,this.options)},t.prototype.deepExtend=function(t,e){for(const o in e)e.hasOwnProperty(o)&&(o in t&&this.isPlainObject(t[o])&&this.isPlainObject(e[o])?this.deepExtend(t[o],e[o]):t[o]=e[o]);return t},t.prototype.isPlainObject=function(t){return"object"==typeof t&&null!==t&&t.constructor===Object},t.prototype.getCookie=function(t){const e=`; ${document.cookie}`.split(`; ${t}=`);return 2!==e.length?void 0:e.pop().split(";").shift()},t.prototype.setCookie=function(t,e,o,i,s){const n=[`${t}=${e}`,`path=${s||"/"}`];let a=new Date;this.isInteger(o)&&0!==o?(a.setDate(a.getDate()+(o||365)),a=a.toUTCString()):a=0,n.push(`expires=${a}`),i&&n.push(`domain=${i}`),document.cookie=n.join(";")},t.prototype.enableCookies=function(){this.enableScripts()},t.prototype.enableScripts=function(){const t=this,e=document.querySelectorAll(`script[type="text/plain"][${this.options.attr_name}]`);for(let o=0;o<e.length;o+=1){const i=e[o],s=i.getAttribute("src"),n=document.createElement("script");n.setAttribute("type","text/javascript"),null!==s&&""!==s?(n.setAttribute("src",s),t.insertAfter(n,i)):(n.innerHTML=i.innerHTML,t.insertAfter(n,e[o])),i.parentNode.removeChild(i)}},t.prototype.insertAfter=function(t,e){e.parentNode.insertBefore(t,e.nextSibling)},t.prototype.isInteger=Number.isInteger||function(t){return"number"==typeof t&&isFinite(t)&&Math.floor(t)===t},window.CookieAccept=t}()},856:function(){var t;(t=jQuery).fn.viewportChecker=function(e){const o={classToAdd:"visible",classToRemove:"invisible",classToAddForFullView:"full-visible",removeClassAfterAnimation:!1,offset:100,repeat:!1,invertBottomOffset:!0,callbackFunction(t,e){},scrollHorizontal:!1,scrollBox:window};t.extend(o,e);const i=this;let s={height:t(o.scrollBox).height(),width:t(o.scrollBox).width()};return this.checkElements=function(){let e,n;o.scrollHorizontal?(e=Math.max(t("html").scrollLeft(),t("body").scrollLeft(),t(window).scrollLeft()),n=e+s.width):(e=Math.max(t("html").scrollTop(),t("body").scrollTop(),t(window).scrollTop()),n=e+s.height),i.each((function(){const i=t(this),a={},l={};if(i.data("vp-add-class")&&(l.classToAdd=i.data("vp-add-class")),i.data("vp-remove-class")&&(l.classToRemove=i.data("vp-remove-class")),i.data("vp-add-class-full-view")&&(l.classToAddForFullView=i.data("vp-add-class-full-view")),i.data("vp-keep-add-class")&&(l.removeClassAfterAnimation=i.data("vp-remove-after-animation")),i.data("vp-offset")&&(l.offset=i.data("vp-offset")),i.data("vp-repeat")&&(l.repeat=i.data("vp-repeat")),i.data("vp-scrollHorizontal")&&(l.scrollHorizontal=i.data("vp-scrollHorizontal")),i.data("vp-invertBottomOffset")&&(l.scrollHorizontal=i.data("vp-invertBottomOffset")),t.extend(a,o),t.extend(a,l),i.data("vp-animated")&&!a.repeat)return;String(a.offset).indexOf("%")>0&&(a.offset=parseInt(a.offset,10)/100*s.height);const c=a.scrollHorizontal?i.offset().left:i.offset().top,r=a.scrollHorizontal?c+i.width():c+i.height(),d=Math.round(c)+a.offset;let h=a.scrollHorizontal?d+i.width():d+i.height();a.invertBottomOffset&&(h-=2*a.offset),d<n&&h>e?(i.removeClass(a.classToRemove),i.addClass(a.classToAdd),a.callbackFunction(i,"add"),r<=n&&c>=e?i.addClass(a.classToAddForFullView):i.removeClass(a.classToAddForFullView),i.data("vp-animated",!0),a.removeClassAfterAnimation&&i.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",(()=>{i.removeClass(a.classToAdd)}))):i.hasClass(a.classToAdd)&&a.repeat&&(i.removeClass(`${a.classToAdd} ${a.classToAddForFullView}`),a.callbackFunction(i,"remove"),i.data("vp-animated",!1))}))},("ontouchstart"in window||"onmsgesturechange"in window)&&t(document).bind("touchmove MSPointerMove pointermove",this.checkElements),t(o.scrollBox).bind("load scroll",this.checkElements),t(window).resize((e=>{s={height:t(o.scrollBox).height(),width:t(o.scrollBox).width()},i.checkElements()})),this.checkElements(),this}},150:function(){jQuery(window).ready((t=>{if(new CookieAccept,t(".animate").viewportChecker({classToAdd:"fade-up"}),t(".animate-fade").viewportChecker({classToAdd:"fade-in"}),t(".hamburger-toggle").click((e=>{e.preventDefault(),t(".hamburger-toggle").toggleClass("js-mobile-menu-open"),t("#main-menu").toggleClass("page-header__main-menu--open")})),window.location.hash.length){const e=t(window.location.hash);e.length&&t("html, body").animate({scrollTop:e.offset().top-0},1e3)}t('a[href^="/#"]:not([href="#"])').click((function(){if(t(this).hasClass("selected")||(t("#main-menu").removeClass("page-header__main-menu--open"),t(".hamburger-toggle").removeClass("js-mobile-menu-open")),location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){let e=t(this.hash);if(e=e.length?e:t("[name="+this.hash.slice(1)+"]"),e.length)return t("html,body").animate({scrollTop:e.offset().top-0},1e3),!1}}))}))}},e={};function o(i){var s=e[i];if(void 0!==s)return s.exports;var n=e[i]={exports:{}};return t[i](n,n.exports,o),n.exports}o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,{a:e}),e},o.d=function(t,e){for(var i in e)o.o(e,i)&&!o.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){"use strict";o(150),o(124),o(856)}()}();