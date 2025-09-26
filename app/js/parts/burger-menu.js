const burgerButton = document.querySelector(".burger-button--open");

if (burgerButton) {
  const burgerMenu = document.querySelector(".site-header__main-navigation");
  const closeBurgerButton = document.querySelector(".burger-button--close");
  burgerButton.addEventListener("click", openBurgerMenu);
  closeBurgerButton.addEventListener("click", closeBurgerMenu);

  function openBurgerMenu() {
    burgerMenu.classList.add("site-header__main-navigation--active");
  }

  function closeBurgerMenu() {
    burgerMenu.classList.remove("site-header__main-navigation--active");
  }
}
