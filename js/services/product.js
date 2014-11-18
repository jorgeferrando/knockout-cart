"use strict";
function ProductService() {
    function all() {
        return $.ajax({
            type: 'GET',
            url: '/products'
        });
    }
    function get(id) {
        return $.ajax({
            type: 'GET',
            url: '/products/'+id
        });
    }
    function save(product) {
        return $.ajax({
            type: 'POST',
            url: '/products',
            data: product
        });
    }
    function saveCart(cart) {
        return $.ajax({
            type: 'PUT',
            url: '/cart',
            data: cart
        });
    }
    return {
        all:all,
        get: get,
        save: save,
        saveCart: saveCart
    };
}