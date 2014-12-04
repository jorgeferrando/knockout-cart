define(['jquery','knockout'],function ($,ko) {
    var events = {};

    events.showOrder = function () {
        $("#confirmOrderBtn").click(function() {
            vm.showOrder();
        });
    };
    events.addUnit = function () {
        $(document).on("click", ".add-unit", function() {
            var data = ko.dataFor(this);
            $(document).trigger("product:action",[data,"addUnit"]);
        });
    };
    events.removeUnit = function () {
        $(document).on("click", ".remove-unit", function() {
            var data = ko.dataFor(this);
            $(document).trigger("product:action",[data,"removeUnit"]);
        });
    };
    events.productAction = function () {
        $(document).on("product:action",function(event, data, action){
            if(data.hasOwnProperty(action)) {
                if (typeof data[action] === 'function'){
                    data[action]();
                }
            }
        });
    }
    events.init = function () {
        for (var prop in events) {
            var isFunction = events.hasOwnProperty(prop) && typeof events[prop] === "function";
            if (isFunction && prop !== "init") {
                events[prop]();
            }
        }
    };
    return events;
});