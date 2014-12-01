var Shop = Shop || {};
Shop.Mocks = (function(mocks, mockjax){

    mocks.order = function () {
        mockjax({
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
    };

    return mocks;
})(Shop.Mocks || {}, $.mockjax);