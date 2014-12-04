socialGroupApp.controller('meme', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {
    //   alert('width: '+window.innerWidth+' height: '+window.innerHeight )
    
	$scope.buildPage = false;
    $rootScope.$broadcast('showLoader', { showLoader: false });
    setTimeout(function () { $scope.$apply(function () { $scope.buildPage = true; }) }, 0);
	
	$scope.loaded = function () {
        
    }
	
	$scope.domain = domain + 'small/';
    $scope.showSpiner = PostService.getSpiner;

    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/sidebar-meme-icon.png",
        featureWhatsUpLogo: "./img/meme_info.png",
        featureColor: '#ffd427',
        infoHaeder: "ממים",
        infoMainText: 'עוד לא הכנתם מם?<br> כאן תוכלו ליצור מם משלכם בעזרת מחולל הממים המיוחד ולשתף עם חברים.<br> *יש לשמור על זכויות יוצרים',
        infoSubText: "יצירת תכנים באיזור זה מותנת בהרשמה לאחליקציה"
    };

    $scope.showendloader = false;

    generalParameters.setFeature($scope.featureDetails);

    generalParameters.setBackIcon(false); //tester

    request = {
        startTimestamp: '',
        endTimestamp: '',
        offset: 0,
        limit: 30,
        orderBy: '-timestamp',
        postType: 'meme',
        _parentID: ''
    };


    /*init controller data*/
    PostService.getPostsBatch(request); //tell service to refresh posts

    $scope.posts = PostService.getPosts; //ask service for posts

    $scope.getPostsByAll = function () {
        request.startTimestamp = '';
        request.endTimestamp = '';
        request.orderBy = '-timestamp';
        request.offset = 0;
        PostService.getPostsBatch(request);
    }

    $scope.getPostsByFavorite = function () {
        var dateObj = new Date();
        var timeNow = dateObj.getTime();
        var timeSubstruct = timeNow - (1000 * 60 * 60 * 24 * 30); //substruct 30 days from today- for use in likes and comments

        //for - last 30 days
        request.startTimestamp = timeSubstruct;
        request.orderBy = '-likesCount';
        request.endTimestamp = '';
        request.offset = 0;
        PostService.getPostsBatch(request);
    }

    $scope.getPostsByViews = function () {
        var dateObj = new Date();
        var timeNow = dateObj.getTime();
        var timeSubstruct = timeNow - (1000 * 60 * 60 * 24 * 30); //substruct 30 days from today- for use in likes and comments

        //for - last 30 days
        request.startTimestamp = timeSubstruct;
        request.endTimestamp = '';
        request.orderBy = '-viewsCount';
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

    $scope.loadMore = function () {
        if (!PostService.getLoadMoreNow()) {
            if ($scope.showendloader) {
                return;
            }
            console.log('load more');
            request.offset += 30;
            PostService.setLoadMoreNow(true);
            post = PostService.getPosts();
            request.endTimestamp = post[0].timestamp;
            PostService.getPostsBatch(request);
        }
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

       if (generalParameters.getUser().firstName == 'הצטרף לאפליקציה') {
			
			$rootScope.$broadcast('showInfoPopup', { showInfo: true });return;
		}
		else {
			var meme = $scope.post();
			meme.isLiked = !meme.isLiked;
		
			if (meme.isLiked == true) {//LIKE!
				
				meme.likesCount++;
				PostService.sendLike(meme._id, meme);return;

			}
			else {//UNLIKE!
				meme.likesCount--;
				$scope.$apply();
				PostService.unLike(meme._id, meme);return;
				

			}
		}
    }
	
	$scope.kill = function (event) {
		
      angular.element(event.target).remove(); 
    }


    //when comeback from login - refresh the feed

    $scope.$on('refreshMemesFeed', function (event, args) {
        PostService.getPostsBatch(request);
    });
} ]);
