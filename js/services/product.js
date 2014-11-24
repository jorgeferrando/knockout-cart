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
    function create(product) {
        return $.ajax({
            type: 'POST',
            url: '/products',
            data: product
        });
    }
    function save(product) {
        return $.ajax({
            type: 'PUT',
            url: '/products',
            data: product
        });
    }
    return {
        all:all,
        get: get,
        create: create,
        save: save
    };
}