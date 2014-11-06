socialGroupApp.controller('meme', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {

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
    generalParameters.setFeature($scope.featureDetails);
     generalParameters.setBackIcon(false);//tester
      request = {
        startTimestamp: '',
        endTimestamp: '',
        offset: 0,
        limit: 12,
        orderBy: '-timestamp',
        postType: 'meme',
         _parentID:''
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

    $scope.getPostsByViews = function () {
        $scope.currentTab = 'article';
        request.endTimestamp = '';
        request.orderBy = '-viewsCount';
        request.offset = 0;
        PostService.getPostsBatch(request);
    }

    $scope.loadMore = function () {
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

    $scope.memeClick = function(index){
        $state.transitionTo('single-meme',{postId:index});
    }

	$scope.like = function($index){
      

		var meme = $scope.posts()[$index];
		console.log(meme)
		
		if (meme.isLiked == true){//UNLIKE!
				
			PostService.unLike(meme._id, meme); 
			//meme.likesCount--;
			//meme.isLiked = false;
			return;
        }
        else {//LIKE!
			
            PostService.sendLike(meme._id, meme);        
			//meme.likesCount++;
			//meme.isLiked = true;
			return;
        }  
    }

}]);
