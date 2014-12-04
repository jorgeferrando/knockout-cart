define(['knockout','ko.validation'],function (ko) {

    var firstName = ko.observable("").extend({
        required: true
    });
    var lastName = ko.observable("").extend({
        required: true,
        minLength: 3
    });
    var fullName = ko.computed(function(){
        return firstName() + " " + lastName();
    });
    var address = ko.observable("").extend({
        required: true,
        minLength: 5
    });
    var email = ko.observable("").extend({
        required: true,
        email: true
    });
    var zipCode = ko.observable("").extend({
        required: true,
        minLength: 3,
        pattern: {
            message: 'Zip code should have 5 numbers',
            params: '^[0-9]{5}$'
        }
    });
    var country = ko.observable("");
    var fullAddress = ko.computed(function(){
        return address() + " " + zipCode() + ", " + country();
    });
    var errors = ko.validation.group([firstName, lastName, address, email, zipCode]);

    return function () {
        return {
            firstName:firstName,
            lastName: lastName,
            fullName: fullName,
            address: address,
            email: email,
            zipCode: zipCode,
            country: country,
            fullAddress: fullAddress,
            errors: errors
        };
    };
});
