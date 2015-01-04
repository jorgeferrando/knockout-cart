var vm = (function () {
    "use strict";

    var catalog = ko.observableArray([
        new Product(1, "T-Shirt", 10.00, 20),
        new Product(2, "Trousers", 20.00, 10),
        new Product(3, "Shirt", 15.00, 20),
        new Product(4, "Shorts", 5.00, 10)
    ]);

    var newProduct = new Product("","","","");

    var clearNewProduct = function () {
        newProduct.name("");
        newProduct.price("");
        newProduct.stock("");
    }

    var addProduct = function (data) {
        var id = new Date().valueOf();
        var product = Product(
            id,
            data.name(),
            data.price(),
            data.stock()
        );
        catalog.push(product);
        clearNewProduct();
        console.log(product);
    };

    var searchTerm = ko.observable("");

    var filteredCatalog = ko.computed(function () {
        //if catalog is empty return empty array
        if (!catalog()) {
            return [];
        }
        var filter = searchTerm().toLowerCase();
        //if filter is empty return all the catalog
        if (!filter) {
            return catalog();
        }
        //filter data
        var filtered = ko.utils.arrayFilter(catalog(), function (item) {
            var fields = ["name"]; //we can filter several properties
            var i = fields.length;
            while (i--) {
                var prop = fields[i];
                if (item.hasOwnProperty(prop) && ko.isObservable(item[prop])) {
                    var strProp = ko.utils.unwrapObservable(item[prop]).toLocaleLowerCase();
                    if (strProp && (strProp.indexOf(filter) !== -1)) {
                        return true;
                    }
                }
            }
            return false;
        });
        return filtered;
    });

    return {
        searchTerm: searchTerm,
        catalog: filteredCatalog,
        newProduct: newProduct,
        addProduct: addProduct
    };
})();

ko.applyBindings(vm);