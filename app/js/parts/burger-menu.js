const burgerButton = document.querySelector(".burger-button--open");

if (burgerButton) {
  const burgerMenu = document.querySelector(".site-header__main-navigation");
  const closeBurgerButton = document.querySelector(".burger-button--close");
  const burgerMenuWidth = window.matchMedia("(max-width: 768.98px)");

  burgerButton.addEventListener("click", openBurgerMenu);
  closeBurgerButton.addEventListener("click", closeBurgerMenu);

  function openBurgerMenu() {
    burgerMenu.classList.add("site-header__main-navigation--active");
    document.querySelector(".overlay").classList.add("overlay--active");
    document.querySelector(".overlay").addEventListener("click", closeBurgerMenu);
  }

  function closeBurgerMenu() {
    const navigationDropdowns = burgerMenu.querySelectorAll(".dropdown__toggle");

    burgerMenu.classList.remove("site-header__main-navigation--active");
    document.querySelector(".overlay").classList.remove("overlay--active");
    document.querySelector(".overlay").removeEventListener("click", closeBurgerMenu);

    navigationDropdowns.forEach(item => {
      if (item.classList.contains("dropdown__toggle--active")) {
        item.classList.remove("dropdown__toggle--active");

        const navigationDropdownContents = burgerMenu.querySelectorAll(".dropdown__list");
        navigationDropdownContents.forEach(list => {
          list.classList.remove("dropdown__list--active");
        });
      }
    });
  }

  burgerMenuWidth.onchange = (e) => {
    changeView(e.matches, closeBurgerMenu);
  }
}
