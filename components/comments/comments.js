socialGroupApp.controller('comments', ['$scope', '$state', '$stateParams', 'PostService', 'generalParameters', function ($scope, $state, $stateParams, PostService, generalParameters) {

    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/whatsup.png",
        featureWhatsUpLogo: "./img/hosting_info.png",
        featureColor: '#993ca7',
        infoHaeder: "הפורום",
        infoMainText: "כתבו על כל נושא שמעניין אתכם. המשתמשים יוכלו לסמן 'אהבתי' או להגיב לדבריכם. מוגבל ל 140 תווים. יש לשמור על זכויות יוצרים",
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };

    generalParameters.setFeature($scope.featureDetails);
     generalParameters.setBackIcon(true);
    $scope.domain = domain;
    $scope.showSpiner = PostService.getSpiner;
    $scope.offset = 20;
    console.log('postId: ' + $stateParams.postId);
    $scope.postId = $stateParams.postId;
    $scope.showCommentDate = true;
    PostService.getPostById($scope.postId);
    $scope.post = PostService.getSinglePost;
    $scope.comments = PostService.getPosts;

    $scope.loadMore = function () {
        posts = PostService.getPosts();
        self.getPostsBatch({ startTimestamp: '', endTimestamp: posts[0].timestamp, offset: $scope.offset, limit: 20, _parentID: $scope.postId, postType: 'talkback', orderBy: '-timestamp' });
        $scope.offset += 20;
    };

    $scope.userClicked = function (userId) {
        $state.transitionTo('user-profile', { userId: userId });
    };

} ]);
