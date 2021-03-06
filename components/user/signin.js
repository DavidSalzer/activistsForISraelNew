socialGroupApp.controller('signin', ['$rootScope', '$scope', '$http', 'generalParameters', 'filePicker', '$timeout', function ($rootScope, $scope, $http, generalParameters, filePicker, $timeout) {

    $scope.showSignIn = false;
    $scope.showFnameError = false;
    $scope.showLnameError = false;
    $scope.showGenderError = false;
    $scope.showEmailError = false;
    $scope.showPassError = false;
    $scope.showPhoneError = false;
    $scope.showAddressError = false;
    $scope.showTerms = false;
    $scope.showTermsVee = false;
    $scope.didConfirmTerms = false;
    $scope.errorMsg = '';
    $scope.datacrop = {};
    $scope.userImg = './img/user.png';
    $scope.terms = 'ורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית להאמית קרהשק סכעיט דז מא, מנכם למטכין נשואי מנורךגולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, ושבעגט. סחטיר בלובק. תצטנפל בלינדו למרקל אס לכימפו, דול, צוט ומעיוט - לפתיעם ברשג - ולתיעם גדדיש. קוויז דומור ליאמום בלינך רוגצה. לפמעט מוסן מנת. קונדימנטום קורוס בליקרה, נונסטי קלובר בריקנה סטום, לפריקך תצטריק לרטי. ';
    $scope.showSendConfirmMail = false;

    $scope.closeSignInPopup = function () {
        $scope.showSendConfirmMail = false;
        $scope.showSignIn = false;
        generalParameters.setShowLogin(false);
    }

    var rand = Math.random() * 10;
    if (rand > 4) {
        $scope.askPhoneAndAddress = false;
    }
    else {
        $scope.askPhoneAndAddress = true;
    }

    $scope.thankDetails = {
        featureColor: '#565c63',
        thankText: 'שהצטרפת יש לאשר הצטרפות במייל סופי אשר נשלח אליך כעת.',
        btnText: 'חזרה לאפליקציה',
        headerText: 'הצטרפות',
        hideheader: true,
        featureState: 'main-menu'
    };

    $scope.$on('showSignInPopup', function (event, args) {
        $scope.showSignIn = args.showSignIn;
        if (args.showSendConfirm) {
            $scope.showSendConfirmMail = true;
        }
        //$scope.$apply();
        generalParameters.setShowLogin($scope.showSignIn);

    });

    $scope.sendSignIn = function () {

        $scope.showFnameError = $scope.fName == undefined || $scope.fName == '';
        $scope.showLnameError = $scope.lName == undefined || $scope.lName == '';
        $scope.didConfirmTerms = !$scope.showTermsVee;
        $scope.showGenderError = $scope.gender == undefined || ($scope.gender != 'זכר' && $scope.gender != 'נקבה'); //temp for submission 0307
        $scope.showEmailError = $scope.mail == undefined || $scope.mail == '';
        $scope.showPassError = $scope.pass == undefined || $scope.pass.length < 6;
        $scope.showPassAuthenticationError = $scope.pass != $scope.passAuthentication;
        $scope.showPhoneError = $scope.askPhoneAndAddress && ($scope.phone == undefined || $scope.phone == '');
        $scope.showAddressError = $scope.askPhoneAndAddress && ($scope.address == undefined || $scope.address == '');

        if ($scope.didConfirmTerms || $scope.showFnameError || $scope.showLnameError || $scope.showEmailError || $scope.showPassError || $scope.showPassAuthenticationError || $scope.showPhoneError || $scope.showAddressError || $scope.showGenderError) {//$scope.showGenderError || //temp for submission 0307
            return;
        }

        $scope.showFnameError = false;
        $scope.showLnameError = false;
        $scope.showGenderError = false;
        $scope.showEmailError = false;
        $scope.showPassError = false;
        $scope.showPassAuthenticationError = false;
        $scope.showPhoneError = false;
        $scope.showAddressError = false;

        if ($scope.gender == 'זכר') {
            $scope.gender = 'male';
        }
        else {
            $scope.gender = 'female';
        }

        $scope.signinDetails = {
            firstName: $scope.fName,
            lastName: $scope.lName,
            gender: $scope.gender,
            email: $scope.mail,
            password: $scope.pass,
            username: $scope.mail
        }

        if ($scope.askPhoneAndAddress) {
            $scope.signinDetails.phone = $scope.phone;
            $scope.signinDetails.address = $scope.address;
        }
        //else {
        //    $scope.signinDetails.phone = "מספר טלפון";
        //    $scope.signinDetails.address = "כתובת";
        //}


        $scope.json = JSON.stringify($scope.signinDetails);


        $rootScope.$broadcast('showLoader', { showLoader: true });
        $http.post(domain + 'signup/', $scope.json)
        .success(function (data) {
            if (data.status.statusCode == 0) {
                $scope.showSignIn = false;
                //generalParameters.setUser(data.data.user);

                //send image string to be saved at server
                //if was uploaded

                if ($scope.userImg != '') {
                    $scope.uploadBase64Image(data.data.user._id);
                }
                //$http.post(domain + 'Base64FileUpload?ref=user&_id=data.data.user /',
                // $scope.json)
                $rootScope.$broadcast('showLoader', { showLoader: false });
                $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true, isSignin: true });

                $scope.fName = '';
                $scope.lName = '';
                $scope.gender = '';
                $scope.mail = '';
                $scope.pass = '';
                $scope.passAuthentication = '';
                $scope.phone = '';
                $scope.address = '';
                $scope.userImg = '';

                $scope.showSignupError = false;
            }
            else if (data.status.statusCode == 409) {
                $scope.showSignupError = true;
                $scope.signupErrorMessage = 'המייל שהזנת כבר קיים במערכת';
                $rootScope.$broadcast('showLoader', { showLoader: false });
            }
            else {
                $scope.showSignupError = true;
                $scope.signupErrorMessage = errorMessages.generalError;
                $rootScope.$broadcast('showLoader', { showLoader: false });
            }
        })

        .error(function (data, status, headers, config, statusText) {
            if (status == 409) {
                $scope.showSignupError = true;
                $scope.signupErrorMessage = 'המייל שהזנת כבר קיים במערכת';
                $rootScope.$broadcast('showLoader', { showLoader: false });
            }
            else {
                $scope.showSignupError = true;
                $scope.signupErrorMessage = errorMessages.generalError;
                $rootScope.$broadcast('showLoader', { showLoader: false });
            }
        });


    }

    //send base64 string to server to be converted to jpg, then save image to current user details. 
    $scope.uploadBase64Image = function (userId) {

        // $scope.json = JSON.stringify($scope.userImg);
        //var userId = generalParameters.getUser();
        /*if ($scope.userImg != '') {
            html2canvas(document.getElementById('html2canvassignin'), {
                onrendered: function (canvas) {
                    $scope.userImg = canvas.toDataURL("image/png");
                }
            });
        }*/
        $http.post(domain + 'Base64FileUpload?ref=user&_id=' + userId,
            { "base64": $scope.userImg })
            .success(function (data) {

                //generalParameters.setUser(data.data.user);
            });

    }

    //document.getElementById('userImg').addEventListener('change', function (e) {
    //    $scope.fileEdit(e);
    //}, false);

    //$scope.fileEdit = function (e) {
    //    //file reader to show the img
    //    var file = e.target.files[0];

    //    //file reader
    //    var reader = new FileReader();

    //    if (file.type.match('image/*')) {
    //        var reader = new FileReader();
    //        reader.onload = (function () {
    //            return function (e) {
    //                
    //                
    //                $scope.userimg = e.target.result;
    //                $scope.editImg = true;
    //                $scope.$apply();
    //                $scope.croping();
    //            };
    //        })(file);
    //        reader.readAsDataURL(file);
    //    }
    //}

    // can be a button click or anything else
    $scope.takePicture = function () {
        filePicker.getPicture()
        .then(function (imageData) {
            // imageData is your base64-encoded image
            // update some ng-src directive
            //$scope.imgFileText = imageData.fileText;
            //$scope.userimg = imageData.imgData; //"data:image/jpeg;base64," +
            //$scope.myCroppedImage = '';
            //$scope.editImg = true;
            //$scope.$apply();

            $timeout(function () {
                $scope.imgFileText = imageData.fileText;
                $scope.userimg = imageData.imgData; //"data:image/jpeg;base64," +
                $scope.myCroppedImage = '';
                $scope.editImg = true;
            }, 0);
        });
    };


    //user image crop
    //$scope.croping = function () {
    //    
    //    imgCrop.obj = {};
    //    $('#cropDiv img').off('load');
    //    $('#cropDiv img').on('load', function () {
    //        imgCrop.crop('c', 'button_ok', 'cropDiv'); //canvasid  ,btn-approve, container Id
    //    });
    //}

    //$scope.$on('editDone', function (e, d) {
    //    
    //    $scope.userImg = d.data;
    //    $scope.editImg = false;
    //    $scope.$apply();
    //    //$('#userImg').val("");
    //    $scope.userimg = '';
    //    imgCrop.destroy();
    //});

    $scope.editCancel = function () {
        $scope.editImg = false;
        $scope.userimg = '';
        //imgCrop.destroy();
    }

    $scope.editDone = function () {
        $scope.userImg = $scope.myCroppedImage;
        $scope.editImg = false;
        //$scope.$apply();
        $scope.userimg = '';
    }

    $scope.sendConfirmMail = function () {
        $scope.showEmailError = $scope.mail == undefined || $scope.mail == '';

        if ($scope.showEmailError) {
            return;
        }
        $scope.showEmailError = false;

        $rootScope.$broadcast('showLoader', { showLoader: true });
        $http.get(domain + 'sendConfirmMail/' + $scope.mail)
        .success(function (data) {
            $rootScope.$broadcast('showLoader', { showLoader: false });
            if (data.status.statusCode == 0) {
                $scope.showSignIn = false;
                $scope.showSendConfirmError = false;
                $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true, isSignin: true });
            }
            else if (data.status.statusCode == 404) {
                $scope.showSendConfirmError = true;
                $scope.sendConfirmErrorMessage = errorMessages.mailNotFound;
            }
            else if (data.status.statusCode == 2) {
                $scope.showSendConfirmError = true;
                $scope.sendConfirmErrorMessage = 'כבר אישרת הצטרפות במייל';
            }
            else {
                $scope.showSendConfirmError = true;
                $scope.sendConfirmErrorMessage = errorMessages.generalError;
            }
        })
        .error(function (data) {
            $rootScope.$broadcast('showLoader', { showLoader: false });
            $scope.showSendConfirmError = true;
            $scope.sendConfirmErrorMessage = errorMessages.generalError;
        })
    }

} ])