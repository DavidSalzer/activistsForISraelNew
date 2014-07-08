
socialGroupApp.controller('previewPubMeme', ['$scope', '$rootScope', '$stateParams', 'PostService', 'generalParameters', '$state', function ($scope, $rootScope, $stateParams, PostService, generalParameters, $state) {

    /*init variables*/
    generalParameters.setBackIcon(true);
    $scope.user = generalParameters.getUser();
    $scope.topRgb = "#ffffff";
    $scope.bottomRgb = "#ffffff";
    $scope.topText = "";
    $scope.bottomText = "";
    $scope.font;
    $scope.postImg = "";

    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/meme.png",
        featureWhatsUpLogo: "./img/meme_info.png",
        featureColor: '#ffd427',
        infoHaeder: "פיצ'ר הממים",
        infoMainText: 'הכינו "ממים" - גלויות מצחיקות- בעזרת מכשיר הכנת הממים שלנו- ושתפו עם החברים',
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };
    generalParameters.setFeature($scope.featureDetails);

    $scope.previewData = PostService.getPreviewMeme();

    $scope.topRgb = $scope.previewData.rgbTop;
    $scope.bottomRgb = $scope.previewData.rgbBottom;
    $scope.topText = $scope.previewData.top;
    $scope.bottomText = $scope.previewData.bottom;
    $scope.font = $scope.previewData.font;
    $scope.postImg = $scope.previewData.img;


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


    $scope.setClass = function () {
        var img = document.getElementById('chosenImg');
        console.log('img width: ' + img.offsetWidth + ' img height: ' + img.offsetHeight)
        if (img.width >= img.height) {
            return 'widthCon'
        }
        else if (img.width < img.height) {
            return 'heightCon'
        }
    }

    $scope.getColor = function (pos) {

        switch (pos) {
            case "top":
                return $scope.topRgb;
                break;
            case "bottom":
                return $scope.bottomRgb;
                break;
        }

    }
    $scope.publishMeme = function () {

        html2canvas(document.getElementById('html2canvas'), {
            onrendered: function (canvas) {
                $scope.previewBase64 = canvas.toDataURL("image/png");
                $scope.sendPost();
                // document.getElementById('img').src = dataURL;
                // PostService.setPreviewMeme(dataURL);
                // $state.transitionTo('meme-preview');
            }

        })
        //$scope.sendPost();
    }

    $scope.sendPost = function () {

        //show the loader
        var callbackFunc = $scope.showThankPage;
        PostService.sendPost($scope.postData, $scope.fileObj, $scope.previewBase64, true,callbackFunc);

        generalParameters.setBackIcon(false);


        // show thank page
        // $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
    };

    $scope.showThankPage = function () {
        // show thank page
        $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
    }


} ]);

