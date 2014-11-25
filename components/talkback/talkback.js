socialGroupApp.controller('talkback', ['$rootScope', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $scope, classAjax, $state, PostService, generalParameters) {

    /*init variables*/
    $scope.showInput = false;
    $scope.currentFilter = 'all';
    //$scope.currentPost = null;
    $scope.showSpiner = PostService.getSpiner;
    $scope.domain = domain;
    generalParameters.setBackIcon(false);
    $scope.showendloader = false;

    var dateObj = new Date();
    var timeNow = dateObj.getTime();
    var timeSubstruct = timeNow - (1000 * 60 * 60 * 24 * 30); //substruct 30 days from today- for use in likes and comments

    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/sidebar-talk-back-icon.png",
        featureWhatsUpLogo: "./img/hosting_info.png",
        featureColor: '#993ca7',
        infoHaeder: "הפורום",
        infoMainText: 'זה המקום לשתף את כולם במה שמעניין אתכם. המשתמשים יוכלו לסמן "אהבתי" ו/או להגיב לדבריכם. מוגבל  ל140 תווים.',
        infoSubText: "יצירת תכנים באיזור זה מותנת בהרשמה לאחליקציה"
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
        if ($scope.user.firstName == 'הצטרף לאפליקציה') {
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



    $scope.$on('EndLoadMore', function (event, args) {
        switch (args.showLoad) {
            case true:
                 $scope.showendloader = false;
                break;
            case false:
                $scope.showendloader = true;
                break;
        }
    });
    $scope.getPostsByAll = function () {
        request.startTimestamp = '';
        request.endTimestamp = '';
        request.orderBy = '-timestamp';
        request.offset = 0;
        PostService.getPostsBatch(request);
    }

    $scope.getPostsByFavorite = function () {
        request.orderBy = '-likesCount';
        request.startTimestamp = timeSubstruct;
        request.endTimestamp = '';
        request.offset = 0;
        PostService.getPostsBatch(request);
    }

    $scope.getPostsByComments = function () {
        request.orderBy = '-commentsCount';
        request.startTimestamp = timeSubstruct;
        request.endTimestamp = '';
        request.offset = 0;
        PostService.getPostsBatch(request);
    }


    //load more post on scroll down
    $scope.loadMore = function () {
        if ($scope.showendloader) {
            return;
        }
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
