import _ from 'lodash';
import TourAndEquipment from './tourandequipment/TourAndEquipment';
import {PAGINATION_DEFAULTS, PAGINATION_ACTIONS, FILTER_OPTION} from './common/constants';

(function($) {

    let tourEquipList = [];
    let tourandequipment = new TourAndEquipment();
    let pagination = _.clone(PAGINATION_DEFAULTS);

    /**
     * Call to get the lodging data
     * @param
     * @return
     */
	$.getJSON('/tourandequipment/index.json', (data) => {
        tourEquipList = _.filter(data, {'typeSelect': [2]});
        resetPagination(tourEquipList);
        outputTourAndEquipment(tourEquipList);
    });

    /**
     * Handles writing the lodging data by appending the template to the given div
     */
    function outputTourAndEquipment(list) {
        let limit = pagination.page * pagination.show;
        let start = limit - pagination.show;

        // Reset output
        $('#equipment-output').html('');

        _.forEach(list, (val, index) => {
            if (index >= start && index < limit) {
                $('#equipment-output').append(tourandequipment.generateTemplate(val));
            }
        });
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
            outputTourAndEquipment(tourEquipList);
        } else if (action === PAGINATION_ACTIONS.prev && pagination.page > 1) {
            pagination.page = pagination.page - 1;
            outputTourAndEquipment(tourEquipList);
        } else if (action > 0) {
            pagination.page = action;
            outputTourAndEquipment(tourEquipList);
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