var ProductManager = function(product) {

    var product = product;

    var hasStock = function () {
        return product.stock() > 0;
    };

    var decreaseStock = function () {
        var s = product.stock();
        if (s > 0) {
            s--;
        }
        product.stock(s);
    };

    var clone = function () {
        return Product(product.id(), product.name(), product.price(), product.stock());
    };

    return {
        hasStock:hasStock,
        decreaseStock:decreaseStock,
        clone:clone
    };
}
