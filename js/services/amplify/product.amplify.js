function ProductService() {
    function all(callback) {
        amplify.request({
            resourceId:"product.all",
            success:callback
        });
    }
    function get(id,callback) {
        amplify.request({
            resourceId:"product.get",
            data: {id:id},
            success:callback
        });
    }
    function create(product) {
        amplify.request({
            resourceId:"product.create",
            data: product,
            success: callback
        });
    }
    function save(product, callback) {
        amplify.request({
            resourceId:"product.save",
            data:product,
            success: callback
        });
    }
    return {
        all:all,
        get: get,
        create: create,
        save: save
    };
}
