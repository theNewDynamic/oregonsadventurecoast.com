import Instafeed from 'instafeed.js';

(function($){
    var feed = new Instafeed({
        get: 'user',
        userId: '',
        clientId: 'YOUR_CLIENT_ID'
    });
    feed.run();
})(jQuery);