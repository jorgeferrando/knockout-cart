ko.components.register('add-to-cart-button', {
    viewModel: function(params) {
        this.item = params.item;
        this.cart = params.cart;

        this.addToCart = function() {

            var CartProduct = Shop.Models.CartProduct;
            var CartProductService = Shop.Services.CartProductService;
            var ProductService = Shop.Services.ProductService;

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
                CartProductService.addUnit(item);
            } else {
                item = CartProduct(data,1);
                tmpCart.push(item);
                ProductService.decreaseStock(item.product);
            }

            this.cart(tmpCart);
        };
    },
    template:
        '<button class="btn btn-primary" data-bind="click:addToCart"><i class="glyphicon glyphicon-plus-sign"></i> Add</button>'
});
