"use strict";
var OrderResource = (function () {
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
})();

