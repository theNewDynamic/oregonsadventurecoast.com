var viewMap;
function initMap() {
  viewMap = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 43.376077, lng: -124.2229427},
    zoom: 8
  });
}