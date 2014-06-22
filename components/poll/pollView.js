google.load('visualization', '1.0', {'packages':['corechart']});
socialGroupApp.controller('pollView', ['$rootScope','$stateParams','$scope', '$http', 'PostService', 'generalParameters', function ($rootScope,$stateParams,$scope, $http, PostService, generalParameters) {
	console.log($stateParams);
	$scope.currentPoll = $stateParams.pollIndex;
	$scope.choosenOption = -1;
	$scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/poll.png",
        featureColor: '#da4f00',
        infoHaeder: "משאל עם",
        infoMainText: "בואו להשפיע! כאן מופיעים סקרים שעל סדר היום. ניתן לשתף / או להציע שאלות לסקר. לרשומים בלבד",
        infoSubText: "ההצבעה באיזור זה מותנית בהצטרפות"
    };
    generalParameters.setFeature($scope.featureDetails);
	$scope.options = generalParameters.getOptionsPieChart();
	console.log($scope.options);
	$scope.polls = PostService.getPosts();
	console.log($scope.polls);
	console.log($scope.currentPoll);
	console.log($scope.polls[$scope.currentPoll]);
	$scope.currentPollObj = $scope.polls[$scope.currentPoll];
	console.log($scope.currentPollObj.image);
	$scope.temp = $scope.polls[$scope.currentPoll].data;
	$scope.optionsForVote = $scope.currentPollObj.optionsForVote;
	$scope.currentPollResults = $scope.polls[$scope.currentPoll].data;
	console.log($scope.currentPollResults);
	$scope.legend = [];
	for (var i = 0; i < $scope.currentPollResults.length; i++) {
			$scope.legend.push({title: $scope.currentPollResults[i].name, color:$scope.options.colors[i], image: $scope.currentPollResults[i].image});
		}
	if($scope.currentPollObj.status == "inactive"){
		$scope.temp = [];
		for (var i = 0; i < $scope.currentPollResults.length; i++) {
				$scope.temp.push({name: $scope.currentPollResults[i].name, votes: $scope.currentPollResults[i].votes, color:$scope.options.colors[i], percent: $scope.currentPollResults[i].votes + "%"});
			}
		$scope.currentPollResults = $scope.temp;
	}	
	console.log($scope.currentPollResults);
	console.log($scope.legend);
	
	$scope.pollIsActive = function () {
		console.log($scope.currentPollObj.status);
        return ($scope.currentPollObj.status == "active");
    };
	
	$scope.thankDetails = {
        featureColor: '#da4f00',
        thankText: 'הצבעתך התקבלה. המערכת תעבד את נתוני ההצבעה והתוצאות יפורסמו בהקדם. ',
        btnText: 'חזרה לעמוד הסקרים',
        headerText: 'סקר פעיל',
        featureState: 'poll'
    };
	
	$scope.addVote = function() {
		
		if($scope.choosenOption > -1 ){
			$scope.voteDetails = {
				voteTo: $scope.choosenOption
			}

			console.log($scope.voteDetails);
			$scope.json = JSON.stringify($scope.voteDetails);
			console.log($scope.json);

			//need server
			//$http.post(domain + 'vote/', $scope.json)
			//.success(function (data) {
				if($scope.currentPollObj.countOfVoting > 10){		
					$scope.currentPollObj.status = "inactive";
				}
				else {
					generalParameters.setBackIcon(false);
					$rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
				//    console.log(data);
				}
				//});
		}
			

	}
	
	$scope.selectOption = function(voteTo) {
		$scope.choosenOption = voteTo;
		console.log($scope.choosenOption);
	}
	$scope.getIsSelected = function(index) {
		return ($scope.choosenOption == index);
		
	}

}])

