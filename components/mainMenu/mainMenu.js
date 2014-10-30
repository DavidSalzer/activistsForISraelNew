socialGroupApp.controller('mainMenu', ['$scope', '$state', 'classAjax', 'generalParameters', 'PostService', function ($scope, $state, classAjax, generalParameters, PostService) {

    var exitFlag = false;

    generalParameters.setBackIcon(false);
    $scope.originUrl = window.location.origin + window.location.pathname + '#/';
    console.log($scope.originUrl);

    PostService.loadMainFeatures();
    $scope.features = PostService.getMainFeatures;


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


