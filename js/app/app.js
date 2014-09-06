(function () {
    "use strict";

    var catalog = [
        new Product("1", "T-Shirt" , 20),
        new Product("2", "Trousers", 15),
        new Product("3", "Sport Shirt", 10),
        new Product("4", "Shorts", 5)
    ];

    var vm = {
        catalog: catalog
    };

    ko.applyBindings(vm);
}());
