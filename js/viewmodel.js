var vm = (function () {
    "use strict";

    var visibleCatalog = ko.observable(true);

    var visibleCart = ko.observable(false);

    var catalog = ko.observableArray([
        new Product(1, "T-Shirt", 10.00, 20),
        new Product(2, "Trousers", 20.00, 10),
        new Product(3, "Shirt", 15.00, 20),
        new Product(4, "Shorts", 5.00, 10)
    ]);

    var cart = ko.observableArray([]);

    var newProduct = {
        name: ko.observable(),
        price: ko.observable(),
        stock: ko.observable(),
        clear: function () {
            this.name("");
            this.price("");
            this.stock("");
        }
    };

    var totalItems = ko.computed(function(){
        var tmpCart = cart();
        var total = 0;
        tmpCart.forEach(function(item){
            total+=parseInt(item.units(),10);
        });
        return total;
    });

    var grandTotal = ko.computed(function(){
        var tmpCart = cart();
        var total = 0;
        tmpCart.forEach(function(item){
            total+= (item.units() * item.product.price());
        });
        return total;
    });

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
                    if (item[prop]() && (strProp.indexOf(filter) !== -1)) {
                        return true;
                    }
                }
            }
            return false;
        });
        return filtered;
    });

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
        $('#addToCatalogModal').modal('hide');
    };

    var addToCart = function(data) {
        var item = null;
        var tmpCart = cart();
        var n = tmpCart.length;

        while(n--) {
            if (tmpCart[n].product.id() === data.id()) {
                item = tmpCart[n];
            }
        }

        if (item) {
            item.addUnit();
        } else {
            item = new CartProduct(data,0);
            item.addUnit();
            tmpCart.push(item);
            //item.product.decreaseStock(1);
        }

        cart(tmpCart);
    };

    var removeFromCart = function (data) {
        var units = data.units();
        var stock = data.product.stock();

        data.product.stock(units+stock);
        cart.remove(data);
    };

    var showCartDetails = function () {
        if (cart().length > 0) {
            visibleCart(true);
        }
    };

    var hideCartDetails = function () {
        visibleCart(false);
    };

    var showOrder = function () {
        visibleCatalog(false);
    };

    var showCatalog = function () {
        visibleCatalog(true);
    };

    var finishOrder = function() {
        cart([]);
        hideCartDetails();
        showCatalog();
        $("#finishOrderModal").modal('show');
    };

    return {
        searchTerm: searchTerm,
        catalog: filteredCatalog,
        cart: cart,
        newProduct: newProduct,
        totalItems:totalItems,
        grandTotal:grandTotal,
        addProduct: addProduct,
        addToCart: addToCart,
        removeFromCart:removeFromCart,
        visibleCatalog: visibleCatalog,
        visibleCart: visibleCart,
        showCartDetails: showCartDetails,
        hideCartDetails: hideCartDetails,
        showOrder: showOrder,
        showCatalog: showCatalog,
        finishOrder: finishOrder
    };
})();

//ko External Template Settings
infuser.defaults.templateSuffix = ".html";
infuser.defaults.templateUrl = "views";

ko.applyBindings(vm);