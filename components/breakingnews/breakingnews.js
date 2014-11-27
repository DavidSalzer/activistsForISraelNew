socialGroupApp.controller('breakingnews', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/sidebar-flash-icon.png",
        featureWhatsUpLogo: "./img/sgin_thankyou.png",
        featureColor: '#00aeff'
    };
    
	generalParameters.setFeature($scope.featureDetails);




}]);
