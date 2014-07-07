socialGroupApp.controller('writePost', ['$scope', '$rootScope', '$stateParams', 'PostService', 'generalParameters', '$state', '$window', '$filter', function ($scope, $rootScope, $stateParams, PostService, generalParameters, $state, $window,$filter) {

    /*init variables*/
    generalParameters.setBackIcon(true);

    $scope.imageMax = 1;
    $scope.toLargImage = false;
    $scope.imgFileText = 'צרף תמונה'
	$scope.timeDisplay={};
    var colors = { 'article': '#006dbe', 'talkback': '#993ca7', 'poll': '#da4f00', 'event': '#004a8e' };

    $scope.parentPostType = $stateParams.postType;
    $scope.postType = $stateParams.postType;
    $scope.postId = $stateParams.postId;
    $scope.user = generalParameters.getUser();

    $scope.postData = {

        user: { _id: $scope.user._id },
        post: { _parentID: null, attachment: "", content: "" }

    };

    $scope.featureColor = colors[$scope.postType];
    if (( $scope.postId != 0) && ($scope.postType != 'event')) {//if comment

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
				$scope.timeDisplay.date = "";
                $scope.timeDisplay.time ="";
          
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
			
				if($stateParams.postId != 0){//edit event
					
					$scope.headerText = 'עריכת אירוע';
					$scope.postData.post = PostService.getSinglePost();
					if($scope.postData.post.img){
						
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
	
        //article? check if the text is large then minimum
        if (($scope.min > 0) && ($scope.postData.post.content.length < $scope.min)) { $rootScope.$broadcast('showInfoPopup', { showInfo: true }); return; }
		
		else if( $scope.postData.post.postType == 'event'){
			
			$scope.convertDate();
		}
		PostService.sendPost($scope.postData, $scope.fileObj, $scope.imgObj)
	   
		.then(function (data) {
		
			console.log(data);
			generalParameters.setBackIcon(false);

			if ($scope.postType == 'talkback') {

				$state.transitionTo($scope.parentPostType); return;
			}
			//others - show thank page
			$rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
		});
    };
	
	
	$scope.convertDate = function () {
	
		$scope.postData.post.DestinationTime = new Date($scope.timeDisplay.date);
		var hhmm = $scope.timeDisplay.time.split(':');
		$scope.postData.post.DestinationTime.setHours(hhmm[0],hhmm[1]);
		console.log($scope.postData.post.DestinationTime); 
		$scope.postData.post.DestinationTime = $scope.postData.post.DestinationTime.getTime();
	}
	
}]);
