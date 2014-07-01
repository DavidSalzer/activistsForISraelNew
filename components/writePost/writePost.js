socialGroupApp.controller('writePost', ['$scope', '$rootScope', '$stateParams', 'PostService', 'generalParameters', '$state', '$window', function ($scope, $rootScope, $stateParams, PostService, generalParameters, $state, $window) {

    /*init variables*/
    generalParameters.setBackIcon(true);

    $scope.imageMax = 1;
    $scope.toLargImage = false;
    $scope.imgFileText = 'צרף תמונה'
    var colors = { 'article': '#006dbe', 'talkback': '#993ca7', 'poll': '#da4f00', 'event': '#004a8e' };

    $scope.parentPostType = $stateParams.postType;
    $scope.postType = $stateParams.postType;
    $scope.user = generalParameters.getUser();

    $scope.postData = {


        user: { _id: $scope.user._id },
        post: { _parentID: null, attachment: "", content: "" }

    };

    $scope.featureColor = colors[$scope.postType];
    if ($stateParams.postId != 0) {//if comment

        $scope.featureColor = colors[$scope.parentPostType];
        $scope.postType = 'talkback'
        $scope.postData.post._parentID = $stateParams.postId;
    }





    switch ($scope.postType) {


        case "article":
            {

                $scope.headerText = 'כתיבת טקסט';

                $scope.textFileText = 'צרף קובץ טקסט';
                $scope.toLargTextFile = false;
                $scope.textFileMax = 1;
                $scope.min = 250;

                $scope.postData.post.postType = 'article';
                $scope.postData.post.title = '';

                $scope.thankDetails = {

                    featureColor: colors[$scope.postType],
                    thankText: 'המאמר התקבל ויפורסם בהתאם לכללי האפליקציה',
                    btnText: 'חזרה לעמוד המאמרים',
                    headerText: 'המאמר שלי',
                    featureState: 'article'

                };
                break;
            }


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
                $scope.postData.post.day = '';
                $scope.postData.post.dayTime = '';
                $scope.postData.post.place = '';
                $scope.postData.post.mail = "";
                $scope.postData.post.phone = "";

                $scope.thankDetails = {

                    featureColor: colors[$scope.postType],
                    thankText: 'האירוע התקבל ויפורסם בהתאם לכללי האפליקציה',
                    btnText: 'עמוד האירועים',
                    headerText: 'יצירת אירוע',
                    featureState: 'event'

                };
                break;
            }
           


    }

    $scope.cleanDetails = function () {//event

        $scope.postData.post.title = '';
        $scope.postData.post.content = '';
        $scope.postData.post.day = '';
        $scope.postData.post.dayTime = '';
        $scope.postData.post.place = '';
        $scope.postData.post.mail = "";
        $scope.postData.post.phone = "";
        $scope.imgFileText = 'צרף תמונה'
    };

    $scope.sendPost = function () {


        //article? check if the text is large then minimum
        if (($scope.min > 0) && ($scope.postData.post.content.length < $scope.min)) { $rootScope.$broadcast('showInfoPopup', { showInfo: true }); return; }

        PostService.sendPost($scope.postData, $scope.fileObj, $scope.imgObj);

        generalParameters.setBackIcon(false);

        if ($scope.postType == 'talkback') {

            $state.transitionTo($scope.parentPostType); return;
        }
        //others - show thank page
        $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
    };



} ]);
