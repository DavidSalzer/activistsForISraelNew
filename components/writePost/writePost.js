socialGroupApp.controller('writePost', ['$scope','$rootScope','$stateParams', 'PostService', 'generalParameters','$state', function ($scope,$rootScope, $stateParams, PostService, generalParameters,$state) {

	/*init variables*/
	generalParameters.setBackIcon(true);
	var colors={'article':'#006dbe','talkback':'#993ca7','poll':'#da4f00'};
	$scope.parentPostType = $stateParams.postType;
	$scope.postType = $stateParams.postType;
	
	
	
	$scope.user = generalParameters.getUser();
	//alert($scope.user._id)
	
	$scope.postData={
		
		
		user:{_id:$scope.user._id},
		post:{_parentID: null ,attachment: "", content: ""}
		
	};
	
	if($stateParams.postId != 0){//if comment
	
		$scope.postType = 'talkback'
		$scope.postData.post._parentID = $stateParams.postId;
	}

	
	$scope.imageMax = 1;
	$scope.toLargImage = false;
	$scope.imgFileText = 'צרף תמונה'
	
	switch ($scope.postType) {
            
		case "article":{
			
	
			$scope.featureColor ='#006dbe';
			$scope.headerText ='כתיבת טקסט';
			
			$scope.textFileText ='צרף קובץ טקסט';
			$scope.toLargTextFile =false;
			$scope.textFileMax = 1;
			$scope.min = 250;
			
			$scope.postData.post.postType='article';
			$scope.postData.post.title='';
			
			$scope.thankDetails = {
        
				featureColor: '#006dbe',
				thankText: 'המאמר התקבל ויפורסם בהתאם לכללי האפליקציה',
				btnText: 'חזרה לעמוד המאמרים',
				headerText: 'המאמר שלי',
				featureState: 'article'
    
			};
			break;
		}
		   
			
		case "talkback":{
			
			$scope.featureColor = colors[$scope.parentPostType];
			$scope.headerText ='כתיבת טקסט';
			$scope.max = 140;
			$scope.maxLine=3;
			
			
			$scope.postData.post.postType='talkback';
			
			break; 
		}
		   
			
		case "poll":{
			//alert($stateParams.postType)
	
			$scope.featureColor ='#da4f00';
			$scope.headerText ='הצע סקר';
			$scope.max = 140;
			$scope.maxLine=3;
			
			
			$scope.postData.post.postType='poll';
			
			$scope.thankDetails = {
        
				featureColor: '#da4f00',
				thankText: 'ההצעה התקבלה ותתפרסם בהתאם לכללי האפליקציה',
				btnText: 'עמוד הסקרים',
				headerText: 'הסקר שלי',
				featureState: 'poll'
    
			};
			break;
		}
		   
		
    }
		
	
	
	console.log($scope.postData);
	
	
	$scope.sendPost = function () {
		
		/* if(($scope.min > 0)&&($scope.postData.post.content.length < $scope.min)){ $rootScope.$broadcast('showInfoPopup', { showInfo: true });return;}   */
		//alert($scope.imgObj);
		//alert($scope.fileObj);
		PostService.sendPost($scope.postData, $scope.fileObj, $scope.imgObj );
		if($scope.postType=='talkback'){
			
			$state.transitionTo($scope.parentPostType);return;
		}
		$rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
	};
	
	
	
}]);
