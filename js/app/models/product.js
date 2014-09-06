(function () {
    'use strict';

    function Product(id,name,price) {

        this.id = id || -1;
        this.name = name || "";
        this.price = price || 0.00;

    }

    return Product;
}());



