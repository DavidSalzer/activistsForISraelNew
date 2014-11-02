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
            featureName: 'עמוד הבית',
            featureLogo: "./img/sidebar-menu-icon.png",
            featureStyleName : 'menu',
            featureColor: '#00aeef'
        },
        {
            featureUrl: 'talkback',
            featureName: 'הפורום',
            featureLogo: "./img/sidebar-talk-back-icon.png",
            featureStyleName : 'talkback',
            featureColor: "#993ca7"
        },
        {
            featureUrl: 'meme',
            featureName: 'ממים',
            featureLogo: "./img/sidebar-meme-icon.png",
            featureStyleName : 'meme',
            featureColor: "#ffd427"
        },
    //{
    //    featureUrl: 'article',
    //    featureName: 'מאמרים',
    //    featureLogo: "./img/article.png",
    //    featureColor: "article"
    //},
        {
        featureUrl: 'event',
        featureName: 'אירועים',
        featureLogo: "./img/sidebar-event-icon.png",
        featureStyleName : 'event',
        featureColor: "#004a8e"
    },
        {
            featureUrl: 'poll',
            featureName: 'סקרים',
            featureLogo: "./img/sidebar-poll-icon.png",
            featureStyleName : 'poll',
            featureColor: "#f55c06"
        },
        {
            featureUrl: 'chat',
            featureName: "צ'אט חי",
            featureLogo: "./img/sidebar-chat-icon.png",
             featureStyleName : 'chat',
            featureColor: "#01a3d4"
        },
        {
            featureUrl: 'tv',
            featureName: "לייב tv",
            featureLogo: "./img/sidebar-tv-icon.png",
            featureStyleName : 'tv',
            featureColor: "#9e0b0f"
        },
        {
            featureUrl: 'channel',
            featureName: 'ערוץ יוטיוב',
            featureLogo: "./img/sidebar-youtube-icon.png",
            featureStyleName : 'channel',
            featureColor: "#fa0001"
        },
        {
            featureUrl: 'facebookBennet/NaftaliBennett',
            featureName: 'פייסבוק נפתלי',
            featureLogo: "./img/sidebar-facebook-icon.png",
            featureStyleName : 'facebooknaf',
            featureColor: "#004a8e"
        },
        {
            featureUrl: 'facebookBennet/NaftaliBennett',
            featureName: 'מבזקים',
            featureLogo: "./img/sidebar-flash-icon.png",
            featureStyleName : 'flash',
            featureColor: "#00aeff"
        },
        {
            featureUrl: 'facebookBennet/NaftaliBennett',
            featureName: 'הניקוד שלי',
            featureLogo: "./img/sidebar-score-icon.png",
            featureStyleName : 'score',
            featureColor: "#00be9c"
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
        featureLogo: "./img/sidebar-contact-icon.png",
        featureStyleName : 'contact',
        featureColor: "#009933"
    }

    ];

    $scope.userProfile = generalParameters.getUser;
    $scope.showMask = generalParameters.getShowLogin;


    $scope.gh = function (e , b) {
      e.target.style.backgroundColor = b;
    }

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
        //message = 'קראתי מאמר באחליקציה, כנסו לקרוא..';
        subject = 'האחליקציה של בנט ';
        img = null;
        link = 'http://www.cambium-team.com/bennet/core/' + window.location.hash;

        currentState = $state.$current;

        message = shareDetailes[currentState].message;

        if (shareDetailes[currentState].hasTitle) {
            message = message + ': ' + PostService.getSinglePost().title;
        }
        else if (shareDetailes[currentState].hasContent) {
            message = message + ': ' + PostService.getSinglePost().content;
        }

        $rootScope.$broadcast('showLoader', { showLoader: true });
        window.plugins.socialsharing.share(message, subject, img, link, function () { $rootScope.$broadcast('showLoader', { showLoader: false }); });

        // You can share text, a subject (in case the user selects the email application), (any type and location of) file (like an image), and a link.
        // However, what exactly gets shared, depends on the application the user chooses to complete the action. A few examples:

        //Mail: message, subject, file.
        //Twitter: message, image (other filetypes are not supported), link (which is automatically shortened).
        //Google+ / Hangouts (Android only): message, subject, link
        //Flickr: message, image (an image is required for this option to show up).
        //Facebook iOS: message, image (other filetypes are not supported), link.
        //Facebook Android: sharing a message is not possible. You can share either a link or an image (not both), but a description can not be prefilled
    }

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        console.log(toState);
        if (shareDetailes[toState.name] != undefined) {
            $scope.showShareBtn = true;
        }
        else {
            $scope.showShareBtn = false;
        }
    });

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

    $scope.receiveScoringRanks = [
        {
            score: 1,
            color: '#01a3d4',
            activities: [
                {
                    text: 'השתתפות בסקר',
                    img: './img/poll_info.png'
                }
            ]
        },
        {
            score: 2,
            color: '#f6ba55',
            activities: [
                {
                    text: 'כתיבה בפורום',
                    img: './img/hosting_info.png'
                },
                {
                    text: 'שיתוף מתוך האפליקציה',
                    img: './img/poalim-logo.png'
                }
            ]
        },
        {
            score: 3,
            color: '#da4f00',
            activities: [
                {
                    text: 'השתתפות באירוע',
                    img: './img/calendar_info.png'
                },
                {
                    text: 'העלאת מם',
                    img: './img/meme_info.png'
                }
            ]
        },
        {
            score: 4,
            color: '#8ec531',
            activities: [
                {
                    text: 'הערכת חבר',
                    img: './img/appreciate.png'
                },
                {
                    text: 'שליחת שאלה לסקר',
                    img: './img/poll_info.png'
                },
                {
                    text: 'דרגה חדשה',
                    img: './img/poalim-logo.png'
                }
            ]
        },
        {
            score: 5,
            color: '#006dbe',
            activities: [
                {
                    text: 'הרשמה',
                    img: './img/poalim-logo.png'
                },
                {
                    text: 'יצירת אירוע',
                    img: './img/calendar_info.png'
                }
            ]
        }
    ];

} ]);




