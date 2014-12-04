define(['jquery'],function($){
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
});


