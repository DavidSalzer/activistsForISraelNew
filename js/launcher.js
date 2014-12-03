socialGroupApp.controller('launcher', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.launchMyAppHere = function (urlIn) {
        
        
        if (urlIn == 'login') {
            $rootScope.$broadcast('showLoginPopup', { showLogin: true });
        }
        else {
            
            window.location.replace(window.location.pathname + '#/' + urlIn);
            
        }
    };
} ]);
