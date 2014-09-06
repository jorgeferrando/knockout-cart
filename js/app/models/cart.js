(function () {
    'use strict';

    function Cart(lines) {

        this.lines = lines || [];
        this.total = 0.00;

    }

    return Cart;
}());

