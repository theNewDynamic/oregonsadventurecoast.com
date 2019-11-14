var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
    // options
    cellAlign: 'left',
    contain: true,
    autoPlay: 8000,
    prevNextButtons: false,
    pageDots: false,
    draggable: false,
    wraparound: true,
    fade: true
});