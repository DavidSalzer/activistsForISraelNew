socialGroupApp.controller('login', ['$rootScope', '$scope', '$state', '$http', 'generalParameters', '$timeout', function ($rootScope, $scope, $state, $http, generalParameters, $timeout) {
    $scope.domain = domain;
    $scope.returnTo = document.URL;
    $scope.showEmailError = false;
    $scope.showPassError = false;
    $scope.showLoginError = false;
    $scope.isForgotPassword = false;
    $scope.showForgotPasswordError = false;
    $scope.recoveryCodeServerError = false;

    if (localStorage.getItem('user')) {

        $state.transitionTo('main-menu');
    }

    $scope.showLogin = false;
    $scope.showLoginError = false;
    $scope.errorMsg = '';

    $scope.$on('showLoginPopup', function (event, args) {
        //$scope.showLogin = args.showLogin;
        //generalParameters.setShowLogin($scope.showLogin);
        //$scope.isForgotPassword = false;
        //$scope.isNewPasswordPage = false;
        //$scope.successPasswordRecovery = false;
        $timeout(function () {
            $scope.showLogin = args.showLogin;
            generalParameters.setShowLogin($scope.showLogin);
            $scope.isForgotPassword = false;
            $scope.isNewPasswordPage = false;
            $scope.successPasswordRecovery = false;
        }, 0);

    });

    $scope.closeLoginPopup = function () {
        $scope.showLogin = false;
        generalParameters.setShowLogin(false);
        $scope.isForgotPassword = false;
    }

    $scope.openSigninPopup = function () {

        $scope.showLogin = false;
        $rootScope.$broadcast('showSignInPopup', { showSignIn: true });
    }

    $scope.sendLogin = function () {
        $scope.showEmailError = $scope.mail == undefined || $scope.mail == '';
        $scope.showPassError = $scope.pass == undefined || $scope.pass == '';

        if ($scope.showEmailError || $scope.showPassError) {
            return;
        }

        $scope.loginDetails = {

            email: $scope.mail,
            password: $scope.pass

        }


        $scope.json = JSON.stringify($scope.loginDetails);


        $rootScope.$broadcast('showLoader', { showLoader: true });
        $http.post(domain + 'login/', $scope.json)
        .success(function (data) {
            $scope.showLogin = false;
            generalParameters.setShowLogin(false);
            generalParameters.setUser(data.data.user);
            $scope.mail = '';
            $scope.pass = '';

            $scope.showLoginError = false;
            //if the current state is "meme" - refresh the feed
            if ($state.is("meme")) {

                $rootScope.$broadcast('refreshMemesFeed');
            }
            $rootScope.$broadcast('showLoader', { showLoader: false });
        })
        .error(function (data, status, headers, config, statusText) {

            if (status == 401 || status == 404) {
                $scope.loginErrorMessage = 'שם משתמש או סיסמה שגויים';
            }
            else if (status == 4011) {
                $scope.loginErrorMessage = errorMessages.unConfirmed;
            }
            else {
                $scope.loginErrorMessage = errorMessages.generalError;
            }
            $scope.showLoginError = true;

            $rootScope.$broadcast('showLoader', { showLoader: false });
        });

        //$scope.showLogin = false;


    }

    $scope.facebooklogin = function () {
        if (document.location.protocol != 'http:' && document.location.protocol != 'https:') {
            $scope.ref = window.open(domain + 'auth/facebook', '_blank', 'location=yes');

            $scope.ref.addEventListener('loadstop', $scope.endLogin);
        }
        else {
            location.replace(domain + 'auth/facebook?returnTo=' + $scope.returnTo)
        }
    }

    $scope.googlelogin = function () {

        if (document.location.protocol != 'http:' && document.location.protocol != 'https:') {
            $scope.ref = window.open(domain + 'auth/google', '_blank', 'location=yes');

            $scope.ref.addEventListener('loadstop', $scope.endLogin);
        }
        else {
            location.replace(domain + 'auth/google?returnTo=' + $scope.returnTo)
        }
    }

    $scope.endLogin = function (event) {

        if (event.url.search('/profile') != -1) {
            $http.get(domain + 'profile/', { withCredentials: true, async: true })
                .success(function (data) {

                    if (data.data.user != undefined) {
                        generalParameters.setUser(data.data.user);
                    }
                    else {
                        generalParameters.setUser({ firstName: 'הצטרף לאפליקציה', userImg: './img/user.png' });
                    }

                })

            //$scope.ref.close();
            //$scope.showLogin = false;
            //generalParameters.setShowLogin(false);
            //$scope.$apply();

            $timeout(function () {
                $scope.ref.close();
                $scope.showLogin = false;
                generalParameters.setShowLogin(false);
            }, 0);

        }
    }

    //Open password recovery page.
    $scope.forgotPassword = function () {
        $scope.isForgotPassword = true;
        $scope.isNewPasswordPage = false;
    }

    //Back to login page from password recovery page.
    $scope.backToLogin = function () {
        $scope.isForgotPassword = false;
        $scope.isNewPasswordPage = false;
        $scope.successPasswordRecovery = false;
    }

    //Send forgotPassword request to server.
    $scope.sendForgotPassword = function () {
        $scope.showEmailError = $scope.mail == undefined || $scope.mail == '';

        if ($scope.showEmailError) {
            return;
        }

        $rootScope.$broadcast('showLoader', { showLoader: true });
        $http.get(domain + 'forgotPassword/' + $scope.mail)
        .success(function (data) {

            if (data.status.statusCode == 0) {
                $scope.successPasswordRecovery = true;
                $scope.showForgotPasswordError = false;
            }
            else if (data.status.statusCode == 404) {
                $scope.showForgotPasswordError = true;
                $scope.forgotPasswordError = 'המייל שהזנת לא מוכר במערכת';
            }
            else {
                $scope.showForgotPasswordError = true;
                $scope.forgotPasswordError = errorMessages.generalError;
            }
            $rootScope.$broadcast('showLoader', { showLoader: false });
        })
        .error(function (data) {
            $scope.showForgotPasswordError = true;
            $scope.forgotPasswordError = errorMessages.generalError;
            $rootScope.$broadcast('showLoader', { showLoader: false });
        })
    }

    $scope.openCodefield = function () {
        $scope.successPasswordRecovery = true;
    }

    $scope.sendRecoveryCode = function () {
        $scope.recoveryCodeError = $scope.recoveryCode == undefined || $scope.recoveryCode == '';
        if ($scope.recoveryCodeError) {
            return;
        }

        $scope.newPasswordDetails = {

            code: $scope.recoveryCode

        }


        $scope.json = JSON.stringify($scope.newPasswordDetails);


        $rootScope.$broadcast('showLoader', { showLoader: true });
        $http.post(domain + 'verifyPassCode', $scope.json)
        .success(function (data) {

            if (data.status.statusCode == 0) {
                $scope.isNewPasswordPage = true;
                $scope.recoveryCodeServerError = false;
            }
            else if (data.status.statusCode == 401) {
                $scope.recoveryCodeServerError = true;
                $scope.recoveryCodeErrorMessage = 'קוד השחזור שגוי או אינו בתוקף';
            }
            else {
                $scope.recoveryCodeServerError = true;
                $scope.recoveryCodeErrorMessage = errorMessages.generalError;
            }
            $rootScope.$broadcast('showLoader', { showLoader: false });
        })
        .error(function (data) {
            $scope.recoveryCodeServerError = true;
            $scope.recoveryCodeErrorMessage = errorMessages.generalError;
            $rootScope.$broadcast('showLoader', { showLoader: false });
        });
    }

    $scope.setNewPassword = function () {
        $scope.recoveryCodeError = $scope.recoveryCode == undefined || $scope.recoveryCode == '';
        $scope.showPassError = $scope.pass == undefined || $scope.pass.length < 6;
        $scope.showPassAuthenticationError = $scope.pass != $scope.passAuthentication;

        if ($scope.recoveryCodeError || $scope.showPassError || $scope.showPassAuthenticationError) {
            return;
        }

        $scope.recoveryCodeError = false;
        $scope.showPassError = false;
        $scope.showPassAuthenticationError = false;

        $scope.newPasswordDetails = {

            code: $scope.recoveryCode,
            password: $scope.pass

        }


        $scope.json = JSON.stringify($scope.newPasswordDetails);


        $rootScope.$broadcast('showLoader', { showLoader: true });
        $http.put(domain + 'setPassword', $scope.json)
        .success(function (data) {

            if (data.status.statusCode == 0) {
                $scope.showLogin = false;
                generalParameters.setShowLogin(false);
                //generalParameters.setUser(data.data.data);
                $scope.mail = '';
                $scope.pass = '';
                $scope.passErrorInServer = false;

            }
            else {
                $scope.passErrorInServer = true;
                $scope.passErrorMessage = errorMessages.generalError;
            }
            $rootScope.$broadcast('showLoader', { showLoader: false });
        })
        .error(function (data) {
            $scope.passErrorInServer = true;
            $scope.passErrorMessage = errorMessages.generalError;
            $rootScope.$broadcast('showLoader', { showLoader: false });
        });

    }


} ]);

function signinCallback(authResult) {
    if (authResult['status']['signed_in']) {

        // Update the app to reflect a signed in user
        // Hide the sign-in button now that the user is authorized, for example:
        document.getElementById('signinButton').setAttribute('style', 'display: none');
        getClientData(authResult.access_token);

    } else {
        // Update the app to reflect a signed out user
        // Possible error values:
        //   "user_signed_out" - User is signed-out
        //   "access_denied" - User denied access to your app
        //   "immediate_failed" - Could not automatically log in the user

        localStorage.clear('user');
    }
}

var user;

function getClientData(accessToken) {


    var xhr = new XMLHttpRequest();
    xhr.open('GET',
    'https://www.googleapis.com/plus/v1/people/me/');
    xhr.setRequestHeader('Authorization',
    'Bearer ' + accessToken);
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            myProfile = JSON.parse(xhr.responseText);
            if (myProfile.image.url) {
                imgurl = myProfile.image.url;
                Fname = myProfile.name.givenName;
                Lname = myProfile.name.familyName;
            } else {
                imgurl = '';
                Fname = myProfile.first_name;
                Lname = myProfile.last_name;
            }
            user = {
                name: Fname,
                lastName: Lname,
                img: imgurl
            }
            localStorage.setItem('user', JSON.stringify(user));
        }
    }
}