import lunr from 'lunr';
import _ from 'lodash';
import UrlParams from './common/url-params';
import Search from './search/Search';

(function($){
    let urlParams = new UrlParams;
    let searchTerm = decodeURIComponent(urlParams.getAllUrlParams().search);
    let resultsOutput = '';
    let search = new Search();

    if (searchTerm !== '' && searchTerm !== undefined) {
        // Setup Lunr Search
        $.getJSON('/lunr.json', (data) => {
            let siteIndex = data;
            let idx = lunr(function () {
                this.ref('uri');
                this.field('title');
                this.field('content');
                
                data.forEach(function (doc) {
                    this.add(doc)
                }, this);
            });

            let results = idx.search(searchTerm);

            results.forEach((result) => {
                resultsOutput = resultsOutput + search.getSearchResultsTpl(_.find(siteIndex, {'uri': result.ref}));
            });

            $('#search-results-output').html(resultsOutput);
            $('#search-results-count').html(search.getSearchResultCountTpl(results.length, searchTerm));
        });
    }
    
})(jQuery);