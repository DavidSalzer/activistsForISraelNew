socialGroupApp.controller('article', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {

    /*init variables*/
    $scope.showInput = false;
    $scope.currentFilter = 'all';
    $scope.currentPost = null;
    $scope.showSpiner = PostService.getSpiner;
    $scope.showPostTitle = true;



    $scope.showArticleImg = false;
    $scope.showAuthorImg = true;
    $scope.currentPostType = 'article';


    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/article.png",
        featureWhatsUpLogo: "./img/article_info.png",
        featureColor: '#006dbe',
        infoHaeder: "מאמרים",
        infoMainText: 'כתבו מאמר בכל נושא שתבחרו. המאמר מוגבל למינימום 250 תווים ויפורסם בהתאם לכללי המערכת. המאמרים ידורגו ע"י הגולשים ויקודמו בהתאם. ניתן להעלות את המאמר כקובץ, או לכתוב אותו ישירות בעמוד. ניתן גם להוסיף תמונה מלווה למאמר.',
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };
    generalParameters.setFeature($scope.featureDetails);
    $scope.domain = domain;
    $scope.user = generalParameters.getUser();
    console.log(user);
    request = {
        startTimestamp: '',
        endTimestamp: '',
        offset: 0,
        limit: 20,
        orderBy: '-timestamp',
        postType: 'article',
        userID: $scope.user._id,
        _parentID: ''
    };


    /*init controller data*/
    PostService.getPostsBatch(request); //tell service to refresh posts
    $scope.posts = PostService.getPosts; //ask service for posts
	$scope.isLiked = PostService.getIsLike;
    $scope.articleId = $stateParams.postId;


    $scope.writePost = function () {
        $scope.user = generalParameters.getUser();
        if ($scope.user.firstName == 'התחבר') {
            $rootScope.$broadcast('showInfoPopup', { showInfo: true });
        }
        else {
            $state.transitionTo('write-post', { postType: "article", postId: 0 });
        }
    };

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

    /* $scope.$on('addLike', function (event, args) {
        $scope.currentPost = args.postid;
        $scope.$apply();
        //console.log(args)
        PostService.sendLike(args.postid)
    }); */

    $scope.$on('postClicked', function (event, args) {
        console.log(args);
        $scope.postId = args.postId;
        $scope.authorId = args.authorId;
        console.log('args: ' + args.postId);
        console.log('args type: ' + args.postType);
        switch (args.postType) {
            case "article":
                $state.transitionTo('single-article', { postId: $scope.postId });
                break;
            case "author":
                $scope.getPostsByAll();
                $state.transitionTo('author-page', { authorId: $scope.authorId });
                break;
        }

    });

    $scope.userClicked = function () {
       // alert('hi1');
        //event.stopPropagation();
        $rootScope.$broadcast('userClicked', { authorId: '53a7df7ec75d61c450b44825' });
    };

    $scope.$on('userClicked', function (event, args) {
       // alert('hi2');
        $state.transitionTo('author-page', {authorId: args.authorId});
    });

    $scope.getPosts = function () {
        PostService.getPostsBatch(request);
    }

    //$scope.updatePosts = function () {
    //    PostService.updatePost({
    //        postId: 8,
    //        postType: 'talkback',
    //        author: 'shimon',
    //        timeStamp: '25052014175555',
    //        title: 'עקירת עצי זית',
    //        content: 'מה המה מה מה מה מה מה מה מה מה ',
    //        image: '',
    //        likes: {
    //            likesCount: 12,
    //            isLiked: 0
    //        },
    //        comments: {
    //            commentsCount: 5,
    //            comments: [
    //                {
    //                    commentId: 0,
    //                    postType: 'talkback',
    //                    author: 'shimon',
    //                    timeStamp: '25052014185555',
    //                    title: 'עקירת עצי זית',
    //                    content: 'תג מחיר תג מחיר תג מחיר תג מחיר תג מחיר תג מחיר ',
    //                    image: '',
    //                    like: {
    //                        likesCount: 12,
    //                        isLiked: 1
    //                    }
    //                }
    //            ]
    //        }
    //    })
    //}

    $scope.getPostsByAll = function () {
        request.endTimestamp = '';
        request.orderBy = '-timestamp';
        request.offset = 0;
        PostService.getPostsBatch(request);
    }

    $scope.getPostsByAuthors = function () {
        $scope.currentFilter = 'authors';
        request.postType = 'author';
        request.endTimestamp = '';
        PostService.getPostsBatch(request);
    }

    $scope.getAuthors = function () {
        $scope.currentFilter = 'authors';
        request.postType = 'author';
        request.endTimestamp = '';
        PostService.getPostsBatch(request);
    }


    $scope.getPostsByViews = function () {
        request.endTimestamp = '';
        request.orderBy = '-timestamp';
        request.offset = 0;
        PostService.getPostsBatch(request);
    }

    $scope.sendComment = function () {
        console.log($scope.commentText);
        PostService.sendPost('shimon', 'talkback', $scope.commentText, $scope.currentPost);
    }



    $scope.loadMore = function () {
        //$scope.showSpiner = true; //need to change to false while get callback from server.
        console.log('load more');
        request.offset += 20;
        post = PostService.getPosts();
        request.endTimestamp = post[0].timestamp;
        PostService.getPostsBatch(request);
    }








} ]);
