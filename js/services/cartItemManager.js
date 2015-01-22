var CartItemManager = function(cartItem) {

    var cartItem = cartItem;

    var addUnit = function () {
        var u = cartItem.units();
        var _stock =  cartItem.product.stock();
        if (_stock === 0) {
            return;
        }
        cartItem.units(u+1);
        cartItem.product.stock(--_stock);
    };

    var removeUnit = function () {
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
}
