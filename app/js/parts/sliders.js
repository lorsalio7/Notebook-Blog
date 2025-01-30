let popularPostsSlider = document.querySelector(".popular-posts-slider");

if(popularPostsSlider) {
  popularPostsSlider = new Splide(popularPostsSlider, {
    arrows: false,
    gap: 30,
    focusableNodes: "a, button"
  }).mount();
}

let aboutUsSlider = document.querySelector(".about-us__slider");

if(aboutUsSlider) {
  aboutUsSlider = new Splide(aboutUsSlider, {
    perPage: 5,
    arrows: false,
    gap: 30,
    focusableNodes: "a, button"
  }).mount();
}
