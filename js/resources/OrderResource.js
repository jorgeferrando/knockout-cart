define(['jquery'],function($){
    function save(order) {
        return $.ajax({
            type: 'POST',
            url: '/order',
            data: order
        });
    }
    return {
        save: save
    };
});

