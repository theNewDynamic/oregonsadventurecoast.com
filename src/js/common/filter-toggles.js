export default class FilterToggles {
    constructor() {
        (function($) {
            /* Toggle Code for Lodging, Dining, etc */
            $('#view-toggle-list').click(function(){
                $('#view-display').show();
                $('#view-map').hide();
                $('#view-display').addClass('-view-as-list');
                $('.view-bar-item').removeClass('active');
                $(this).addClass('active');
            });

            $('#view-toggle-grid').click(function(){
                $('#view-display').show();
                $('#view-map').hide();
                $('#view-display').removeClass('-view-as-list');
                $('.view-bar-item').removeClass('active');
                $(this).addClass('active');
            });

            $('#view-toggle-map').click(function(){
                $('#view-display').hide();
                $('#view-map').show();
                $('.view-bar-item').removeClass('active');
                $(this).addClass('active');
            });

            $('#filter-toggle').click(function(){
                $('#filters-list').slideToggle();
            });

            $('#filters-list').on('click', '.selection', function(){
                $('#filters-list').find('.filter-menu:visible').slideUp();
                $(this).next('ul:hidden').slideToggle();
            });
        })(jQuery);
    }
}