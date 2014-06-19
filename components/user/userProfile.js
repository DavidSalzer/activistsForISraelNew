socialGroupApp.controller('userProfile', ['$scope', '$state', '$http', 'classAjax', 'generalParameters', function ($scope, $state, $http, classAjax, generalParameters) {
    $scope.d = 'disabled';

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/user.png",
        //infoImg: './img/whatsup.png',
        featureColor: '#AB14E6',
        infoHaeder: "פיצ'ר מה קורה",
        infoMainText: "כתבו על כל נושא שמעניין אתכם. המשתמשים יוכלו לסמן 'אהבתי' או להגיב לדבריכם. מוגבל ל 140 תווים.",
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };

    generalParameters.setFeature($scope.featureDetails);
    $scope.profile = generalParameters.getUser;

    $scope.editName = false;
    $scope.editAddress = false;
    $scope.editEmail = false;
    $scope.editPhone = false;

    $scope.editItem = function (field) {
        console.log("edit: " + field);
        //switch (field) {
        //    case 'name':
        //        $scope.editName = true;
        //        $scope.editAddress = false;
        //        $scope.editEmail = false;
        //        $scope.editPhone = false;
        //        break;
        //    case 'address':
        //        $scope.editName = false;
        //        $scope.editAddress = true;
        //        $scope.editEmail = false;
        //        $scope.editPhone = false;
        //        break;
        //    case 'email':
        //        $scope.editName = false;
        //        $scope.editAddress = false;
        //        $scope.editEmail = true;
        //        $scope.editPhone = false;
        //        break;
        //    case 'phone':
        //        $scope.editName = false;
        //        $scope.editAddress = false;
        //        $scope.editEmail = false;
        //        $scope.editPhone = true;
        //        break;
        //}

    }

    $scope.userLogout = function () {
        $http.get(domain + 'logout/', { withCredentials: true, async: true })
        .success(function (data) {
            console.log(data);
            generalParameters.setUser({ firstName: 'התחבר', userImg: './img/user.png' });
            $state.transitionTo('main-menu');
        });
    }


} ])
