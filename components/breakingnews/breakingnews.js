socialGroupApp.controller('breakingnews', ['$rootScope', '$scope', '$state', 'PostService', 'generalParameters', function ($rootScope, $scope, $state, PostService, generalParameters) {

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

    /*init controller data*/
    request = {
        startTimestamp: '',
        endTimestamp: '',
        offset: 0,
        limit: 50,
        orderBy: '-timestamp',
        postType: 'breakingnews',
        //userID: $scope.user._id,
        _parentID: ''
    };
    PostService.getPostsBatch(request); //tell service to refresh posts
    $scope.posts = PostService.getPosts; //ask service for posts

    //load more post on scroll down
    $scope.loadMore = function () {
        //if not loading now
        if (!PostService.getLoadMoreNow()) {
            if ($scope.showendloader) {
                return;
            }
            PostService.setLoadMoreNow(true);
            console.log('load more');
            request.offset += 50;
            post = PostService.getPosts();
            request.endTimestamp = post[0].timestamp;
            PostService.getPostsBatch(request);
        }
    }

    $scope.$on('EndLoadMore', function (event, args) {
        switch (args.showLoad) {
            case true:
                $scope.showendloader = false;
                break;
            case false:
                $scope.showendloader = true;
                break;
        }
    });

    $scope.$on('postClicked', function (event, args) {
        $scope.postId = args.postId;
        generalParameters.setBackIcon(true);
        $state.transitionTo('single-breakingnews', { postId: $scope.postId });
    });

}]);
