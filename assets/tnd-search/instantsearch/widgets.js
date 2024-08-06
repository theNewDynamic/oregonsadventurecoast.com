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
  let phone_links = ''
  if(typeof item.phones !== "undefined") {
    item.phones.forEach((phone, index) => {
      if(index){
        phone_links = phone_links + ' | '
      }
      phone_links = phone_links + `<a class="phone-body" href="tel:${phone}">${phone}</a>`
    })
  }
  return phone_links
}

let lastInfoWindow = false;

// We need to enforce a hardcoded lists of elements to overwrite InstantSearch behaviour which
// hides disabled elements rather than graying them out.

const labelizeFacet = function(item) {
  if(typeof item == "object"){
    return {
      id: item.id,
      label: item.label
    }
  } else {
    return {
      id: item,
      label: item
    }
  }
}

const facets = {
  'cities': [
    {
      id: 'Coos Bay',
      label: 'Coos Bay'
    },
    {
      id: 'North Bend',
      label: 'North Bend'
    },
    {
      id: 'Charleston',
      label: 'Charleston'
    },
    {
      id: 'Allegany',
      label: 'Allegany'
    },
  ],
  'categories_lodging': [
    {
      id: 'Hotels, Motels & Inns',
      label: 'Hotels, Motels & Inns'
    },
    {
      id: 'Bed & Breakfasts',
      label: 'Bed & Breakfasts'
    },
    {
      id: 'RV Parks & Camping',
      label: 'RV Parks & Camping'
    },
    {
      id: 'Vacation Rental Homes',
      label: 'Vacation Rental Homes'
    }
  ],
  'categories_dining': [
    'American',
    'Asian',
    'BBQ',
    'Bakery',
    'Bar Food',
    'Breakfast / Brunch',
    'Burgers',
    {
      id: 'Cafe',
      label: 'Cafe/Coffee'
    },
    'Chinese',
    'Deli',
    'Dessert',
    'Dinner & Entertainment',
    'European',
    'Fast Food',
    'Food Cart',
    'German',
    'Indian',
    'International',
    'Italian',
    'Japanese',
    //'Mediterranean',
    'Mexican',
    'Middle Eastern',
    'Pacific Northwest',
    'Pizza',
    'Sandwiches',
    'Seafood',
    'Soup',
    'Steakhouse',
    'Sushi',
    'Thai',
    'Vegan',
    'Vegetarian',
  ].map(labelizeFacet),
  'categories_shopping': [
    'Antiques',
    'Arts & Crafts',
    'Bookstores',
    'Boutique',
    'Clothing',
    'Florist',
    'Groceries',
    'Hardware',
    'Herbals',
    'Home Goods',
    'Liquor Stores/ Growler Fills',
    'Personal services',
    'Pet Products',
    'Pharmacy',
    'Resale',
    'Shoes',
    'Souvenirs',
    'Specialty Foods',
    'Sporting Goods',
    'Vitamins',
    'Wellness',
  ].map(labelizeFacet),
  'amenities': [
    {label: 'Restaurant/Bar/Rm Service', id: 'restaurant'},
    {label: 'Continental or Full Bkfst', id: 'breakfast'},
    {label: 'Fitness Center', id: 'fitness'},
    {label: 'Pool/Hot Tub', id: 'pool'},
    {label: 'Pet Friendly', id: 'pet'},
    {label: 'WiFi Available', id: 'wifi'},
    {label: 'EV Charging', id: 'ev_charging'},
    {label: 'Kitchens Available', id: 'kitchens'},
    {label: 'Meeting Facilities', id: 'meeting'},
    {label: 'Handicap Accessible', id: 'handicap'},
    {label: 'Chamber Member', id: 'chamber'}
  ]
}

const getStaticValues = function(facet, items) {
  let staticValues = facets[facet]
  if(facet == 'cities_dining') {
    staticValues = facets['cities'].slice(0,-1)
  }
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
      return items.map(item => {
        let categories_string = ''
        if(item.categories) {
          const categories_array = item.categories.map(item_cat => {
            const all_cats = [].concat(facets['categories_dining'], facets['categories_lodging'], facets['categories_shopping']);
            const find_cat = all_cats.find(cat => cat.id == item_cat)
            if(find_cat){
              return find_cat.label
            } else {
              return item_cat
            }
          });
          categories_string = categories_array.sort().join(' | ')
        }
        return {
          ...item,
          categories_string,
          map_link: getLink(item),
          phone_links: getPhoneLinks(item)
        }
      });
    },
  },
  js_cities_dining: {
    transformItems(items) {
      return getStaticValues('cities_dining', items)
    }
  },
  js_cities_lodging: {
    transformItems(items) {
      return getStaticValues('cities', items)
    }
  },
  js_categories_lodging: {
    transformItems(items) {
      return getStaticValues('categories_lodging', items)
    }
  },
  js_categories_dining: {
    transformItems(items) {
      return getStaticValues('categories_dining', items).map(item => ({
        ...item,
        label: facets['categories_dining'].find(string => string.id == item.value).label,
      }));
    },
  },
  js_categories_shopping: {
    transformItems(items) {
      return getStaticValues('categories_shopping', items).map(item => ({
        ...item,
        label: facets['categories_shopping'].find(string => string.id == item.value).label,
      }));
    },
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