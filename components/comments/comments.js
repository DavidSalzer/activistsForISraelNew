socialGroupApp.controller('comments', ['$scope', '$stateParams', 'PostService', 'generalParameters', function ($scope, $stateParams, PostService, generalParameters) {

    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/whatsup.png",
        featureWhatsUpLogo: "./img/hosting_info.png",
        featureColor: '#993ca7',
        infoHaeder: "מה קורה",
        infoMainText: "כתבו על כל נושא שמעניין אתכם. המשתמשים יוכלו לסמן 'אהבתי' או להגיב לדבריכם. מוגבל ל 140 תווים.",
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };

    generalParameters.setFeature($scope.featureDetails);

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

} ]);
