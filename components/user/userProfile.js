socialGroupApp.controller('userProfile', ['$scope', '$state', '$http', 'classAjax', 'generalParameters', 'PostService', function ($scope, $state, $http, classAjax, generalParameters, PostService) {
    $scope.d = 'disabled';

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/user.png",
        //infoImg: './img/whatsup.png',
        featureColor: '#AB14E6'
       
    };

    generalParameters.setFeature($scope.featureDetails);
    $scope.profile = generalParameters.getUser;

    $scope.editName = false;
    $scope.editAddress = false;
    $scope.editEmail = false;
    $scope.editPhone = false;
    $scope.editGender = false;

    $scope.editItem = function (field) {
        console.log("edit: " + field);
        switch (field) {
            case 'name':
                if($scope.editName){
                    $scope.editName = false;
                }
                else {
                    $scope.editName = true;
                }
                $scope.editAddress = false;
                $scope.editEmail = false;
                $scope.editPhone = false;
                $scope.editGender = false;
                break;
            case 'address':
                if($scope.editAddress){
                    $scope.editAddress = false;
                }
                else {
                    $scope.editAddress = true;
                }
                $scope.editName = false;
                $scope.editEmail = false;
                $scope.editPhone = false;
                $scope.editGender = false;
                break;
            case 'email':
                if($scope.editEmail){
                    $scope.editEmail = false;
                }
                else {
                    $scope.editEmail = true;
                }
                $scope.editName = false;
                $scope.editAddress = false;
                $scope.editPhone = false;
                $scope.editGender = false;
                break;
            case 'phone':
                if($scope.editPhone){
                    $scope.editPhone = false;
                }
                else {
                    $scope.editPhone = true;
                }
                $scope.editName = false;
                $scope.editAddress = false;
                $scope.editEmail = false;
                $scope.editGender = false;
                break;
            case 'gender':
                if($scope.editGender){
                    $scope.editGender = false;
                }
                else {
                    $scope.editGender = true;
                }
                $scope.editName = false;
                $scope.editAddress = false;
                $scope.editEmail = false;
                $scope.editPhone = false;
                break;
        }

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
