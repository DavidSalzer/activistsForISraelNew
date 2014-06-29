socialGroupApp.controller('single-article', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {

    /*init variables*/
    $scope.showInput = false;
    $scope.currentPost = null;
    $scope.showPostTitle = true;
    $scope.showArticleImg = true;
    $scope.showAuthorImg = false;
    $scope.currentPostType = 'article';
    $scope.showCommentDate = false;
    $scope.showCommentTitle = false;
    $scope.domain = domain;
    $scope.showSpiner = PostService.getSpiner;
    $scope.offset = 20;

    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/article.png",
        featureColor: '#006dbe',
        infoHaeder: "מאמרים",
        infoMainText: 'כתבו מאמר בכל נושא שתבחרו. המאמר מוגבל למינימום 250 תווים ויפורסם בהתאם לכללי המערכת. המאמרים ידורגו ע"י הגולשים ויקודמו בהתאם. ניתן להעלות את המאמר כקובץ, או לכתוב אותו ישירות בעמוד. ניתן גם להוסיף תמונה מלווה למאמר.',
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };
    generalParameters.setFeature($scope.featureDetails);

    $scope.articleId = $stateParams.postId;
    console.log('postId: ' + $stateParams.postId);
    
    PostService.getPostById($scope.articleId);
    $scope.post = PostService.getSinglePost;

    $scope.comments = PostService.getPosts;

    $scope.authorClicked = function ($event) {
        
    };

  
    //$scope.$on('userClicked', function (event, args) {
    //    $state.transitionTo('author-page');
    //});


    $scope.loadMore = function () {
        posts = PostService.getPosts();
        self.getPostsBatch({ startTimestamp: '', endTimestamp: posts[0].timestamp, offset: $scope.offset, limit: 20, _parentID: $scope.postId, postType: 'talkback', orderBy: '-timestamp' });
        $scope.offset += 20;
    };


} ]);
