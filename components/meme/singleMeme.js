
socialGroupApp.controller('singleMeme', ['$scope', '$rootScope', '$stateParams', 'PostService', 'generalParameters', '$state', function ($scope, $rootScope, $stateParams, PostService, generalParameters, $state) {

    $scope.domain = domain;
    /*init variables*/
    generalParameters.setBackIcon(true);
    $scope.user = generalParameters.getUser();
    $scope.memeUrl;
    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/meme.png",
        featureWhatsUpLogo: "./img/meme_info.png",
        featureColor: '#ffd427',
        infoHaeder: "פיצ'ר הממים",
        infoMainText: 'הכינו "ממים" - גלויות מצחיקות- בעזרת מכשיר הכנת הממים שלנו- ושתפו עם החברים',
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };
    generalParameters.setFeature($scope.featureDetails);

    //PostService.getMemesImages(request);
    PostService.getPostById($stateParams.postId);
    $scope.post = PostService.getSinglePost;
    $scope.memeUrl = $scope.post.img;
    //  console.log($stateParams.index);
    // $scope.memeUrl = $scope.memeImages[$stateParams.index].url;
	
	$scope.like = function($event,$index){
      

		var meme = $scope.post();
		console.log(meme)
		
		if (meme.isLiked == true){//UNLIKE!
				
			PostService.unLike(meme._id); 
			meme.likesCount--;
			meme.isLiked = false;
			return;
        }
        else {//LIKE!
			
            PostService.sendLike(meme._id);        
			meme.likesCount++;
			meme.isLiked = true;
			return;
        }  
    }

} ]);

