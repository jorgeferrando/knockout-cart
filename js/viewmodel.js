
var vm = (function () {
    "use strict";

    var product = new Product(1,"T-Shirt", 10.00, 20);

    return {
        product: product
    };
})();

ko.applyBindings(vm);