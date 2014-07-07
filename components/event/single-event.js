socialGroupApp.controller('single-event', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {

    /*init variables*/
    $scope.showInput = false;
    $scope.currentPost = null;
    $scope.showPostTitle = true;
    $scope.singleEvent = true;
    $scope.showAuthorImg = false;
    $scope.currentPostType = 'event';
    $scope.showCommentDate = false;
    $scope.showCommentTitle = false;
    $scope.domain = domain;
    $scope.showSpiner = PostService.getSpiner;
    $scope.offset = 20;

    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/calendar.png",
        featureColor: '#004a8e',
        infoHaeder: "מאמרים",
        infoMainText: 'כתבו מאמר בכל נושא שתבחרו. המאמר מוגבל למינימום 250 תווים ויפורסם בהתאם לכללי המערכת. המאמרים ידורגו ע"י הגולשים ויקודמו בהתאם. ניתן להעלות את המאמר כקובץ, או לכתוב אותו ישירות בעמוד. ניתן גם להוסיף תמונה מלווה למאמר.',
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };
	
    generalParameters.setFeature($scope.featureDetails);
	
	$scope.user = generalParameters.getUser();
    
	$scope.articleId = $stateParams.postId;
    console.log('postId: ' + $stateParams.postId);
    PostService.getPostById($scope.articleId);
    $scope.post = PostService.getSinglePost;
	
	$scope.participate = function ($event) {
       console.log($scope.user._id);
	  
    };
	
	$scope.editEvent = function ($event) {
        
		
		$state.transitionTo('write-post', { postType: "event", postId: $stateParams.postId });
	  
    };
	
	$scope.inte = function ($event) {

		var intent = new Intent("http://webintents.org/share");
		window.navigator.startActivity(intent);
    };
	




} ]);
