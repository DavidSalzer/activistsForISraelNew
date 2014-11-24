socialGroupApp.controller('userProfile', ['$scope', 'classAjax', 'generalParameters', function ($scope, classAjax, generalParameters) {

    //$scope.profile = {
    //    userFirstName: 'ישראל',
    //    userLastName: 'ישראלי',
    //    userAddress: 'באר שבע',
    //    userMail: 'israel@gmail.com',
    //    userPhone: '0541123345'
    //};

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/user.png",
        featureColor: null
    };

    $scope.edit = false;
    $scope.editItem = function () {
        console.log("edit");
    }

    generalParameters.setFeature($scope.featureDetails);
    $scope.profile = generalParameters.getUser();

} ])
