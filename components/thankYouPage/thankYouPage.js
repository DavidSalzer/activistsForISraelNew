socialGroupApp.controller('thankYou', ['$rootScope', '$scope', '$state', 'classAjax', 'generalParameters', function ($rootScope, $scope, $state, classAjax, generalParameters) {

    $scope.showThankPage = false;

    $scope.backToApp = function (state) {
        $scope.showThankPage = false;
        generalParameters.setShowLogin(false);
        $state.transitionTo(state, $scope.thankDetails.featureStateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    };

    $scope.$on('showThankPage', function (event, args) {
        $scope.thankDetails = args.thankDetails
        $scope.showThankPage = args.showThankPage;
        //$scope.$apply();
        generalParameters.setShowLogin($scope.showThankPage);
        console.log(args)
    });

} ])