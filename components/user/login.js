socialGroupApp.controller('login', ['$rootScope', '$scope', '$state', '$http', 'classAjax', 'generalParameters', function ($rootScope, $scope, $state, $http, classAjax, generalParameters) {
    $scope.domain = domain;
    $scope.returnTo = document.URL;
    $scope.showEmailError = false;
    $scope.showPassError = false;

    if (localStorage.getItem('user')) {
        console.log('user login... transitionTo:');
        $state.transitionTo('main-menu');
    }

    $scope.showLogin = false;
    $scope.showLoginError = false;
    $scope.errorMsg = '';

    $scope.$on('showLoginPopup', function (event, args) {
        $scope.showLogin = args.showLogin;
        generalParameters.setShowLogin($scope.showLogin);
        //$scope.$apply();
        console.log(args)
    });

    $scope.closeLoginPopup = function () {
        $scope.showLogin = false;
        generalParameters.setShowLogin(false);
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

        console.log($scope.loginDetails);
        $scope.json = JSON.stringify($scope.loginDetails);
        console.log($scope.json);

        $http.post(domain + 'login/', $scope.json)
        .success(function (data) {
            $scope.showLogin = false;
            generalParameters.setShowLogin(false);
            generalParameters.setUser(data.data.user);
            $scope.mail = '';
            $scope.pass = '';
            console.log(data);
        });

        //$scope.showLogin = false;

        console.log($scope.loginDetails);
    }

    $scope.facebooklogin = function () {
        FB.login(function (response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function (response) {
                    console.log(response);
                    console.log('Good to see you, ' + response.name + '.');

                    user = {
                        name: response.first_name,
                        lastName: response.last_name,
                        img: 'https://graph.facebook.com/' + response.id + '/picture'
                    }
                    console.log(user);
                    // $rootScope.$broadcast('userLogin', { user: user});
                    //save to loacl store
                    localStorage.setItem('user', JSON.stringify(user));
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
                localStorage.clear('user');
            }
        }, { scpoe: 'email,user_likes' }); // premisions 
    }



} ]);

 function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    console.log(authResult);
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
    console.log('Sign-in state: ' + authResult['error']);
    localStorage.clear('user');
  }
}

var user;

function getClientData(accessToken){
  console.log("Getting client data");       
 
  var xhr = new XMLHttpRequest();
  xhr.open('GET',
    'https://www.googleapis.com/plus/v1/people/me/');
  xhr.setRequestHeader('Authorization',
    'Bearer ' + accessToken);
  xhr.send();
 
  xhr.onreadystatechange = function() {
    if(this.readyState == 4) {
      myProfile = JSON.parse(xhr.responseText);
      if(myProfile.image.url){
            imgurl = myProfile.image.url;
            Fname  = myProfile.name.givenName;
            Lname  = myProfile.name.familyName;
        }else{ 
            imgurl = '';
            Fname = myProfile.first_name;
            Lname = myProfile.last_name;
        }
     user={
        name:Fname,
        lastName:Lname,
        img:imgurl
        }
       localStorage.setItem('user',JSON.stringify(user));
    }
  }
}