socialGroupApp.controller('talkback', ['$rootScope', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $scope, classAjax, $state, PostService, generalParameters) {

    /*init variables*/
    $scope.showInput = false;
    $scope.currentFilter = 'all';
    //$scope.currentPost = null;
    $scope.showSpiner = PostService.getSpiner;
    $scope.domain = domain;

    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/whatsup.png",
        featureWhatsUpLogo: "./img/hosting_info.png",
        featureColor: '#993ca7',
        infoHaeder: "מה קורה",
        infoMainText: "כתבו על כל נושא שמעניין אתכם. המשתמשים יוכלו לסמן 'אהבתי' או להגיב לדבריכם. מוגבל ל 140 תווים.",
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };

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
        //userID: $scope.user._id,
        _parentID: ''
    };
    PostService.getPostsBatch(request); //tell service to refresh posts
    $scope.posts = PostService.getPosts; //ask service for posts
    $scope.isLiked = PostService.getIsLike; 



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

    $scope.$on('postClicked', function (event, args) {
        $scope.postId = args.postId;
        console.log('args: ' + args.postId);
        generalParameters.setBackIcon(true);
        $state.transitionTo('comments', { postId: $scope.postId });
    });

    //$scope.userClicked = function () {
    //    $rootScope.$broadcast('userClicked', { showInput: true });
    //};

    //$scope.$on('userClicked', function (event, args) {
    //    generalParameters.setBackIcon(true);
    //    $state.transitionTo('author-page');
    //});

    
    $scope.getPostsByAll = function () {
        request.endTimestamp = '';
        request.orderBy = '-timestamp';
        request.offset = 0;
        PostService.getPostsBatch(request);
    }

    $scope.getPostsByFavorite = function () {
        request.orderBy = '-likesCount';
        request.endTimestamp = '';
        request.offset = 0;
        PostService.getPostsBatch(request);
    }

    $scope.getPostsByComments = function () {
        request.orderBy = '-commentsCount';
        request.endTimestamp = '';
        request.offset = 0;
        PostService.getPostsBatch(request);
    }

    
    //load more post on scroll down
    $scope.loadMore = function () {
        console.log('load more');
        request.offset += 20;
        post = PostService.getPosts();
        request.endTimestamp = post[0].timestamp;
        PostService.getPostsBatch(request);
    }

    $scope.userClicked = function (userId) {
        $state.transitionTo('user-profile', { userId: userId });
    };

} ]);
