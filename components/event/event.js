socialGroupApp.controller('event', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {

    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/calendar.png",
        featureWhatsUpLogo: "./img/calendar_info.png",
        featureColor: '#004a8e',
        infoHaeder: "���'� ������",
        infoMainText: '����� ������� ���� �����! ��� ������ ������ �������/���� ���/������ ��� ���� ���� �� ������.',
        infoSubText: "����� ����� ������ �� ������ �������� ���������"
    };
    
	generalParameters.setFeature($scope.featureDetails);
	$scope.user = generalParameters.getUser();
    generalParameters.setBackIcon(false);//tester
	 
	 request = {
        startTimestamp:'',
        endTimestamp: '',
        offset: 0,
        limit: 20,
        orderBy: '-timestamp',
        postType: 'event',
        userID: $scope.user._id,
        _parentID: ''
    };

    /*init controller data*/
    PostService.getPostsBatch(request); //tell service to refresh posts
    $scope.posts = PostService.getPosts; //ask service for posts
	

    $scope.setCurrnetDate = function (stamp) {
        $scope.currentTimeStamp = stamp;
    }
	
	$scope.loadMore = function () {
        $scope.showSpiner = true; //need to change to false while get callback from server.
        console.log('load more');
        request.endTimestamp = '0';
        PostService.getPostsBatch(request);
    }

    $scope.writeEvent = function () {
		
		$scope.user = generalParameters.getUser();
        if ($scope.user.firstName == '�����') {
            $rootScope.$broadcast('showInfoPopup', { showInfo: true });
        }
        else {
            $state.transitionTo('write-post', { postType: "event", postId: 0 });
        }
    };
	
	
	$scope.$on('postClicked', function (event, args) {
           
        $state.transitionTo('single-event', { postId: args.postId });  

    });
	 
 
}]);


socialGroupApp.controller('DatepickerDemoCtrl', ['$scope','PostService', function ($scope,PostService) {
	
	angular.element(document).ready(function () { 
	
		$scope.$$childHead.toggleMode= null;//prevent select month / year
		
		
		$scope.$watch(//reset calendar arrow when paging month
			
			function(){return $scope.$$childHead.$$childHead.rows;},
			function(newValue) {
			
				if(newValue.length > 1){//a new month was selected
					
					$scope.monthArray = newValue;//save month for get back from week display
					$scope.togglecaendarArrow(-90);//make sore the arrow is to up 
				}
			},
			true
		);
		
		$scope.$watch('dt', function() {$scope.setCurrnetDate($scope.dt.getTime());}); 
		
	});
		
    $scope.dt = new Date(); 
  
	

		
  	$scope.toggleWeekDisplay = function () {
		
		
		//now in single week display? -> open and return
		if($scope.$$childHead.$$childHead.rows.length == 1){
			
			$scope.$$childHead.$$childHead.rows = $scope.monthArray;//get back current month from memory
			$scope.togglecaendarArrow(-90);//toggle arrow to up
			return; 
		}
		
		//now in month display? -> select and display only the week of selected day	
		for(var i=0; i < $scope.monthArray.length; i++){
			
			for(var j=0; j < $scope.monthArray[i].length; j++){
			
				if( $scope.monthArray[i][j].selected == true){
				
					$scope.$$childHead.$$childHead.rows =[];
					$scope.$$childHead.$$childHead.rows.push($scope.monthArray[i]); //chose selected week
					$scope.togglecaendarArrow(90);//toggle arrow to down
					return;
				
				}
				
			}
		
		}
   };
   
	$scope.togglecaendarArrow = function (deg) {
		
		document.getElementById("calendar-arrow").style.setProperty('transform', 'rotate('+deg+'deg)');
		document.getElementById("calendar-arrow").style.setProperty('-webkit-transform', 'rotate('+deg+'deg)');
		document.getElementById("calendar-arrow").style.setProperty('-o-transform', 'rotate('+deg+'deg)');
		document.getElementById("calendar-arrow").style.setProperty('-moz-transform', 'rotate('+deg+'deg)');
		document.getElementById("calendar-arrow").style.setProperty('-ms-transform', 'rotate('+deg+'deg)');
	}
  
}]);

