var Shop;
Shop = Shop || {};
Shop.Resources = Shop.Resources || {};
Shop.Resources.OrderResource = (function ($) {
    function save(order) {
        return $.ajax({
            type: 'PUT',
            url: '/order',
            data: order
        });
    }
    return {
        save: save
    };
})(jQuery);

