// let topOfTheMonthSlider = document.querySelector(".top-of-the-month-slider");
let popularPostsSlider = document.querySelector(".popular-posts-slider");

// if(topOfTheMonthSlider) {
//   topOfTheMonthSlider = new Splide(topOfTheMonthSlider, {
//     direction: 'ttb',
//     arrows: false,
//     pagination: false,
//     gap: 50,
//     wheel: true,
//     height: 460,
//     // autoHeight: true,
//     perPage: 2,
//     perMove: 2
//   });

//   let topOfTheMonthSliderBar = topOfTheMonthSlider.root.querySelector(".top-of-the-month-slider__runner");

//   topOfTheMonthSlider.on("mounted move", function() {
//     let end  = topOfTheMonthSlider.Components.Controller.getEnd() + 1;
//     let rate = Math.min( ( topOfTheMonthSlider.index + 1 ) / end, 1 );
//     topOfTheMonthSliderBar.style.height = String( 100 * rate ) + '%';
//   });

//   topOfTheMonthSlider.mount();
// }

if(popularPostsSlider) {
  popularPostsSlider = new Splide(popularPostsSlider, {
    arrows: false,
    gap: 30
  }).mount();
}
