socialGroupApp.controller('chatPromo', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {
    
    
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/sidebar-chat-icon.png",
        featureWhatsUpLogo: "./img/sgin_thankyou.png",
        featureColor: '#01a3d4'
    };
    generalParameters.setFeature($scope.featureDetails);

} ]);