socialGroupApp.controller('errorPopup', ['$rootScope', '$scope', '$state', 'classAjax', 'generalParameters', function ($rootScope, $scope, $state, classAjax, generalParameters) {

    $scope.showErrorPopup = false;

    $scope.closeErrorPopup = function () {
        $scope.showErrorPopup = false;
        generalParameters.setShowLogin(false);
    }

    $scope.$on('showErrorPopup', function (event, args) {
        $scope.showErrorPopup = args.showErrorPopup;
        $scope.errorMsg = args.errorMsg;
        generalParameters.setShowLogin($scope.showErrorPopup);
        console.log(args)
    });

} ])