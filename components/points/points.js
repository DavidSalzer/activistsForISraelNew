socialGroupApp.controller('points', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/sidebar-score-icon.png",
        featureWhatsUpLogo: "./img/sidebar-score-icon.png",
        featureColor: '#00be9c',
        infoHaeder: "אירועים",
        infoMainText: 'לוח האירועים של האחליקציה. כאן תוכלו לראות את האירועים הקיימים ולפרסם אירועים/חוגי בית ושאר מפגשים שתרצו לשתף בהם את החברים',
        infoSubText: "יצירת תכנים באיזור זה מותנת בהרשמה לאחליקציה"
    };
     generalParameters.setFeature($scope.featureDetails);
    $scope.staus = 'מתחיל';
    $scope.score = 1024;
    $scope.next = 1024;
    $scope.marg = (window.innerWidth - 36 * 5 - 28 - 12) / 4;
    $scope.margTwo = (window.innerWidth - 28 - 44 - 5 * 5) / 4;
    $scope.myScoreBord = false;
    $scope.myScoreNow = true;

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


} ]);
