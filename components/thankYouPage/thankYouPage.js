socialGroupApp.controller('thankYou', ['$rootScope', '$scope', '$state', 'classAjax', 'generalParameters', function ($rootScope, $scope, $state, classAjax, generalParameters) {

    $scope.showThankPage = false;
    $scope.backToApp = function (state) {
        $scope.showThankPage = false;
        generalParameters.setShowLogin(false);
        $state.transitionTo(state);
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
        console.log(args)
    });

} ])