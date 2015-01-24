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
], function(bs, ko, koAmdHelpers, koValidation, icheck, vm) {
    //ko External Template Settings
    ko.amdTemplateEngine.defaultPath = "../views";
    ko.amdTemplateEngine.defaultSuffix = ".html";
    ko.amdTemplateEngine.defaultRequireTextPluginName = "text";
    ko.validation.init({
        registerExtenders: true,
        messagesOnModified: true,
        insertMessages: true,
        parseInputAttributes: true
    });

    $( document ).ajaxError(function(event,response) {
        console.error(response);
        alert("Error in the communication. Check the console!");
    });

    vm.activate();

    return vm;
});
