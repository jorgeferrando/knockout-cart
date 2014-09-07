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
        catalog.push(product);
        newProduct.clear();
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
                    var strProp = (item[prop]() + "").toLocaleLowerCase();
                    if (item[prop]() && (strProp.indexOf(filter) !== -1)) {
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