"use strict";
function OrderService() {
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
}

