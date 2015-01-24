define([],function(){
    var hasStock = function (product) {
        return product.stock() > 0;
    };

    var decreaseStock = function (product) {
        var s = product.stock();
        if (s > 0) {
            s--;
        }
        product.stock(s);
    };

    var clone = function (product) {
        return Product(product.id(), product.name(), product.price(), product.stock());
    };

    var refresh = function (product,newProduct) {
        product.name(newProduct.name());
        product.stock(newProduct.stock());
        product.price(newProduct.price());
    };

    return {
        hasStock:hasStock,
        decreaseStock:decreaseStock,
        clone:clone,
        refresh: refresh
    };
});
