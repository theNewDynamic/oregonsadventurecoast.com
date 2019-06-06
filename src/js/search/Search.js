export default class Search {
    constructor() {}

    /**
     * Returns a search result template
     * @param {object} result - one of the search result entries from lunr.json
     * @return {string} - templated string of the result
     */
    getSearchResultsTpl(result) {
        let uri = this.filterResultUri(result.uri);
        let content = this.truncateContent(result.content);

        return `
            <div class="search-result-item">
                <h2><a href="${uri}">${result.title}</a></h2>
                ${content}
                <span class="more"><a href="${uri}">Read More &raquo;</a></span>
            </div>
        `;
    }

    /**
     * Handles parsing and filtering the uri for specific pages or scenarios
     * @param {string} uri - the uri from lunr.json
     * @return {string} - revised uri after passing through below filter rules
     */
    filterResultUri(uri) {
        if (uri === '/_index') {
            return '/';
        }

        if (uri.indexOf('/lodgingitems/') >= 0) {
            return '/lodging/';
        }

        if (uri.indexOf('/event/') >= 0) {
            return '/events/';
        }

        return uri;
    }

    /**
     * Truncates the content to fit
     * @param {string} content - the content
     * @return {string} - truncated content
     */
    truncateContent(content) {
        if (content.length > 1) {
            return '<p>' + content.split(' ').splice(0, 20).join(' ') + '...</p>';
        } else {
            return '';
        }
    }

    /**
     * Returns a template for the result count
     * @param {number} count - number of results found
     * @param {string} term - search term used
     * @return {string} - template for results
     */
    getSearchResultCountTpl(count, term) {
        let message = '';

        if (count === 0) {
            message = 'No search results for';
        } else if (count === 1) {
            message = '1 search result for';
        } else {
            message = count + ' search results for';
        }


        return `
            <p class="search-results-count">${message}: <span class="term">${term}</span></p>
        `;
    }
}