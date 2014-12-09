socialGroupApp.controller('singleMeme', ['$scope', '$rootScope', '$stateParams', 'PostService', 'generalParameters', '$state', '$timeout', function ($scope, $rootScope, $stateParams, PostService, generalParameters, $state, $timeout) {

    /*delay dom building until transition is done*/
    $scope.buildPage = false;
    $timeout(function () {  $scope.buildPage = true; }, 0);

    $scope.wait = true;
    $scope.kill = function (event) {
        $scope.wait = false;
        //angular.element(event.target).remove();
    }

    $scope.domain = domain + 'medium/';
    /*init variables*/
    generalParameters.setBackIcon(true);
    $scope.user = generalParameters.getUser();
    $scope.memeUrl;


    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/sidebar-meme-icon.png",
        featureWhatsUpLogo: "./img/meme_info.png",
        featureColor: '#ffd427',
        infoHaeder: "פיצ'ר הממים",
        infoMainText: 'הכינו "ממים" - גלויות מצחיקות- בעזרת מכשיר הכנת הממים שלנו- ושתפו עם החברים. יש לשמור על זכויות יוצרים',
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };
    generalParameters.setFeature($scope.featureDetails);

    //PostService.getMemesImages(request);
    PostService.getPostById($stateParams.postId);
    $scope.post = PostService.getSinglePost;
    $scope.memeUrl = $scope.post.img;
    //  console.log($stateParams.index);
    // $scope.memeUrl = $scope.memeImages[$stateParams.index].url;

    $scope.like = function ($event, $index) {

        if (generalParameters.getUser().firstName == 'הצטרף לאפליקציה') {

            $rootScope.$broadcast('showInfoPopup', { showInfo: true }); return;
        }
        else {
            var meme = $scope.post();
            meme.isLiked = !meme.isLiked;

            if (meme.isLiked == true) {//LIKE!

                meme.likesCount++;
                PostService.sendLike(meme._id, meme); return;

            }
            else {//UNLIKE!
                meme.likesCount--;
                //$scope.$apply();
                PostService.unLike(meme._id, meme); return;


            }
        }
    }
} ]);

