google.load('visualization', '1.0', {'packages':['corechart']});
socialGroupApp.controller('pollView', ['$rootScope','$stateParams','$scope', '$http', 'PostService', 'generalParameters', function ($rootScope,$stateParams,$scope, $http, PostService, generalParameters) {
	console.log($stateParams);
	$scope.currentPoll = $stateParams.pollIndex;
	$scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/poll.png",
        featureColor: '#da4f00',
        featureBoxColor: '#ffffff',
        featureTextColor: '#000000',
        infoHaeder: "",
        infoMainText: "",
        infoSubText: ""
    };
    generalParameters.setFeature($scope.featureDetails);
	$scope.options = generalParameters.getOptionsPieChart();
	console.log($scope.options);
	$scope.polls = PostService.getPolls();
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
        featureColor: '#565c63',
        thankText: 'הצבעתך התקבלה. המערכת תעבד את נתוני ההצבעה והתוצאות יפורסמו בהקדם. ',
        btnText: 'חזרה לעמוד הסקרים',
        headerText: 'סקר פעיל',
        featureState: 'poll'
    };
	
	$scope.addVote = function(voteTo) {
		generalParameters.setBackIcon(false);
		$scope.featureDetails.featureBoxColor = '#565c63';
		$scope.featureDetails.featureTextColor = '#ffffff';
        $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
	}
	

}])

