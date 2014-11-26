var Product = function (id,name,price,stock) {
    "use strict";

    var
        _id = ko.observable(id),
        _name = ko.observable(name).extend({
            required: true,
            minLength: 3,
            pattern: {
                message: 'Hey this doesn\'t match my pattern',
                params: '^[A-Za-z0-9 \-]+$'
            }
        }),
        _price = ko.observable(price).extend({
            required: true,
            number:true,
            min: 1
        }),
        _stock = ko.observable(stock).extend({
            required: true,
            min: 0,
            max: 99,
            number: true
        })
    ;

    var hasStock = function () {
        return _stock() > 0;
    };

    var decreaseStock = function (units) {
        var s = _stock();
        if (s > 0) {
            s--;
        }
        _stock(s);
    };

    var toObj = function () {
        return {
            id: _id(),
            name: _name(),
            price: _price(),
            stock: _stock()
        };
    }

    var errors = ko.validation.group([_name, _price, _stock]);
    return {
        id:_id,
        name:_name,
        price:_price,
        stock:_stock,
        hasStock: hasStock,
        decreaseStock:decreaseStock,
        toObj: toObj,
        errors: errors
    };
};