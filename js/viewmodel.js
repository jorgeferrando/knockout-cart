var Shop = Shop || {};

Shop.ViewModel = (function (vm, ko, $) {
    "use strict";
    return function() {
        var self = null;
        var customer =  new Shop.Models.Customer(); //customerData;
        var dataContext = new Shop.Services.Product();
        var orderContext = new Shop.Services.Order();

        var debug = ko.observable(false);
        var countries = ko.observableArray(['United States','United Kingdom']);
        var showDebug = function () {
            debug(true);
        };

        var hideDebug = function () {
            debug(false);
        };

        var visibleCatalog = ko.observable(true);

        var visibleCart = ko.observable(false);

        var catalog = ko.observableArray([
            //new Product(1, "T-Shirt", 10.00, 20),
            //new Product(2, "Trousers", 20.00, 10),
            //new Product(3, "Shirt", 15.00, 20),
            //new Product(4, "Shorts", 5.00, 10)
        ]);

        var cart = ko.observableArray([]);

        var newProduct = new Shop.Models.Product(new Date().valueOf(),"",0,0);
        var selectedProduct = ko.observable(newProduct);
        var tmpProduct = null;

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

        var filterCatalog = function () {
            if (!catalog()) {
                filteredCatalog([]);
            }
            if (!filter) {
                filteredCatalog(catalog());
            }
            var filter = searchTerm().toLowerCase();
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
            filteredCatalog(filtered);
        };

        var filteredCatalog = ko.observableArray(catalog());

        var addProduct = function (data) {
            var id = new Date().valueOf();
            var product = new Product(
                id,
                data.name(),
                data.price(),
                data.stock()
            );

            dataContext.save(product.toObj())
                .done(function (response){
                    catalog.push(product);
                    filteredCatalog(catalog());
                    newProduct = new Product(new Date().valueOf(),"",0,0);
                    $('#addToCatalogModal').modal('hide');
                });
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
                item = new Shop.Models.CartProduct(data,1);
                tmpCart.push(item);
                item.product.decreaseStock(1);
            }

            cart(tmpCart);
        };

        var removeFromCart = function (data) {
            var units = data.units();
            var stock = data.product.stock();

            data.product.stock(units+stock);
            cart.remove(data);
        };

        var clone = function (p) {
            return new Shop.Models.Product(p.id(), p.name(), p.price(), p.stock());
        };

        var openEditModal = function (product) {
            tmpProduct = clone(product);
            selectedProduct(product);
            $('#editProductModal').modal('show');
        };

        var saveProduct = function (product) {
            dataContext.save(product.toObj()).done(function(response){
                $('#editProductModal').modal('hide');
            });
        };

        var restoreProduct = function (p) {
            p.id(tmpProduct.id());
            p.name(tmpProduct.name());
            p.stock(tmpProduct.stock());
            p.price(tmpProduct.price());
        };

        var cancelEdition = function (product) {
            restoreProduct(product);
            $('#editProductModal').modal('hide');
        };

        var showSearchBar = ko.observable(true);

        var showCartDetails = function () {
            if (cart().length > 0) {
                visibleCart(true);
            }
        };

        var deleteProduct = function (product){
            dataContext.remove(product.id())
                .done(function(response){
                        catalog.remove(product);
                        filteredCatalog(catalog());
                });
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
            orderContext.save()
                .done(function(response){
                    cart([]);
                    hideCartDetails();
                    showCatalog();
                    $("#finishOrderModal").modal('show');
                });

        };

        var showDescription = function (data) {
            dataContext.get(data.id())
                .done(function(response){
                    alert(response.data.description);
                });
        };

        var allCallbackSuccess = function(response){
            catalog([]);
            response.data.forEach(function(item){
                catalog.push(new Shop.Models.Product(item.id,item.name,item.price,item.stock));
            });
            filteredCatalog(catalog());
            if (catalog().length) {
                selectedProduct(catalog()[0]);
            }
            ko.applyBindings(self);
        };

        var activate = function () {
            self = this;
            dataContext.all()
                .done(allCallbackSuccess);
        };

        return {
            debug: debug,
            showDebug: showDebug,
            hideDebug: hideDebug,
            searchTerm: searchTerm,
            catalog: filteredCatalog,
            filterCatalog: filterCatalog,
            cart: cart,
            newProduct: newProduct,
            selectedProduct: selectedProduct,
            totalItems: totalItems,
            grandTotal: grandTotal,
            addProduct: addProduct,
            addToCart: addToCart,
            removeFromCart: removeFromCart,
            visibleCatalog: visibleCatalog,
            visibleCart: visibleCart,
            showSearchBar: showSearchBar,
            showCartDetails: showCartDetails,
            hideCartDetails: hideCartDetails,
            showOrder: showOrder,
            showCatalog: showCatalog,
            finishOrder: finishOrder,
            activate: activate,
            showDescription: showDescription,
            openEditModal: openEditModal,
            saveProduct: saveProduct,
            cancelEdition: cancelEdition,
            deleteProduct: deleteProduct,
            customer: customer,
            countries: countries
        };
    };
})(Shop.ViewModel || {}, ko, jQuery);

//ko External Template Settings
infuser.defaults.templateSuffix = ".html";
infuser.defaults.templateUrl = "views";
ko.validation.init();

//initialize components
Shop.Components.init();
Shop.Bindings.init();
Shop.Events.init();

//Mocks
Shop.Mocks.order();
Shop.Mocks.product();

var vm = new Shop.ViewModel();
vm.activate();