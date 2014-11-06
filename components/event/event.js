socialGroupApp.controller('event', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {

    /*init controller details*/

    $scope.showSpiner = PostService.getSpiner;
    $scope.f = true;
    $scope.f2 = true;
    $scope.isSiteHeader = true;
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/sidebar-event-icon.png",
        featureWhatsUpLogo: "./img/calendar_info.png",
        featureColor: '#004a8e',
        infoHaeder: "אירועים",
        infoMainText: 'לוח האירועים של האחליקציה. כאן תוכלו לראות את האירועים הקיימים ולפרסם אירועים/חוגי בית ושאר מפגשים שתרצו לשתף בהם את החברים',
        infoSubText: "יצירת תכנים באיזור זה מותנת בהרשמה לאחליקציה"
    };

    generalParameters.setFeature($scope.featureDetails);
    $scope.user = generalParameters.getUser();
    generalParameters.setBackIcon(false); //tester

    request = {
        startTimestamp: '',
        endTimestamp: '',
        offset: 0,
        limit: 0,
        orderBy: 'DestinationTime', //'-timestamp',
        postType: 'event',
        userID: $scope.user._id,
        _parentID: '',
        DestinationTime: new Date().getTime()
    };

    /*init controller data*/
    PostService.getPostsBatch(request); //tell service to refresh posts
    $scope.posts = PostService.getPosts; //ask service for posts


    $scope.l = function (flager) {
        console.log(flager);
        if (flager) {
            $scope.f = false;
        }
        else {
            $scope.f = true;
        }
        //   $scope.$apply();
    }

    $scope.loadMore = function () {

        console.log('load more');
        request.offset += 8;
        post = PostService.getPosts();
        request.endTimestamp = post[0].timestamp;

        PostService.getPostsBatch(request);
    }

    $scope.writeEvent = function () {

        $scope.user = generalParameters.getUser();

        if ($scope.user.firstName == 'הצטרף לאפליקציה') {
            $rootScope.$broadcast('showInfoPopup', { showInfo: true });
        }
        else {
            $state.transitionTo('write-post', { postType: "event", postId: 0 });
        }
    };

    $scope.$on('postClicked', function (event, args) {

        $state.transitionTo('single-event', { postId: args.postId });

    });

    $scope.updateFeed = function (date) {

        date.setHours(0, 0);
        request.DestinationTime = date.getTime();
        //alert(request.DestinationTime);
        PostService.getPostsBatch(request);
    }

} ]);


socialGroupApp.controller('DatepickerDemoCtrl', ['$scope', 'PostService', function ($scope, PostService) {

    angular.element(document).ready(function () {

        $scope.$$childHead.toggleMode = null; //prevent select month / year

        $scope.$watch(//reset calendar arrow when paging month

			function () { return $scope.$$childHead.$$childHead.rows; },
			function (newValue) {

			    if (newValue.length > 1) {//a new month was selected

			        $scope.monthArray = newValue; //save month for get back from week display
			        $scope.togglecaendarArrow(-90); //make sore the arrow is to up 
			    }
			},
			true
		);

        $scope.$watch('dt', function () {
            console.log('$scope.dt: ');
            console.log($scope.dt);
            $scope.updateFeed($scope.dt);
            $scope.hedt = (new HeDate($scope.dt)).toString();
        });

    });

    $scope.dt = new Date();

    $scope.hedt = (new HeDate($scope.dt)).toString();
    console.log("$scope.hedt");


    $scope.toggleWeekDisplay = function () {

        //now in single week display? -> open and return
        if ($scope.$$childHead.$$childHead.rows.length == 1) {

            $scope.$$childHead.$$childHead.rows = $scope.monthArray; //get back current month from memory
            $scope.togglecaendarArrow(-90); //toggle arrow to up
            //$scope.f = true; //yishai added this row for the wrapper of the events to know to decrease the paading
            $scope.l(false);
            //$scope.$apply();
            return;
        }

        //$scope.f = false; //yishai added this row for the wrapper of the events to know to increase the paading
        $scope.l(true);

        //now in month display? -> select and display only the week of selected day	
        for (var i = 0; i < $scope.monthArray.length; i++) {

            for (var j = 0; j < $scope.monthArray[i].length; j++) {

                if ($scope.monthArray[i][j].selected == true) {

                    $scope.$$childHead.$$childHead.rows = [];
                    $scope.$$childHead.$$childHead.rows.push($scope.monthArray[i]); //chose selected week
                    $scope.togglecaendarArrow(90); //toggle arrow to down
                    // $scope.$apply();
                    return;
                }
            }
        }

        // $scope.$apply();
    };

    $scope.togglecaendarArrow = function (deg) {

        document.getElementById("calendar-arrow").style.setProperty('transform', 'rotate(' + deg + 'deg)');
        document.getElementById("calendar-arrow").style.setProperty('-webkit-transform', 'rotate(' + deg + 'deg)');
        document.getElementById("calendar-arrow").style.setProperty('-o-transform', 'rotate(' + deg + 'deg)');
        document.getElementById("calendar-arrow").style.setProperty('-moz-transform', 'rotate(' + deg + 'deg)');
        document.getElementById("calendar-arrow").style.setProperty('-ms-transform', 'rotate(' + deg + 'deg)');
    }

} ]);

