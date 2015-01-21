$.mockjax({
    type: 'PUT',
    url: '/order',
    dataType:'json',
    responseTime: 750,
    responseText: {
        "data": {
            result: "true",
            text: "Order saved"
        }
    }
});