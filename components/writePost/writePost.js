socialGroupApp.controller('writePost', ['$scope', '$rootScope', '$stateParams', 'PostService', 'generalParameters', '$state', '$window', '$filter', function ($scope, $rootScope, $stateParams, PostService, generalParameters, $state, $window, $filter) {

    /*init variables*/
    generalParameters.setBackIcon(true);
    $scope.showTimePicker = false;
    $scope.imageMax = 1;
    $scope.toLargImage = false;
    $scope.imgFileText = 'צרף תמונה'
    $scope.isSiteHeader = true;
    $scope.timeDisplay = {};
    var colors = { 'article': '#006dbe', 'talkback': '#993ca7', 'suggestPoll': '#da4f00', 'event': '#004a8e' };
    $scope.isPostPending = false;

    $scope.parentPostType = $stateParams.postType;
    $scope.postType = $stateParams.postType;
    $scope.postId = $stateParams.postId;
    $scope.user = generalParameters.getUser();

    $scope.postData = {

        //user: { _id: $scope.user._id },
        post: { _parentID: null, attachment: "", content: "" }

    };

    $scope.featureColor = colors[$scope.postType];
    if (($scope.postId != 0) && ($scope.postType != 'event')) {//if comment

        $scope.featureColor = colors[$scope.parentPostType];
        $scope.postType = 'talkback'
        $scope.postData.post._parentID = $stateParams.postId;
    }


    switch ($scope.postType) {


        //case "article":     
        //    {     

        //        $scope.headerText = 'כתיבת טקסט';     

        //        $scope.textFileText = 'צרף קובץ טקסט';     
        //        $scope.toLargTextFile = false;     
        //        $scope.textFileMax = 1;     
        //        $scope.min = 250;     

        //        $scope.postData.post.postType = 'article';     
        //        $scope.postData.post.title = '';     

        //        $scope.thankDetails = {     

        //            featureColor: colors[$scope.postType],     
        //            thankText: 'המאמר התקבל ויפורסם בהתאם לכללי האפליקציה',     
        //            btnText: 'חזרה לעמוד המאמרים',     
        //            headerText: 'המאמר שלי',     
        //            featureState: 'article'     

        //        };     
        //        break;     
        //    }     


        case "talkback":
            {


                $scope.headerText = 'כתיבת טקסט';
                $scope.max = 140;
                $scope.maxLine = 3;


                $scope.postData.post.postType = 'talkback';

                break;
            }


        case "poll":
            {

                $scope.headerText = 'הצע סקר';
                $scope.max = 140;
                $scope.maxLine = 3;


                $scope.postData.post.postType = 'poll';
                $scope.postData.post.title = 'הצעת סקר';
                $scope.postData.post.name = $scope.user.firstName + ' ' + $scope.user.lastName;
                $scope.postData.post.email = $scope.user.email;

                $scope.thankDetails = {

                    featureColor: colors[$scope.postType],
                    thankText: 'ההצעה התקבלה ותתפרסם בהתאם לכללי האפליקציה',
                    btnText: 'עמוד הסקרים',
                    headerText: 'הסקר שלי',
                    featureState: 'poll'

                };
                break;
            }

        case "event":
            {
                $scope.calendarType = 'write-calendar-event'
                $scope.headerText = 'יצירת אירוע';
                $scope.max = 140;

                $scope.postData.post.postType = 'event';
                $scope.postData.post.title = '';
                $scope.timeDisplay.date = "";
                $scope.timeDisplay.time = "";

                $scope.postData.post.location = '';
                $scope.postData.post.email = "";
                $scope.postData.post.phone = "";

                $scope.thankDetails = {

                    featureColor: colors[$scope.postType],
                    thankText: 'האירוע התקבל ויפורסם בהתאם לכללי האפליקציה',
                    btnText: 'עמוד האירועים',
                    headerText: 'יצירת אירוע',
                    featureState: 'event'

                };

                if ($stateParams.postId != 0) {//edit event

                    $scope.headerText = 'עריכת אירוע';
                    $scope.postData.post = PostService.getSinglePost();
                    $scope.timeDisplay.date = $filter('date')($scope.postData.post.DestinationTime, "dd/MM/yy");
                    $scope.timeDisplay.time = $filter('date')($scope.postData.post.DestinationTime, "HH:mm");

                    if ($scope.postData.post.img) {

                        $scope.imgFileText = $scope.postData.post.img;
                        $scope.postImg = domain + $scope.postData.post.img;
                    }
                    console.log($scope.postData.post)
                }
                break;
            }
    }

    $scope.cleanDetails = function () {//event


        $scope.postData.post.title = '';
        $scope.postData.post.content = '';
        $scope.timeDisplay.date = '';
        $scope.timeDisplay.time = '';
        $scope.postData.post.location = '';
        $scope.postData.post.email = "";
        $scope.postData.post.phone = "";
        $scope.imgFileText = 'צרף תמונה';
        $scope.postImg = "";

    };
    $scope.gg = function () {
        var f = 1;
    }
    $scope.sendPost = function () {
        if (!$scope.isPostPending) {

            if (!$scope.validateInputs()) { return; }

            //article? check if the text is large then minimum
            if (($scope.min > 0) && ($scope.postData.post.content.length < $scope.min)) { $rootScope.$broadcast('showInfoPopup', { showInfo: true }); return; }

            else if ($scope.postData.post.postType == 'event') {

                $scope.convertDate();
            }
            $scope.isPostPending = true;
            PostService.sendPost($scope.postData, $scope.fileObj, $scope.imgObj)

		.then(function (data) {

		    console.log(data);
		    generalParameters.setBackIcon(false);

		    if ($scope.postType == 'talkback') {

		        $state.transitionTo($scope.parentPostType); return;
		    }
		    //others - show thank page
		    $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
		    $scope.isPostPending = false;
		});
        }
    };

    $scope.editPost = function () {

        if (!$scope.validateInputs()) { return; }

        $scope.convertDate();

        PostService.updatePost($scope.postData, $scope.fileObj, $scope.imgObj)

		.then(function (data) {

		    console.log(data);
		    generalParameters.setBackIcon(false);

		    $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
		});

    };


    $scope.convertDate = function () {

        //var ddmmyy = $scope.timeDisplay.date.split('/');
        //var date = new Date('20' + ddmmyy[2], ddmmyy[1] - 1, ddmmyy[0]);
        //var hhmm = $scope.timeDisplay.time.split(':');
        //date.setHours(hhmm[0], hhmm[1]);
        ////alert(date.getTime());
        //$scope.postData.post.DestinationTime = date.getTime();
        ////alert($scope.postData.post.DestinationTime);
//from now what yishai did

        var date = new Date(($scope.timeDisplay.date).getFullYear(), ($scope.timeDisplay.date).getMonth(), ($scope.timeDisplay.date).getDate());
        date.setHours(($scope.timeDisplay.date).getHours(), ($scope.timeDisplay.date).getMinutes());
        //alert(date.getTime());
        $scope.postData.post.DestinationTime = date.getTime();
        //alert($scope.postData.post.DestinationTime);


    }

    $scope.validateInputs = function () {

   //     var dateTest = new RegExp("^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]([0]?[1-9]|[1][0-2])[/]([0-9]{4}|[0-9]{2})$");
   //     var timeTest = new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3])[:][0-5][0-9]$");
   //     $scope.showTitleError = ($scope.postData.post.title == undefined || $scope.postData.post.title == '') && ($scope.postType == 'event' || $scope.postType == 'article');
   //     $scope.showDDMMYYError = ($scope.timeDisplay.date == undefined || $scope.timeDisplay.date == '' ||
		 //dateTest.test($scope.timeDisplay.date) == false) && $scope.postType == 'event';
   //     $scope.showHHMMError = ($scope.timeDisplay.time == undefined || $scope.timeDisplay.time == '' || timeTest.test($scope.timeDisplay.time) == false) && $scope.postType == 'event';
   //     $scope.showLocationError = ($scope.postData.post.location == undefined || $scope.postData.post.location == '') && $scope.postType == 'event';

   //     return (!($scope.showTitleError || $scope.showDDMMYYError || $scope.showHHMMError || $scope.showLocationError || false));
   //this is what was and from now is what yishai changed

            $scope.showTitleError = ($scope.postData.post.title == undefined || $scope.postData.post.title == '') && ($scope.postType == 'event' || $scope.postType == 'article');
        $scope.showDDMMYYError = ($scope.timeDisplay.date == undefined || $scope.timeDisplay.date == '') && $scope.postType == 'event';
        $scope.showHHMMError = ($scope.timeDisplay.time == undefined || $scope.timeDisplay.time == '') && $scope.postType == 'event';
        $scope.showLocationError = ($scope.postData.post.location == undefined || $scope.postData.post.location == '') && $scope.postType == 'event';

        return (!($scope.showTitleError || $scope.showDDMMYYError || $scope.showHHMMError || $scope.showLocationError || false));


    }

    //*****************date area**************// 


    $scope.today = function () {
        $scope.dte = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dte = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function ($event) {
        $scope.opened = true;
        $event.preventDefault();
        $event.stopPropagation();
        console.log($scope.timeDisplay.date);
        console.log($scope.timeDisplay.date instanceof Date);

    };



    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd/MM/yy', 'shortDate'];
    $scope.format = $scope.formats[2];


    //*****************end date area**************// 



    /****timoe pivker ****/



    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 5;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = false;
    $scope.toggleMode = function () {

    };

    $scope.update = function () {
        $scope.showTimePicker = false;
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.timeDisplay.time = d;

    };

    $scope.changed = function () {
        console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function () {
        $scope.mytime = null;
    };



} ]);
