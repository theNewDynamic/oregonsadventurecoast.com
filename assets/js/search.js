import lunr from 'lunr';
import _ from 'lodash';
import UrlParams from './common/url-params';
import Search from './search/Search';

const doSearch = async function() {
    let urlParams = new UrlParams;
    let searchTerm = decodeURIComponent(urlParams.getAllUrlParams().search);
    let resultsOutput = '';
    let search = new Search();

    if (searchTerm !== '' && searchTerm !== undefined) {
        // Setup Lunr Search
        fetch('/index.json')
        .then(response => response.json())
        .then(data => {
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
                resultsOutput = resultsOutput + search.getSearchResultsTpl(_.find(data, {'uri': result.ref}));
            });
            document.getElementById('search-results-output').innerHTML = resultsOutput
            document.getElementById('search-results-count').innerHTML = search.getSearchResultCountTpl(results.length, searchTerm)
        });
    }
}

doSearch()