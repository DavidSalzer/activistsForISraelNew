socialGroupApp.controller('article', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {

    /*init variables*/
    $scope.showInput = false;
    $scope.currentFilter = 'all';
    $scope.currentPost = null;
    $scope.showSpiner = false;
    $scope.showPostTitle = true; 
	
	
    $scope.showArticleImg = false;
    $scope.showAuthorImg = true;
    $scope.currentPostType = 'article';


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
	
	$scope.user = generalParameters.getUser();
	
	
	
	
	
	
    /*init controller data*/
    PostService.getPostsBatch('articles.txt', $scope.currentFilter, 9, 0); //tell service to refresh posts
    $scope.posts = PostService.getPosts; //ask service for posts

    $scope.articleId = $stateParams.postId;


    $scope.writePost = function () {
        $scope.user = generalParameters.getUser();
        if ($scope.user.firstName == 'התחבר') {
            $rootScope.$broadcast('showInfoPopup', { showInfo: true });
        }
        else {
            $state.transitionTo('write-post', {postType: "article"});
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

    $scope.$on('addLike', function (event, args) {
        $scope.currentPost = args.postid;
        $scope.$apply();
        console.log(args)
		var userId = $scope.user.userId
		PostService.sendLike(args.postid,userId)
    });

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

    $scope.userClicked = function () {
        alert('hi1');
        //event.stopPropagation();
        $rootScope.$broadcast('userClicked', { showInput: true });
    };

    $scope.$on('userClicked', function (event, args) {
        alert('hi2');
        $state.transitionTo('authorPage');
    });

    $scope.getPosts = function () {
        PostService.getPostsBatch('posts.txt', $scope.currentFilter, 9, 0);
    }

    $scope.updatePosts = function () {
        PostService.updatePost({
            postId: 8,
            postType: 'talkback',
            author: 'shimon',
            timeStamp: '25052014175555',
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
                        timeStamp: '25052014185555',
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

    $scope.getPostsByAll = function () {
        $scope.currentFilter = 'all';
        PostService.getPostsBatch('articles.txt', $scope.currentFilter, 9, 0);
    }

    $scope.getPostsByAuthors = function () {
        $scope.currentFilter = 'authors';
        PostService.getPostsBatch('posts.txt', $scope.currentFilter, 9, 0);
    }

    $scope.getAuthors = function () {
        $scope.currentFilter = 'authors';
        PostService.getPostsBatch('author.txt', $scope.currentFilter, 9, 0);
    }


    $scope.getPostsByViews = function () {
        $scope.currentFilter = 'views';
        PostService.getPostsBatch('articles.txt', $scope.currentFilter, 9, 0);
    }

    $scope.sendComment = function () {
        console.log($scope.commentText);
        PostService.sendPost('shimon', 'talkback', $scope.commentText, $scope.currentPost);
    }

    console.log(PostService.getPostById(0));

    $scope.loadMore = function () {
        $scope.showSpiner = true; //need to change to false while get callback from server.
        console.log('load more');
        PostService.getPostsBatch('posts.txt', $scope.currentFilter, 9, 1);
    }
	
	
	 
	
   
	
	

} ]);
