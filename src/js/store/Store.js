import _ from 'lodash';
import {StoreCategoryOptions as entryCategoryOptions} from './store-categories';
import FindOptionData from '../common/find-option-data';
import GoogleMapLink from '../maps/GoogleMapLink';

export default class Store {

    constructor() {
        this.findOptionData = new FindOptionData();
        this.googleMapLink = new GoogleMapLink();
    }

    /**
     * Returns a template with lodging values filled in
     * @param {object} - one row from the lodging array of data
     * @return {string} - string of the template data
     */
    generateTemplate(val) {
        let categories = this.generateCategoryTpl(val.property_category);
        let categoryLabels = []
        _.forEach(categories, function(value){
            categoryLabels.push(value.label)
        })
        let phoneDiv = this.generatePhoneDivTpl(val.phone_local, val.phone_toll_free);
        let street = this.generateStreetTpl(val.street, val.street2);
        let mapLink = this.googleMapLink.getLink(val.street, val.street2, val.city, val.state, val.zip, val.title);

        return `
        <div class="m-lodging-item">
            <div class="photo" style="background-image:url(${val.photo_name});" alt="${val.photo_alt}">

            </div>
        
            <div class="content marker-content">
                <div class="category">
                    ${categoryLabels.join(' | ')}
                </div>
        
                <div class="location">
                    <h2>${val.title}</h2>
                    <p class="address">
                        ${street}
                        ${val.city}, ${val.state || 'OR'} ${val.zip}<br>
                        ${val.phone_local} ${phoneDiv} ${val.phone_toll_free ? val.phone_toll_free : ''}
                    </p>
                </div>
        
                <div class="description">
                    ${val.property_description}
                </div>
                <div class="m-lodging-item__footer">
            
                    <div class="links clearfix">
                        <span class="map"><a href="${mapLink}" target="_blank"><span class="icon"><i class="fas fa-map-marker-alt"></i></span> Map</a></span>
                        <span class="website ${val.website != '' ? '' : 'hidden'}"><a href="${val.website}" target="_blank"><span class="icon"><i class="fas fa-globe"></i></span> Website</a></span>
                    </div>
                </div>
            </div>
        
        </div>
        `;
    }

    /**
     * Returns the string for the given category id value.
     * @param {number} cat - category id value
     * @return {string} - category name
     */
    generateCategoryTpl(cat) {
        if(typeof cat !== "undefined") {
            let cats = []
            cat.forEach(function(value){
                const tpl = this.findOptionData.find(entryCategoryOptions, value)
                if (tpl !== undefined) {
                    cats.push(tpl)
                }
            }, this)
            return cats
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
        if (local && tollFree) {
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
        if (street && street2) {
            return street + '<br>' + street2 + '<br>';
        } else if (street) {
            return street + '<br>';
        } else {
            return '';
        }
    }

}