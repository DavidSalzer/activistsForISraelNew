socialGroupApp.controller('single-breakingnews', ['$rootScope', '$scope', '$stateParams', 'PostService', 'generalParameters', function ($rootScope, $scope, $stateParams, PostService, generalParameters) {

    $scope.showSpiner = PostService.getSpiner;
    $scope.showendloader = false;

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/sidebar-flash-icon.png",
        featureWhatsUpLogo: "./img/updates_info.png",
        featureColor: '#00aeff',
        infoHaeder: "מבזקים",
        infoMainText: 'עמוד החדשות החמות של האחליקציה.',
        infoSubText: "עוד לא הצטרפת לאחליקציה?"
    };
    
	generalParameters.setFeature($scope.featureDetails);

   PostService.getPostById($stateParams.postId);
   $scope.post = PostService.getSinglePost;
}]);
