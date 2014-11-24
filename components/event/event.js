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






socialGroupApp.controller('DatepickerDemoCtrl', ['$scope', '$http', 'PostService', '$timeout', function ($scope, $http, PostService, $timeout) {
    angular.element(document).ready(function () {
        $scope.monthArray = $scope.$$childHead.$$childHead.rows;
        $scope.backgroundDateColor($scope.monthArray);
        $scope.$$childHead.toggleMode = null; //prevent select month / year

        $scope.$watch(//reset calendar arrow when paging month

			function () { return $scope.$$childHead.$$childHead.rows; },
			function (newValue) {
			    if (newValue.length > 1) {//a new month was selected

			        $scope.monthArray = newValue; //save month for get back from week display
			        $scope.togglecaendarArrow(0); //make sore the arrow is to up 
			        $scope.backgroundDateColor($scope.monthArray);
			    }

			}, true);

        $scope.$watch('dt', function () {
            $scope.monthArray = $scope.$$childHead.$$childHead.rows;
            $scope.backgroundDateColor($scope.monthArray);
            console.log($scope.monthArray);
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
            $scope.togglecaendarArrow(0); //toggle arrow to up
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
                    console.log($scope.monthArray[i]);
                    $scope.backgroundDateColor($scope.monthArray[i]);
                    $scope.togglecaendarArrow(180); //toggle arrow to down
                    // $scope.$apply();
                    console.log($scope.monthArray);
                    return;
                }
            }
        }

        // $scope.$apply();
    };

    $scope.showCurrentDate = function () {
        $scope.dt = new Date()
    };

    $scope.togglecaendarArrow = function (deg) {

        document.getElementById("calendar-arrow").style.setProperty('transform', 'rotate(' + deg + 'deg)');
        document.getElementById("calendar-arrow").style.setProperty('-webkit-transform', 'rotate(' + deg + 'deg)');
        document.getElementById("calendar-arrow").style.setProperty('-o-transform', 'rotate(' + deg + 'deg)');
        document.getElementById("calendar-arrow").style.setProperty('-moz-transform', 'rotate(' + deg + 'deg)');
        document.getElementById("calendar-arrow").style.setProperty('-ms-transform', 'rotate(' + deg + 'deg)');
    }
    //paint the date with event on event board
    $scope.backgroundDateColor = function (monthArray) {
        var d = new Date();
        if (monthArray[1][0]) { //check if the argument is 2d
            var startDate = monthArray[0][0].date.getTime() - 60 * 60 * 12 * 1000; // amount of milliseconds in 12 hours - (seconds*minutes*hours)*1000.
            var endDate = monthArray[5][6].date.getTime() + 60 * 60 * 12 * 1000;
        } else {
            var startDate = monthArray[0].date.getTime() - 60 * 60 * 12 * 10000;
            var endDate = monthArray[6].date.getTime() + 60 * 60 * 12 * 1000;
        }
        //take two timestamp arguments and give array (data.data) of all the event-posts between them.
        $http.get(domain + 'getDestinationTimesOfPosts?postType=event&startDestinationTime=' + startDate + '&endDestinationTime=' + endDate)
            .success(function (data) {
                for (var i = 0; i < data.data.length; i++) {
                    d.setTime(data.data[i].DestinationTime);
                    if (monthArray[1][0]) {

                        for (var j = 0; j < monthArray.length; j++) {
                            for (var k = 0; k < monthArray[j].length; k++) {

                                if (d.getDate() == monthArray[j][k].date.getDate() && d.getMonth() == monthArray[j][k].date.getMonth() && d.getFullYear() == monthArray[j][k].date.getFullYear()) {
                                    var myNode = document.querySelectorAll('.calendar-area td button');
                                    

                                    if (data.data[i]._author.local.role == 'staff') {
                                        //myNode[j * 7 + k].style.backgroundImage = "url('../img/calendar_benet.png')";
                                        //myNode[j * 7 + k].style.backgroundPosition = "9px 12px";
                                        //myNode[j * 7 + k].style.backgroundSize = "20px 20px";
                                        //myNode[j * 7 + k].style.backgroundRepeat = "no-repeat";
                                        if (myNode[j * 7 + k].className.indexOf("benet-event") == -1) {
                                            myNode[j * 7 + k].className = myNode[j * 7 + k].className + " benet-event";
                                        }
                                    }
                                    else{
                                        myNode[j * 7 + k].style.background = "#B2C8DD";
                                    }
                                }
                            }
                        }
                    } else {
                        for (var j = 0; j < monthArray.length; j++) {

                            if (d.getDate() == monthArray[j].date.getDate() && d.getMonth() == monthArray[j].date.getMonth() && d.getFullYear() == monthArray[j].date.getFullYear()) {
                                var myNode = document.querySelectorAll('.calendar-area td button');
                               

                                if (data.data[i]._author.local.role == 'staff') {
                                    if (myNode[j * 7 + k].className.indexOf("benet-event") == -1) {
                                        myNode[j * 7 + k].className = myNode[j * 7 + k].className + " benet-event";
                                    }
                                    //myNode[j * 7 + k].style.backgroundImage = "url('../img/calendar_benet.png')";
                                    //  myNode[j * 7 + k].style.backgroundPosition = "9px 12px";
                                    //  myNode[j * 7 + k].style.backgroundSize = "20px 20px";
                                    //  myNode[j * 7 + k].style.backgroundRepeat = "no-repeat";
                                }
                                else{
                                     myNode[j].style.background = "#B2C8DD";
                                }
                            }

                        }
                    }

                }
            });
    }

} ]);

