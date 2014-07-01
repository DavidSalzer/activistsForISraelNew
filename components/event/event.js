socialGroupApp.controller('event', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {


    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/calendar.png",
        featureWhatsUpLogo: "./img/calendar_info.png",
        featureColor: '#004a8e',
        infoHaeder: "פיצ'ר נפגשים",
        infoMainText: 'פרסמו אירועים למען ישראל! לוח לפרסום ויצירת אירועים/חוגי בית/מפגשים בהם תרצו לשתף את החברים.',
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };
    
	generalParameters.setFeature($scope.featureDetails);
	 $scope.user = generalParameters.getUser();
	 
	 request = {
        startTimestamp: '',
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
    $scope.events = PostService.getPosts; //ask service for posts


    $scope.loadMore = function () {
        $scope.showSpiner = true; //need to change to false while get callback from server.
        console.log('load more');
        request.endTimestamp = '0';
        PostService.getPostsBatch(request);
    }

    $scope.getPosts = function () {
        PostService.getPostsBatch(request);
    }

    $scope.writeEvent = function () {
		
		$scope.user = generalParameters.getUser();
        if ($scope.user.firstName == 'התחבר') {
            $rootScope.$broadcast('showInfoPopup', { showInfo: true });
        }
        else {
            $state.transitionTo('write-post', { postType: "event", postId: 0 });
        }
    };
	
	
	 
	 
 
}]);


socialGroupApp.controller('DatepickerDemoCtrl', ['$scope', function ( $scope) {
	
	angular.element(document).ready(function () { $scope.$$childHead.toggleMode= null;});

 

  $scope.today = function() {
 
    $scope.dt = new Date(); 
  };
  $scope.today();

 

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
	
	 
  }; 
  
	$scope.toggleWeekDisplay = function () {
		
		var monthArray = $scope.$$childHead.$$childHead.rows;
		 
		//single week display? -> open and return
		if(monthArray.length == 1){
			
			$scope.dt = new Date();
			$scope.togglecaendarArrow(-90);
			return;
			 
		}
		
		//month display? -> select and display the current week and return
		for(var i=0; i < monthArray.length; i++){
		
			for(var j=0; j < monthArray[i].length; j++){
			
				if( monthArray[i][j].current == true){
					
					$scope.$$childHead.$$childHead.rows =[];
					$scope.$$childHead.$$childHead.rows.push(monthArray[i]);
					$scope.togglecaendarArrow(90);
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

 // $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  
}]);

