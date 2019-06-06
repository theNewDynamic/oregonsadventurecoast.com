import _ from 'lodash';

export default class Events {

    constructor() {
        
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
     * Returns a template with events values filled in for large events
     * @param {object} - one row from the events array of data
     * @return {string} - string of the template data
     */
    generateLargeTemplate(val) {
        let date = this.getDateString(val.startdate, val.enddate, false);
        return `
        <div class="item-wrap -large clearfix">
            <div class="util-bar clearfix">
                <p class="date">${date}</p>

                <div class="share">
                    <span class="share-bar-label share-trigger"><span class="hide-mobile">Share</span> <span class="icon"><i class="fas fa-share-square"></i></span></span>
                    <div class="m-share">
                        <span class="share-label">Share</span>
                        <ul class="share-list clearfix">
                            <li class="facebook"><a target="_blank" href="http://www.facebook.com/sharer.php?u=http://oregonsadventurecoast.com${val.url}"><i class="fab fa-facebook-f"></i></a></li>
                            <li class="twitter"><a target="_blank" href="https://twitter.com/share?url=http://oregonsadventurecoast.com${val.url}&amp;text=${val.desktoptitle}"><i class="fab fa-twitter"></i></a></li>
                            <li class="pinterest"><a href="javascript:void((function()%7Bvar%20e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','https://assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)%7D)());"><i class="fab fa-pinterest-p"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <a href="${val.url}">
                <div class="item" style="background-image: url(${val.largeboxphoto});">
                    <div class="description">
                        <h3>${val.hovertitle}</h3>
                        <p>${val.hoverdescription}</p>
                        <span class="more">Learn More</span>
                    </div>
                    <div class="label">${val.desktoptitle}</div>
                    <div class="mobile-label">${val.mobiletitle}</div>
                    <div class="overlay"></div>
                </div>
            </a>
        </div>
        `;
    }

    /**
     * Returns a template with events values filled in for medium events
     * @param {object} - one row from the events array of data
     * @return {string} - string of the template data
     */
    generateMediumTemplate(val) {
        let date = this.getDateString(val.startdate, val.enddate, true);
        return `
        <div class="item-wrap -medium clearfix">
            <div class="util-bar clearfix">
                <p class="date">${date}</p>

                <div class="share">
                    <span class="share-bar-label share-trigger"><span class="icon"><i class="fas fa-share-square"></i></span></span>
                    <div class="m-share">
                        <span class="share-label">Share</span>
                        <ul class="share-list clearfix">
                            <li class="facebook"><a target="_blank" href="http://www.facebook.com/sharer.php?u=http://oregonsadventurecoast.com${val.url}"><i class="fab fa-facebook-f"></i></a></li>
                            <li class="twitter"><a target="_blank" href="https://twitter.com/share?url=http://oregonsadventurecoast.com${val.url}&amp;text=${val.desktoptitle}"><i class="fab fa-twitter"></i></a></li>
                            <li class="pinterest"><a href="javascript:void((function()%7Bvar%20e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','https://assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)%7D)());"><i class="fab fa-pinterest-p"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <a href="${val.url}">
                <div class="item" style="background-image: url(${val.mediumboxphoto});">
                    <div class="description">
                        <h3>${val.hovertitle}</h3>
                        <p>${val.hoverdescription}</p>
                        <span class="more">Learn More</span>
                    </div>
                    <div class="label">${val.desktoptitle}</div>
                    <div class="mobile-label">${val.mobiletitle}</div>
                    <div class="overlay"></div>
                </div>
            </a>
        </div>
        `;
    }

    /**
     * Returns a template with events values filled in for small events
     * @param {object} - one row from the events array of data
     * @return {string} - string of the template data
     */
    generateSmallTemplate(val) {
        let date = this.getDateString(val.startdate, val.enddate, true);
        return `
        <div class="item-wrap -small clearfix">
            <div class="util-bar clearfix">
                <p class="date">${date}</p>

                <div class="share">
                    <span class="share-bar-label share-trigger"><span class="icon"><i class="fas fa-share-square"></i></span></span>
                    <div class="m-share">
                        <span class="share-label">Share</span>
                        <ul class="share-list clearfix">
                            <li class="facebook"><a target="_blank" href="http://www.facebook.com/sharer.php?u=http://oregonsadventurecoast.com${val.url}"><i class="fab fa-facebook-f"></i></a></li>
                            <li class="twitter"><a target="_blank" href="https://twitter.com/share?url=http://oregonsadventurecoast.com${val.url}&amp;text=${val.desktoptitle}"><i class="fab fa-twitter"></i></a></li>
                            <li class="pinterest"><a href="javascript:void((function()%7Bvar%20e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','https://assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);document.body.appendChild(e)%7D)());"><i class="fab fa-pinterest-p"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <a href="${val.url}">
                <div class="item" style="background-image: url(${val.smallboxphoto});">
                    <div class="description">
                        <h3>${val.hovertitle}</h3>
                        <p>${val.hoverdescription}</p>
                        <span class="more">Learn More</span>
                    </div>
                    <div class="label">${val.mobiletitle}</div>
                    <div class="mobile-label">${val.mobiletitle}</div>
                    <div class="overlay"></div>
                </div>
            </a>
        </div>
        `;
    }

    /**
     * Returns the title html template for an event title
     * @param {object} title - title data
     * @return {string}
     */
    generateMoreTitleTpl(title) {
        return `
            <div class="month-wrap">
                <h2 class="month">${title.month} ${title.year}</h2>
            </div>
        `;
    }

    /**
     * Returns the event html template for an event in the more list
     * @param {object} title - event data
     * @return {string}
     */
    generateMoreEventTpl(event) {
        let date = this.getDateString(event.event.startdate, event.event.enddate, false);
        return `
            <div class="event">
                <a href="${event.event.url}">
                    <span class="date">${date}</span>
                    <span class="title">${event.event.title}</span>
                </a>
            </div>
        `;
    }

    /**
     * Returns the month string given a date string
     * @param {date} date - in the format YYYY-MM-DD
     * @param {boolean} short - whether to use the short month name
     * @return {string} - name of the month
     */
    getMonthString(date, short) {
        let month = new Date(date);
        let month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        if (short === true) {
            return month_names_short[month.getUTCMonth()];
        } else {
            return month_names[month.getUTCMonth()];
        }
    }

    /**
     * 
     * @param {date} start - beginning date in the format YYYY-MM-DD
     * @param {date} end - end date in the format YYYY-MM-DD
     * @param {boolean} short - whether to use the short month name
     * @return
     */
    getDateString(start, end, short) {
        let dateString = '';
        let startDate = new Date(start);
        let endDate = new Date(end);

        if (start === end) {
            dateString = this.getMonthString(start, short) + ' ' + startDate.getUTCDate() + ', ' + startDate.getFullYear();
        } else {
            dateString = this.getMonthString(start, short) + ' ' + startDate.getUTCDate() + ' - ';
            
            if (startDate.getUTCMonth() === endDate.getUTCMonth()) {
                dateString = dateString + endDate.getUTCDate() + ', ';
            } else {
                dateString = dateString + this.getMonthString(end, short) + ' ' + endDate.getUTCDate() + ', ';
            }

            dateString = dateString + endDate.getFullYear();
        }

        return dateString;
    }
}