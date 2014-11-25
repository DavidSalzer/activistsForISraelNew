socialGroupApp.controller('meme', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {
    alert('width: ' + window.innerWidth + ' height: ' + window.innerHeight)
    $scope.domain = domain;
    $scope.showSpiner = PostService.getSpiner;

    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/sidebar-meme-icon.png",
        featureWhatsUpLogo: "./img/meme_info.png",
        featureColor: '#ffd427',
        infoHaeder: "פיצ'ר הממים",
        infoMainText: 'עוד לא הכנתם מם? כאן תוכלו ליצור מם משלכם בעזרת מחולל הממים המיוחד ולשתף עם חברים. *יש לשמור על זכויות יוצרים',
        infoSubText: "יצירת תכנים באיזור זה מותנת בהרשמה לאחליקציה"
    };
    $scope.showendloader = false;
    generalParameters.setFeature($scope.featureDetails);
    generalParameters.setBackIcon(false); //tester
    request = {
        startTimestamp: '',
        endTimestamp: '',
        offset: 0,
        limit: 12,
        orderBy: '-timestamp',
        postType: 'meme',
        _parentID: ''
    };


    /*init controller data*/
    PostService.getPostsBatch(request); //tell service to refresh posts
    $scope.posts = PostService.getPosts; //ask service for posts

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

    $scope.getPostsByViews = function () {
        var dateObj = new Date();
        var timeNow = dateObj.getTime();
        var timeSubstruct = timeNow - (1000 * 60 * 60 * 24 * 30); //substruct 30 days from today- for use in likes and comments

        $scope.currentTab = 'article';
        //for - last 30 days
        request.startTimestamp = timeSubstruct;
        request.endTimestamp = '';
        request.orderBy = '-viewsCount';
        request.offset = 0;
        PostService.getPostsBatch(request);
    }

    $scope.loadMore = function () {
         if ($scope.showendloader) {
            return;
        }
        console.log('load more');
        request.offset += 12;
        post = PostService.getPosts();
        request.endTimestamp = post[0].timestamp;
        PostService.getPostsBatch(request);
    }

    $scope.getPosts = function () {
        PostService.getPostsBatch(request);
    }

    $scope.writeMeme = function () {
        $scope.user = generalParameters.getUser();
        if ($scope.user.firstName == 'הצטרף לאפליקציה') {
            $rootScope.$broadcast('showInfoPopup', { showInfo: true });
        }
        else {
            $state.transitionTo('write-meme');
        }
    };

    $scope.memeClick = function (index) {
        $state.transitionTo('single-meme', { postId: index });
    }

    $scope.like = function ($index) {


        var meme = $scope.posts()[$index];
        console.log(meme)

        if (meme.isLiked == true) {//UNLIKE!

            PostService.unLike(meme._id, meme);
            //meme.likesCount--;
            //meme.isLiked = false;
            return;
        }
        else {//LIKE!

            //send the like- only if the user login
            $scope.user = generalParameters.getUser();
            if ($scope.user.firstName == 'הצטרף לאפליקציה') {
                $rootScope.$broadcast('showInfoPopup', { showInfo: true });
            }
            else {
                PostService.sendLike(meme._id, meme);
            }


            //meme.likesCount++;
            //meme.isLiked = true;
            return;
        }
    }

    //when comeback from login - refresh the feed

    $scope.$on('refreshMemesFeed', function (event, args) {
        PostService.getPostsBatch(request);
    });
} ]);
