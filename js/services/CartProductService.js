define([],function(){
    var addUnit = function (cartItem) {
        var u = cartItem.units();
        var _stock =  cartItem.product.stock();
        if (_stock === 0) {
            return;
        }
        cartItem.units(u+1);
        cartItem.product.stock(--_stock);
    };

    var removeUnit = function (cartItem) {
        var u =  cartItem.units();
        var _stock =  cartItem.product.stock();
        if (u === 0) {
            return;
        }
        cartItem.units(u-1);
        cartItem.product.stock(++_stock);
    };


    return {
        addUnit:addUnit,
        removeUnit:removeUnit
    };
});
