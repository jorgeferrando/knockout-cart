define(['knockout'],function(ko){
    var bindings = {};

    bindings.toggle = function(){
        //toggle binding
        ko.bindingHandlers.toggle = {
            init: function (element, valueAccessor) {
                var value = valueAccessor();
                ko.applyBindingsToNode(element, {
                    click: function () {
                        value(!value());
                    }
                });
            }
        };
    };
    bindings.currency = function() {
        //currency binding
        ko.bindingHandlers.currency = {
            symbol: ko.observable('$'),
            update: function(element, valueAccessor, allBindingsAccessor){
                return ko.bindingHandlers.text.update(element,function(){
                    var value = +(ko.utils.unwrapObservable(valueAccessor()) || 0),
                        symbol = ko.utils.unwrapObservable(allBindingsAccessor().symbol === undefined
                            ? allBindingsAccessor().symbol
                            : ko.bindingHandlers.currency.symbol);
                    return symbol + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                });
            }
        };
    };
    bindings.toJSON = function () {
        //toJSON binding
        ko.bindingHandlers.toJSON = {
            update: function(element, valueAccessor){
                return ko.bindingHandlers.text.update(element,function(){
                    return ko.toJSON(valueAccessor(), null, 2);
                });
            }
        };
    };
    bindings.isCartVisible = function () {
        //isCartVisible binding
        ko.bindingHandlers.isCartVisible = {
            update: function (element, valueAccessor) {
                var value = ko.utils.unwrapObservable(valueAccessor());
                ko.bindingHandlers.visible.update(element, function () { return value; });
            }
        };
    };
    bindings.iCheck = function () {
        //iCheck binding
        ko.bindingHandlers.icheck = {
            init: function (element, valueAccessor) {
                $(element).iCheck({
                    checkboxClass: 'icheckbox_minimal-blue',
                    increaseArea: '10%'
                });

                $(element).on('ifChanged', function () {
                    var observable = valueAccessor();
                    observable($(element)[0].checked);
                });
            },
            update: function (element, valueAccessor) {
                var value = ko.unwrap(valueAccessor());
                if (value) {
                    $(element).iCheck('check');
                } else {
                    $(element).iCheck('uncheck');
                }
            }
        };
    };
    bindings.executeOnEnter = function () {
        //onEnter binding
        ko.bindingHandlers.executeOnEnter = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
                var allBindings = allBindingsAccessor();
                $(element).keypress(function (event) {
                    var keyCode = (event.which ? event.which : event.keyCode);
                    if (keyCode === 13) {
                        allBindings.executeOnEnter.call(viewModel);
                        return false;
                    }
                    return true;
                });
            }
        };
    };
    bindings.init = function () {
        for (var prop in bindings) {
            var isFunction = bindings.hasOwnProperty(prop) && typeof bindings[prop] === "function";
            if (isFunction && prop !== "init") {
                bindings[prop]();
            }
        }
    };
    return bindings;
});