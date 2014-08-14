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
        //infoImg: './img/whatsup.png',
        featureColor: 'gray',
        infoHaeder: "מדרג קבלת הניקוד"

    };

    generalParameters.setFeature($scope.featureDetails);
    //$scope.swipeCubeWidth = function () { };
    //window.onload = function () {
    //    $scope.swipeCube = document.getElementsByClassName('menu-item-feature');
    //    console.log($scope.swipeCube);
    //    //var arrFromList = Array.prototype.slice.call($scope.swipeCube);
    //    //console.log(arrFromList);
    //    //console.log($scope.swipeCube.length);
    //    //setTimeout(function () {
    //    //    $scope.swipeCubeWidth = $scope.swipeCube[1];
    //    //    console.log($scope.swipeCubeWidth);
    //    //}, 3000);
    //    $scope.swipeCubeWidth = function () { console.log('jdfklgj'); return $scope.swipeCube[1].offsetWidth };
    //    console.log($scope.swipeCubeWidth());
    //    $scope.$apply();
    //};
    //$scope.swipeCube = document.getElementsByClassName('col-sm-6');
    //console.log($scope.swipeCube);
    //var arrFromList = Array.prototype.slice.call($scope.swipeCube);
    //console.log(arrFromList);
    //console.log($scope.swipeCube.length);
    //setTimeout(function () {
    //    $scope.swipeCubeWidth = $scope.swipeCube[1];
    //    console.log($scope.swipeCubeWidth);
    //}, 3000);
    //$scope.swipeCubeWidth = $scope.swipeCube[1];
    //console.log($scope.swipeCubeWidth);


    //$scope.$on('scrollToEnd', function (ngRepeatFinishedEvent) {
    //    document.getElementById("features-swipe-inner").scrollLeft = ($scope.features.length - 1) * 145;
    //});

} ])


