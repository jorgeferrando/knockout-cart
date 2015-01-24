require.config({
    baseUrl:'js',
    paths: {
        bootstrap:'vendors/bootstrap.min',
        icheck: 'vendors/icheck',
        jquery: 'vendors/jquery.min',
        mockjax: 'vendors/jquery.mockjax',
        mockjson: 'vendors/jquery.mockjson',
        knockout: 'vendors/knockout.debug',
        'ko.validation':'vendors/ko.validation',
        'ko-amd-helpers': 'vendors/ko-amd-helpers',
        text: 'vendors/require.text'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        bootstrap: {
            deps:['jquery']
        },
        mockjax: {
            deps:['jquery']
        },
        mockjson: {
            deps:['jquery']
        },
        knockout: {
            exports: 'ko',
            deps:['jquery']
        },
        'ko.validation':{
            deps:['knockout']
        },
        'ko.templateEngine': {
            deps:['knockout']
        },
        icheck: {
            deps: ['jquery']
        }
    },
    deps: ['app']
});