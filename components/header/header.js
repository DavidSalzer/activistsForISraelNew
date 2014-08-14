socialGroupApp.controller('headerCtrl', ['$rootScope', '$scope', '$location', '$state', '$http', 'generalParameters', 'PostService', function ($rootScope, $scope, $location, $state, $http, generalParameters, PostService) {

    $rootScope.siteOrigin = siteOrigin; //origin url of site.
    $rootScope.isAdmin = false;

    $scope.originUrl = window.location.origin + window.location.pathname + '#/'; //origin url for main menu items.

    var current = $location.$$url;
    //$scope.active = -1;
    $scope.showLoader = false;


    $http.get(domain + 'profile/', { withCredentials: true, async: true })
    .success(function (data) {
        console.log(data);
        if (data.data.user != undefined) {
            generalParameters.setUser(data.data.user);
        }
        else {
            generalParameters.setUser({ firstName: 'הצטרף לאפליקציה', userImg: './img/user.png' });
        }

    })

    $scope.$on('postClicked', function (event, args) {
        generalParameters.setBackIcon(true);
    });

    $scope.back = function () {

        window.history.back();

        generalParameters.setBackIcon(false);
    }

    /* $scope.select = function (index) {

    // $scope.active = index;
    } */

    $scope.featureDetails = generalParameters.getFeature;
    $scope.user = generalParameters.getUser;
    $scope.backIcon = generalParameters.getBackIcon;
    $scope.featuresList = [
        {
            featureUrl: 'main-menu',
            featureName: 'דף הבית',
            featureLogo: "./img/poalim-logo.png",
            featureColor: 'menu'
        },
        {
            featureUrl: 'talkback',
            featureName: 'הפורום',
            featureLogo: "./img/whatsup.png",
            featureColor: "talkback"
        },
         //{
         //    featureUrl: 'article',
         //    featureName: 'מאמרים',
         //    featureLogo: "./img/article.png",
         //    featureColor: "article"
         //},

        {
            featureUrl: 'poll',
            featureName: 'סקרים',
            featureLogo: "./img/poll.png",
            featureColor: "#da4f00"
        }
          ,
         {
             featureUrl: 'meme',
             featureName: 'ממים',
             featureLogo: "./img/meme.png",
             featureColor: "#ffd427"
         }
          ,
		{
		    featureUrl: 'event',
		    featureName: 'אירועים',
		    featureLogo: "./img/calendar.png",
		    featureColor: "event"
		},
        {
            featureUrl: 'channel',
            featureName: 'יוטיוב',
            featureLogo: "./img/youtube.png",
            featureColor: "channel"
        },

        {
            featureUrl: 'facebookBennet/NaftaliBennett',
            featureName: 'פייסבוק',
            featureLogo: "./img/NaftaliBennett.png",
            featureColor: "FBnaftaly"
        },
        //{
        //    featureUrl: 'facebookPoalim/actionforisrael',
        //    featureName: 'פייסבוק פועלים',
        //    featureLogo: "./img/actionforisrael.png",
        //    featureColor: "Fbactivists"
        //},
        {
            featureUrl: 'contact',
            featureName: 'צור קשר',
            featureLogo: "./img/contact.png",
            featureColor: "#009933"
        }

    ];

    $scope.userProfile = generalParameters.getUser;
    $scope.showMask = generalParameters.getShowLogin;

    $scope.goToUserProfile = function (i) {
        if ($scope.userProfile().firstName != 'הצטרף לאפליקציה') {
            $state.transitionTo('user-profile', { userId: $scope.userProfile()._id });
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

    $scope.goToLogin = function () {
        $scope.showInfo = false;
        $rootScope.$broadcast('showLoginPopup', { showLogin: true });
    }

    $scope.showInpoPopUp = function () {

        if ($scope.showInfo == true) {
            $rootScope.$broadcast('showSignInPopup', { showSignIn: false });
            $rootScope.$broadcast('showLoginPopup', { showLogin: false });
            $rootScope.$broadcast('showThankPage', { showThankPage: false });
            $rootScope.$broadcast('showErrorPopup', { showErrorPopup: false });
            $rootScope.$broadcast('showInfoPopup', { showInfo: false });
            generalParameters.setShowLogin(false);
        } else {
            $rootScope.$broadcast('showSignInPopup', { showSignIn: false });
            $rootScope.$broadcast('showLoginPopup', { showLogin: false });
            $rootScope.$broadcast('showThankPage', { showThankPage: false });
            $rootScope.$broadcast('showErrorPopup', { showErrorPopup: false });
            $rootScope.$broadcast('showInfoPopup', { showInfo: true });
            generalParameters.setShowLogin(true);
        }
    }

    $scope.$on('showInfoPopup', function (event, args) {
        $scope.showInfo = args.showInfo;
        generalParameters.setShowLogin($scope.showInfo);
        $scope.$apply();
    });

    $scope.$on('showLoader', function (event, args) {
        $scope.showLoader = args.showLoader;
        $scope.$apply();
    });

    $scope.share = function () {
        //if (generalParameters.getShowLogin()) { return; }
        $rootScope.$broadcast('showSignInPopup', { showSignIn: false });
        $rootScope.$broadcast('showLoginPopup', { showLogin: false });
        $rootScope.$broadcast('showThankPage', { showThankPage: false });
        $rootScope.$broadcast('showErrorPopup', { showErrorPopup: false });
        $rootScope.$broadcast('showInfoPopup', { showInfo: false });
        generalParameters.setShowLogin(false);

        //phonegap sharing plugin
        message = 'קראתי מאמר באפליקצית פועלים למען ישראל, כנסו לקרוא..';
        subject = 'קראתי מאמר באפליקצית פועלים למען ישראל, כנסו לקרוא..';
        img = 'http://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Naftali-Bennett.jpg/640px-Naftali-Bennett.jpg';
        link = 'https://www.facebook.com/NaftaliBennett';
        window.plugins.socialsharing.share(message, subject, img, link);

        // You can share text, a subject (in case the user selects the email application), (any type and location of) file (like an image), and a link.
        // However, what exactly gets shared, depends on the application the user chooses to complete the action. A few examples:

        //Mail: message, subject, file.
        //Twitter: message, image (other filetypes are not supported), link (which is automatically shortened).
        //Google+ / Hangouts (Android only): message, subject, link
        //Flickr: message, image (an image is required for this option to show up).
        //Facebook iOS: message, image (other filetypes are not supported), link.
        //Facebook Android: sharing a message is not possible. You can share either a link or an image (not both), but a description can not be prefilled
    }

    $scope.closePopups = function () {
        $rootScope.$broadcast('showSignInPopup', { showSignIn: false });
        $rootScope.$broadcast('showLoginPopup', { showLogin: false });
        $rootScope.$broadcast('showThankPage', { showThankPage: false });
        $rootScope.$broadcast('showErrorPopup', { showErrorPopup: false });
        $rootScope.$broadcast('showInfoPopup', { showInfo: false });
        generalParameters.setShowLogin(false);
    }

    PostService.loadMainFeatures();
    $scope.features = PostService.getMainFeatures;

    

} ]);




