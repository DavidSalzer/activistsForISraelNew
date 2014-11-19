socialGroupApp.controller('launcher', ['$stateParams', '$rootScope', '$scope', '$state', '$location', 'generalParameters', function ($stateParams, $rootScope, $scope, $state, $location, generalParameters) {
    $scope.launchMyAppHere = function (urlIn) {
        console.log(urlIn);
        $location.path(urlIn)
    };
} ]);
