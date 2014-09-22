var CartProduct = function (product, units) {
    "use strict";

    var
        _product = product,
        _units = ko.observable(units)
    ;

    var subtotal = ko.computed(function(){
        return _product.price() * _units();
    });

    var addUnit = function () {
        var u = _units();
        var _stock = _product.stock();
        if (_stock === 0) {
            return;
        }
        _units(u+1);
        _product.stock(--_stock);
    };

    var removeUnit = function () {
        var u = _units();
        var _stock = _product.stock();
        if (u === 0) {
            return;
        }
        _units(u-1);
        _product.stock(++_stock);
    };

    return {
        product: _product,
        units: _units,
        subtotal: subtotal,
        addUnit : addUnit,
        removeUnit: removeUnit
    };
};
