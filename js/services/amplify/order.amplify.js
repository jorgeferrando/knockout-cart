"use strict";
function OrderService() {
    function save(order,callback) {
        amplify.request({
            resourceId:"order.save",
            data:order,
            success:callback
        });
    }
    return {
        save: save
    };
}
