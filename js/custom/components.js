ko.components.register('add-to-cart-button', {
    viewModel: function(params) {
        this.item = params.item;
        this.cart = params.cart;

        this.addToCart = function() {
            var data = this.item;
            var tmpCart = this.cart();
            var n = tmpCart.length;
            var item = null;

            if(data.stock()<1) {
                return;
            }

            while(n--) {
                if (tmpCart[n].product.id() === data.id()) {
                    item = tmpCart[n];
                }
            }

            if (item) {
                var cm = CartItemManager(item);
                cm.addUnit();
            } else {
                item = CartProduct(data,1);
                tmpCart.push(item);
                var pm = ProductManager(item.product);
                pm.decreaseStock();
            }

            this.cart(tmpCart);
        };
    },
    template:
        '<button class="btn btn-primary" data-bind="click:addToCart"><i class="glyphicon glyphicon-plus-sign"></i> Add</button>'
});
