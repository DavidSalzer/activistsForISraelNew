socialGroupApp.controller('thankYou', ['$rootScope', '$scope', '$state', 'classAjax', 'generalParameters', function ($rootScope, $scope, $state, classAjax, generalParameters) {

    $scope.showThankPage = false;

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $scope.showThankPage = false;
        
    });

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
        //if the thank popup is for signup - show it
        if(args.isSignin == true){
            
        $scope.loginThank = true;
        }
        //else -hide
        else{
             $scope.loginThank = false;
        }
        
        $scope.thankDetails = args.thankDetails
        $scope.showThankPage = args.showThankPage;
        //$scope.$apply();
        generalParameters.setShowLogin($scope.showThankPage);
        
    });

    $scope.openSendConfirm = function () {
        $scope.showThankPage = false;
        $rootScope.$broadcast('showSignInPopup', { showSignIn: true, showSendConfirm: true });
    }

} ])