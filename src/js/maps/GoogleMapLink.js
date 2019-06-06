export default class GoogleMapLink {

    constructor() {}

    /**
     * Get a google map link given various address information.
     * @param
     * @return {string} - returns a google maps url
     */
    getLink(street1, street2, city, state, zip, title) {
        let address = '';

        if (street1 !== undefined && street1 !== '') {
            address = address + street1;
        }
        if (street2 !== undefined && street2 !== '') {
            address = address + " " + street2;
        }
        
        address = address + ",";

        if (city !== undefined && city !== '') {
            address = address + " " + city + ",";
        }
        if (state !== undefined && state !== '') {
            address = address + " " + state;
        }
        if (zip !== undefined && zip !== '') {
            address = address + " " + zip;
        }
        if (title !== undefined && title !== '') {
            address = title + ", " + address;
        }

        return 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(address);
    }

}