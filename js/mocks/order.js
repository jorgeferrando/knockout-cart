$.mockjax({
    type: 'PUT',
    url: '/order',
    responseTime: 750,
    responseText: {
        "data": {
            result: "true",
            text: "Order saved"
        }
    }
});