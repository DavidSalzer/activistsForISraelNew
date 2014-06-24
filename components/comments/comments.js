socialGroupApp.controller('comments', ['$scope', '$stateParams', 'PostService', function ($scope, $stateParams, PostService) {
    $scope.domain = domain;
    console.log('postId: ' + $stateParams.postId);
    $scope.postId = $stateParams.postId;
    $scope.showCommentDate = true;
    PostService.getPostById($scope.postId);
    $scope.post = PostService.getSinglePost;
    //$scope.comments = $scope.post.comments;

} ]);
