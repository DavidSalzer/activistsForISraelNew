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
    //$scope.postId = $stateParams.postId;
    PostService.getPostById($scope.articleId);
    $scope.post = PostService.getSinglePost;

    //$scope.comments = $scope.post.comments;

    $scope.authorClicked = function ($event) {
        //alert('hi22');
        // $state.transitionTo('authorPage');
    };

    /* broadcast*/
    $scope.$on('addCommentClicked', function (event, args) {
        $scope.currentPost = args.postId;
        $scope.showInput = args.showInput;
        $scope.$apply();
        console.log(args)
    });

   /*  $scope.$on('addLike', function (event, args) {
        $scope.currentPost = args.postId;
        $scope.$apply();
        //console.log(args);
		PostService.sendLike(args.postid)
    }); */



    $scope.$on('userClicked', function (event, args) {
        alert('hi');
        $state.transitionTo('authorPage');
    });


    $scope.sendComment = function () {
        console.log($scope.commentText);
        PostService.sendPost('shimon', 'talkback', $scope.commentText, $scope.currentPost);
    }


} ]);
