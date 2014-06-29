socialGroupApp.controller('event', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {


    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/calendar.png",
        featureWhatsUpLogo: "./img/calendar.png",
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
      
        $state.transitionTo('write-post', { postType: "event", postId: 0 });
      
    };
	
 console.log($scope.dt)
}]);


socialGroupApp.controller('DatepickerDemoCtrl', ['$scope', function ( $scope) {

  $scope.today = function() {
 
    $scope.dt = new Date(); 
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
console.log($scope)
    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
	
	 
  };
  
  $scope.oneWeek = function(){
    
	
	console.log($scope)
	 
  };

 // $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  
  console.log($scope.dt)

  
}]);

