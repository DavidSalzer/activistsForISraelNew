socialGroupApp.controller('event', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {


    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/calendar.png",
        featureWhatsUpLogo: "./img/calendar.png",
        featureColor: '#004a8e',
        infoHaeder: "פיצ'ר נפגשים",
        infoMainText: 'פרסמו אירועים למען ישראל! לוח לפרסום ויצירת אירועים/חוגי בית/מפגשים בהם תרצו לשתף את החברים.',
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };
    
	generalParameters.setFeature($scope.featureDetails);

      request = {
        startTimestamp: '',
        endTimestamp: '',
        offset: 0,
        limit: 12,
        orderBy: '-timestamp',
        postType: 'event'
    };


    /*init controller data*/
    PostService.getPostsBatch(request); //tell service to refresh posts
    $scope.events = PostService.getPosts; //ask service for posts


    $scope.loadMore = function () {
        $scope.showSpiner = true; //need to change to false while get callback from server.
        console.log('load more');
        request.endTimestamp = '0';
        PostService.getPostsBatch(request);
    }

    $scope.getPosts = function () {
        PostService.getPostsBatch(request);
    }

    $scope.writeMeme = function () {
        $scope.user = generalParameters.getUser();
       // if ($scope.user.firstName == '�����') {
      //      $rootScope.$broadcast('showInfoPopup', { showInfo: true });
      //  }
       // else {
            $state.transitionTo('write-meme');
       // }
    };

}]);


