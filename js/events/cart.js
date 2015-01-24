//Event handling
define([
    'jquery','viewmodel','services/CartProductService'
], function(vm, CartProductService) {
    "use strict";
    $(document).on("click","#confirmOrderBtn", function() {
        vm.showOrder();
    });

    $(document).on("click", ".add-unit", function() {
        var data = ko.dataFor(this);
        $(document).trigger("addUnit",[data]);
    });

    $(document).on("click", ".remove-unit", function() {
        var data = ko.dataFor(this);
        $(document).trigger("removeUnit",[data]);
    });

    $(document).on("addUnit",function(event, data){
        CartProductService.addUnit(data);
    });

    $(document).on("removeUnit",function(event, data){
        CartProductService.removeUnit(data);
    });
})

