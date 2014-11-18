$.mockJSON.data.PRODUCTNAME = [
    'T-SHIRT', 'SHIRT', 'TROUSERS', 'JEANS', 'SHORTS', 'GLOVES', 'TIE'
];
$.mockjax({
    url: "/products",
    type: "GET",
    dataType: "json",
    responseTime: 750,
    responseText: $.mockJSON.generateFromTemplate({
        "data|5-5": [{
            "id|1-100": 0,
            "name": "@PRODUCTNAME",
            "price|10-500": 0,
            "stock|1-9": 0
        }]
    })
});
$.mockjax({
    url: /^\/products\/([\d]+)$/,
    type: "GET",
    dataType: "json",
    responseTime: 750,
    responseText: $.mockJSON.generateFromTemplate({
        "data": {
            "id|1-100": 0,
            "name": "@PRODUCTNAME",
            "price|10-500": 0,
            "stock|1-9": 0,
            "description": "@LOREM_IPSUM"
        }
    })
});
$.mockjax({
    url: "/products",
    type:"POST",
    dataType: "json",
    responseTime: 750,
    responseText: {
        "data": {
            result: "true",
            text: "Product saved"
        }
    }
});
$.mockjax({
    type: 'PUT',
    url: '/cart',
    responseTime: 750,
    responseText: {
        "data": {
            result: "true",
            text: "Order saved"
        }
    }
});
