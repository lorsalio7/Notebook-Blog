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
    localStorage.setItem("dark-theme", "false");
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
new Accordion(".accordion").open(0);
;