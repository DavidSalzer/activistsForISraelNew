socialGroupApp.controller('points', ['$rootScope', '$stateParams', '$scope',  '$http','classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, $http, classAjax, $state, PostService, generalParameters) {

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/sidebar-score-icon.png",
        featureWhatsUpLogo: "./img/sidebar-score-icon.png",
        featureColor: '#00be9c',
        infoHaeder: "הניקוד שלי",
        infoMainText: 'בוא תהיה אח! כאן תוכל לראות איך לצבור נקודות ולטפס בסולם הדירוג.',
        infoSubText: "עוד לא הצטרפת לאחליקציה?"
    };
    generalParameters.setFeature($scope.featureDetails);

    $scope.staus = 'התחבר על מנת להתחיל';
    $scope.score = 0;
    $scope.next = 50;
    $scope.marg = (window.innerWidth - 36 * 5 - 28 - 12) / 4;
    $scope.margTwo = (window.innerWidth - 28 - 44 - 5 * 5) / 4;
    $scope.myScoreBord = false;
    $scope.myScoreNow = true;
    $scope.notLogin = true;

   
    //set page when user is login
    $scope.userLogin = function () {
        $scope.staus = $scope.user.rank;
        $scope.score = $scope.user.point.count;        
        $scope.level = $scope.user.point.level;

        $scope.notLogin = false;

        $http.get(domain + 'pointsToNextLevel', { withCredentials: true, async: true })
        .success(function (data) {
            $scope.next =data.data.pointsToNextLevel;
        });
    }

    $scope.user = generalParameters.getUser();
    //if login
    if ($scope.user.firstName != "הצטרף לאפליקציה") {
        $scope.userLogin();
    }

    $rootScope.$on('setUser', function (event, user) {
        $scope.user = user.userDetails;
        if ($scope.user.firstName != "הצטרף לאפליקציה") {
            $scope.userLogin();
        }
    });

    $scope.scoredetailes = [
        {
            num: '1',
            items: [
                {
                    text: 'השתתפות באירוח חי',
                    logo: './img/sidebar-chat-icon.png'
                },
                {
                    text: 'צפיה בשידור חי',
                    logo: './img/sidebar-tv-icon.png'
                },
                {
                    text: 'השתתפות בסקר',
                    logo: './img/sidebar-poll-icon.png'
                }

            ]
        },
        {
            num: '2',
            items: [
                {
                    text: 'כתיבת טוקבק',
                    logo: './img/sidebar-talk-back-icon.png'
                },
                {
                    text: 'תגובה באירוע חי',
                    logo: './img/sidebar-chat-icon.png'
                },
                {
                    text: 'שיתוף מתוך האחליקציה',
                    logo: './img/sidebar-menu-icon.png'
                }

            ]
        },
        {
            num: '3',
            items: [
                {
                    text: 'השתתפות באירוע',
                    logo: './img/sidebar-event-icon.png'
                },
                {
                    text: 'העלאת מם',
                    logo: './img/sidebar-meme-icon.png'
                }
            ]
        },
        {
            num: '4',
            items: [
                {
                    text: 'הערכת חבר',
                    logo: './img/sidebar-menu-icon.png'
                },
                {
                    text: 'שליחת שאלה לסקר',
                    logo: './img/sidebar-poll-icon.png'
                },
                {
                    text: 'דרגה חדשה',
                    logo: './img/sidebar-menu-icon.png'
                }

            ]
        },
        {
            num: '5',
            items: [
                {
                    text: 'הרשמה',
                    logo: './img/sidebar-menu-icon.png'
                },
                {
                    text: 'יצירת אירוע',
                    logo: './img/sidebar-menu-icon.png'
                }
            ]
        },
    ]

    $scope.featuresList = [
         {
             featureName: 'אח',
             featureLogo: "./img/sidebar-menu-icon.png"
         },
         {
             featureName: 'מאסטר',
             featureLogo: "./img/points4.png"
         },
         {
             featureName: 'משפיע',
             featureLogo: "./img/points3.png"
         },
         {
             featureName: 'פעיל',
             featureLogo: "./img/points2.png"
         },
         {
             featureName: 'חבר',
             featureLogo: "./img/points1.png"
         }]


    $scope.showPart = function (num) {
        switch (num) {
            case '2':
                $scope.myScoreBord = true;
                $scope.myScoreNow = false;
                break;
            case '1':
                $scope.myScoreBord = false;
                $scope.myScoreNow = true;
                break;
        }
    }

    $scope.goToLogin = function () {
        $rootScope.$broadcast('showLoginPopup', { showLogin: true });
    }


} ]);
