var Shop = Shop || {};
Shop.Components = (function (components, CartProduct, ko) {

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
    components.init = function () {
        for (var prop in components) {
            var isFunction = components.hasOwnProperty(prop) && typeof components[prop] === "function";
            if (isFunction && prop !== "init") {
                components[prop]();
            }
        }
    };
    return components;

})(Shop.Components || {}, Shop.Models.CartProduct, ko);
