let dropdownButtons = document.querySelectorAll(".dropdown__toggle");

if(dropdownButtons[0]) {
  let dropdownContents = document.querySelectorAll(".dropdown__list");
  dropdownButtons.forEach(dropdownButton => {
    dropdownButton.addEventListener("click", (e) => {
      const currentButton = e.target;
      const currentDropdownContent = currentButton.nextElementSibling;

      dropdownButtons.forEach(el => {
        if(el !== currentButton) {
          el.classList.remove("dropdown__toggle--active");
        }
      });

      dropdownContents.forEach(el => {
        if(el !== currentDropdownContent) {
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
    if(!e.target.closest(".site-navigation__list") || e.keyCode === 27) {
      for(let i = 0; i < dropdownButtons.length; i++) {
        dropdownButtons[i].classList.remove("dropdown__toggle--active");
        dropdownContents[i].classList.remove("dropdown__list--active");
      }

      document.removeEventListener("click", closeAllDropdowns);
      window.removeEventListener("keydown", closeAllDropdowns);
    }
  }
}
