socialGroupApp.controller('comments', ['$scope', '$stateParams', 'PostService', function ($scope, $stateParams, PostService) {
    console.log('postId: ' + $stateParams.postId);  
    $scope.postId = $stateParams.postId;
    $scope.showCommentDate = true;
    $scope.post = PostService.getPostById($scope.postId); console.log( $scope.post);  
    $scope.comments = $scope.post.comments;

} ]);
