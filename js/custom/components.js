define(['knockout','models/cartProduct'],function (ko, CartProduct) {
    var components = {};
    components.AddToCartButton = function () {
        ko.components.register('add-to-cart-button', {
            viewModel: function (params) {
                this.item = params.item;
                this.cart = params.cart;

                this.addToCart = function () {
                    var data = this.item;
                    var tmpCart = this.cart();
                    var n = tmpCart.length;
                    var item = null;

                    while (n--) {
                        if (tmpCart[n].product.id() === data.id()) {
                            item = tmpCart[n];
                        }
                    }

                    if (item) {
                        item.addUnit();
                    } else {
                        item = new CartProduct(data, 1);
                        tmpCart.push(item);
                        item.product.decreaseStock(1);
                    }

                    this.cart(tmpCart);
                };
            },
            template: '<button class="btn btn-primary" data-bind="click:addToCart"><i class="glyphicon glyphicon-plus-sign"></i> Add</button>'
        });
    };
    components.Debug = function() {
        ko.components.register('debug-panel',{
            viewModel: function(params) {
                this.element = params.element;
                this.debug = ko.observable(false);
                this.showDebug = function () {
                    this.debug(true);
                };
                this.hideDebug = function () {
                    this.debug(false);
                };
            },
            template:'<div data-bind="event: {mouseover:showDebug, mouseout:hideDebug}">' +
            '<h3 style="cursor:pointer">Place the mouse over to display debug</h3> ' +
            '<pre class="well well-lg" data-bind="visible:debug, toJSON: element"></pre> ' +
            '</div>'
        });
    };
    components.init = function () {
        for (var prop in components) {
            var isFunction = components.hasOwnProperty(prop) && typeof components[prop] === "function";
            if (isFunction && prop !== "init") {
                components[prop]();
            }
        }
    };
    return components;

});
