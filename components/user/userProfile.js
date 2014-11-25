socialGroupApp.controller('userProfile', ['$scope', '$state', '$stateParams', '$http', 'classAjax', 'generalParameters', 'PostService', 'imgCrop', function ($scope, $state, $stateParams, $http, classAjax, generalParameters, PostService, imgCrop) {

    //if (generalParameters.getUser().firstName == 'הצטרף לאפליקציה') {//if user not login go back.
    //    window.history.back();
    //}

    $scope.d = 'disabled';
    $scope.datacrop = {};
    $scope.userImg = '';
    $scope.myProfile = true;
    $scope.domain = domain;
    $scope.showSpiner = PostService.getSpiner;
    $scope.showChangePassword = false;

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/profile_small.png",
        //infoImg: './img/whatsup.png',
        featureColor: '#004a8e'
    };

    $scope.featuresList = [

        {
            featureUrl: 'talkback',
            featureName: 'הפורום',
            featureLogo: "./img/whatsup.png",
            featureColor: "talkback",
            postType: "talkback"
        },
        {
            featureUrl: 'meme',
            featureName: 'ממים',
            featureLogo: "./img/meme.png",
            featureColor: "#ffd427",
            postType: "meme"
        },
        {
            featureUrl: 'poll',
            featureName: 'סקרים',
            featureLogo: "./img/poll.png",
            featureColor: "#da4f00",
            postType: "voteToPoll"
        },
        {
            featureUrl: 'event',
            featureName: 'אירועים',
            featureLogo: "./img/calendar.png",
            featureColor: "event",
            postType: "event"
        }
    ];

    $scope.showAuthorImage = false;
    $scope.showAuthorName = false;
    $scope.userLike = false;

    generalParameters.setFeature($scope.featureDetails);
    console.log(generalParameters.getUser());



    if ($stateParams.userId == generalParameters.getUser()._id) {
        $scope.myProfile = true;
    }
    else {
        $scope.myProfile = false;
    }

    if ($scope.myProfile) {
        $scope.profile = generalParameters.getUser;
        $scope.editProfile = angular.copy($scope.profile());
        generalParameters.getUser().registrationDate;
    }
    else {
        $http.get(domain + 'profile/' + $stateParams.userId, { withCredentials: true, async: true })
            .success(function (data) {
                console.log(data);
                $scope.otherUser = data.data.user;

                var parmas = { "activity": { "receivedUser": $stateParams.userId, "type": "userLike"} };

                var json = JSON.stringify(parmas);
                //console.log(json);

                $http.post(domain + 'isActivityFound', json)
			.success(function (data) {
			    console.log(data);
			    if (data.data == null) {
			        $scope.userLike = false;
			        console.log('null');
			    }
			    else if (data.data.type == 'userLike') {
			        $scope.userLike = true;
			        console.log('no null');
			    }

			})
			.error(function (data) {

			    console.log(data);

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
        classAjax.getdata('put', queryString, request).then(function (data) {
            console.log(data);
            generalParameters.setUser(data.data.user);
            $scope.editItem(field);
        })
    }

    $scope.givingScore = function () {
        if (!$scope.userLike) {
            console.log($scope.profile());
            console.log('giving score to ' + $scope.profile()._id + ' ' + $scope.profile().firstName);
            queryString = 'addPostActivity';
            request = {
                activity: {
                    receivedUser: $stateParams.userId,
                    type: 'userLike'
                }
            }
            classAjax.getdata('post', queryString, request)
                .then(function (data) {
                    console.log(data);
                    if (data.status.statusCode == 0) {
                        $scope.userLike = true;
                    }
                })
        }
        else {
            console.log($scope.profile());
            console.log('giving score to ' + $scope.profile()._id + ' ' + $scope.profile().firstName);
            queryString = 'deletePostActivity';
            request = {
                activity: {
                    receivedUser: $stateParams.userId,
                    type: 'userLike'
                }
            }
            var json = JSON.stringify(request);
            console.log(json);
            $http({ url: domain + 'deletePostActivity', method: "delete", headers: { 'Content-Type': 'application/json' }, data: json })

			.success(function (data) {
			    if (data.status.statusCode == 0) {
			        $scope.userLike = false;
			    }
			    console.log(data);
			})
			.error(function (data) {

			    console.log(data);
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
            console.log(data);
            $scope.otherUsersActivity = data.data;
        })
    }

    $scope.getOtherUsersActivity = function () {
        return $scope.otherUsersActivity;
    }

    $scope.textForView = function (activity) {
        console.log(activity);
        if (activity.type == 'userLike') {
            activity.textView = 'העריך אותך';
        }
        else if (activity.post.postType == 'meme') {
            activity.textView = 'אהב את המם שלך';
        }
        else if (activity.post.postType == 'article') {
            activity.textView = activity.post.title;
        }
        else {
            activity.textView = activity.post.content;
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
            $state.transitionTo('user-profile', { userId: activity.user._id });
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
        console.log(args);
        $scope.postId = args.postId;
        $scope.authorId = args.authorId;
        console.log('args: ' + args.postId);
        console.log('args type: ' + args.postType);
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
        console.log(meme)

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
        $http.get(domain + 'logout/', { withCredentials: true, async: true })
        .success(function (data) {
            console.log(data);
            generalParameters.setUser({ firstName: 'הצטרף לאפליקציה', userImg: './img/user.png' });
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
