socialGroupApp.controller('comments', ['$scope', '$stateParams', 'PostService', function ($scope, $stateParams, PostService) {
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
