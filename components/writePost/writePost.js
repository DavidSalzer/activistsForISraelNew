socialGroupApp.controller('writePost', ['$scope','$rootScope','$stateParams', 'PostService', 'generalParameters', function ($scope,$rootScope, $stateParams, PostService, generalParameters) {
 
	/*init variables*/
	generalParameters.setBackIcon(true);
	$scope.parentPost={parentId:$stateParams.postId, parentPostType:$stateParams.postType};
	
	$scope.user = generalParameters.getUser();
	//alert($scope.user._id)
	
	$scope.postData={
				
		user:{_id:$scope.user._id},
		post:{attachment: "",content: ""}
	};
	
	$scope.toLargImage = false;
	
	switch ($stateParams.postType) {
            
		case "article":{
			
	
			$scope.featureColor ='#006dbe';
			$scope.headerText ='כתיבת טקסט';
			$scope.imageMax = 2;
			$scope.fileMax = 2;
			
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
			//alert($stateParams.postType)
	
			$scope.featureColor ='#993ca7';
			$scope.headerText ='כתיבת טקסט';
			$scope.max = 140;
			$scope.maxLine=3;
			$scope.imageMax = 2;
			
			$scope.postData.post.postType='talkback';
			$scope.thankDetails = {
        
				featureColor: '##993ca7',
				thankText: 'המאמר התקבל ויפורסם בהתאם לכללי האפליקציה',
				btnText: 'חזרה לעמוד המאמרים',
				headerText: 'המאמר שלי',
				featureState: 'talkback'
    
			};
			break; 
		}
		   
			
		case "poll":{
			//alert($stateParams.postType)
	
			$scope.featureColor ='#da4f00';
			$scope.headerText ='הצע סקר';
			$scope.max = 140;
			$scope.maxLine=3;
			$scope.imageMax = 2;
			
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
		
		/* if($scope.articleData.post.content.length < $scope.min){ $rootScope.$broadcast('showInfoPopup', { showInfo: true });return;}  */
		//alert($scope.imgObj);
		PostService.sendPost($scope.postData, $scope.imgObj);
		$rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
	};
	
	
	
}]);
