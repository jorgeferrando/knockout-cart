var Shop;
Shop = Shop || {};
Shop.ViewModel = (function(ko, Models,Services,Resources){
    "use strict";
    var customer = Models.Customer;
    var Product = Models.Product;
    var ProductService = Services.ProductService;
    var ProductResource = Resources.ProductResource;
    var OrderResource = Resources.OrderResource;

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

    var catalog = ko.observableArray([]);

    var cart = ko.observableArray([]);

    var newProduct = Product(new Date().valueOf(),"",0,0);
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
        //filter resources
        var filtered = ko.utils.arrayFilter(catalog(), function (item) {
            var strProp = ko.unwrap(item['name']).toLocaleLowerCase();
            if (strProp && (strProp.indexOf(filter) !== -1)) {
                return true;
            }
            return false;
        });
        filteredCatalog(filtered);
    };

    var filteredCatalog = ko.observableArray(catalog());

    var addProduct = function (data) {
        var id = new Date().valueOf();
        var product = Product(
            id,
            data.name(),
            data.price(),
            data.stock()
        );

        ProductResource.save(ko.toJS(product))
            .done(function (response){
                catalog.push(product);
                filteredCatalog(catalog());
                newProduct = Product(new Date().valueOf(),"",0,0);
                $('#addToCatalogModal').modal('hide');
            });
    };

    var removeFromCart = function (data) {
        var units = data.units();
        var stock = data.product.stock();

        data.product.stock(units+stock);
        cart.remove(data);
    };

    var removeFromCartByProduct = function (product) {
        var tmpCart = cart();
        var i = tmpCart.length;
        var item;
        while(i--){
            if (tmpCart[i].product.id() === product.id()){
                item = tmpCart[i];
            }
        }
        if (item) {
            removeFromCart(item);
        }
    }

    var openEditModal = function (product) {
        selectedProduct(ProductService.clone(product));
        $('#editProductModal').modal('show');
    };

    var saveProduct = function (product) {
        ProductResource.save(ko.toJS(product)).done(function(response){
            var tmpCatalog = catalog();
            var i = tmpCatalog.length;
            while(i--){
                if(tmpCatalog[i].id() === product.id()){
                    ProductService.refresh(tmpCatalog[i],product);
                }
            }
            catalog(tmpCatalog);
            filterCatalog();
            $('#editProductModal').modal('hide');
        });
    };

    var cancelEdition = function (product) {
        $('#editProductModal').modal('hide');
    };

    var showSearchBar = ko.observable(true);

    var showCartDetails = function () {
        if (cart().length > 0) {
            visibleCart(true);
        }
    };

    var deleteProduct = function (product){
        ProductResource.remove(product.id())
            .done(function(response){
                catalog.remove(product);
                filteredCatalog(catalog());
                removeFromCartByProduct(product);
            })
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
        var data = {
            order: ko.toJS(cart),
            customer: ko.toJS(customer)
        };
        console.log(data);
        OrderResource.save(data)
            .done(function(response){
                cart([]);
                hideCartDetails();
                showCatalog();
                $("#finishOrderModal").modal('show');
            });

    };

    var showDescription = function (data) {
        ProductResource.get(data.id())
            .done(function(response){
                alert(response.data.description);
            });
    };

    var allCallbackSuccess = function(response){
        catalog([]);
        response.data.forEach(function(item){
            catalog.push(Product(item.id,item.name,item.price,item.stock));
        });
        filteredCatalog(catalog());
        if (catalog().length) {
            selectedProduct(catalog()[0]);
        }
        ko.applyBindings(this);
    };

    var activate = function () {
        ProductResource.all()
            .done(allCallbackSuccess.bind(this));
    };


    return {
        debug: debug,
        showDebug:showDebug,
        hideDebug:hideDebug,
        searchTerm: searchTerm,
        catalog: filteredCatalog,
        filterCatalog:filterCatalog,
        cart: cart,
        newProduct: newProduct,
        selectedProduct: selectedProduct,
        totalItems:totalItems,
        grandTotal:grandTotal,
        addProduct: addProduct,
        removeFromCart:removeFromCart,
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
})(ko, Shop.Models, Shop.Services, Shop.Resources);

$( document ).ajaxError(function(event,response) {
    console.error(response);
    alert("Error in the communication. Check the console!");
});

//ko External Template Settings
infuser.defaults.templateSuffix = ".html";
infuser.defaults.templateUrl = "views";

ko.validation.init({
    registerExtenders: true,
    messagesOnModified: true,
    insertMessages: true,
    parseInputAttributes: true
});
var vm = Shop.ViewModel;
vm.activate();