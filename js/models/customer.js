define(['knockout','ko.validation'],function(ko){
    var firstName = ko.observable("John").extend({
        required: true
    });
    var lastName = ko.observable("Doe").extend({
        required: true,
        minLength: 3
    });
    var fullName = ko.computed(function(){
        return firstName() + " " + lastName();
    });
    var address = ko.observable("Baker Street").extend({
        required: true,
        minLength: 5
    });
    var email = ko.observable("john@doe.com").extend({
        required: true,
        email: true
    });
    var zipCode = ko.observable("12345").extend({
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
});
