socialGroupApp.controller('comments', ['$scope', '$state', '$stateParams', 'PostService', 'generalParameters', '$timeout', function ($scope, $state, $stateParams, PostService, generalParameters, $timeout) {


    /*delay dom building until transition is done*/
    $scope.buildPage = false;
    //$rootScope.$broadcast('showLoader', { showLoader: true });
    $timeout(function () { $scope.buildPage = true; }, 200);

    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/sidebar-talk-back-icon.png",
        featureWhatsUpLogo: "./img/hosting_info.png",
        featureColor: '#993ca7',
        infoHaeder: "הפורום",
        infoMainText: "כתבו על כל נושא שמעניין אתכם. המשתמשים יוכלו לסמן 'אהבתי' או להגיב לדבריכם. מוגבל ל 140 תווים. יש לשמור על זכויות יוצרים",
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };

    generalParameters.setFeature($scope.featureDetails);
    generalParameters.setBackIcon(true);
    $scope.domain = domain + 'medium/';
    $scope.showSpiner = PostService.getSpiner;
    $scope.offset = 20;
    console.log('postId: ' + $stateParams.postId);
    $scope.postId = $stateParams.postId;
    $scope.showCommentDate = true;
    PostService.getPostById($scope.postId)
    .then(function (data) {
        $timeout(function () {
            $scope.post = PostService.getSinglePost();
        }
        , 0);
    });
    PostService.getPostsBatch({ startTimestamp: '', endTimestamp: '', offset: 0, limit: 20, _parentID: $scope.postId, postType: 'talkback', orderBy: '-timestamp' })
    .then(function (data) {
        $timeout(function () {
            $scope.comments = PostService.getPosts();
        }
        , 0);
    });
    //$scope.post = PostService.getSinglePost;
    //$scope.comments = PostService.getPosts;

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

    $scope.loadMore = function () {
        if (!PostService.getLoadMoreNow()) {
            if ($scope.showendloader) {
                return;
            }
            PostService.setLoadMoreNow(true);
            posts = PostService.getPosts();
            self.getPostsBatch({ startTimestamp: '', endTimestamp: posts[0].timestamp, offset: $scope.offset, limit: 20, _parentID: $scope.postId, postType: 'talkback', orderBy: '-timestamp' })
            .then(function (data) {
                $timeout(function () {
                    $scope.comments = PostService.getPosts();
                }
                , 0);
            });
            $scope.offset += 20;
        }
    };

    $scope.userClicked = function (userId) {
        $state.transitionTo('user-profile', { userId: userId });
    };

} ]);
