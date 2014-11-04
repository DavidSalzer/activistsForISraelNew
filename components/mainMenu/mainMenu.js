socialGroupApp.controller('mainMenu', ['$rootScope', '$scope', '$state', 'classAjax', 'generalParameters', 'PostService', function ($rootScope, $scope, $state, classAjax, generalParameters, PostService) {

    var exitFlag = false;

    generalParameters.setBackIcon(false);
    $scope.originUrl = window.location.origin + window.location.pathname + '#/';
    console.log($scope.originUrl);

    $scope.demandes = [
    {
        featureColor: '#878787',
        featureIcon: './img/profile_small.png',
        featureSendInClick: 'profile'
    },
    {
        featureColor: '#00BD9B',
        featureIcon: './img/sidebar-score-icon.png',
        featureSendInClick: 'pointes'
    },
    {
        featureColor: '#01A2D2',
        featureIcon: './img/sidebar-chat-icon.png',
        featureSendInClick: 'chat'
    },
    {
        featureColor: '#9D0B0F',
        featureIcon: './img/sidebar-talk-back-icon.png',
        featureSendInClick: 'video'
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
                    console.log('sign in');
                }
                break;
            case 'pointes':
                $state.transitionTo('talkback');
                break;
            case 'chat':
                $state.transitionTo('talkback');
                break;
            case 'video':
                $state.transitionTo('talkback');
                break;
        }
    }

    $scope.goToFeature = function (featureUrl, postId) {
        console.log('featureUrl: ' + featureUrl);
        $state.transitionTo(featureUrl, { postId: postId });
    }

    $scope.featureDetails = {
        featureName: 'mainMenu',
        featureLogo: "./img/poalim-logo.png",
        featureColor: 'gray',
        infoHaeder: "מדרג קבלת הניקוד"

    };

    generalParameters.setFeature($scope.featureDetails);

} ])


