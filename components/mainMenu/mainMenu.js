socialGroupApp.controller('mainMenu', ['$scope', '$state', 'classAjax', 'generalParameters', 'PostService', function ($scope, $state, classAjax, generalParameters, PostService) {

    var exitFlag = false;

    generalParameters.setBackIcon(false);
    $scope.originUrl = window.location.origin + window.location.pathname + '#/';
    console.log($scope.originUrl);

    $scope.demandes = [
    {
        featureColor: '#878787',
        featureIcon: './img/temp-demand.png',
        featureSendInClick: 'profile'
    },
    {
        featureColor: '#00BD9B',
        featureIcon: './img/temp-demand.png',
        featureSendInClick: 'pointes'
    },
    {
        featureColor: '#01A2D2',
        featureIcon: './img/temp-demand.png',
        featureSendInClick: 'chat'
    },
    {
        featureColor: '#9D0B0F',
        featureIcon: './img/temp-demand.png',
        featureSendInClick: 'video'
    }];


    PostService.loadMainFeatures();
    $scope.features = PostService.getMainFeatures;

    $scope.goToFromeDemand = function (frome) {
        alert('dsd');
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


