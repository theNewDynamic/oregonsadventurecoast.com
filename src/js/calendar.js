// Calendar JS
import _ from 'lodash';
import Calendar from './calendar/Calendar';
import FilterToggles from './common/filter-toggles';
import {PAGINATION_DEFAULTS, PAGINATION_ACTIONS, FILTER_OPTION} from './common/constants';

(function($) {

    new FilterToggles();

    let calendarList = Array();
    let calendar = new Calendar();
    let filterOptions = {
        month: "all",
        city: "all"
    };
    let pagination = _.clone(PAGINATION_DEFAULTS);
    let fullCalendarList = {};

    /**
     * Call to get the events data
     * @param
     * @return
     */
	$.ajax({
        url: '/data-api/index.php?method=get&type=calendar',
        dataType: 'jsonp',
        contentType: 'application/json; charset=utf-8'
    })
    .done((data) => {
        fullCalendarList = _.cloneDeep(data);
        fullCalendarList = calendar.filterOldEvents(fullCalendarList);
        fullCalendarList = calendar.sortByStartDate(fullCalendarList);
        calendarList = _.cloneDeep(fullCalendarList);
        resetPagination(calendarList);
        outputCalendar(fullCalendarList);
        checkForResults(fullCalendarList);
    })
    .fail(function(jqXHR, status, error) {
        console.log(status);
    });

    /**
     * Setup on click events for filter menus
     */
    $('#filter-by-months').on('click', 'li', function(){
        resetCheckForResults();
        $('#filter-by-months').find('li').removeClass('-selected');
        $(this).addClass('-selected');
        $('#filter-by-months').slideUp();

        filterOptions.month = $(this).data('searchby');
        let filteredList = buildFilteredList(fullCalendarList, filterOptions);
        checkForResults(filteredList);
        outputCalendar(filteredList);
    });

    /**
     * Setup on click events for filter menus
     */
    $('#filter-by-city').on('click', 'li', function(){
        console.log($(this).data('searchby'));
        resetCheckForResults();
        $('#filter-by-city').find('li').removeClass('-selected');
        $(this).addClass('-selected');
        $('#filter-by-city').slideUp();

        filterOptions.city = $(this).data('searchby');
        let filteredList = buildFilteredList(fullCalendarList, filterOptions);
        checkForResults(filteredList);
        outputCalendar(filteredList);
    });

    /**
     * Handles writing the calendar data by appending the template to the given div
     */
    function outputCalendar(list) {
        let limit = pagination.page * pagination.show;
        let start = limit - pagination.show;

        // Reset output
        $('#calendar-output').html('');

        _.forEach(list, (val, index) => {
            if (index >= start && index < limit) {
                $('#calendar-output').append(calendar.generateTemplate(val));
            }
        });
    }

    /*
     * Filters the list and returns the filtered list
     */
    function buildFilteredList(list, filters) {

        let searchBy = {};

        if (filters.city === 'all' && filters.month === 'all') {
            return list;
        }

        if (filters.month !== 'all') {
            searchBy.month = filters.month.toString();
        }

        if (filters.city !== 'all') {
            searchBy.city = filters.city;
        }
        
        let filteredList = _.filter(list, searchBy);

        resetPagination(filteredList);

        // call outputCalendar with the updated list
        return filteredList;
    }

    /*
     * Checks that we have results, if not shows the no results graphic
     */
    function checkForResults(list) {
        if (list.length < 1) {
            $('#no-calendar-results').show();
        }
    }

    /*
     * Resets no results graphic display
     */
    function resetCheckForResults() {
        $('#no-calendar-results').hide();
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
            outputCalendar(calendarList);
        } else if (action === PAGINATION_ACTIONS.prev && pagination.page > 1) {
            pagination.page = pagination.page - 1;
            outputCalendar(calendarList);
        } else if (action > 0) {
            pagination.page = action;
            outputCalendar(calendarList);
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