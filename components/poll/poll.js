socialGroupApp.controller('poll', ['$rootScope','$scope', '$http', '$state', 'PostService', 'generalParameters', function ($rootScope, $scope, $http,$state, PostService, generalParameters) {


	$scope.currentPoll = null;
	$scope.showSpiner = PostService.getSpiner;

	$scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/poll.png",
        featureColor: '#da4f00',
        featureTabColor: '#da4f',
        infoHaeder: "משאל עם",
        infoMainText: "בואו להשפיע! כאן מופיעים סקרים שעל סדר היום. ניתן לשתף / או להציע שאלות לסקר. לרשומים בלבד",
        infoSubText: "ההצבעה באיזור זה מותנית בהצטרפות"
    };
    generalParameters.setFeature($scope.featureDetails);
	 generalParameters.setBackIcon(false);//tester
	$scope.user = generalParameters.getUser();
   
    var request = {
        
		startTimestamp: '',
        endTimestamp: '',
        offset: 0,
        limit: 20,
        orderBy: '-timestamp',
        postType: 'poll',
        userID: $scope.user._id,
        _parentID: ''
    };
	
	/*init controller data*/
    PostService.getPostsBatch(request); //tell service to refresh posts
    $scope.polls = PostService.getPosts; //ask service for polls
	
    $scope.userClicked = function (pollIndex) {	
		console.log(pollIndex);
		$scope.currentPoll = pollIndex;
		console.log($scope.currentPoll);
		generalParameters.setBackIcon(true);
        $state.transitionTo('poll-view', { pollIndex: $scope.currentPoll });
    };
	
	$scope.getPoll = function () {
        PostService.getPostsBatch(request);
    }

    $scope.getActivePoll = function () {
        request.endTimestamp = '';
        request.offset = 0;
        PostService.getPostsBatch(request);
		//$scope.polls = PostService.getPosts;
		//console.log($scope.polls);
    }

    $scope.getInActivePoll = function () {
        request.endTimestamp = '';
        request.offset = 0;
        PostService.getPostsBatch(request);
		//$scope.polls = PostService.getPosts;
		//console.log($scope.polls);
    }

    $scope.loadMore = function () {
        console.log('load more');
        request.offset += 20;
        post = PostService.getPosts();
        request.endTimestamp = post[0].timestamp;
        PostService.getPostsBatch(request);
    }
	
	$scope.SuggestPoll = function () {
		generalParameters.setBackIcon(true);
        $state.transitionTo('write-post', { postType: "poll" , postId: 0 });
    }
	
   

}])
