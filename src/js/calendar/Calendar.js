import _ from 'lodash';
import Events from '../events/Events';
import GoogleMapLink from '../maps/GoogleMapLink';

export default class Calendar {

    constructor() {
        this.googleMapLink = new GoogleMapLink();
    }

    /**
     * Filters out old events more than 1 day past enddate
     * @param {array} events - list of events
     * @return {array} - filtered list of events
     */
    filterOldEvents(events) {
        return _.filter(events, function(event) {
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            let yesterday = today.getTime() - (86400000 * 2);
            let enddate = new Date(event.enddate);
            
            if (enddate.getTime() > yesterday) {
                return true;
            } else {
                return false;
            }
        });
    }

    /**
     * Sort events list by start date
     * @param {array} events - list of events
     * @return {array} - ordered list of events
     */
    sortByStartDate(events) {
        return _.orderBy(events, ['startdate'], ['asc']);
    }

    /**
     * Returns the template for a calendar item
     * @param {object} val - calendar item data
     * @return {string} - calendar template
     */
    generateTemplate(val) {
        let events = new Events();
        let date = events.getDateString(val.startdate, val.enddate, false);
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
        let mapLink = this.googleMapLink.getLink(val.address1, '', val.city, val.state, val.zipcode, val.name);

        return `
            <div class="m-calendar-item clearfix">
                <div class="photo">
                    ${photo}
                </div>
            
                <div class="content">
                    <h2>${val.name}</h2>
                    <p class="date"><span class="icon"><i class="fas fa-calendar-alt"></i></span> ${date}</p>
                    
                    ${val.description}
                    
                    <p class="address">
                        ${address}
                        <span class="map"><a href="${mapLink}" target="_blank">Map It</a></span>
                    </p>

                    <p class="phone">
                        ${phone}
                        ${website.desktop}
                    </p>

                    ${website.mobile}
                </div>
            </div>
        `;
    }

    /**
     * Generate phone template
     * @param
     * @return {string} - phone template string
     */
    generatePhoneTpl(phone1, phone2) {
        if (phone2 !== undefined) {
            return phone1 + ' &bull; ' + phone2;
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
        let websiteTpl = {desktop: '', mobile: ''};
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
            websiteTpl.desktop = `
                <span class="website"><a href="${website}" target="_blank"><span class="icon"><i class="fas fa-globe"></i></span> Website</a></span>
            `;
            websiteTpl.mobile = `
                <p class="website -mobile"><a href="${website}" target="_blank">Website</a></p>
            `;
        }
        
        return websiteTpl;
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