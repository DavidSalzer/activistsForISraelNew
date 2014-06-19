socialGroupApp.controller('poll', ['$rootScope','$scope', '$http', '$state', 'PostService', 'generalParameters', function ($rootScope, $scope, $http,$state, PostService, generalParameters) {

		
    $scope.loadMoreFlag = true;
	$scope.currentFilter = "active";
	$scope.currentPoll = null;
	

	$scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/poll.png",
        featureColor: '#da4f00',
        featureTabColor: '#da4f',
        infoHaeder: "",
        infoMainText: "",
        infoSubText: ""
    };
    generalParameters.setFeature($scope.featureDetails);

	/*init controller data*/
    PostService.getPollsBatch('polls.txt', $scope.currentFilter, 9, 0); //tell service to refresh posts
    $scope.polls = PostService.getPolls; //ask service for polls
	
    $scope.userClicked = function (pollIndex) {	
		console.log(pollIndex);
		$scope.currentPoll = pollIndex;
		console.log($scope.currentPoll);
		generalParameters.setBackIcon(true);
        $state.transitionTo('poll-view', { pollIndex: $scope.currentPoll });
    };
	
	$scope.getPoll = function () {
        PostService.getPollsBatch('polls.txt', $scope.currentFilter, 9, 0);
    }

    $scope.getActivePoll = function () {
        $scope.currentFilter = "active";
        PostService.getPollsBatch('polls.txt', $scope.currentFilter, 9, 0);
		$scope.polls = PostService.getPolls;
		console.log($scope.polls);
    }

    $scope.getInActivePoll = function () {
        $scope.currentFilter = "inactive";
        PostService.getPollsBatch('polls.txt', $scope.currentFilter, 9, 0);
		$scope.polls = PostService.getPolls;
		console.log($scope.polls);
    }

    $scope.loadMore = function () {
        $scope.showSpiner = true; //need to change to false while get callback from server.
        console.log('load more');
        PostService.getPollsBatch('polls.txt', $scope.currentFilter, 9, 1);
    }
	
	$scope.SuggestPoll = function () {
		generalParameters.setBackIcon(true);
        $state.transitionTo('write-post', { postType: "poll" });
    }
	
   

}])
