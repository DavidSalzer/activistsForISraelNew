socialGroupApp.controller('facebookBennet', ['$scope', '$stateParams', 'classAjax', 'PostService', 'generalParameters', function ($scope, $stateParams, classAjax, PostService, generalParameters) {
    var facebookWrap = document.getElementById('face-wrap');
    //$scope.FaceItemWidth = "311"; //Math.floor((facebookWrap.offsetWidth) * 90 / 100);
    //$scope.FaceItemHeight = "901"; //Math.floor((screen.height)*102/100);
    $scope.currentChannel = 'https://www.facebook.com/' + 'NaftaliBennett';

    if (window.outerWidth < 900) {
        $scope.FaceItemWidth = "311"; //Math.floor((facebookWrap.offsetWidth) * 90 / 100);
        $scope.FaceItemHeight = "901"; //Math.floor((screen.height)*102/100);
    }
    else {
        $scope.FaceItemWidth = "622";//Math.floor((facebookWrap.offsetWidth) * 90 / 100);
        $scope.FaceItemHeight = "901";//Math.floor((screen.height)*102/100);
    }

    facebookWrap.innerHTML = '<div class="fb-like-box" data-href="' + $scope.currentChannel + '" data-width="' + $scope.FaceItemWidth + '" data-height="' + $scope.FaceItemHeight + '" data-colorscheme="light" data-show-faces="false" data-header="false" data-stream="true" data-show-border="false"></div>';
    // alert('$scope.FaceItemWidth: '+$scope.FaceItemWidth+' $scope.FaceItemHeight: '+$scope.FaceItemHeight)



    try {
        FB.XFBML.parse();
       //  $('#face-wrap iframe').css("width",$scope.FaceItemWidth+"px !important");
       // $('#face-wrap iframe').css("height",$scope.FaceItemHeight+"px !important");
                                          //   alert("height: "+$('#face-wrap iframe').css("height"))
                                         //    alert("width: "+$('#face-wrap iframe').css("width"))
    }
    catch (e) {

    }

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/NaftaliBennett.png",
        featureWhatsUpLogo: "./img/facebook_benet_info.png",
        featureColor: '#004a8e',
        infoHaeder: "עמוד פייסבוק",
        infoMainText: "עמוד הפייסבוק של נפתלי בנט.",
        infoSubText: "עדיין לא הצטרפת לאפליקציה?"
    };


    generalParameters.setFeature($scope.featureDetails);



}
]);


socialGroupApp.controller('facebookPoalim', ['$scope', '$stateParams', 'classAjax', 'PostService', 'generalParameters', function ($scope, $stateParams, classAjax, PostService, generalParameters) {

   var facebookWrap = document.getElementById('face-wrap');
    //$scope.FaceItemWidth = "311"; //Math.floor((facebookWrap.offsetWidth) * 90 / 100);
    //$scope.FaceItemHeight = "901"; //Math.floor((screen.height)*102/100);
    $scope.currentChannel = 'https://www.facebook.com/' + 'actionforisrael';

    if (window.outerWidth < 900) {
        $scope.FaceItemWidth = "311"; //Math.floor((facebookWrap.offsetWidth) * 90 / 100);
        $scope.FaceItemHeight = "901"; //Math.floor((screen.height)*102/100);
    }
    else {
        $scope.FaceItemWidth = "622";//Math.floor((facebookWrap.offsetWidth) * 90 / 100);
        $scope.FaceItemHeight = "901";//Math.floor((screen.height)*102/100);
    }

    facebookWrap.innerHTML = '<div class="fb-like-box" data-href="' + $scope.currentChannel + '" data-width="' + $scope.FaceItemWidth + '" data-height="' + $scope.FaceItemHeight + '" data-colorscheme="light" data-show-faces="false" data-header="false" data-stream="true" data-show-border="false"></div>';

    try {
        FB.XFBML.parse();
    }
    catch (e) {

    }

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/actionforisrael.png",
        featureWhatsUpLogo: "./img/facebook_poalim_info.png",
        featureColor: '#004a8e',
        infoHaeder: "עמוד פייסבוק",
        infoMainText: "עמוד הפייסבוק של פועלים למען ישראל.",
        infoSubText: "עדיין לא הצטרפת לאפליקציה?"
    };


    generalParameters.setFeature($scope.featureDetails);



}
]);

