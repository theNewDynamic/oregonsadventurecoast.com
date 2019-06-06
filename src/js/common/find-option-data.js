import _ from 'lodash';

export default class FindOptionData {
    constructor() {}

    /**
     * Looks up the data object by id. This assumes id matches with list.value.
     * @param {array} - array of data objects to search
     * @param {number} - number for the value to search the list for
     * @return {object} - the matching object from the list
     */
    find(list, id) {
        return _.find(list, (val) => {
            return val.value == id;
        });
    }
}