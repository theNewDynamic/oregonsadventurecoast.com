export default class Map {

    constructor() {
        
    }

    initMap(mapId, locations) {
        const map = new google.maps.Map(document.getElementById('map')[0], {
            zoom: 17,
            center: {
                lat: 51.512457,
                lng: -0.1291657
            }
        });
    }

}