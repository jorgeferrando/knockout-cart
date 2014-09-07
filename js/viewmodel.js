var vm = (function () {
    "use strict";

    var catalog = ko.observableArray([
        new Product(1, "T-Shirt", 10.00, 20),
        new Product(1, "Trousers", 20.00, 10),
        new Product(1, "Shirt", 15.00, 20),
        new Product(1, "Shorts", 5.00, 10)
    ]);

    var newProduct = {
        name:ko.observable(),
        price:ko.observable(),
        stock:ko.observable(),
        clear: function() {
            this.name("");
            this.price("");
            this.stock("");
        }
    };

    var addProduct = function (data) {
        var id = new Date().valueOf();
        var product = new Product(
            id,
            data.name(),
            data.price(),
            data.stock()
        );
        vm.catalog.push(product);
        newProduct.clear();
    };

    return {
        catalog: catalog,
        newProduct: newProduct,
        addProduct: addProduct
    };
})();

ko.applyBindings(vm);