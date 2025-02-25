let allTabs = document.querySelectorAll(".tabs");

if(allTabs.length > 0) {
  allTabs.forEach((tabs) => {
    let tabsButtons = tabs.querySelectorAll(".tabs__button");
    let tabsContent = tabs.querySelectorAll(".tabs__content");

    tabsButtons.forEach((button, idx) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();

        tabsButtons.forEach((btn) => {
          btn.classList.remove("tabs__button--active");
        });

        tabsContent.forEach((content) => {
          content.classList.remove("tabs__content--active");
        });

        button.classList.add("tabs__button--active");
        tabsContent[idx].classList.add("tabs__content--active");
      });
    });
  });
}
