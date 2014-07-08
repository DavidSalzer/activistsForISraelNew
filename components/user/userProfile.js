socialGroupApp.controller('userProfile', ['$scope', '$state', '$http', 'classAjax', 'generalParameters', 'PostService', 'imgCrop', function ($scope, $state, $http, classAjax, generalParameters, PostService, imgCrop) {
    $scope.d = 'disabled';
    $scope.datacrop = {};
    $scope.userImg = '';

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/user.png",
        //infoImg: './img/whatsup.png',
        featureColor: '#AB14E6'
    };

    $scope.featuresList = [

        {
            featureUrl: 'talkback',
            featureName: 'מה קורה',
            featureLogo: "./img/whatsup.png",
            featureColor: "talkback",
            recentActivity: []
        },
         {
             featureUrl: 'article',
             featureName: 'מאמרים',
             featureLogo: "./img/article.png",
             featureColor: "article",
             recentActivity: []
         },
    //       {
    //          featureUrl: 'meme',
    //          featureName: 'ממים',
    //          featureLogo: "./img/meme.png",
    //          featureColor: "#ffd427"
    //      }
    //      ,
        {
        featureUrl: 'poll',
        featureName: 'משאל עם',
        featureLogo: "./img/poll.png",
        featureColor: "poll"
    }
    //{
    //    featureUrl: 'event',
    //    featureName: 'נפגשים',
    //    featureLogo: "./img/calendar.png",
    //    featureColor: "event"
    //}

    ];

    generalParameters.setFeature($scope.featureDetails);
    $scope.profile = generalParameters.getUser;
    $scope.myProfile = true;

    $scope.editProfile = angular.copy($scope.profile());


    $scope.editName = false;
    $scope.editAddress = false;
    $scope.editEmail = false;
    $scope.editPhone = false;
    $scope.editGender = false;

    $scope.editItem = function (field) {
        console.log("edit: " + field);
        $scope.editProfile = angular.copy($scope.profile());
        console.log($scope.editProfile);
        switch (field) {
            case 'name':
                if ($scope.editName) {
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
                if ($scope.editAddress) {
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
                if ($scope.editEmail) {
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
                if ($scope.editPhone) {
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
                if ($scope.editGender) {
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

    $scope.updateUserDetails = function (field) {
        switch (field) {
            case 'name':
                request = { firstName: $scope.editProfile.firstName, lastName: $scope.editProfile.lastName };
                break;
            case 'address':
                request = { address: $scope.editProfile.address };
                break;
            case 'email':

            case 'phone':
                request = { phone: $scope.editProfile.phone };
                break;
            case 'gender':
                console.log($scope.editProfile.gender);
                if ($scope.editProfile.gender == 'זכר') {
                    gender = 'male';
                }
                else {
                    gender = 'female';
                }
                request = { gender: gender };
                break;
        }

        console.log(request);
        queryString = 'profile/update';
        classAjax.getdata('post', queryString, request).then(function (data) {
            console.log(data);
            generalParameters.setUser(data.data);
            $scope.editItem(field);
        })
    }

    $scope.userLogout = function () {
        $http.get(domain + 'logout/', { withCredentials: true, async: true })
        .success(function (data) {
            console.log(data);
            generalParameters.setUser({ firstName: 'התחבר', userImg: './img/user.png' });
            if (document.location.protocol != 'http:' && document.location.protocol != 'https:') {
                window.cookies.clear(function () {
                    //alert('Cookies cleared!');
                });
            }
            $state.transitionTo('main-menu');
        });
    }


    //send base64 string to server to be converted to jpg, then save image to current user details. 
    $scope.uploadBase64Image = function () {
        console.log($scope.userImg);
        // $scope.json = JSON.stringify($scope.userImg);
        var userId = generalParameters.getUser();
        console.log(userId._id);
        $http.post(domain + 'Base64FileUpload?ref=user&_id=' + userId._id,
            { "base64": $scope.userImg })
            .success(function (data) {
                console.log('base64');
                console.log(data);
                generalParameters.setUser(data.data);
                //generalParameters.setUser(data.data.user);
            });

    }

    document.getElementById('userImg1').addEventListener('change', function (e) {
        $scope.fileEdit(e);
    }, false);

    $scope.fileEdit = function (e) {
        //file reader to show the img
        var file = e.target.files[0];

        //file reader
        var reader = new FileReader();

        if (file.type.match('image/*')) {
            var reader = new FileReader();
            reader.onload = (function () {
                return function (e) {
                    //console.log(e);
                    console.log(e.target.result); //base64 img
                    $scope.userimg = e.target.result;
                    $scope.editImg = true;
                    $scope.$apply();
                    $scope.croping();
                };
            })(file);
            reader.readAsDataURL(file);
        }
    }


    //user image crop
    $scope.croping = function () {
        imgCrop.obj = {};
        $('#cropDiv1 img').on('load', function () {
            imgCrop.crop('c1', 'button_ok1', 'cropDiv1'); //canvasid  ,btn-approve, container Id
        });
    }

    $scope.$on('editDone', function (e, d) {
        console.log(d);
        $scope.userImg = d.data;
        if ($scope.userImg != '') {
            $scope.uploadBase64Image();
        }
        $scope.editImg = false;
        $scope.$apply();
        $scope.userimg = '';
        imgCrop.destroy();
    });

    $scope.editCancel = function () {
        $scope.editImg = false;
        $scope.userimg = '';
        imgCrop.destroy();
    }

} ])
