socialGroupApp.controller('writePost', ['$scope', '$rootScope', '$stateParams', 'PostService', 'generalParameters', '$state', '$window', '$filter', 'filePicker', function ($scope, $rootScope, $stateParams, PostService, generalParameters, $state, $window, $filter, filePicker) {

    /*init variables*/
    generalParameters.setBackIcon(true);
    $scope.showTimePicker = false;
    $scope.imageMax = 1;
    $scope.toLargImage = false;
    $scope.imgFileText = 'צרף תמונה';
    $scope.isSiteHeader = true;
    $scope.timeDisplay = {};

    $scope.calendarShown = true;

    $scope.timeDisplay.time = 'dfhfgm';
    var colors = { 'article': '#006dbe', 'talkback': '#993ca7', 'poll': '#da4f00', 'event': '#004a8e' };
    $scope.isPostPending = false;

    $scope.parentPostType = $stateParams.postType;
    $scope.postType = $stateParams.postType;
    $scope.postId = $stateParams.postId;
    $scope.user = generalParameters.getUser();

      $scope.showAll = function (e) {

        $scope.showAll = true;
    }


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

        case "talkback":
            {
                $scope.headerText = 'כתיבת טקסט';
                $scope.max = 140;
                //$scope.maxLine = 3;
                $scope.postData.post.postType = 'talkback';
                break;
            }

        case "poll":
            {
                $scope.headerText = 'הצע סקר';
                $scope.max = 140;
                //$scope.maxLine = 3;
                $scope.postData.post.postType = 'poll';
                $scope.postData.post.title = '';
                $scope.postData.post.poll = {};
                $scope.postData.post.poll.status = 'draft';
                $scope.voteOptions = [{ answer: '' }, { answer: '' }, { answer: '' }, { answer: ''}];

                //$scope.postData.post.name = $scope.user.firstName + ' ' + $scope.user.lastName;
                //$scope.postData.post.email = $scope.user.email;

                $scope.thankDetails = {

                    featureColor: colors[$scope.postType],
                    thankText: 'הצעתך לסקר התקבלה במערכת',
                    btnText: 'חזרה לעמוד הסקרים',
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
                    $scope.timeDisplay.date = new Date($scope.postData.post.DestinationTime); //$filter('date')($scope.postData.post.DestinationTime, "dd/MM/yy");
                    $scope.timeDisplay.time = new Date($scope.postData.post.DestinationTime); //$filter('date')($scope.postData.post.DestinationTime, "HH:mm");

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

    $scope.sendPost = function () {
        if (!$scope.isPostPending) {
            if ($scope.postType == 'poll') {
                $scope.postData.post.poll.options = [];
                for (var i = 0; i < $scope.voteOptions.length; i++) {
                    if ($scope.voteOptions[i].answer.length > 0) {
                        $scope.postData.post.poll.options.push($scope.voteOptions[i]);
                    }
                }
            }

            if (!$scope.validateInputs()) { return; }

            //article? check if the text is large then minimum
            if (($scope.min > 0) && ($scope.postData.post.content.length < $scope.min)) { $rootScope.$broadcast('showInfoPopup', { showInfo: true }); return; }

            else if ($scope.postData.post.postType == 'event') {

                $scope.convertDate();
            }
            $scope.isPostPending = true;
            html2canvas(document.getElementById('html2canvas'), {
                onrendered: function (canvas) {
                    $scope.imgObj = canvas.toDataURL("image/png");
                    PostService.sendPost($scope.postData, $scope.fileObj, $scope.imgObj, true)
                    //PostService.sendPost($scope.postData, $scope.fileObj, $scope.imgObj, false)
		            .then(function (data) {

		                console.log(data);
		                if (data.status.statusCode == 0) {
		                    generalParameters.setBackIcon(false);

		                    if ($scope.postType == 'talkback') {

		                        $state.transitionTo($scope.parentPostType); return;
		                    }
		                    $scope.showSendPostError = false; ;
		                    //others - show thank page
		                    $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
		                }
		                else {
		                    $scope.showSendPostError = true;
		                    $scope.sendPostError = errorMessages.generalError;
		                }
		                $scope.isPostPending = false;
		            });
                }
            })
        }
    };

    $scope.editPost = function () {

        if (!$scope.validateInputs()) { return; }

        $scope.convertDate();

        PostService.updatePost($scope.postData, $scope.fileObj, $scope.imgObj, true)
		.then(function (data) {

		    console.log(data);
		    generalParameters.setBackIcon(false);

		    $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
		});

    };


    $scope.convertDate = function () {

        var date = new Date(($scope.timeDisplay.date).getFullYear(), ($scope.timeDisplay.date).getMonth(), ($scope.timeDisplay.date).getDate());
        date.setHours(($scope.timeDisplay.time).getHours(), ($scope.timeDisplay.time).getMinutes());
        $scope.postData.post.DestinationTime = date.getTime();
    }

    $scope.validateInputs = function () {
        $scope.showTitleError = ($scope.postData.post.title == undefined || $scope.postData.post.title == '') && ($scope.postType == 'event' || $scope.postType == 'article');
        $scope.showContentError = ($scope.postData.post.content == undefined || $scope.postData.post.content == '') && ($scope.postType == 'event' || $scope.postType == 'talkback');
        $scope.showContentLongError = (($scope.postData.post.content.length > $scope.max) && ($scope.postType == 'talkback'));
        $scope.showDDMMYYError = ($scope.timeDisplay.date == undefined || $scope.timeDisplay.date == '') && $scope.postType == 'event';
        $scope.showHHMMError = ($scope.timeDisplay.time == undefined || $scope.timeDisplay.time == '') && $scope.postType == 'event';
        $scope.showLocationError = ($scope.postData.post.location == undefined || $scope.postData.post.location == '') && $scope.postType == 'event';
        $scope.showMailError = $scope.validateEmails($scope.postData.post.email);
        $scope.showPhoneError = $scope.validatePhone($scope.postData.post.phone);
        if ($scope.postType == 'poll') {
            $scope.showPollQuestionError = ($scope.postData.post.title == undefined || $scope.postData.post.title == '') && ($scope.postType == 'poll');
            $scope.showpollDescriptionerror = ($scope.postData.post.content == undefined || $scope.postData.post.content == '') && ($scope.postType == 'poll');
            $scope.showPollAnsError = ($scope.postData.post.poll.options == undefined || $scope.postData.post.poll.options.length < 2) && $scope.postType == 'poll';
        }

        return (!($scope.showTitleError || $scope.showContentError || $scope.showContentLongError || $scope.showDDMMYYError || $scope.showHHMMError || $scope.showLocationError || $scope.showPollQuestionError || $scope.showpollDescriptionerror || $scope.showPollAnsError || $scope.showMailError || $scope.showPhoneError || false));


    }


    $scope.validateEmails = function (email) {
        if ($scope.postType != 'event') return false;
        if ((email != "") && (email != undefined)) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(email)) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }

    $scope.validatePhone = function (phone) {
        if ($scope.postType != 'event') return false;
        if ((phone != "") && (phone != undefined)) {
            return !(/^\d+$/.test(phone));
        }
        return false;

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


    /****time picker ****/
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

    $scope.takePicture = function () {
        filePicker.getPicture()
        .then(function (imageData) {
            // imageData is base64-encoded image
            $scope.imgFileText = imageData.fileText;
            $scope.imgObj = imageData.imgData;
            $scope.postImg = imageData.imgData; //for preview
        });
    };


    document.getElementById('main-view').addEventListener('click', function (e) {
        if (e.target.id != "show-timepick") {
            $scope.showTimePicker = false;
            $scope.$apply()
        }

    });

    document.getElementById('my-big-timepick').addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation()
    }, false);



} ]);