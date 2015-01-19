//Event handling
(function() {
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
        data.addUnit();
    });

    $(document).on("removeUnit",function(event, data){
        data.removeUnit();
    });
})();

