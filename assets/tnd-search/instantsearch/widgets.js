
/**
     * Get a google map link given various address information.
     * @param
     * @return {string} - returns a google maps url
     */
const getLink = function(item) {
  let address = '';

  if (item.street !== undefined && item.street !== '') {
      address = address + item.street;
  }
  if (item.street2 !== undefined && item.street2 !== '') {
      address = address + " " + item.street2;
  }
  
  address = address + ",";

  if (item.city !== undefined && item.city !== '') {
      address = address + " " + item.city + ",";
  }
  if (item.state !== undefined && item.state !== '') {
      address = address + " " + item.state;
  }
  if (item.zip !== undefined && item.zip !== '') {
      address = address + " " + item.zip;
  }
  if (item.title !== undefined && item.title !== '') {
      address = item.title + ", " + address;
  }

  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(address);
}

const getPhoneLinks = function(item) {
  let phone_links = []
  if(typeof item.phones !== "undefined") {
    phone_links = item.phones.map(phone => (
      `<a class="phone-body" href="tel:${phone}">${phone}</a>`
    ))
  }
  return phone_links
}
let lastInfoWindow = false;
const menu_strings = [
  {value: 1, label: 'Restaurant/Bar/Rm Service', id: 'restaurant'},
  {value: 2, label: 'Continental or Full Bkfst', id: 'breakfast'},
  {value: 3, label: 'Fitness Center', id: 'fitness'},
  {value: 4, label: 'Pool/Hot Tub', id: 'pool'},
  {value: 5, label: 'Pet Friendly', id: 'pet'},
  {value: 6, label: 'WiFi Available', id: 'wifi'},
  {value: 7, label: 'Kitchens Available', id: 'kitchens'},
  {value: 8, label: 'Meeting Facilities', id: 'meeting'},
  {value: 9, label: 'Handicap Accessible', id: 'handicap'},
  {value: 10, label: 'Chamber Member', id: 'chamber'}
]

export let tndWidgets = {
  map: {
    googleReference: window.google,
    container: '#map',
    initialPosition: {lat: 43.376077, lng: -124.2229427},
    initialZoom: 8,
    enableRefine: true,
    enableRefineControl: false,
    enableClearMapRefinement: false,
    enableRefineOnMapMove: false,
    mapOptions: {
      //center: {lat: 43.376077, lng: -124.2229427},
      //zoom: 8,
      //mapTypeId: window.google.maps.MapTypeId.SATELLITE,
    },
    builtInMarker: {
      createOptions(item) {
        return {
          title: item.name,
        };
      },
      events: {
        click({ event, item, marker, map }) {
          let infowindow = new google.maps.InfoWindow({
            content: "<span class='map-info-window'>" + item.title + "</span>"
          });
          if(lastInfoWindow){
            lastInfoWindow.close();
          }
          lastInfoWindow = infowindow;
          infowindow.open(viewMap, marker);
        },
      },
    },
  },
  hits: {
    transformItems(items) {
      return items.map(item => ({
        ...item,
        map_link: getLink(item),
        phone_links: getPhoneLinks(item)
      }));
    },
  },
  js_menu: {
    sortBy: ['name:asc'],
  },
  js_amenities: {
    sortBy: ['name:asc'],
    transformItems(items) {
      return items.map(item => ({
        ...item,
        lodging: true,
        id: item.label,
        label: menu_strings.find(string => string.id == item.label).label,
      }));
    },
  }
}