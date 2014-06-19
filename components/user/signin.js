socialGroupApp.controller('signin', ['$rootScope', '$scope', '$http', 'classAjax', 'generalParameters', 'imgCrop', function ($rootScope, $scope, $http, classAjax, generalParameters, imgCrop) {

    $scope.showSignIn = false;
    $scope.showFnameError = false;
    $scope.showLnameError = false;
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
        $scope.showEmailError = $scope.mail == undefined || $scope.mail == '';
        $scope.showPassError = $scope.pass == undefined || $scope.pass == '' || $scope.pass != $scope.passAuthentication;
        $scope.showPhoneError = $scope.askPhoneAndAddress && ($scope.phone == undefined || $scope.phone == '');
        $scope.showAddressError = $scope.askPhoneAndAddress && ($scope.address == undefined || $scope.address == '');

        if ($scope.showFnameError || $scope.showLnameError || $scope.showEmailError || $scope.showPassError || $scope.showPhoneError || $scope.showAddressError) {
            return;
        }

        $scope.showFnameError = false;
        $scope.showLnameError = false;
        $scope.showEmailError = false;
        $scope.showPassError = false;
        $scope.showPhoneError = false;
        $scope.showAddressError = false;

        $scope.signinDetails = {
            firstName: $scope.fName,
            lastName: $scope.lName,
            email: $scope.mail,
            password: $scope.pass,
            username: $scope.mail
        }

        if ($scope.askPhoneAndAddress) {
            $scope.signinDetails.phone = $scope.phone;
            $scope.signinDetails.address = $scope.address;
        }
        else
        {
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
            $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
            console.log(data);
        });

        console.log($scope.signinDetails);
    }


    document.getElementById('userImg').addEventListener('change', function (e) {
        $scope.fileEdit(e);
    }, false);

    $scope.fileEdit = function (e) {
        //file reader to show the img...
        var file = e.target.files[0];
        //console.log(files);
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


    $scope.croping = function () {
        imgCrop.crop('c', 'button_ok', 'cropDiv'); //canvasid  ,btn-approve, contener Id

    }

    $scope.$on('editDone', function (e, d) {
        console.log(d);
        $scope.userImg = d.data;
        $scope.editImg = false;
        $scope.$apply();
        $scope.userimg = '';
        imgCrop.destroy();

        $scope.lesson = classAjax.getdata({ type: 'setUserImg', req: { imgData: d.data} });
        //yishai stern added in line 125 to the bigining "$scope.lesson="  
        $scope.lesson.then(
    function (data) {
        //lesson list
        //console.log(data);
    },
    function (error) {
        console.log(error);
    }
    )

    });

    $scope.editCancel = function () {
        $scope.editImg = false;
        $scope.userimg = '';
        imgCrop.destroy();
    }

} ])