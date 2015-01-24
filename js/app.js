define([
    //LIBRARIES
    'bootstrap',
    'knockout',
    'ko-amd-helpers',
    'ko.validation',
    'icheck',

    //VIEWMODEL
    'viewmodel',

    //MOCKS
    'mocks/product',
    'mocks/order',

    //COMPONENTS
    'custom/components',

    //BINDINGS
    'custom/koBindings',

    //EVENTS
    'events/cart'
], function(bs, ko, koAmdHelpers, koValidation, icheck, ViewModel) {
    //ko External Template Settings
    ko.amdTemplateEngine.defaultPath = "../views";
    ko.amdTemplateEngine.defaultSuffix = ".html";
    ko.amdTemplateEngine.defaultRequireTextPluginName = "text";
    ko.validation.init();

    var vm = new ViewModel();
    vm.activate();
});
