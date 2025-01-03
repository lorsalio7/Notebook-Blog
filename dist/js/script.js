"use strict";

let dropdownButtons = document.querySelectorAll(".dropdown__toggle");
if (dropdownButtons[0]) {
  let dropdownContents = document.querySelectorAll(".dropdown__list");
  dropdownButtons.forEach(dropdownButton => {
    dropdownButton.addEventListener("click", e => {
      const currentButton = e.target;
      const currentDropdownContent = currentButton.nextElementSibling;
      dropdownButtons.forEach(el => {
        if (el !== currentButton) {
          el.classList.remove("dropdown__toggle--active");
        }
      });
      dropdownContents.forEach(el => {
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
      for (let i = 0; i < dropdownButtons.length; i++) {
        dropdownButtons[i].classList.remove("dropdown__toggle--active");
        dropdownContents[i].classList.remove("dropdown__list--active");
      }
      document.removeEventListener("click", closeAllDropdowns);
      window.removeEventListener("keydown", closeAllDropdowns);
    }
  }
}
;
const themeButton = document.querySelector(".theme-button");
if (themeButton) {
  const documentHtml = document.querySelector("html");
  let isDarkTheme = localStorage.getItem("dark-theme");
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
let popularPostsSlider = document.querySelector(".popular-posts-slider");
if (popularPostsSlider) {
  popularPostsSlider = new Splide(popularPostsSlider, {
    arrows: false,
    gap: 30,
    focusableNodes: "a, button"
  }).mount();
}
;