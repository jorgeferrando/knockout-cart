var Shop;
Shop = Shop || {};
Shop.Models = Shop.Models || {};
Shop.Models.CartProduct = (function(ko){

    return function (product,units){
        var
            _product = product,
            _units = ko.observable(units)
            ;

        var subtotal = ko.computed(function(){
            return _product.price() * _units();
        });

        return {
            product: _product,
            units: _units,
            subtotal: subtotal
        };
    }

})(ko);
