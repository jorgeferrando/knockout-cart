amplify.request.define("order.put","ajax",{
    type:"PUT",
    dataType:"json",
    url:"/order"
});


amplify.request.define("product.all","ajax",{
    type:"GET",
    dataType:"json",
    url:"/products"
});
amplify.request.define("product.get","ajax",{
    type:"GET",
    dataType:"json",
    url:"/products/{id}"
});
amplify.request.define("product.create","ajax",{
    type:"POST",
    dataType:"json",
    url:"/products"
});
amplify.request.define("product.save","ajax",{
    type:"PUT",
    dataType:"json",
    url:"/products"
});
