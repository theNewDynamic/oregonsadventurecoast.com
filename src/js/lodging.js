// Lodging JS
import _ from 'lodash';
import Lodging from './lodging/Lodging';
import FilterToggles from './common/filter-toggles';
import {PAGINATION_DEFAULTS, PAGINATION_ACTIONS, FILTER_OPTION} from './common/constants';
import {lodgingAmenityOptions} from './lodging/lodging-amenities';
import {lodgingCategoryOptions} from './lodging/lodging-categories';
import {LODGING_FILTER_MATCH_BY} from './lodging/lodging-filter-match-by';
import GetFilterMatchType from './common/get-filter-match-type';
import SortMenu from './common/sort-menu';
import Map from './maps/Map';

/**
 * Sets up the initMap callback function for Maps API to call back into.
 * @param
 * @return
 */
let map = new Map();
function initMap() {
    // call here to Map.initMap
    map.initMap('lodging-map', []);
}

(function($) {

    new FilterToggles();

    let lodgingList = Array();
    let lodging = new Lodging();
    let filterOptions = Array();
    let pagination = _.clone(PAGINATION_DEFAULTS);
    let fullLodgingList = {};
    let getFilterMatchType = new GetFilterMatchType();
    let sortMenu = new SortMenu();

    /**
     * Call to get the lodging data
     * @param
     * @return
     */
	$.getJSON('/lodgingitems/index.json', (data) => {
        fullLodgingList = _.cloneDeep(data);
        lodgingList = data;
        //lodgingList = sortMenu.sortAscending(lodgingList, 'property_name');
        lodgingList = lodging.sortByInitialPriority(lodgingList);
        resetPagination(lodgingList);
        outputLodging(lodgingList);
        buildFilterMenu('property_category', '#filter-by-category', fullLodgingList, false, 'All Categories', lodgingCategoryOptions);
        buildFilterMenu('city', '#filter-by-city', fullLodgingList, false, 'All Cities');
        buildFilterMenu('amenityList', '#filter-by-amenity', fullLodgingList, true, 'All Amenities', lodgingAmenityOptions);
    });

    /**
     * Setup Menu Sorting
     */
    $('#sort-menu-ascending').click(function(){
        lodgingList = sortMenu.sortAscending(lodgingList, 'property_name');
        sortMenu.setClasses($(this));
        resetPagination(lodgingList);
        outputLodging(lodgingList);
    });
    $('#sort-menu-descending').click(function(){
        lodgingList = sortMenu.sortDescending(lodgingList, 'property_name');
        sortMenu.setClasses($(this));
        resetPagination(lodgingList);
        outputLodging(lodgingList);
    });

    /**
     * Handles writing the lodging data by appending the template to the given div
     */
    function outputLodging(list) {
        let limit = pagination.page * pagination.show;
        let start = limit - pagination.show;

        // Reset output
        $('#lodging-output').html('');

        _.forEach(list, (val, index) => {
            if (index >= start && index < limit) {
                $('#lodging-output').append(lodging.generateTemplate(val));
            }
        });
    }

    /**
     * Finds the unique items in the given list. List can be an array or array of arrays.
     * @param {string} key - key to search the list for
     * @param {array} list - array or array of arrays with the given values
     * @param {boolean} sort - whether to sort the menu
     * @return
     */
    function findFilterMenuItems(key, list, arrayOfArrays, sort) {
        let menu = [];

        if (!arrayOfArrays) {
            // loops through list looking for key
            menu = _.uniq(_.map(list, key));
        } else {
            menu = _.uniq(_.flattenDeep(_.map(list, key)));
        }

        if (sort === true) {
            menu.sort();
        }

        return menu;
    }

    /**
     * Handles building the filter list.
     * @param {boolean} arrayOfArrays - true/false for single level or 2D arrays
     * @param {string} selectAllLabel - label for the select all menu option
     * @return
     */
    function buildFilterMenu(
            key,
            domTargetIdString,
            list,
            arrayOfArrays,
            selectAllLabel,
            labels
        ) {
        let filterMenuHtml = '';
        let sortMenu = false;

        if (labels !== undefined) {
            sortMenu = true;
        }

        let menu = findFilterMenuItems(key, list, arrayOfArrays, sortMenu);

        // Setup select all option
        filterMenuHtml = filterMenuHtml + getFilterMenuTpl('SELECT_ALL', [{value: 'SELECT_ALL', label: selectAllLabel}]);

        // calls tpl to render templates
        _.forEach(menu, (item) => {
            filterMenuHtml = filterMenuHtml + getFilterMenuTpl(item, labels);
        });

        $(domTargetIdString).html(filterMenuHtml);

        $(domTargetIdString).on('click', 'li', function(){
            let clickedEl = $(this);
            let selectAllEl = $(this).parent('ul').find('.select-all');
            $(this).parent('ul').slideUp();
            if (clickedEl.data('filtervalue') === 'SELECT_ALL') {
                clickedEl.parent('ul').find('li').removeClass('-selected');

                clickedEl.addClass('-select-all-selected');
                resetFilterForKey(key);
            } else {
                if (clickedEl.hasClass('-selected')) {
                    updateFilterOptions(key, clickedEl.data('filtervalue'), FILTER_OPTION.remove);
                    clickedEl.removeClass('-selected');
                } else {
                    updateFilterOptions(key, clickedEl.data('filtervalue'), FILTER_OPTION.add);
                    clickedEl.addClass('-selected');
                }

                if (clickedEl.parent('ul').find('.-selected').length) {
                    selectAllEl.removeClass('-select-all-selected');
                } else {
                    selectAllEl.addClass('-select-all-selected');
                }
            }
        });
    }

    /**
     * Returns the template for a filter menu option
     * @param {string} - data object
     * @return {string} - filter menu template code
     */
    function getFilterMenuTpl(data, labels) {
        let label = data;
        let className = '';

        if (data === 'SELECT_ALL') {
            className = 'select-all -select-all-selected';
        } else if (labels !== undefined) {
            data = parseInt(data, 10);
        }

        if (labels !== undefined) {
            let foundLabel = _.find(labels, {'value': data});
            if (foundLabel !== undefined) {
                label = foundLabel.label;
            }
        }

        return `
            <li class="${className}" data-filtervalue="${data}">${label}</li>
        `;
    }

    /**
     * Resets the filter by removing a given key (representing a full menu)
     * @param {string} key - key to remove
     * @return null
     */
    function resetFilterForKey(key) {
        delete filterOptions[key];
        // Here we call update filter with null values to get a new reset and render after
        // having removed the above key.
        updateFilterOptions(null, null, null);
    }

    /**
     * Updates the filter options
     * @param
     * @return {object} - returns the new filtered list based on the updated options
     */
    function updateFilterOptions(key, value, action) {
        
        if (action === FILTER_OPTION.add) {
            if (_.has(filterOptions, key)) {
                filterOptions[key].push(value);
            } else {
                filterOptions[key] = [value];
            }
        } else if (action === FILTER_OPTION.remove && _.has(filterOptions, key)) {
            // let index = filterOptions[key].indexOf(value);
            // if (index !== -1) {
            //     filterOptions.splice(index, 1);
            // }
            _.pull(filterOptions[key], value);

            if (filterOptions[key].length === 0) {
                // Remove the key since there are no more values present
                delete filterOptions[key];
            }
        }

        // update filter option settings
        console.log('updating filter options with ', key, ' with value of ', value, ' to ', action, ' it.');

        lodgingList = buildFilteredList(fullLodgingList, filterOptions);

        outputLodging(lodgingList);
    }

    // 
    function buildFilteredList(list, filters) {
        // create copy of lodgingList
        
        let itemPassedFilterChecks = {};
        let filteredList = _.filter(list, (item) => {
            let addItemToList = true;

            _.forIn(filters, (filter, filterKey) => {

                if (_.has(item, filterKey)) {
                    itemPassedFilterChecks[filterKey] = true;
                    _.forEach(filter, (filterValue) => {
                        if (item[filterKey].indexOf(filterValue) === -1 
                                && getFilterMatchType.getType(LODGING_FILTER_MATCH_BY, filterKey) === 'AND') {
                            // We've found one of the values does not exist for an AND so we fail this filterKey and stop the loop.
                            itemPassedFilterChecks[filterKey] = false;
                            return false;
                        } else if (item[filterKey].indexOf(filterValue) === -1 
                                && getFilterMatchType.getType(LODGING_FILTER_MATCH_BY, filterKey) === 'OR') {
                            // We've found one value does not exist, we'll set to false and keep checking since this is an OR.
                            itemPassedFilterChecks[filterKey] = false;
                        } else if (item[filterKey].indexOf(filterValue) !== -1
                                && getFilterMatchType.getType(LODGING_FILTER_MATCH_BY, filterKey) === 'AND') {
                            // We've found a filter value that exists for an AND so we'll set to true but keep checking.
                            itemPassedFilterChecks[filterKey] = true;
                        } else if (item[filterKey].indexOf(filterValue) !== -1
                                && getFilterMatchType.getType(LODGING_FILTER_MATCH_BY, filterKey) === 'OR') {
                            // We've found a filter value that exists for an OR so we'll set to true and exit the loop.
                            itemPassedFilterChecks[filterKey] = true;
                            return false;
                        }
                    });
                } else {
                    itemPassedFilterChecks[filterKey] = false;
                }

            });

            //console.log(itemPassedFilterChecks);

            // Ensure that all filters have a valid match for the item.
            _.forIn(itemPassedFilterChecks, (valid) => {
                console.log(valid);
                if (valid === false) {
                    addItemToList = false;
                }
            });

            return addItemToList;
        });

        // reset pagination
        resetPagination(filteredList);

        // call outputLodging with the updated list
        return filteredList;
    }

    //
    // Setup pagination - move this to separate file
    //
    $('#paginate-next').click(() => {
        updatePagination(PAGINATION_ACTIONS.next);
    });
    $('#paginate-prev').click(() => {
        updatePagination(PAGINATION_ACTIONS.prev);
    });
    $('#paginate-numbers').on('click', 'span', function() {
        updatePagination($(this).data('pagenumber'));
    });

    /**
     * Resets the pagination to the default values while maintaining the total.
     * @return null
     */
    function resetPagination(filteredList) {
        pagination.show = PAGINATION_DEFAULTS.show;
        pagination.page = PAGINATION_DEFAULTS.page;
        pagination.total = filteredList.length;

        buildPagination();
        setPaginationClasses();
    }

    /**
     * Outputs the numbers for the pagination
     * @return null
     */
    function buildPagination() {
        let pageCounter = 1;
        let paginationTpl = '';

        while(pageCounter <= Math.ceil(pagination.total / pagination.show)) {
            paginationTpl = paginationTpl + `
                <span data-pagenumber="${pageCounter}">${pageCounter}</span>
            `;
            pageCounter++;
        }

        // Output to pagination div
        $('#paginate-numbers').html(paginationTpl);
    }

    /**
     * Updates the pagination variable based on the given action.
     * Also toggles the appropriate class on the next and previous buttons.
     * @param {string | number} - the given action to take, NEXT, PREV, or a page number
     * @return null
     */
    function updatePagination(action) {
        if (action === PAGINATION_ACTIONS.next && pagination.show * pagination.page < pagination.total) {
            pagination.page = pagination.page + 1;
            outputLodging(lodgingList);
        } else if (action === PAGINATION_ACTIONS.prev && pagination.page > 1) {
            pagination.page = pagination.page - 1;
            outputLodging(lodgingList);
        } else if (action > 0) {
            pagination.page = action;
            outputLodging(lodgingList);
        }
        
        setPaginationClasses();

        $(window).scrollTop(0);
    }

    /**
     * Handles setting the pagination next / previous classes properly.
     * @param
     * @return
     */
    function setPaginationClasses() {
        $('#paginate-prev').removeClass('-paginate-disabled');
        $('#paginate-next').removeClass('-paginate-disabled');

        if (pagination.page === 1) {
            $('#paginate-prev').addClass('-paginate-disabled');
        } else {
            $('#paginate-prev').removeClass('-paginate-disabled');
        }

        if (pagination.show * pagination.page >= pagination.total) {
            $('#paginate-next').addClass('-paginate-disabled');
        } else {
            $('#paginate-next').removeClass('-paginate-disabled');
        }

        // Remove .current page class, then find current page and add .current class
        $('#paginate-numbers').find('.current').removeClass('current');

        $('#paginate-numbers > span').each(function(){
            if ($(this).data('pagenumber') == pagination.page) {
                $(this).addClass('current');
            }
        });
    }

})(jQuery);