socialGroupApp.controller('adminCtrl', ['$rootScope', '$scope', '$location', '$state', '$http', 'classAjax', 'generalParameters', function ($rootScope, $scope, $location, $state, $http, classAjax, generalParameters) {

    alert('load ctrl');

} ]);


socialGroupApp.directive('deletePost', ['$rootScope', 'generalParameters', '$state', 'classAjax', function ($rootScope, generalParameters, $state, classAjax) {
    return {
        restrict: 'E',
        template: '<div class="cms-delete" data-ng-click="$event.stopPropagation();"></div>',
        replace: 'true',
        link: function (scope, el, attrs) {
            el.on('click', function () {
                console.log(scope.post);
                var confirmDelete = confirm('האם ברצונך למחוק אובייקט זה?');
                if (confirmDelete) {
                    queryString = 'post/' + scope.post._id;
                    console.log(queryString);
                    classAjax.getdata('delete', queryString).then(function (data) {
                        console.log(data);
                        if (data.status.statusCode == 0) {
                            location.reload();
                            
                        }
                    })
                }
            });
        }

    };
} ])

