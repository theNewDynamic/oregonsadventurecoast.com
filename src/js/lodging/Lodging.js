import _ from 'lodash';
import {lodgingAmenityOptions} from './lodging-amenities';
import {lodgingCostOptions} from './lodging-cost';
import {lodgingCategoryOptions} from './lodging-categories';
import FindOptionData from '../common/find-option-data';
import GoogleMapLink from '../maps/GoogleMapLink';

export default class Lodging {

    constructor() {
        this.findOptionData = new FindOptionData();
        this.googleMapLink = new GoogleMapLink();
    }

    /**
     * Handles sorting the list by Hotels/Motels (alpha), RV Parks (alpha), then Vacation Rentals (alpha)
     * @param {array} list - list of lodging data
     * @return {array} - sorted list of lodging data
     */
    sortByInitialPriority(list) {
        let hotels = _.filter(list, {'property_category': '1'});
        let bandb = _.filter(list, {'property_category': '3'});
        let rvparks = _.filter(list, {'property_category': '2'});
        let rentals = _.filter(list, {'property_category': '4'});

        hotels = _.orderBy(hotels, ['title'], ['asc']);
        bandb = _.orderBy(bandb, ['title'], ['asc']);
        rvparks = _.orderBy(rvparks, ['title'], ['asc']);
        rentals = _.orderBy(rentals, ['title'], ['asc']);

        return hotels.concat(bandb, rvparks, rentals);
    }

    /**
     * Returns a template with lodging values filled in
     * @param {object} - one row from the lodging array of data
     * @return {string} - string of the template data
     */
    generateTemplate(val) {
        let amenityList = this.generateAmenityListTpl(val.amenityList);
        let cost = this.generateCostTpl(val.cost);
        let category = this.generateCategoryTpl(val.property_category);
        let units = this.generateUnitsTpl(val.units);
        let phoneDiv = this.generatePhoneDivTpl(val.phone_local, val.phone_toll_free);
        let street = this.generateStreetTpl(val.street, val.street2);
        let mapLink = this.googleMapLink.getLink(val.street, val.street2, val.city, val.state, val.zip, val.title);

        return `
        <div class="m-lodging-item">
            <div class="photo" style="background-image:url(${val.photo_name});" alt="${val.photo_alt}">

            </div>
        
            <div class="content">
                <div class="category">
                    ${category.label}
                </div>
        
                <div class="location">
                    <h2>${val.title}</h2>
                    <p class="address">
                        ${street}
                        ${val.city}, ${val.state} ${val.zip}<br>
                        ${val.phone_local} ${phoneDiv} ${val.phone_toll_free}
                    </p>
                </div>
        
                <div class="description">
                    <strong>
                    ${units}
                    ${cost.label}:
                    </strong>
                    ${val.property_description}
                </div>
                <div class="m-lodging-item__footer">
                    <div class="amenities">
                        <div class="amenity-list clearfix">
                            <ul>
                                ${amenityList}
                            </ul>
                        </div>
                    </div>
            
                    <div class="links clearfix">
                        <span class="map"><a href="${mapLink}" target="_blank"><span class="icon"><i class="fas fa-map-marker-alt"></i></span> Map</a></span>
                        <span class="website"><a href="${val.website}" target="_blank"><span class="icon"><i class="fas fa-globe"></i></span> Website</a></span>
                    </div>
                </div>
            </div>
        
        </div>
        `;
    }

    /**
     * This loops through the list of amenities and generates a template of li's.
     * @param {number[]} - of amenity values
     * @return {string} - of amenities in li tags
     */
    generateAmenityListTpl(amenities) {
        let amenityTpl = '';
        _.forEach(amenities, (val) => {
            let amenityData = this.findOptionData.find(lodgingAmenityOptions, val);
            if (amenityData !== undefined) {
                amenityTpl += `
                    <li class="${amenityData.class}"></li>
                `;
            }
        });

        return amenityTpl;
    }

    /**
     * Generates a cost template
     * @param {number} - id value to search for
     * @return {object} - returns the found object or an empty object
     */
    generateCostTpl(cost) {
        let costTpl = this.findOptionData.find(lodgingCostOptions, cost);
        
        if (costTpl !== undefined) {
            return costTpl;
        }

        return {label: ''};
    }

    /**
     * Returns the string for the given category id value.
     * @param {number} cat - category id value
     * @return {string} - category name
     */
    generateCategoryTpl(cat) {
        let catTpl = this.findOptionData.find(lodgingCategoryOptions, cat);
        
        if (catTpl !== undefined) {
            return catTpl;
        }

        return {label: ''};
    }

    /**
     * Returns the string for the units value
     * @param {number} units - units value
     * @return {string} - category name
     */
    generateUnitsTpl(units) {
        if (units !== '') {
            return 'Units: ' + units + ' &bull; ';
        } else {
            return '';
        }
    }

    /**
     * Returns the string for the phone values
     * @param {number} units - units value
     * @return {string} - category name
     */
    generatePhoneDivTpl(local, tollFree) {
        if (local !== '' && tollFree !== '') {
            return ' | ';
        } else {
            return '';
        }
    }

    /**
     * Returns the string for the street values
     * @param {number} street - street value
     * @param {number} street2 - street2 value
     * @return {string} - street address string
     */
    generateStreetTpl(street, street2) {
        if (street2 !== '') {
            return street + '<br>' + street2 + '<br>';
        } else if (street !== '') {
            return street + '<br>';
        } else {
            return '';
        }
    }

}