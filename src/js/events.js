// Events JS
import _ from 'lodash';
import Events from './events/Events';

(function($) {

    let eventList = [];
    let events = new Events();
    let monthTitles = [];
    let moreEvents = [];

    /**
     * Call to get the events data
     * @param
     * @return
     */
	$.getJSON('/event/index.json', (data) => {
        eventList = events.filterOldEvents(data);
        eventList = events.sortByStartDate(eventList);

        _.forEach(eventList, function(event, index) {
            if (index === 0) {
                $('#event-large').html(events.generateLargeTemplate(event));
            } else if (index === 1 || index === 2) {
                $('#event-left').append(events.generateMediumTemplate(event));
            } else if (index === 3 || index === 4 || index === 5) {
                $('#event-right').append(events.generateSmallTemplate(event));
            } else {
                monthTitles.push({
                    month: events.getMonthString(event.startdate),
                    year: new Date(event.startdate).getFullYear()
                });
                moreEvents.push({
                    month: events.getMonthString(event.startdate),
                    year: new Date(event.startdate).getFullYear(),
                    event: event
                });
            }
        });

        monthTitles = _.uniqWith(monthTitles, _.isEqual);

        _.forEach(monthTitles, function(title) {
            $('#more-events').append(events.generateMoreTitleTpl(title));

            let eventsThisMonth = _.filter(moreEvents, {month: title.month, year: title.year});
            _.forEach(eventsThisMonth, function(anEvent) {
                $('#more-events').append(events.generateMoreEventTpl(anEvent));
            });
        });

        // Setup social sharing trigger
        $('.share-trigger').click(function(){
            $(this).next('.m-share').toggle();
        });
    });

    

})(jQuery);