socialGroupApp.controller('poll', ['$rootScope','$scope', '$http', '$state', 'PostService', 'generalParameters', function ($rootScope, $scope, $http,$state, PostService, generalParameters) {

		
    $scope.loadMoreFlag = true;
	$scope.currentFilter = "active";
	$scope.currentPoll = null;
	

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

	/*init controller data*/
    PostService.getPostsBatch({postType: 'poll'}); //tell service to refresh posts
    $scope.polls = PostService.getPosts; //ask service for polls
	
    $scope.userClicked = function (pollIndex) {	
		console.log(pollIndex);
		$scope.currentPoll = pollIndex;
		console.log($scope.currentPoll);
		generalParameters.setBackIcon(true);
        $state.transitionTo('poll-view', { pollIndex: $scope.currentPoll });
    };
	
	$scope.getPoll = function () {
        PostService.getPostsBatch({postType: 'poll'});
    }

    $scope.getActivePoll = function () {
        $scope.currentFilter = "active";
        PostService.getPostsBatch({postType: 'poll'});
		$scope.polls = PostService.getPosts;
		console.log($scope.polls);
    }

    $scope.getInActivePoll = function () {
        $scope.currentFilter = "inactive";
        PostService.getPostsBatch({postType: 'poll'});
		$scope.polls = PostService.getPosts;
		console.log($scope.polls);
    }

    $scope.loadMore = function () {
        $scope.showSpiner = true; //need to change to false while get callback from server.
        console.log('load more');
        PostService.getPostsBatch({postType: 'poll'});
    }
	
	$scope.SuggestPoll = function () {
		generalParameters.setBackIcon(true);
        $state.transitionTo('write-post', { postType: "poll" , postId: 0 });
    }
	
   

}])
