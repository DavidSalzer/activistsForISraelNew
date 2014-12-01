socialGroupApp.controller('mainMenu', ['$rootScope', '$scope', '$state', 'classAjax', 'generalParameters', 'PostService', function ($rootScope, $scope, $state, classAjax, generalParameters, PostService) {

    var exitFlag = false;
     
    generalParameters.setBackIcon(false);
    $scope.originUrl = window.location.origin + window.location.pathname + '#/';
    

    $scope.demandes = [
    {
        featureColor: '#878787',
        featureIcon: './img/profile_small.png',
        featureSendInClick: 'profile'
    },
    {
        featureColor: '#00BD9B',
        featureIcon: './img/sidebar-score-icon.png',
        featureSendInClick: 'points'
    },
    {
        featureColor: '#01A2D2',
        featureIcon: './img/sidebar-chat-icon.png',
        featureSendInClick: 'chat'
    },
    {
        featureColor: '#9D0B0F',
        featureIcon: './img/sidebar-talk-back-icon.png',
        featureSendInClick: 'talkback'
    }];


    PostService.loadMainFeatures();
    $scope.features = PostService.getMainFeatures;

    $scope.goToFromeDemand = function (frome) {
        userProfile = generalParameters.getUser;
        switch (frome) {
            case 'profile':
                if (userProfile().firstName != 'הצטרף לאפליקציה') {
                    $state.transitionTo('user-profile', { userId: userProfile()._id });
                }
                else {
                    $rootScope.$broadcast('showLoginPopup', { showLogin: true });
                    
                }
                break;
            case 'points':
                $state.transitionTo('points');
                break;
            case 'chat':
                $state.transitionTo('chat');
                break;
            case 'talkback':
                $state.transitionTo('talkback');
                break;
        }
    }


    $scope.goToFeature = function (featureUrl, postId) {
        
        $state.transitionTo(featureUrl, { postId: postId });
    }

    $scope.featureDetails = {
        featureName: 'mainMenu',
        featureLogo: "./img/sidebar-menu-icon.png",
        featureWhatsUpLogo: "./img/sgin_thankyou.png",
        featureColor: '#00aeef',
        infoHaeder: "אחליקציה",
        infoMainText: 'ברוכים הבאים לאחליקציה!<br> הצטרפו אלינו ותוכלו לצפות, לכתוב, לפרסם ולהגיב. לחצו על האייקון משמאל לצפייה בתפריט המלא.',
        infoSubText: "עוד לא הצטרפת לאחליקציה?"

    };

    generalParameters.setFeature($scope.featureDetails);

} ])


