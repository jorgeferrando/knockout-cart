//Event handling
(function() {
    "use strict";
    $("#confirmOrderBtn").click(function() {
        vm.showOrder();
    });

    $(document).on("click", ".add-unit", function() {
        var data = ko.dataFor(this);
        $(document).trigger("product:action",[data,"addUnit"]);
    });

    $(document).on("click", ".remove-unit", function() {
        var data = ko.dataFor(this);
        $(document).trigger("product:action",[data,"removeUnit"]);
    });

    $(document).on("product:action",function(event, data, action){
        if(data.hasOwnProperty(action)) {
            if (typeof data[action] === 'function'){
                data[action]();
            }
        }
    });
})();

