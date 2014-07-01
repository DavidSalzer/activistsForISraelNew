
socialGroupApp.controller('previewPubMeme', ['$scope', '$rootScope', '$stateParams', 'PostService', 'generalParameters', '$state', function ($scope, $rootScope, $stateParams, PostService, generalParameters, $state) {

    /*init variables*/
    generalParameters.setBackIcon(true);
    $scope.user = generalParameters.getUser();

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

    $scope.previewBase64 = PostService.getPreviewMeme();

    //send post
    $scope.imageMax = 1;
    $scope.toLargImage = false;
    $scope.imgFileText = 'צרף תמונה';

    $scope.headerText = 'כתיבת טקסט';

    $scope.textFileText = 'צרף קובץ טקסט';
    $scope.toLargTextFile = false;
    $scope.textFileMax = 1;
    $scope.min = 250;
    $scope.user = generalParameters.getUser();
    $scope.postData = {


        user: { _id: $scope.user._id },
        post: { _parentID: null, attachment: "", content: "" }

    };
    $scope.postData.post.postType = 'meme';
    $scope.postData.post.title = '';

    $scope.thankDetails = {

        featureColor: '#ffd427',
        thankText: 'המם התקבל ויפורסם בהתאם לכללי האפליקציה',
        btnText: 'חזרה לעמוד הממים',
        headerText: 'המאמר שלי',
        featureState: 'meme'

    };


    
    $scope.publishMeme = function () {
        $scope.sendPost();
    }

    $scope.sendPost = function () {


        //if (($scope.min > 0) && ($scope.postData.post.content.length < $scope.min)) { $rootScope.$broadcast('showInfoPopup', { showInfo: true }); return; }

        PostService.sendPost($scope.postData, $scope.fileObj, $scope.previewBase64,true);

        generalParameters.setBackIcon(false);


        // show thank page
        $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
    };



} ]);

