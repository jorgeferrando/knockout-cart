define(['jquery'],function($){
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
            url: '/products/'+product.id,
            data: product
        });
    }

    function remove(id) {
        return $.ajax({
            type: 'DELETE',
            url: '/products/'+id
        });
    }

    return {
        all:all,
        get: get,
        create: create,
        save: save,
        remove: remove
    };
});