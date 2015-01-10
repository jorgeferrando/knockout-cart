var Product = function (id,name,price,stock) {
    "use strict";

    var
        _id = ko.observable(id),
        _name = ko.observable(name),
        _price = ko.observable(price),
        _stock = ko.observable(stock)
    ;

    var hasStock = function () {
        return _stock() > 0;
    };

    return {
        id:_id,
        name:_name,
        price:_price,
        stock:_stock,
        hasStock: hasStock
    };
};
