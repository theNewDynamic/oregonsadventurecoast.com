(function($) {
    // Main nav toggle
    $('.menu-toggle').click(function(){
        $(this).find('.g-menu-x').toggleClass('-active');
        $('#main-nav').slideToggle('fast');
    });

    // Sidebar nav toggle for mobile
    $('.m-standard-nav').find('h3').append('<span class="menu-link g-menu-x"><i class="bar bar-top"></i><i class="bar bar-mid"></i><i class="bar bar-btm"></i></span>');
    $('.m-standard-nav').find('h3').click(function(){
        $(this).find('.g-menu-x').toggleClass('-active');
        $(this).next('ul').slideToggle();
        $(this).next('.nav-group-display').slideToggle();
    });
    

    // PDF & External Links in new window
    $('#bd').find('a').each(function(){
        let href = $(this).attr('href');
        if (href !== undefined && href.includes('.pdf')) {
            $(this).attr('target', '_blank');
        } else if (
                href !== undefined &&
                !href.includes('oregonsadventurecoast.com') &&
                !href.includes('localhost') &&
                href.charAt(0) !== '/' &&
                !href.includes('mailto:')) {
            $(this).attr('target', '_blank');
        }
    });

    // Sidebar nav highlight current page
    $('.m-standard-nav').find("li").each(function(index, item){
        if (window.location.href.indexOf($(this).data("taxonomyname")) !== -1) {
            $(this).addClass('active');
        }
    });

    // Share button trigger
    $('.share-trigger').click(function(){
        $(this).next('.m-share').toggle();
    });
})(jQuery);