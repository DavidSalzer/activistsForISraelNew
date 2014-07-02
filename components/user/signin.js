socialGroupApp.controller('signin', ['$rootScope', '$scope', '$http', 'classAjax', 'generalParameters', 'imgCrop', function ($rootScope, $scope, $http, classAjax, generalParameters, imgCrop) {

    $scope.showSignIn = false;
    $scope.showFnameError = false;
    $scope.showLnameError = false;
    $scope.showGenderError = false;
    $scope.showEmailError = false;
    $scope.showPassError = false;
    $scope.showPhoneError = false;
    $scope.showAddressError = false;
    $scope.errorMsg = '';
    $scope.datacrop = {};
    $scope.userImg = '';

    $scope.closeSignInPopup = function () {
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
        //$scope.$apply();
        generalParameters.setShowLogin(true);
        console.log(args)
    });

    $scope.sendSignIn = function () {
        $scope.showFnameError = $scope.fName == undefined || $scope.fName == '';
        $scope.showLnameError = $scope.lName == undefined || $scope.lName == '';
        $scope.showGenderError = $scope.gender == undefined || ($scope.gender != 'זכר' && $scope.gender != 'נקבה');
        $scope.showEmailError = $scope.mail == undefined || $scope.mail == '';
        $scope.showPassError = $scope.pass == undefined || $scope.pass == '' || $scope.pass != $scope.passAuthentication;
        $scope.showPhoneError = $scope.askPhoneAndAddress && ($scope.phone == undefined || $scope.phone == '');
        $scope.showAddressError = $scope.askPhoneAndAddress && ($scope.address == undefined || $scope.address == '');

        if ($scope.showFnameError || $scope.showLnameError || $scope.showGenderError || $scope.showEmailError || $scope.showPassError || $scope.showPhoneError || $scope.showAddressError) {
            return;
        }

        $scope.showFnameError = false;
        $scope.showLnameError = false;
        $scope.showGenderError = false;
        $scope.showEmailError = false;
        $scope.showPassError = false;
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
        else {
            $scope.signinDetails.phone = "מספר טלפון";
            $scope.signinDetails.address = "כתובת";
        }

        console.log($scope.signinDetails);
        $scope.json = JSON.stringify($scope.signinDetails);
        console.log($scope.json);

        $http.post(domain + 'signup/', $scope.json)
        .success(function (data) {
            $scope.showSignIn = false;
            generalParameters.setUser(data.data.user);

            //send image string to be saved at server
            //if was uploaded
            console.log($scope.userImg);
            if ($scope.userImg != '') {
                $scope.uploadBase64Image();
            }
            //$http.post(domain + 'Base64FileUpload?ref=user&_id=data.data.user /',
            // $scope.json)
            $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });

            $scope.fName = '';
            $scope.lName = '';
            $scope.gender = '';
            $scope.mail = '';
            $scope.pass = '';
            $scope.passAuthentication = '';
            $scope.phone = '';
            $scope.address = '';
            $scope.userImg = '';
            console.log(data);
        });

        console.log($scope.signinDetails);
    }

    //send base64 string to server to be converted to jpg, then save image to current user details. 
    $scope.uploadBase64Image = function () {
        console.log($scope.userImg);
        // $scope.json = JSON.stringify($scope.userImg);
        var userId = generalParameters.getUser();
        console.log(userId._id);
        $http.post(domain + 'Base64FileUpload?ref=user&_id=' + userId._id,
            { "base64": $scope.userImg })
            .success(function (data) {
                console.log('base64');
                console.log(data);
                generalParameters.setUser(data.data);
                //generalParameters.setUser(data.data.user);
            });

    }

    document.getElementById('userImg').addEventListener('change', function (e) {
        $scope.fileEdit(e);
    }, false);

    $scope.fileEdit = function (e) {
        //file reader to show the img
        var file = e.target.files[0];

        //file reader
        var reader = new FileReader();

        if (file.type.match('image/*')) {
            var reader = new FileReader();
            reader.onload = (function () {
                return function (e) {
                    //console.log(e);
                    console.log(e.target.result); //base64 img
                    $scope.userimg = e.target.result;
                    $scope.editImg = true;
                    $scope.$apply();
                    $scope.croping();
                };
            })(file);
            reader.readAsDataURL(file);
        }
    }


    //user image crop
    $scope.croping = function () {
        imgCrop.obj = {};
        $('#cropDiv img').on('load', function () {
            imgCrop.crop('c', 'button_ok', 'cropDiv'); //canvasid  ,btn-approve, container Id
        });
    }

    $scope.$on('editDone', function (e, d) {
        console.log(d);
        $scope.userImg = d.data;
        $scope.editImg = false;
        $scope.$apply();
        $scope.userimg = '';
        imgCrop.destroy();
    });

    $scope.editCancel = function () {
        $scope.editImg = false;
        $scope.userimg = '';
        imgCrop.destroy();
    }

} ])