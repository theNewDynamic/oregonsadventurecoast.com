// Entries JS

var entriesType = document.getElementById("entryTiles").getAttribute("entry-type");

import _ from 'lodash';
import FilterToggles from './common/filter-toggles';
import {PAGINATION_DEFAULTS, PAGINATION_ACTIONS, FILTER_OPTION} from './common/constants';
import GetFilterMatchType from './common/get-filter-match-type';
import SortMenu from './common/sort-menu';
import Map from './maps/Map';

import Lodging from './lodging/Lodging';
import Dining from './dining/Dining';

import {entryAmenityOptions as LodgingAmenityOptions} from './lodging/lodging-amenities';
import {LodgingCategoryOptions} from './lodging/lodging-categories';

import {DINING_FILTER_MATCH_BY} from './dining/dining-filter-match-by';
import {LODGING_FILTER_MATCH_BY} from './lodging/lodging-filter-match-by';

let Entries = "";
let entryAmenityOptions = "";
let entryCategoryOptions = "";
let ENTRY_FILTER_MATCH_BY = "";

if (entriesType == "lodging") {
    Entries = Lodging;
    entryAmenityOptions = LodgingAmenityOptions;
    entryCategoryOptions = LodgingCategoryOptions;
    ENTRY_FILTER_MATCH_BY = LODGING_FILTER_MATCH_BY;
}
else if (entriesType == "dining") {
    Entries = Dining;
    ENTRY_FILTER_MATCH_BY = DINING_FILTER_MATCH_BY;
}

function buildEntries() {
    
    const api_url = "https://api.oregonsadventurecoast.com";

    let markersArray = [];
    let lastInfoWindow = false;
    let hideMap = false;
    let bounds = new google.maps.LatLngBounds();


    /**
     * Sets up the initMap callback function for Maps API to call back into.
     * @param
     * @return
     */
    var map;
    function initMap() {
      map = new google.maps.Map(document.getElementById('view-map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }

    (function($) {

        new FilterToggles();

        let entryList = Array();
        let entry = new Entries();
        let filterOptions = Array();
        let pagination = _.clone(PAGINATION_DEFAULTS);
        let fullEntriesList = {};
        let getFilterMatchType = new GetFilterMatchType();
        let sortMenu = new SortMenu();
        let sortAlpha = false;

        /**
         * Call to get the entry data
         * @param
         * @return
         */
        if (entriesType == "lodging") {
            $.ajax({
                url: api_url + '/data-api/index.php?method=get&type=lodging',
                dataType: 'jsonp',
                contentType: 'application/json; charset=utf-8'
            })
    	    $.getJSON('/lodgingitems/index.json', (data) => {
                fullEntriesList = _.cloneDeep(data);
                entryList = data;
                entryList = sortMenu.sortAscending(entryList, 'property_name');
                entryList = entry.sortByInitialPriority(entryList);
                resetPagination(entryList);
                outputEntries(entryList);
                buildFilterMenu('property_category', '#filter-by-category', fullEntriesList, false, 'All Categories', entryCategoryOptions);
                buildFilterMenu('city', '#filter-by-city', fullEntriesList, false, 'All Cities');
                buildFilterMenu('amenityList', '#filter-by-amenity', fullEntriesList, true, 'All Amenities', entryAmenityOptions);
            })
            .fail(function(jqXHR, status, error) {
                console.log(status);
            });
        }
        else if (entriesType == "dining") {
            $.ajax({
                url: api_url + '/data-api/index.php?method=get&type=dining',
                dataType: 'jsonp',
                contentType: 'application/json; charset=utf-8'
            })
            .done((data) => {
                fullEntriesList = _.cloneDeep(data);
                entryList = data;
                entryList = sortMenu.sortAscending(entryList, 'property_name');
                resetPagination(entryList);
                outputEntries(entryList);
                buildFilterMenu('category', '#filter-by-category', fullEntriesList, true, 'All Categories');
                buildFilterMenu('city', '#filter-by-city', fullEntriesList, false, 'All Cities');
            })
            .fail(function(jqXHR, status, error) {
                console.log(status);
            });
        }

        /**
         * Setup Menu Sorting
         */
        $('#sort-menu-ascending').click(function(){
            entryList = sortMenu.sortAscending(entryList, 'property_name');
            sortMenu.setClasses($(this));
            resetPagination(entryList);
            outputEntries(entryList);
            sortAlpha = true
        });
        $('#sort-menu-descending').click(function(){
            entryList = sortMenu.sortDescending(entryList, 'property_name');
            sortMenu.setClasses($(this));
            resetPagination(entryList);
            outputEntries(entryList);
            sortAlpha = true
        });

        /**
         * Handles writing the entry data by appending the template to the given div
         */
        function outputEntries(list) {
            let limit = pagination.page * pagination.show;
            let start = limit - pagination.show;
            let validEntry = false;

            // Reset output
            $('#entry-output').html('');

            _.forEach(list, (val, index) => {
                if(typeof val.latitude != "undefined" && typeof val.longitude != "undefined") {
                    createMarker(val);
                }

                if (index >= start && index < limit) {
                    $('#entry-output').append(entry.generateTemplate(val));
                };
            });

            //find the initial map bounds
            for (let i = 0; i < markersArray.length; i++) {
                if(!isNaN(markersArray[i].getPosition().lng()) && !isNaN(markersArray[i].getPosition().lat())){
                    bounds.extend(markersArray[i].getPosition());
                }
            }

            //set the initial map bounds
            viewMap.fitBounds(bounds);

            //hide the map if initial page load
            if(hideMap === false){
                document.getElementById("view-map").style.display = "none";
                hideMap = true;
            }
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

            //if (sort === true) {
                menu.sort(); // Forcing sort to always run.
            //}

            // Getting rid of undefined in the list, somehow it got in.
            _.remove(menu, function(item){
                return item === undefined;
            });

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

            //if not on the map tab, briefly enable map with no opacity to allow the map to update
            enableMap();

            entryList = buildFilteredList(fullEntriesList, filterOptions);

            //update map markers
            reloadMapMarkers(entryList);

            //if not on the map tab, disable the map, now that it has been updated
            disableMap();

            outputEntries(entryList);
        }

        // 
        function buildFilteredList(list, filters) {
            // create copy of entryList

            let itemPassedFilterChecks = {};
            let filteredList = _.filter(list, (item) => {
                let addItemToList = true;

                _.forIn(filters, (filter, filterKey) => {

                    if (_.has(item, filterKey)) {
                        itemPassedFilterChecks[filterKey] = true;
                        _.forEach(filter, (filterValue) => {
                            if (item[filterKey].indexOf(filterValue) === -1 
                                    && getFilterMatchType.getType(ENTRY_FILTER_MATCH_BY, filterKey) === 'AND') {
                                // We've found one of the values does not exist for an AND so we fail this filterKey and stop the loop.
                                itemPassedFilterChecks[filterKey] = false;
                                return false;
                            } else if (item[filterKey].indexOf(filterValue) === -1 
                                    && getFilterMatchType.getType(ENTRY_FILTER_MATCH_BY, filterKey) === 'OR') {
                                // We've found one value does not exist, we'll set to false and keep checking since this is an OR.
                                itemPassedFilterChecks[filterKey] = false;
                            } else if (item[filterKey].indexOf(filterValue) !== -1
                                    && getFilterMatchType.getType(ENTRY_FILTER_MATCH_BY, filterKey) === 'AND') {
                                // We've found a filter value that exists for an AND so we'll set to true but keep checking.
                                itemPassedFilterChecks[filterKey] = true;
                            } else if (item[filterKey].indexOf(filterValue) !== -1
                                    && getFilterMatchType.getType(ENTRY_FILTER_MATCH_BY, filterKey) === 'OR') {
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
                    if (valid === false) {
                        addItemToList = false;
                    }
                });
                return addItemToList;
            });

            // reset pagination
            resetPagination(filteredList);

            if (entriesType == "lodging") {
                //Sort by Intial Priority (only if Alpha sorting is off)
                if(!sortAlpha){
                    filteredList = entry.sortByInitialPriority(filteredList);
                }
            }
            // call outputEntries with the updated list
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
                outputEntries(entryList);
            } else if (action === PAGINATION_ACTIONS.prev && pagination.page > 1) {
                pagination.page = pagination.page - 1;
                outputEntries(entryList);
            } else if (action > 0) {
                pagination.page = action;
                outputEntries(entryList);
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

        /**
         * Creates a map marker for each entry entry and pushes it to markersArray.
         * @param {object | val} - the given entry entry
         * @return null
         */
        function createMarker(val){ 
            //create the info window
            let infowindow = new google.maps.InfoWindow({
                content: "<span class='map-info-window'>" + entry.generateTemplate(val) + "</span>"
            });
            let markerPosition = {lat: parseFloat(val.latitude), lng: parseFloat(val.longitude)};

            //create the map marker
            var marker = new google.maps.Marker({
                position: markerPosition,
                map: viewMap,
                title: val.name,
                visible: true
            });

            //display the info window when the marker is clicked
            marker.addListener('click', function() {
                if (lastInfoWindow){
                    lastInfoWindow.close();
                }
                lastInfoWindow = infowindow;
                infowindow.open(viewMap, marker);
            });


            //add the marker to markersArray
            markersArray.push(marker);
        }

        /**
         * Accepts a list of entry entries and display only the corresponding map markers.
         * @param {list | entryList} - the entry entries to be displayed on the map
         * @return null
         */
        function reloadMapMarkers(entryList){
            // first, hide all map markers
            for (let i = 0; i < markersArray.length; i++){
                markersArray[i].setVisible(false);
            }

            //check every list item against every map marker
            for (let i = 0; i < entryList.length; i++){
                for (let j = 0; j < markersArray.length; j++){
                    // if the list item lat/lng matches the map marker lat/lng, make the marker visible
                    if ((entryList[i].latitude == markersArray[j].getPosition().lat()) && (entryList[i].longitude == markersArray[j].getPosition().lng())){
                        markersArray[j].setVisible(true);
                        j = markersArray.length;
                    }
                }
            }

            viewMap.fitBounds(bounds);
        }

        /**
         * Enable the map for updates on tabs where it is disabled
         * @param
         * @return
         */
        function enableMap(){
            if (!document.getElementById("view-toggle-map").classList.contains("active")){
                document.getElementById("view-map").style.opacity = "0";
                document.getElementById("view-map").style.display = "block";
            }
        }

        /**
         * disable the map after updates on tabs where it should disabled
         * @param
         * @return
         */
        function disableMap(){
            if (!document.getElementById("view-toggle-map").classList.contains("active")){
                setTimeout(function(){
                    document.getElementById("view-map").style.display = "none";
                    document.getElementById("view-map").style.opacity = "100";
                }, 10);
            }
        }

    })(jQuery);

}

window.onload = buildEntries;