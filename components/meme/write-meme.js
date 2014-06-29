
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

    $scope.setClass = function () {
        var img = document.getElementById('chosenImg');
        if (img.width > img.height) {
            return 'widthCon'
        }
        else if (img.width < img.height) {
            return 'heightCon'
        }
    }

    $scope.createMeme = function () {
        html2canvas(document.getElementById('html2canvas'), {
            onrendered: function (canvas) {
                var dataURL = canvas.toDataURL("image/png");
                //document.getElementById('img').src = dataURL;
                $scope.previewMemeBase64 = dataURL;
                $state.transitionTo('meme-preview', { base64: "" });
            }
        });
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


    /***********preview section********************/
   /* $scope.previewMemeBase64 = "";
    if ($stateParams.base64 != undefined) {
        // $scope.previewMemeBase64 = $stateParams.base64;
       // console.log("base64: " + $stateParams.base64);
    }*/

} ]);

