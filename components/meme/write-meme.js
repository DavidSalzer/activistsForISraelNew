
socialGroupApp.controller('writeMeme', ['$scope', '$rootScope', '$stateParams', 'PostService', 'generalParameters', '$state', function ($scope, $rootScope, $stateParams, PostService, generalParameters, $state) {

    $scope.domain = domain;
    /*init variables*/
    generalParameters.setBackIcon(true);
    $scope.parentPostType = $stateParams.postType;
    $scope.user = generalParameters.getUser();

    $scope.rtl = true;
    $scope.ltr = false;
    $scope.topRgb = "#ffffff";
    $scope.bottomRgb = "#ffffff";
    $scope.topText = "";
    $scope.imgFileText = 'צרף תמונה';
    $scope.fontOptions = ['arial', 'Aharoni', 'Calibri'];
    $scope.showSuggestedImages = true;
    $scope.suggestedMemes = [];
    $scope.postImg = "";
    $scope.isSiteHeader = true;

    $scope.localMemeImages = [{ url: 'img/memes/84688.jpg' }, { url: 'img/memes/1904595.jpg' }, { url: 'img/memes/3291562.jpg' }, { url: 'img/memes/4669763.jpg' }, { url: 'img/memes/5169527.jpg' },
    { url: 'img/memes/224723908.jpg' }, { url: 'img/memes/232041342.jpg' }, { url: 'img/memes/16.jpg' },
    { url: 'img/memes/19.jpg' }, { url: 'img/memes/22.jpg' }, { url: 'img/memes/49.jpg' }
    , { url: 'img/memes/65.jpg' }, { url: 'img/memes/346.jpg' }, { url: 'img/memes/9061.jpg'}];

    $scope.paletteColors = [{ color: '#ffffff' }, { color: '#000000' }, { color: '#fa0001' }, { color: '#993ca7' }, { color: '#f6ba55' }, { color: '#8ec531' }, { color: '#004a8e' }, { color: '#bcccce'}]
    $scope.showPaletteTop = false;
    $scope.showPaletteBottom = false;

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

    $scope.setColor = function (pos, col) {
        switch (pos) {
            case "top":
                $scope.topRgb = col;
                break;
            case "bottom":
                $scope.bottomRgb = col;
                break;
        }
        $scope.showPaletteTop = false;
        $scope.showPaletteBottom = false;
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
        console.log('img width: ' + img.offsetWidth + ' img height: ' + img.offsetHeight)
        if (img.width >= img.height) {
            return 'widthCon'
        }
        else if (img.width < img.height) {
            return 'heightCon'
        }
    }

    $scope.imageClick = function (index) {
        console.log(index);
        // $scope.suggestedMemes =
        try {
            $scope.postImg = $scope.localMemeImages[index].url;
        }
        catch (e) {
            alert('error on imageClick: ' + e.Message);
        }

        $scope.showSuggestedImages = false;
        //$scope.imageChosen();

        //suggested images by server DONT DELETE
        // console.log(index);
        //$scope.suggestedMemes = PostService.getMemes();
        //$scope.postImg = $scope.domain + $scope.suggestedMemes[index].url;
        //$scope.showSuggestedImages = false;
        //$scope.imageChosen();
    }

    $scope.imageChosen = function () {

    }

    $scope.createMeme = function () {
            PostService.setPreviewMeme({img:$scope.postImg,top:$scope.topText,bottom:$scope.bottomText,rgbTop:$scope.topRgb,rgbBottom:$scope.bottomRgb,font:$scope.font});
                $state.transitionTo('meme-preview');
        /*
        
        html2canvas(document.getElementById('html2canvas'), {
            onrendered: function (canvas) {
                var dataURL = canvas.toDataURL("image/png");
                // document.getElementById('img').src = dataURL;
                PostService.setPreviewMeme(dataURL);
                $state.transitionTo('meme-preview');
            }
        });
        */
    }


    request = {
        startTimestamp: '',
        endTimestamp: '',
        offset: 0,
        limit: 20,
        orderBy: '-timestamp',
        postType: 'memeImages',
        userID: $scope.user._id,
        _parentID: ''
    };


    PostService.getMemesImages(request);
    $scope.memeImages = PostService.getMemes;
    console.log($scope.postData);

//    $scope.$apply();


} ]);

