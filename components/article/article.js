socialGroupApp.controller('article', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {

    /*init variables*/
    $scope.showInput = false;
    $scope.currentTab = 'article';
    //$scope.currentPost = null;
    $scope.showSpiner = PostService.getSpiner;
    $scope.showPostTitle = true;
    $scope.domain = domain;


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
     generalParameters.setBackIcon(false);//tester
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
    //$scope.isLiked = PostService.getIsLike;
    

    $scope.writePost = function () {
        $scope.user = generalParameters.getUser();
        if ($scope.user.firstName == 'התחבר') {
            $rootScope.$broadcast('showInfoPopup', { showInfo: true });
        }
        else {
            $state.transitionTo('write-post', { postType: "article", postId: 0 });
        }
    };

    //$scope.authorClicked = function ($event) {
    //    
    //};


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
                $state.transitionTo('author-page', { authorId: $scope.authorId, postType: 'article' });
                break;
        }

    });

    //$scope.userClicked = function () {
    //    
    //    $rootScope.$broadcast('userClicked', { authorId: '53a7df7ec75d61c450b44825' });
    //};

    //$scope.$on('userClicked', function (event, args) {
    //    $state.transitionTo('author-page', { authorId: args.authorId });
    //});

    $scope.getPostsByAll = function () {
        $scope.currentTab = 'article';
        request.endTimestamp = '';
        request.orderBy = '-timestamp';
        request.offset = 0;
        PostService.getPostsBatch(request);
    }

    
    $scope.getAuthors = function () {
        $scope.currentTab = 'author';
        request.orderBy = '-timestamp';
        request.endTimestamp = '';
        request.offset = 0;
        PostService.getAuthorsByPostType(request);
    }


    $scope.getPostsByViews = function () {
        $scope.currentTab = 'article';
        request.endTimestamp = '';
        request.orderBy = '-viewsCount';
        request.offset = 0;
        PostService.getPostsBatch(request);
    }

    
    $scope.loadMore = function () {
        console.log('load more');
        request.offset += 20;
        post = PostService.getPosts();
        request.endTimestamp = post[0].timestamp;
        if ($scope.currentTab == 'article') {
            PostService.getPostsBatch(request);
        }
        else {
            PostService.getAuthorsByPostType(request);
        }
    }








} ]);
