
socialGroupApp.controller('writeMeme', ['$scope', '$rootScope', '$stateParams', 'PostService', 'generalParameters', '$state', 'memeGenerat', function ($scope, $rootScope, $stateParams, PostService, generalParameters, $state, memeGenerat) {
    var z;
    /*init variables*/
    generalParameters.setBackIcon(true);
    $scope.parentPostType = $stateParams.postType;
    $scope.user = generalParameters.getUser();

    $scope.rtl = true;
    $scope.ltr = false;
    $scope.topRgb = "587db4";
    $scope.bottomRgb = "ff0000";
    $scope.topText = "";


    $scope.fontOptions = ['arial', 'Aharoni', 'Calibri'];


    $scope.getColor = function (pos) {

        switch (pos) {
            case "top":
                return "#" + $scope.topRgb;
                break;
            case "bottom":
                return "#" + $scope.bottomRgb;
                break;
        }

    }
    $scope.setDirection = function (direction) {
        switch (direction) {
            case "rtl":
                $scope.rtl = true;
                $scope.ltr = false;
                break;
            case "ltr":
                $scope.ltr = true;
                $scope.rtl = false;
                break;
        }
    }

    $scope.createMeme = function () {
        var x;
    }


    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/meme.png",
        featureWhatsUpLogo: "./img/article_info.png",
        featureColor: '#ffd427',
        infoHaeder: "ממים",
        infoMainText: 'הכינו "ממים" - גלויות מצחיקות- בעזרת מכשיר הכנת הממים שלנו- ושתפו עם החברים',
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };
    generalParameters.setFeature($scope.featureDetails);


    $scope.imageMax = 1;
    $scope.toLargImage = false;
    $scope.imgFileText = 'צרף תמונה';

    request = {
        startTimestamp: '',
        endTimestamp: '',
        offset: 0,
        limit: 20,
        orderBy: '-timestamp',
        postType: 'memeImages',
        userID: $scope.user._id
    };


    PostService.getMemesImages(request);
    $scope.memeImages = PostService.getMemes;
    console.log($scope.postData);
    //memeGenerat.setMeme('shalom','lehitraot','http://upload.wikimedia.org/wikipedia/commons/5/5d/NaftaliBennett.jpg','30px Arial');

    $scope.sendPost = function () {

        /* if(($scope.min > 0)&&($scope.postData.post.content.length < $scope.min)){ $rootScope.$broadcast('showInfoPopup', { showInfo: true });return;}   */
        //alert($scope.imgObj);
        //alert($scope.fileObj);
        PostService.sendPost($scope.postData, $scope.fileObj, $scope.imgObj);
        if ($scope.postData.post.postType == 'talkback') {

            $state.transitionTo('talk-back'); return;
        }
        $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
    };

    /*
    switch ($stateParams.postType) {
            
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
			
    $scope.featureColor ='#993ca7';
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
    */



} ]);
