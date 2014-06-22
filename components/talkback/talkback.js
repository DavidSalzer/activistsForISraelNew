socialGroupApp.controller('talkback', ['$rootScope', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $scope, classAjax, $state, PostService, generalParameters) {

    /*init variables*/
    $scope.showInput = false;
    $scope.currentFilter = 'all';
    $scope.currentPost = null;
    $scope.showSpiner = false;

    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/whatsup.png",
        featureColor: '#993ca7',
        infoHaeder: "מה קורה",
        infoMainText: "כתבו על כל נושא שמעניין אתכם. המשתמשים יוכלו לסמן 'אהבתי' או להגיב לדבריכם. מוגבל ל 140 תווים.",
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };

    $scope.domain = domain;
    generalParameters.setFeature($scope.featureDetails);
    $scope.user = generalParameters.getUser();
    /*init controller data*/
    request = {
        startTimestamp: '',
        endTimestamp: '',
        offset: 0,
        limit: 20,
        orderBy: '-timestamp',
        postType: 'talkback',
        userID: $scope.user._id
    };
    PostService.getPostsBatch(request); //tell service to refresh posts
    $scope.posts = PostService.getPosts; //ask service for posts



    /* broadcast*/
    $scope.$on('addCommentClicked', function (event, args) {
        $scope.currentPost = args.postId;
        $scope.showInput = args.showInput;
        $scope.$apply();
        console.log(args)
    });

    $scope.writePost = function () {
        $scope.user = generalParameters.getUser();
        if ($scope.user.firstName == 'התחבר') {
            $rootScope.$broadcast('showInfoPopup', { showInfo: true });
        }
        else {
            generalParameters.setBackIcon(true);
            $state.transitionTo('write-post', { postType: "talkback", postId: 0 });
        }
    };

    $scope.$on('addLike', function (event, args) {

        $scope.currentPost = args.postid;
        $scope.$apply();
        console.log(args)
        var userId = $scope.user.userId
        PostService.sendLike(args.postid, userId)
    });

    $scope.$on('postClicked', function (event, args) {
        $scope.postId = args.postId;
        console.log('args: ' + args.postId);
        generalParameters.setBackIcon(true);
        $state.transitionTo('comments', { postId: $scope.postId });
    });

    $scope.userClicked = function () {
        alert('hi');
        //event.stopPropagation();
        $rootScope.$broadcast('userClicked', { showInput: true });
    };

    $scope.$on('userClicked', function (event, args) {
        alert('hi');
        generalParameters.setBackIcon(true);
        $state.transitionTo('authorPage');
    });

    $scope.getPosts = function () {
        //PostService.getPostsBatch('posts.txt', $scope.currentFilter, 20, 0);
    }

    $scope.getPostsByAll = function () {
        request.orderBy = '-timestamp';
        $scope.currentFilter = '-timestamp';
        PostService.getPostsBatch(request);
    }

    $scope.getPostsByFavorite = function () {
        request.orderBy = '-likesCount';
        $scope.currentFilter = '-likesCount';
        PostService.getPostsBatch(request);
    }

    $scope.getPostsByComments = function () {
        request.orderBy = '-commentsCount';
        $scope.currentFilter = '-commentsCount';
        PostService.getPostsBatch(request);
    }

    $scope.sendComment = function () {
        console.log($scope.commentText);
        PostService.sendPost('shimon', 'talkback', $scope.commentText, $scope.currentPost);
    }
    console.log(PostService.getPostById(0));


    //load more post on scroll down
    $scope.loadMore = function () {
        $scope.showSpiner = true; //need to change to false while get callback from server.
        console.log('load more');
        PostService.getPostsBatch('posts.txt', $scope.currentFilter, 9, 1);
    }

    $scope.updatePosts = function () {
        PostService.updatePost({
            postId: 8,
            postType: 'talkback',
            author: 'shimon',
            timestamp: '25052014175555',
            title: 'עקירת עצי זית',
            content: 'מה המה מה מה מה מה מה מה מה מה ',
            image: '',
            likes: {
                likesCount: 12,
                isLiked: 0
            },
            comments: {
                commentsCount: 5,
                comments: [
                    {
                        commentId: 0,
                        postType: 'talkback',
                        author: 'shimon',
                        timestamp: '25052014185555',
                        title: 'עקירת עצי זית',
                        content: 'תג מחיר תג מחיר תג מחיר תג מחיר תג מחיר תג מחיר ',
                        image: '',
                        like: {
                            likesCount: 12,
                            isLiked: 1
                        }
                    }
                ]
            }
        })
    }

} ]);
