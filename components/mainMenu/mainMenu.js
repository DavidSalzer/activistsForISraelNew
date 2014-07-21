socialGroupApp.controller('mainMenu', ['$scope', '$state', 'classAjax', 'generalParameters', function ($scope, $state, classAjax, generalParameters) {

    generalParameters.setBackIcon(false);

    $scope.features = [
    {
        featureId: 2,
        featureUrl: 'talkback',
        featureName: 'מה קורה',
        featureLogo: './img/whatsup.png',
        featureImg: 'http://cambium.co.il:3003/image/mainImage.jpg',
        title: 'מלחמת ההסברה',
        text: 'בשעה שלוחמי צה"ל עומדים על המשמר בהגנה על העורף של מדינת ישראל, מתנהל מלחמה קשה גם בערוצי השידור וברשתות החברתיות ברחבי העולם. גם אתם יכולים לקחת חלק במאבק הזה ע"י הפצה של קטעי וידאו, תמונות וכתבות שהן "תחמושת" במאבק החשוב והמשמעותי הזה.',
        postId: 5
    },
    {


        featureId: 3,
        featureUrl: 'facebookPoalim',
        featureName: 'פייסבוק פועלים',
        featureLogo: './img/actionforisrael.png',
        featureImg: './img/image/pic5.png',
        title: 'ערוץ הפייסבוק של פועלים למען ישראל',
        text: 'הכנסו לקרוא',
        postId: 5
    },
    {
        featureId: 2,
        featureUrl: 'poll',
        featureName: 'משאל עם',
        featureLogo: './img/poll.png',
        featureImg: './img/image/pic6.png',
        title: 'בואו להצביע בעמוד הסקרים שלנו',
        text: 'עמוד סקרים',
        postId: 5
    },
    {
        featureId: 3,
        featureUrl: 'facebookBennet',
        featureName: 'פייסבוק נפתלי',
        featureLogo: './img/NaftaliBennett.png',
        featureImg: './img/image/pic4.png',
        title: 'ערוץ הפייסבוק של נפתלי בנט',
        text: 'הכנסו לקרוא',
        postId: 5
    },
    {
        featureId: 3,
        featureUrl: 'article',
        featureName: 'מאמרים',
        featureLogo: './img/article.png',
        featureImg: './img/image/pic3.png',
        title: 'מאמרים בנושאים על סדר היום',
        text: 'עמוד מאמרים',
        postId: 5

    }
    ,
    {
        featureId: 1,
        featureUrl: 'channel',
        featureName: 'יוטיוב',
        featureLogo: './img/youtube.png',
        featureImg: './img/image/pic1.png',
        title: 'ערוץ היוטיוב של נפתלי בנט',
        text: 'לצפייה מהנייד',
        postId: 5
    }

    ];

    $scope.goToFeature = function (featureUrl, postId) {
        console.log('featureUrl: ' + featureUrl);
        $state.transitionTo(featureUrl, { postId: postId });
    }

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/poalim-logo.png",
        //infoImg: './img/whatsup.png',
        featureColor: 'gray'

    };

    document.addEventListener("backbutton", function () {
        if (window.location.hash == '#/main-menu') {
            $scope.exitAppPopup();
        } else {
            history.back();
        }
    }, false);

    $scope.exitAppPopup = function () {
        navigator.notification.confirm(
          'האם ברצונך לצאת מהאפליקציה?',
         function (button) {
             if (button == 2) {
                 navigator.app.exitApp();
             }
         },
         'יציאה',
         ['בטל', 'יציאה']
    );
        return false;
    }

    generalParameters.setFeature($scope.featureDetails);
    //$scope.swipeCubeWidth = function () { };
    //window.onload = function () {
    //    $scope.swipeCube = document.getElementsByClassName('menu-item-feature');
    //    console.log($scope.swipeCube);
    //    //var arrFromList = Array.prototype.slice.call($scope.swipeCube);
    //    //console.log(arrFromList);
    //    //console.log($scope.swipeCube.length);
    //    //setTimeout(function () {
    //    //    $scope.swipeCubeWidth = $scope.swipeCube[1];
    //    //    console.log($scope.swipeCubeWidth);
    //    //}, 3000);
    //    $scope.swipeCubeWidth = function () { console.log('jdfklgj'); return $scope.swipeCube[1].offsetWidth };
    //    console.log($scope.swipeCubeWidth());
    //    $scope.$apply();
    //};
    //$scope.swipeCube = document.getElementsByClassName('col-sm-6');
    //console.log($scope.swipeCube);
    //var arrFromList = Array.prototype.slice.call($scope.swipeCube);
    //console.log(arrFromList);
    //console.log($scope.swipeCube.length);
    //setTimeout(function () {
    //    $scope.swipeCubeWidth = $scope.swipeCube[1];
    //    console.log($scope.swipeCubeWidth);
    //}, 3000);
    //$scope.swipeCubeWidth = $scope.swipeCube[1];
    //console.log($scope.swipeCubeWidth);


    //$scope.$on('scrollToEnd', function (ngRepeatFinishedEvent) {
    //    document.getElementById("features-swipe-inner").scrollLeft = ($scope.features.length - 1) * 145;
    //});

} ])


