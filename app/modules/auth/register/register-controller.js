var RegisterController= ['User', 'flash','$stateParams','passwordMinLength', 'userMinLength',
    function(User, flash, $stateParams, passwordMinLength,userMinLength) {

    var ctrlContext = this;
    //our model that will interact with the api
    var auth = {
        username: $stateParams.username || '',
        password: ''
    };

    ctrlContext.suggestions = {};

    function checkUserName (userName) {

        if(userName.length >= userMinLength) {
            User.checkUserName(userName)
                .then(function success(result){
                    ctrlContext.validName = true;
                    flash.success = 'Username available';
                    ctrlContext.suggestions = {};
                }, function error(err){
                    ctrlContext.validName = false;
                    flash.error = 'Username already in use';
                    ctrlContext.suggestions = {
                        login : true
                    }
                })
        }

    }

    function submit (data) {
        User.addUser(data)
            .then(function(success){
                if(success) {
                    flash.to("nameAvailability").success = 'Your account has been created with success'
                }
                else {
                    flash.to("nameAvailability").error = 'There was an error, please, retry later'
                }
            })
    }

    function comparePasswords (val1, val2) {
        //Don't need to use it often

        if(!!val1 && !!val2) {
            if(val1 == val2) {

                flash.to("passwordCheck").success = 'The passwords are equals';
                ctrlContext.validPass = true;

            } else {
                flash.to("passwordCheck").error = 'The passwords are not equals';

                ctrlContext.validPass = false;
            }
        }

    }

    //A kind of "export" function, getting ready for angular 2.0 and more clever syntax
    //in this object we will choose which functions will be public
    angular.extend(ctrlContext, {
        model: auth,
        comparePasswords: comparePasswords,
        submit: submit,
        checkUserName : checkUserName,
        passwordMinLength : passwordMinLength,
        userMinLength : userMinLength
    })

}];

angular.module('poldersite.auth')
    .controller('RegisterController', RegisterController);
