"use strict";

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