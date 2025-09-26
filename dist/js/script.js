"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DynamicAdapt = /*#__PURE__*/function () {
  function DynamicAdapt(type) {
    _classCallCheck(this, DynamicAdapt);
    this.type = type;
  }
  return _createClass(DynamicAdapt, [{
    key: "init",
    value: function init() {
      var _this = this;
      // массив объектов
      this.оbjects = [];
      this.daClassname = '_dynamic_adapt_';
      // массив DOM-элементов
      this.nodes = _toConsumableArray(document.querySelectorAll('[data-da]'));

      // наполнение оbjects объктами
      this.nodes.forEach(function (node) {
        var data = node.dataset.da.trim();
        var dataArray = data.split(',');
        var оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector("".concat(dataArray[0].trim()));
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
        оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
        оbject.index = _this.indexInParent(оbject.parent, оbject.element);
        _this.оbjects.push(оbject);
      });
      this.arraySort(this.оbjects);

      // массив уникальных медиа-запросов
      this.mediaQueries = this.оbjects.map(function (_ref) {
        var breakpoint = _ref.breakpoint;
        return "(".concat(_this.type, "-width: ").concat(breakpoint, "px),").concat(breakpoint);
      }).filter(function (item, index, self) {
        return self.indexOf(item) === index;
      });

      // навешивание слушателя на медиа-запрос
      // и вызов обработчика при первом запуске
      this.mediaQueries.forEach(function (media) {
        var mediaSplit = media.split(',');
        var matchMedia = window.matchMedia(mediaSplit[0]);
        var mediaBreakpoint = mediaSplit[1];

        // массив объектов с подходящим брейкпоинтом
        var оbjectsFilter = _this.оbjects.filter(function (_ref2) {
          var breakpoint = _ref2.breakpoint;
          return breakpoint === mediaBreakpoint;
        });
        // matchMedia.addEventListener('change', () => {
        //   this.mediaHandler(matchMedia, оbjectsFilter)
        // })
        matchMedia.onchange = function () {
          _this.mediaHandler(matchMedia, оbjectsFilter);
        };
        _this.mediaHandler(matchMedia, оbjectsFilter);
      });
    }

    // Основная функция
  }, {
    key: "mediaHandler",
    value: function mediaHandler(matchMedia, оbjects) {
      var _this2 = this;
      if (matchMedia.matches) {
        оbjects.forEach(function (оbject) {
          // оbject.index = this.indexInParent(оbject.parent, оbject.element);
          _this2.moveTo(оbject.place, оbject.element, оbject.destination);
        });
      } else {
        оbjects.forEach(function (_ref3) {
          var parent = _ref3.parent,
            element = _ref3.element,
            index = _ref3.index;
          if (element.classList.contains(_this2.daClassname)) {
            _this2.moveBack(parent, element, index);
          }
        });
      }
    }

    // Функция перемещения
  }, {
    key: "moveTo",
    value: function moveTo(place, element, destination) {
      element.classList.add(this.daClassname);
      if (place === 'last' || place >= destination.children.length) {
        destination.append(element);
        return;
      }
      if (place === 'first') {
        destination.prepend(element);
        return;
      }
      destination.children[place].before(element);
    }

    // Функция возврата
  }, {
    key: "moveBack",
    value: function moveBack(parent, element, index) {
      element.classList.remove(this.daClassname);
      if (parent.children[index] !== undefined) {
        parent.children[index].before(element);
      } else {
        parent.append(element);
      }
    }

    // Функция получения индекса внутри родителя
  }, {
    key: "indexInParent",
    value: function indexInParent(parent, element) {
      return _toConsumableArray(parent.children).indexOf(element);
    }

    // Функция сортировки массива по breakpoint и place
    // по возрастанию для this.type = min
    // по убыванию для this.type = max
  }, {
    key: "arraySort",
    value: function arraySort(arr) {
      if (this.type === 'min') {
        arr.sort(function (a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }
            if (a.place === 'first' || b.place === 'last') {
              return -1;
            }
            if (a.place === 'last' || b.place === 'first') {
              return 1;
            }
            return 0;
          }
          return a.breakpoint - b.breakpoint;
        });
      } else {
        arr.sort(function (a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }
            if (a.place === 'first' || b.place === 'last') {
              return 1;
            }
            if (a.place === 'last' || b.place === 'first') {
              return -1;
            }
            return 0;
          }
          return b.breakpoint - a.breakpoint;
        });
        return;
      }
    }
  }]);
}();
var da = new DynamicAdapt("max");
da.init();
;
var dropdownButtons = document.querySelectorAll(".dropdown__toggle");
if (dropdownButtons[0]) {
  var dropdownContents = document.querySelectorAll(".dropdown__list");
  dropdownButtons.forEach(function (dropdownButton) {
    dropdownButton.addEventListener("click", function (e) {
      var currentButton = e.target;
      var currentDropdownContent = currentButton.nextElementSibling;
      dropdownButtons.forEach(function (el) {
        if (el !== currentButton) {
          el.classList.remove("dropdown__toggle--active");
        }
      });
      dropdownContents.forEach(function (el) {
        if (el !== currentDropdownContent) {
          el.classList.remove("dropdown__list--active");
        }
      });
      currentButton.classList.toggle("dropdown__toggle--active");
      currentDropdownContent.classList.toggle("dropdown__list--active");
      document.addEventListener("click", closeAllDropdowns);
      window.addEventListener("keydown", closeAllDropdowns);
    });
  });
  function closeAllDropdowns(e) {
    if (!e.target.closest(".site-navigation__list") || e.keyCode === 27) {
      for (var i = 0; i < dropdownButtons.length; i++) {
        dropdownButtons[i].classList.remove("dropdown__toggle--active");
        dropdownContents[i].classList.remove("dropdown__list--active");
      }
      document.removeEventListener("click", closeAllDropdowns);
      window.removeEventListener("keydown", closeAllDropdowns);
    }
  }
}
;
var burgerButton = document.querySelector(".burger-button--open");
if (burgerButton) {
  var burgerMenu = document.querySelector(".site-header__main-navigation");
  var closeBurgerButton = document.querySelector(".burger-button--close");
  burgerButton.addEventListener("click", openBurgerMenu);
  closeBurgerButton.addEventListener("click", closeBurgerMenu);
  function openBurgerMenu() {
    burgerMenu.classList.add("site-header__main-navigation--active");
  }
  function closeBurgerMenu() {
    burgerMenu.classList.remove("site-header__main-navigation--active");
  }
}
;
var themeButton = document.querySelector(".theme-button");
if (themeButton) {
  var documentHtml = document.querySelector("html");
  var isDarkTheme = localStorage.getItem("dark-theme");
  if (isDarkTheme === "true") {
    setDarkTheme();
  } else {
    setLightTheme();
  }
  themeButton.addEventListener("click", switchTheme);
  function switchTheme() {
    isDarkTheme = localStorage.getItem("dark-theme");
    if (isDarkTheme !== "true") {
      setDarkTheme();
    } else if (isDarkTheme === "true") {
      setLightTheme();
    }
  }
  function setDarkTheme() {
    documentHtml.classList.add("dark-theme");
    themeButton.classList.add("theme-button--active");
    localStorage.setItem("dark-theme", "true");
  }
  function setLightTheme() {
    documentHtml.classList.remove("dark-theme");
    themeButton.classList.remove("theme-button--active");
    localStorage.removeItem("dark-theme", "false");
  }
}
;
var popularPostsSlider = document.querySelector(".popular-posts-slider");
if (popularPostsSlider) {
  popularPostsSlider = new Splide(popularPostsSlider, {
    arrows: false,
    gap: 30,
    focusableNodes: "a, button"
  }).mount();
}
var aboutUsSlider = document.querySelector(".about-us__slider");
if (aboutUsSlider) {
  aboutUsSlider = new Splide(aboutUsSlider, {
    perPage: 5,
    arrows: false,
    gap: 30,
    focusableNodes: "a, button"
  }).mount();
}
;
var accordion = document.querySelector(".accordion");
if (accordion) {
  new Accordion(accordion).open(0);
}
;
var allTabs = document.querySelectorAll(".tabs");
if (allTabs.length > 0) {
  allTabs.forEach(function (tabs) {
    var tabsButtons = tabs.querySelectorAll(".tabs__button");
    var tabsContent = tabs.querySelectorAll(".tabs__content");
    tabsButtons.forEach(function (button, idx) {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        tabsButtons.forEach(function (btn) {
          btn.classList.remove("tabs__button--active");
        });
        tabsContent.forEach(function (content) {
          content.classList.remove("tabs__content--active");
        });
        button.classList.add("tabs__button--active");
        tabsContent[idx].classList.add("tabs__content--active");
      });
    });
  });
}
;
function findVideos() {
  var videos = document.querySelectorAll(".video");
  for (var i = 0; i < videos.length; i++) {
    setupVideo(videos[i]);
  }
}
function setupVideo(video) {
  var link = video.querySelector(".video__link");
  var media = video.querySelector(".video__media");
  var button = video.querySelector(".video__button");
  var id = parseMediaURL(media);
  video.addEventListener("click", function () {
    var iframe = createIframe(id);
    link.remove();
    button.remove();
    video.appendChild(iframe);
  });
  link.removeAttribute("href");
  video.classList.add("video--enabled");
}
function parseMediaURL(media) {
  var regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
  var url = media.src;
  var match = url.match(regexp);
  return match[1];
}
function createIframe(id) {
  var iframe = document.createElement('iframe');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('video__media');
  return iframe;
}
function generateURL(id) {
  var query = '?rel=0&showinfo=0&autoplay=1';
  return 'https://www.youtube.com/embed/' + id + query;
}
findVideos();
;