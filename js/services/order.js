var Shop = Shop || {};
Shop.Services = Shop.Services || {};
Shop.Services.Order = (function($){
    return function () {
        function save(orderAndCustomer) {
            return $.ajax({
                type: 'PUT',
                url: '/order',
                data: orderAndCustomer
            });
        }
        return {
            save: save
        };
    };
})(jQuery);


