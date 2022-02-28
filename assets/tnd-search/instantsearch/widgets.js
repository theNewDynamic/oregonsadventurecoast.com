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

const facets = {
  'cities': [
    {
      id: 'Allegany',
      label: 'Allegany'
    },
    {
      id: 'Charleston',
      label: 'Charleston'
    },
    {
      id: 'Coos Bay',
      label: 'Coos Bay'
    },
    {
      id: 'North Bend',
      label: 'North Bend'
    }
  ],
  'categories': [
    {
      id: 'Hotels, Motels & Inns',
      label: 'Hotels, Motels & Inns'
    },
    {
      id: 'RV Parks & Camping',
      label: 'RV Parks & Camping'
    },
    {
      id: 'Vacation Rental Homes',
      label: 'Vacation Rental Homes'
    },

  ],
  'amenities': [
    {label: 'Restaurant/Bar/Rm Service', id: 'restaurant'},
    {label: 'Continental or Full Bkfst', id: 'breakfast'},
    {label: 'Fitness Center', id: 'fitness'},
    {label: 'Pool/Hot Tub', id: 'pool'},
    {label: 'Pet Friendly', id: 'pet'},
    {label: 'WiFi Available', id: 'wifi'},
    {label: 'Kitchens Available', id: 'kitchens'},
    {label: 'Meeting Facilities', id: 'meeting'},
    {label: 'Handicap Accessible', id: 'handicap'},
    {label: 'Chamber Member', id: 'chamber'}
  ]
}

const getStaticValues = function(facet, items) {
  const staticValues = facets[facet]
  items.forEach(item => {
    console.log(item)
  });
  return staticValues.map(static_item => {
    let found_item = items.find(item => item.label === static_item.id);
    if(found_item) {
      found_item = {
        ...found_item,
        name: found_item.label
      }
    }
    return found_item || {
      label: static_item.label,
      name: static_item.label,
      disabled: true,
      value: static_item.id,
      count: 0,
      isRefined: false,
      highlighted: static_item.id,
    };
  });
}

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
  js_cities: {
    transformItems(items) {
      return getStaticValues('cities', items)
    }
  },
  js_categories: {
    transformItems(items) {
      return getStaticValues('categories', items)
    }
  },
  js_amenities: {
    transformItems(items) {
      return getStaticValues('amenities', items).map(item => ({
        ...item,
        label: facets['amenities'].find(string => string.id == item.value).label,
      }));
    },
  }
}