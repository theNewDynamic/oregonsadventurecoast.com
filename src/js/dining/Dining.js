import _ from 'lodash';
import {diningCategoryOptions} from './dining-categories';
import FindOptionData from '../common/find-option-data';
import GoogleMapLink from '../maps/GoogleMapLink';

export default class Lodging {

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
        let category = this.generateCategoryTpl(val.category);
        let phone = this.generatePhoneTpl(val.phone1, val.phone2);
        let address = this.generateAddressTpl({
            address1: val.address1,
            address2: '',
            city: val.city,
            state: val.state,
            zipcode: val.zipcode
        });
        let website = this.generateWebsiteTpl(val.links);
        let photo = this.generateImageTpl(val.media);
        let photoURL = this.generateImageSRC(val.media);
        let mapLink = this.googleMapLink.getLink(val.address1, '', val.city, val.state, val.zipcode, val.name);

        return `
        <div class="m-lodging-item">
            <div class="photo" style="background-image:url(${photoURL});">
            </div>
        
            <div class="content">
                <div class="category">
                    ${category}
                </div>
        
                <div class="location">
                    <h2>${val.name}</h2>
                    <p class="address">
                        ${address}<br>
                        ${phone}
                    </p>
                </div>
        
                <div class="description">
                    ${val.description}
                </div>
                <div class="m-lodging-item__footer">
                    <div class="links clearfix">
                        <span class="map"><a href="${mapLink}" target="_blank"><span class="icon"><i class="fas fa-map-marker-alt"></i></span> Map</a></span>
                        ${website}
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
        let label = '&nbsp;';
        _.forEach(cat, (singleCat, index) => {
            if (index !== 0) {
                label = label + " | " + singleCat;
            } else {
                label = singleCat;
            }
        });

        return label;
    }

    /**
     * Generate phone template
     * @param
     * @return {string} - phone template string
     */
    generatePhoneTpl(phone1, phone2) {
        if (phone2 !== undefined) {
            return phone1 + ' | ' + phone2;
        } else if (phone1 !== undefined) {
            return phone1;
        } else {
            return '';
        }
    }

    /**
     *  Returns an address
     * @param
     * @return {string} - address string
     */
    generateAddressTpl(address) {
        let addressTpl = '';

        if (address.address1 !== '' && address.address1 !== undefined) {
            addressTpl = addressTpl + address.address1;
        }

        if (address.address2 !== '' && address.address2 !== undefined) {
            addressTpl = addressTpl + ' ' + address.address2;
        }

        if (address.city !== '' && address.city !== undefined) {
            addressTpl = addressTpl + ' ' + address.city;
        }

        if (address.state !== '' && address.state !== undefined) {
            addressTpl = addressTpl + ' ' + address.state;
        }

        if (address.zipcode !== '' && address.zipcode !== undefined) {
            addressTpl = addressTpl + ', ' + address.zipcode;
        }

        return addressTpl;
    }

    /**
     * Returns website template string
     * @param
     * @return {string} - website template
     */
    generateWebsiteTpl(links) {
        let websiteTpl = '';
        let website = '';
        if(!links.length){
            return websiteTpl;
        }
        if(links.length > 1){
            _.forEach(links, (link, index) => {
                if (link.network_type == "Website") {
                    website = link.url
                }    
            });
        } else {
            website = links[0].url
        }
        if (website !== undefined && website !== '') {
            return `
                <span class="website"><a href="${website}" target="_blank"><span class="icon"><i class="fas fa-globe"></i></span> Website</a></span>
            `;
        }
        
        return websiteTpl;
    }

    /**
     * Returns image url for media
     * @param
     * @return {string} - media template for images
     */
    generateImageSRC(media) {
        if (media.photos.length > 0) {
            return media.photos[0].image;
        } else {
            return '';
        }
    }

    /**
     * Returns image tag for media
     * @param
     * @return {string} - media template for images
     */
    generateImageTpl(media) {
        if (media.photos.length > 0) {
            return `
                <img src="${media.photos[0].image}" alt="${media.photos[0].caption}">
            `;
        } else {
            return '';
        }
    }

}