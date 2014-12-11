socialGroupApp.controller('userProfile', ['$rootScope', '$scope', '$state', '$stateParams', '$http', 'classAjax', 'generalParameters', 'PostService', 'filePicker', '$timeout', function ($rootScope, $scope, $state, $stateParams, $http, classAjax, generalParameters, PostService, filePicker, $timeout) {

    /*delay dom building until transition is done*/
    $scope.buildPage = false;
    $rootScope.$broadcast('showLoader', { showLoader: true });
    $timeout(function () { $scope.buildPage = true; }, 0);

    $scope.d = 'disabled';
    $scope.datacrop = {};
    $scope.userImg = '';
    $scope.myProfile = true;
    $scope.domain = domain;
    $scope.showSpiner = PostService.getSpiner;
    $scope.showChangePassword = false;
    $scope.movePage = false;

    $scope.featuresList = [

        {
            featureUrl: 'talkback',
            featureName: 'הפורום',
            featureLogo: "./img/whatsup.png",
            featureColor: "talkback",
            postType: "talkback"
        },
         {
             featureUrl: 'event',
             featureName: 'אירועים',
             featureLogo: "./img/calendar.png",
             featureColor: "event",
             postType: "event"
         },
    //{
    //    featureUrl: 'article',
    //    featureName: 'מאמרים',
    //    featureLogo: "./img/article.png",
    //    featureColor: "article",
    //    postType: "article"
    //},
           {
           featureUrl: 'meme',
           featureName: 'ממים',
           featureLogo: "./img/meme.png",
           featureColor: "#ffd427",
           postType: "meme"
       }
          ,
        {
            featureUrl: 'poll',
            featureName: 'סקרים',
            featureLogo: "./img/poll.png",
            featureColor: "#da4f00",
            postType: "voteToPoll"
        }


    ];

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/profile_small.png",
        featureWhatsUpLogo: "./img/profile_info.png",
        featureColor: '#818181',
        infoHaeder: "פרופיל משתמש",
        infoMainText: 'עמוד פרטי המשתמש בו תוכל לראות את פרטיו, פעולותיו האחרונות ולפנק בניקוד.<br>בעמוד המשתמש שלך תוכל לערוך את פרטיך.',
        infoSubText: "עוד לא הצטרפת לאחליקציה?"
    };

    generalParameters.setFeature($scope.featureDetails);
    generalParameters.setBackIcon(false);
    $scope.showAuthorImage = false;
    $scope.showAuthorName = false;
    $scope.userLike = null;

    //generalParameters.setFeature($scope.featureDetails);
    if ($stateParams.userId == generalParameters.getUser()._id) {
        $scope.myProfile = true;
    }
    else {
        $scope.myProfile = false;
    }

    if ($scope.myProfile) {
        $scope.profile = generalParameters.getUser;
        $scope.editProfile = angular.copy($scope.profile());
    }
    else {
        $http.get(domain + 'profile/' + $stateParams.userId, { withCredentials: true, async: true })
            .success(function (data) {

                $scope.otherUser = data.data.user;

                var parmas = { "activity": { "receivedUser": $stateParams.userId, "type": "userLike"} };

                var json = JSON.stringify(parmas);


                $http.post(domain + 'isActivityFound', json)
			.success(function (data) {

			    if (data.data == null) {
			        $scope.userLike = false;

			    }
			    else if (data.data.type == 'userLike') {
			        $scope.userLike = true;

			    }

			})
			.error(function (data) {

			});

                $scope.profile = function () {
                    if ($scope.otherUser.img == undefined) {

                    }
                    else if ($scope.otherUser.img.RelativePosition) {
                        $scope.otherUser.userImg = domain + $scope.otherUser.img.url;

                    }
                    else {
                        data.data.user.userImg = data.data.user.img.url;

                    }

                    if ($scope.otherUser.point != undefined) {
                        switch ($scope.otherUser.point.level) {
                            case '0':
                                $scope.otherUser.rank = 'חבר';
                                break;
                            case '1':
                                $scope.otherUser.rank = 'פעיל';
                                break;
                            case '2':
                                $scope.otherUser.rank = 'משפיע';
                                break;
                            case '3':
                                $scope.otherUser.rank = 'מאסטר';
                                break;
                            case '4':
                                $scope.otherUser.rank = 'אח';
                                break;
                        }
                    }

                    d = new Date();
                    d1 = new Date($scope.otherUser.registrationDate);
                    $scope.otherUser.registrationTime = parseInt((d.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
                    return $scope.otherUser;
                }

                if ($stateParams.userId == generalParameters.getUser()._id) {
                    $scope.myProfile = true;
                    $scope.profile = generalParameters.getUser;
                    $scope.editProfile = angular.copy($scope.profile());
                    //$scope.$apply();
                }
            })
    }

    //$scope.editProfile = angular.copy($scope.profile());


    $scope.editName = false;
    $scope.editAddress = false;
    $scope.editEmail = false;
    $scope.editPhone = false;
    $scope.editGender = false;

    $scope.editItem = function (field) {

        $scope.editProfile = angular.copy($scope.profile());

        switch (field) {
            case 'name':
                if ($scope.editName) {
                    $scope.editName = false;
                }
                else {
                    $scope.editName = true;
                    document.getElementById('uio').focus();
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
            case 'password':
                $scope.showChangePassword = true;
                generalParameters.setShowLogin(true);
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

                if ($scope.editProfile.gender == 'זכר') {
                    gender = 'male';
                }
                else {
                    gender = 'female';
                }
                request = { gender: gender };
                break;
        }


        queryString = 'profile/update';
        $rootScope.$broadcast('showLoader', { showLoader: true });
        classAjax.getdata('put', queryString, request).then(function (data) {
            if (data.status && data.status.statusCode == 0) {
                generalParameters.setUser(data.data.user);
            }
            $scope.editItem(field);
            $rootScope.$broadcast('showLoader', { showLoader: false });
        })
    }

    $scope.givingScore = function () {

        if (generalParameters.getUser().firstName == 'הצטרף לאפליקציה') {
            $rootScope.$broadcast('showInfoPopup', { showInfo: true });
            return;
        }

        if (!$scope.userLike) {
            $scope.userLike = true;
            //$scope.profileCount = $scope.profile().point.count;
            //$scope.profileCount++;
            queryString = 'addPostActivity';
            request = {
                activity: {
                    receivedUser: $stateParams.userId,
                    type: 'userLike'
                }
            }
            classAjax.getdata('post', queryString, request)
                .then(function (data) {

                    /*if (data.status.statusCode == 0) {
                    $scope.userLike = true; 
                    } */
                })
        }
        else {
            $scope.userLike = false;
            queryString = 'deletePostActivity';
            request = {
                activity: {
                    receivedUser: $stateParams.userId,
                    type: 'userLike'
                }
            }
            var json = JSON.stringify(request);

            $http({ url: domain + 'deletePostActivity', method: "delete", headers: { 'Content-Type': 'application/json' }, data: json })

			.success(function (data) {
			    /* if (data.status.statusCode == 0) {
			    $scope.userLike = false;
			    } */

			})
			.error(function (data) {


			});

            //classAjax.getdata('delete', queryString, request)
            //    .then(function (data) {
            //        console.log(data);
            //        $scope.userLike = false;
            //    })
        }
    }

    $scope.otherUsersActivity = [];

    $scope.setOtherUsersActivity = function () {
        queryString = 'getActivitiesByParams?receivedUser=' + $stateParams.userId + '&orderBy=-timestamp';
        classAjax.getdata('get', queryString, {}).then(function (data) {

            $scope.otherUsersActivity = data.data;
        })
    }

    $scope.getOtherUsersActivity = function () {
        return $scope.otherUsersActivity;
    }

    $scope.textForView = function (activity) {

        if (activity.type == 'userLike') {
            activity.textView = 'פינק בניקוד את ' + $scope.profile().firstName + ' ' + $scope.profile().lastName;
        }
        else if (activity.post.postType == 'meme') {
            activity.textView = 'אוהב את המם של ' + $scope.profile().firstName + ' ' + $scope.profile().lastName;
        }
        else if (activity.post.postType == 'article') {
            activity.textView = activity.post.title;
        }
        else {
            if (activity.type == 'like') {
                activity.textView = 'אוהב את הפוסט: ' + activity.post.content;
            }
            else {
                activity.textView = 'הגיב על הפוסט: ' + activity.post.content;
            }
        }
    }

    $scope.goToSinglePage = function (activity, isPost) {
        if (isPost) {
            switch (activity.post.postType) {
                case "article":
                    $state.transitionTo('single-article', { postId: activity.post._id });
                    break;
                //case "author":                                  
                //    $state.transitionTo('author-page', { authorId: $scope.authorId, postType: 'article' });                                  
                //    break;                                  
                case "talkback":
                    $state.transitionTo('comments', { postId: activity.post._id });
                    break;
                case "meme":
                    $state.transitionTo('single-meme', { postId: activity.post._id });
                    break;
                //case "event":                                  
                //    $state.transitionTo('single-event', { postId: args.postId });                                  
                //    break;                                  
                //case "voteToPoll":                                  
                //    $state.transitionTo('poll-view', { postId: args.postId });                                  
                //    break;                                  
            }
        }
        else {
            if (activity.user._id != $stateParams.userId) {
                $scope.movePage = true;
            }
            //    setTimeout(function () {
            //    $scope.$apply(function () {
            //        $state.transitionTo('user-profile', { userId: activity.user._id });
            //    })
            //}
            //, 1);
            $timeout(function () {
                //$scope.$apply(function () {
                $state.transitionTo('user-profile', { userId: activity.user._id });
                //})
            }, 40);
        }
    }

    $scope.setOtherUsersActivity();


    //$scope.otherUserCube = document.getElementsByClassName('user-profile-other-user-activity');
    //console.log($scope.otherUserCube[0].offsetWidth);

    $scope.currentPost = 'none';
    $scope.posts = PostService.getPosts;

    $scope.openRecentActivity = function (postType) {
        if ($scope.currentPost == postType) {
            $scope.currentPost = 'none';
        }
        else {
            PostService.cleanPosts();
            request = {
                startTimestamp: '',
                endTimestamp: '',
                offset: 0,
                limit: 5,
                orderBy: '-timestamp',
                postType: postType,
                authorId: $stateParams.userId
            };
            PostService.getPostsByAuthor(request);
            $scope.currentPost = postType;
        }
    }

    $scope.$on('postClicked', function (event, args) {

        $scope.postId = args.postId;
        $scope.authorId = args.authorId;
        switch (args.postType) {
            case "article":
                $state.transitionTo('single-article', { postId: $scope.postId });
                break;
            case "author":
                $state.transitionTo('author-page', { authorId: $scope.authorId, postType: 'article' });
                break;
            case "talkback":
                $state.transitionTo('comments', { postId: $scope.postId });
                break;
            case "event":
                $state.transitionTo('single-event', { postId: args.postId });
                break;
            case "voteToPoll":
                $state.transitionTo('poll-view', { postId: args.postId });
                break;
        }

    });

    $scope.memeClick = function (index) {
        $state.transitionTo('single-meme', { postId: index });
    }

    $scope.like = function ($index) {


        var meme = $scope.posts()[$index];


        if (meme.isLiked == true) {//UNLIKE!

            PostService.unLike(meme._id, meme);
            //meme.likesCount--;
            //meme.isLiked = false;
            return;
        }
        else {//LIKE!

            PostService.sendLike(meme._id, meme);
            //meme.likesCount++;
            //meme.isLiked = true;
            return;
        }
    }

    $scope.userLogout = function () {
        $rootScope.$broadcast('showLoader', { showLoader: true });
        $http.get(domain + 'logout/', { withCredentials: true, async: true })
        .success(function (data) {

            generalParameters.setUser({ firstName: 'הצטרף לאפליקציה', userImg: './img/user.png' });
            if (document.location.protocol != 'http:' && document.location.protocol != 'https:') {
                window.cookies.clear(function () {
                    //alert('Cookies cleared!');
                });
            }
            $rootScope.$broadcast('showLoader', { showLoader: false });
            $state.transitionTo('main-menu');
        });
    }


    //send base64 string to server to be converted to jpg, then save image to current user details. 
    $scope.uploadBase64Image = function () {

        // $scope.json = JSON.stringify($scope.userImg);
        var userId = generalParameters.getUser();

        $http.post(domain + 'Base64FileUpload?ref=user&_id=' + userId._id,
            { "base64": $scope.userImg })
            .success(function (data) {

                generalParameters.setUser(data.data.user);
                //generalParameters.setUser(data.data.user);
            });

    }

    //document.getElementById('userImg1').addEventListener('change', function (e) {
    //    $scope.fileEdit(e);
    //}, false);

    //$scope.fileEdit = function (e) {
    //    //file reader to show the img
    //    var file = e.target.files[0];

    //    //file reader
    //    var reader = new FileReader();

    //    if (file.type.match('image/*')) {
    //        var reader = new FileReader();
    //        reader.onload = (function () {
    //            return function (e) {

    //                $scope.userimg = e.target.result;
    //                $scope.editImg = true;
    //                $scope.$apply();
    //                $scope.croping();
    //            };
    //        })(file);
    //        reader.readAsDataURL(file);
    //    }
    //}

    // can be a button click or anything else
    $scope.takePicture = function () {
        if (!$scope.myProfile) { return; }
        filePicker.getPicture()
        .then(function (imageData) {
            // imageData is your base64-encoded image
            // update some ng-src directive
            //$scope.imgFileText = imageData.fileText;
            //$scope.userimg = imageData.imgData; //"data:image/jpeg;base64," +
            //$scope.myCroppedImage = '';
            //$scope.editImg = true;
            //$scope.$apply();

            $timeout(function () {
                $scope.imgFileText = imageData.fileText;
                $scope.userimg = imageData.imgData; //"data:image/jpeg;base64," +
                $scope.myCroppedImage = '';
                $scope.editImg = true;
            }, 0);
        });
    };


    //user image crop
    //$scope.croping = function () {
    //    imgCrop.obj = {};
    //    $('#cropDiv1 img').on('load', function () {
    //        imgCrop.crop('c1', 'button_ok1', 'cropDiv1'); //canvasid  ,btn-approve, container Id
    //    });
    //}

    //$scope.$on('editDone', function (e, d) {

    //    $scope.userImg = d.data;
    //    if ($scope.userImg != '') {
    //        $scope.uploadBase64Image();
    //    }
    //    $scope.editImg = false;
    //    $scope.$apply();
    //    $scope.userimg = '';
    //    imgCrop.destroy();
    //});

    $scope.editCancel = function () {
        $scope.editImg = false;
        $scope.userimg = '';
        //imgCrop.destroy();
    }

    $scope.editDone = function () {
        $scope.userImg = $scope.myCroppedImage;
        if ($scope.userImg != '') {
            /*html2canvas(document.getElementById('html2canvasprofile'), {
                onrendered: function (canvas) {
                    $scope.userImg = canvas.toDataURL("image/png");
                }
            });*/
            $scope.uploadBase64Image();
        }
        $scope.editImg = false;

        $scope.userimg = '';
    }



    //change password popup
    $scope.sendNewPassword = function () {
        $scope.showOldPassError = $scope.oldPass == undefined || $scope.oldPass == '';
        $scope.showPassError = $scope.newPass == undefined || $scope.newPass.length < 6;
        $scope.showPassAuthenticationError = $scope.newPass != $scope.passAuthentication;

        if ($scope.showOldPassError || $scope.showPassError || $scope.showPassAuthenticationError) {
            return;
        }

        $scope.showOldPassError = false;
        $scope.showPassError = false;
        $scope.showPassAuthenticationError = false;

        $scope.newPasswordDetails = {

            oldPassword: $scope.oldPass,
            newPassword: $scope.newPass

        }


        $scope.json = JSON.stringify($scope.newPasswordDetails);


        $rootScope.$broadcast('showLoader', { showLoader: true });
        $http.put(domain + 'changePassword', $scope.json)
        .success(function (data) {

            if (data.status.statusCode == 0) {
                $scope.showLogin = false;
                generalParameters.setShowLogin(false);
                $scope.oldPass = '';
                $scope.newPass = '';
                $scope.passAuthentication = '';
                $scope.passErrorInServer = false;
                $scope.showChangePassword = false;
            }
            else if (data.status.statusCode == 3) {
                $scope.passErrorInServer = true;
                $scope.passErrorMessage = errorMessages.wrongPassword;
            }
            else {
                $scope.passErrorInServer = true;
                $scope.passErrorMessage = errorMessages.generalError;
            }
            $rootScope.$broadcast('showLoader', { showLoader: false });
        })
        .error(function (data) {
            $scope.passErrorInServer = true;
            $scope.passErrorMessage = errorMessages.generalError;
            $rootScope.$broadcast('showLoader', { showLoader: false });
        });
    }

    $scope.kill = function () {
        $rootScope.$broadcast('showLoader', { showLoader: false });
        angular.element(event.target).remove();
    }

    $scope.closeChangePassword = function () {
        $scope.showChangePassword = !$scope.showChangePassword;
        generalParameters.setShowLogin(false);
    }
} ])
