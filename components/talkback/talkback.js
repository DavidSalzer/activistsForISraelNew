socialGroupApp.controller('talkback', ['$rootScope', '$scope', 'classAjax', '$state', '$http', 'PostService', 'generalParameters', '$q', '$timeout', function ($rootScope, $scope, classAjax, $state, $http, PostService, generalParameters, $q, $timeout) {

    /*init variables*/
    $scope.showInput = false;
    $scope.currentFilter = 'all';
    //$scope.currentPost = null;
    $scope.showSpiner = PostService.getSpiner;
    $scope.domain = domain + 'small/';
    generalParameters.setBackIcon(false);
    $scope.showendloader = false;
    $scope.movePage = false;

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
        limit: 50,
        orderBy: '-timestamp',
        postType: 'talkback',
        //userID: $scope.user._id,
        _parentID: ''
    };
    PostService.getPostsBatch(request)
    .then(function (data) {
        $timeout(function () {
            $scope.posts = PostService.getPosts();
        }
        , 0);
    })
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
        PostService.getPostsBatch(request)
        .then(function (data) {
            $timeout(function () {
                $scope.posts = PostService.getPosts();
            }
        , 0);
        });
    }

    $scope.getPostsByFavorite = function () {
        request.orderBy = '-likesCount';
        request.startTimestamp = timeSubstruct;
        request.endTimestamp = '';
        request.offset = 0;
        PostService.getPostsBatch(request)
        .then(function (data) {
            $timeout(function () {
                $scope.posts = PostService.getPosts();
            }
        , 0);
        });
    }

    $scope.getPostsByComments = function () {
        request.orderBy = '-commentsCount';
        request.startTimestamp = timeSubstruct;
        request.endTimestamp = '';
        request.offset = 0;
        PostService.getPostsBatch(request)
        .then(function (data) {
            $timeout(function () {
                $scope.posts = PostService.getPosts();
            }
        , 0);
        }); ;
    }

    //$scope.callAjaxPosts = $q.defer();

    //$http({
    //    url: "http://www.ynet.co.il/home/0,7340,L-8,00.html"
    //}).success(function () { });

    //load more post on scroll down
    $scope.loadMore = function () {
        //if not loading now
        if (!PostService.getLoadMoreNow()) {
            if ($scope.showendloader) {
                return;
            }
            PostService.setLoadMoreNow(true);
            console.log('load more');
            request.offset += 50;
            post = PostService.getPosts();
            request.endTimestamp = post[0].timestamp;
            PostService.getPostsBatch(request)
            .then(function (data) {
                $timeout(function () {
                    $scope.posts = PostService.getPosts();
                }
                , 0);
            }); ;
        }
    }

    $scope.userClicked = function (userId) {
        $scope.movePage = true;
        $timeout(function () {
            //$scope.$apply(function () {//sdsd
            $state.transitionTo('user-profile', { userId: userId });
            //})
        }
        , 40);


    };

} ]);
