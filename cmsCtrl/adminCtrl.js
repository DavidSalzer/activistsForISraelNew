socialGroupApp.controller('adminCtrl', ['$rootScope', '$scope', '$location', '$state', '$http', 'generalParameters', function ($rootScope, $scope, $location, $state, $http, generalParameters) {

    alert('load ctrl');

} ]);


socialGroupApp.directive('managementBar', ['$rootScope', 'generalParameters', '$state', function ($rootScope, generalParameters, $state) {
    return {
        restrict: 'E',
        template: '<div class="cms-footer"><span class="cms-delete"></span><span class="cms-edit"></span></div>',
        replace: 'true',
        link: function (scope, el, attrs) {
            el.on('click', function () {
                //alert('hi hi');
            });
        }

    };
} ])

