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

//toJSON binding
ko.bindingHandlers.toJSON = {
    update: function(element, valueAccessor){
        return ko.bindingHandlers.text.update(element,function(){
            return ko.toJSON(valueAccessor(), null, 2);
        });
    }
};

//isCartVisible binding
ko.bindingHandlers.isCartVisible = {
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        ko.bindingHandlers.visible.update(element, function () { return value; });
    }
};

//iCheck binding
ko.bindingHandlers.icheck = {
    init: function (element, valueAccessor, allBindings) {
        var checkedBinding = allBindings.get('checked');
        $(element).iCheck({
            checkboxClass: 'icheckbox_minimal-blue',
            increaseArea: '10%'
        });
        $(element).on('ifChanged', function (event) {
            checkedBinding(event.target.checked);
        });
    },
    update: function (element,valueAccessor, allBindings) {
        var checkedBinding = allBindings.get('checked');
        var checked = checkedBinding()?'check':'uncheck';
        $(element).iCheck(checked);
    }
};