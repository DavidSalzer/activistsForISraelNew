socialGroupApp.controller('headerCtrl', ['$rootScope', '$scope', '$location', '$state', '$http', 'generalParameters', function ($rootScope, $scope, $location, $state, $http, generalParameters) {

    var current = $location.$$url;
    $scope.active = -1;

    $scope.select = function (index) {

        $scope.active = index;
    }

    $http.get(domain + 'profile/', {withCredentials: true,async:true})
    .success(function (data) {
        console.log(data);
        if(data.data.user!=undefined){
            generalParameters.setUser(data.data.user);
        }
        else{
            generalParameters.setUser({ firstName: 'התחבר', userImg: './img/user.png' });
        }
        
    })

    $scope.$on('postClicked', function (event, args) {
        generalParameters.setBackIcon(true);
    });

    $scope.back = function () {
        window.history.back();
        generalParameters.setBackIcon(false);
    }

    $scope.featureDetails = generalParameters.getFeature;
    $scope.user = generalParameters.getUser;
    $scope.backIcon = generalParameters.getBackIcon;
    $scope.featuresList = [
        {
            featureUrl: 'main-menu',
            featureName: 'דף הבית',
            featureLogo: "./img/poalim-logo.png",
            featureColor: ""
        },
        {
            featureUrl: 'talk-back',
            featureName: 'טוקבקים',
            featureLogo: "./img/whatsup.png",
            featureColor: "#993ca7"
        },
         {
            featureUrl: 'article',
            featureName: 'מאמרים',
            featureLogo: "./img/article.png",
            featureColor: "#006dbe"
        },
        {
            featureUrl: 'channel',
            featureName: 'YOUTUBE',
            featureLogo: "./img/youtube.png",
            featureColor: "#fa0001"
        },
       
        {
            featureUrl: 'facebookBennet/NaftaliBennett',
            featureName: 'פייסבוק נפתלי',
            featureLogo: "./img/NaftaliBennett.png",
            featureColor: "#004a8e"
        },
        {
            featureUrl: 'facebookPoalim/actionforisrael',
            featureName: 'פייסבוק פועלים',
            featureLogo: "./img/actionforisrael.png",
            featureColor: "#004a8e"
        }
		//{
		//    featureUrl: 'poll',
		//    featureName: 'משאל עם',
		//    featureLogo: "./img/poll.png",
		//    featureColor: "#da4f00"
		//}

    ];

    $scope.userProfile = generalParameters.getUser;
    $scope.showMask = generalParameters.getShowLogin;

    $scope.goToUserProfile = function (i) {
        if ($scope.userProfile().firstName != 'התחבר') {
            $state.transitionTo('user-profile');
        }
        else {
            $rootScope.$broadcast('showLoginPopup', { showLogin: true });
            console.log('sign in');

        }
    };

    $scope.goToSignin = function () {
        $scope.showInfo = false;
        $rootScope.$broadcast('showSignInPopup', { showSignIn: true });
    }

    $scope.showInpoPopUp = function () {

        if ($scope.showInfo == true) {
            $rootScope.$broadcast('showSignInPopup', { showSignIn: false });
            $rootScope.$broadcast('showLoginPopup', { showLogin: false });
            $rootScope.$broadcast('showThankPage', { showThankPage: false });
            $scope.showInfo = false;
            generalParameters.setShowLogin(false);
        } else {
            $rootScope.$broadcast('showSignInPopup', { showSignIn: false });
            $rootScope.$broadcast('showLoginPopup', { showLogin: false });
            $rootScope.$broadcast('showThankPage', { showThankPage: false });
            $scope.showInfo = true;
            generalParameters.setShowLogin(true);
        }
    }

    $scope.$on('showInfoPopup', function (event, args) {
        $scope.showInfo = args.showInfo;
        generalParameters.setShowLogin($scope.showInfo);
    });

    $scope.share = function () {
        //if (generalParameters.getShowLogin()) { return; }
        $rootScope.$broadcast('showSignInPopup', { showSignIn: false });
        $rootScope.$broadcast('showLoginPopup', { showLogin: false });
        $rootScope.$broadcast('showThankPage', { showThankPage: false });
        $scope.showInfo = false;
        generalParameters.setShowLogin(false);
        //do shaer here....
        //phonegap plugin...
        //message, subject, image and link
        message = 'my message';
        subject = 'The subject';
        img = 'https://www.google.nl/images/srpr/logo4w.png';
        link = 'http://www.x-services.nl';
        window.plugins.socialsharing.share(message, subject, img, link);


    }

    $scope.closePopups = function () {
        $rootScope.$broadcast('showSignInPopup', { showSignIn: false });
        $rootScope.$broadcast('showLoginPopup', { showLogin: false });
        $rootScope.$broadcast('showThankPage', { showThankPage: false });
        $scope.showInfo = false;
        generalParameters.setShowLogin(false);
    }



} ]);




