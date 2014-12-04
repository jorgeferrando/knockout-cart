define([
    //LIBRARIES
    'bootstrap',
    'knockout',
    'ko.templateEngine',
    'ko.validation',

    //VIEWMODEL
    'viewmodel',


    //SERVICES
    'services/product',
    'services/order',

    //MOCKS
    'mocks/product',
    'mocks/order',

    //COMPONENTS
    'custom/components',

    //BINDINGS
    'custom/koBindings',

    //EVENTS
    'events/cart'
], function(bs, ko, koValidation, koTemplates, ViewModel, ProductService, OrderService, productMocks, orderMocks, components, bindings, events) {
    //ko External Template Settings
    infuser.defaults.templateSuffix = ".html";
    infuser.defaults.templateUrl = "views";
    ko.validation.init();

    //initialize components
    components.init();
    bindings.init();
    events.init();

    //Mocks
    orderMocks();
    productMocks();

    var vm = new ViewModel();
    vm.activate();
});
