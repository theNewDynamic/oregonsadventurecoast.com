var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
    // options
    cellAlign: 'left',
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    draggable: false,
    wraparound: true,
    fade: true,
    autoPlay: 4000
});

let carouselVideos = document.getElementsByClassName("carousel-video");
let allCells = document.getElementsByClassName("carousel-cell");

window.addEventListener("DOMContentLoaded", slideChange)
flkty.on( 'change', slideChange );


function slideChange(){
    let isSelected = document.getElementsByClassName("is-selected");
    for(let i = 0; i < carouselVideos.length; i++){
        if(carouselVideos[i] !== isSelected[0]){
            carouselVideos[i].pause();
        }
    }
    let cellVideo = isSelected[0].getElementsByClassName("carousel-video");
    if (typeof cellVideo[0] !== "undefined"){
        cellVideo[0].play()
    }
}
