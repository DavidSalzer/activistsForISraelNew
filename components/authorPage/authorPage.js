socialGroupApp.controller('authorPage', ['$scope','$stateParams', 'classAjax', '$state', '$stateParams', 'PostService', 'generalParameters', function ($scope,$stateParams, classAjax, $state, $stateParams, PostService, generalParameters) {

    /*init postTemplate*/
    $scope.domain = domain;
    $scope.showAuthorImage = false;
    $scope.showAuthorName = false;
    $scope.authorId = $stateParams.authorId; //get the current user id
   // $scope.requestDetails = PostService.getFilterByAuthor();
   // console.log($scope.requestDetails);

   request = {
        startTimestamp: '',
        endTimestamp: '',
        offset: 0,
        limit: 20,
        orderBy: '-timestamp',
        postType: 'article',
        authorId: $scope.authorId
    };
    

    PostService.getPostsByAuthor(request);

    $scope.posts = PostService.getPosts();
   
    $scope.post =$scope.posts[0];
   
    $scope.posts = PostService.getPosts

    $scope.$on('postClicked', function (event, args) {
        $scope.postId = args.postId;
        $scope.authorId = args.authorId;
        console.log('args: ' + args.postId);
        switch (args.postType) {
            case "article":
                $state.transitionTo('single-article', { postId: $scope.postId });
                break;
            case "author":
                $state.transitionTo('author-page', { authorId: $scope.authorId });
                break;
        }

    });


} ]);
