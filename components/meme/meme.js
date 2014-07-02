socialGroupApp.controller('meme', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {

     $scope.domain = domain;

    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/meme.png",
        featureWhatsUpLogo: "./img/meme_info.png",
        featureColor: '#ffd427',
        infoHaeder: "פיצ'ר הממים",
        infoMainText: 'הכינו "ממים"    - גלויות מצחיקות- בעזרת מכשיר הכנת הממים שלנו- ושתפו עם החברים',
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
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


    $scope.loadMore = function () {
        $scope.showSpiner = true; //need to change to false while get callback from server.
        console.log('load more');
        request.endTimestamp = '0';
        PostService.getPostsBatch(request);
    }

    $scope.getPosts = function () {
        PostService.getPostsBatch(request);
    }

    $scope.writeMeme = function () {
        $scope.user = generalParameters.getUser();
        if ($scope.user.firstName == 'התחבר') {
            $rootScope.$broadcast('showInfoPopup', { showInfo: true });
        }
        else {
            $state.transitionTo('write-meme');
        }
    };

    $scope.memeClick = function(index){
        $state.transitionTo('single-meme',{index:index});
    }

	$scope.like = function($event,$index){
      
	 $event.stopPropagation();
	  console.log($scope.posts())
	  var meme = $scope.posts()[$index];
	  console.log(meme)
	  
	 // if ($scope.posts[$index].isLiked == true) {//LIKE!

                    //scope.post.likesCount++;
					PostService.sendLike(meme._id); 

               // }
                //else {//UNLIKE!
					//console.log('unlike')
                    //scope.post.likesCount--;
                    //scope.$apply();
					//PostService.unLike(meme._id); 

               // } 
    }




} ]);
