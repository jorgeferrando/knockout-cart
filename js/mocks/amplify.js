amplify.request.define("order.put",function(settings){
    var fakeData = {
        "data": {
            result: "true",
            text: "Order saved"
        }
    };
    settings.success(fakeData);
});
amplify.request.define("product.all", function (settings) {
    var fakeData = $.mockJSON.generateFromTemplate({
        "data|5-5": [{
            "id|1-100": 0,
            "name": "@PRODUCTNAME",
            "price|10-500": 0,
            "stock|1-9": 0
        }]
    });
    settings.success(fakeData);
});
amplify.request.define("product.get", function (settings) {
    var fakeData = $.mockJSON.generateFromTemplate({
        "data": {
            "id": settings.data.id,
            "name": "@PRODUCTNAME",
            "price|10-500": 0,
            "stock|1-9": 0,
            "description": "@LOREM_IPSUM"
        }
    });
    settings.success(fakeData);
});
amplify.request.define("product.create",function (settings) {
    var fakeData = {
        "data": {
            result: "true",
            text: "Product created"
        }
    };
    settings.success(fakeData)
});
amplify.request.define("product.create",function (settings) {
    var fakeData = {
        "data": {
            result: "true",
            text: "Product saved"
        }
    };
    settings.success(fakeData)
});
