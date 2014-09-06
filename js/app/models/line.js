/**
 * Created by jorge on 06.09.14.
 */(function () {
    'use strict';

    function Line(product, quantity) {

        this.product = product || null;
        this.quantity = quantity;
    }

    return Line;
}());