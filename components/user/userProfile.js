socialGroupApp.controller('userProfile', ['$scope', '$state', '$stateParams', '$http', 'classAjax', 'generalParameters', 'PostService', 'imgCrop', function ($scope, $state, $stateParams, $http, classAjax, generalParameters, PostService, imgCrop) {
    $scope.d = 'disabled';
    $scope.datacrop = {};
    $scope.userImg = '';
    $scope.myProfile = true;
    $scope.domain = domain;
    $scope.showSpiner = PostService.getSpiner;

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/user.png",
        //infoImg: './img/whatsup.png',
        featureColor: '#004a8e'
    };

    $scope.featuresList = [

        {
            featureUrl: 'talkback',
            featureName: 'מה קורה',
            featureLogo: "./img/whatsup.png",
            featureColor: "talkback",
            postType: "talkback"
        },
         {
             featureUrl: 'article',
             featureName: 'מאמרים',
             featureLogo: "./img/article.png",
             featureColor: "article",
             postType: "article"
         },
           {
               featureUrl: 'meme',
               featureName: 'צחוקים',
               featureLogo: "./img/meme.png",
               featureColor: "#ffd427",
               postType: "meme"
           }
          ,
        {
            featureUrl: 'poll',
            featureName: 'משאל עם',
            featureLogo: "./img/poll.png",
            featureColor: "#da4f00",
            postType: "voteToPoll"
        },
    {
        featureUrl: 'event',
        featureName: 'נפגשים',
        featureLogo: "./img/calendar.png",
        featureColor: "event",
        postType: "event"
    }

    ];

    $scope.showAuthorImage = false;
    $scope.showAuthorName = false;

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
    }
    else {
        $http.get(domain + 'profile/' + $stateParams.userId, { withCredentials: true, async: true })
            .success(function (data) {
                console.log(data);
                $scope.profile = function () {
                    if (data.data.img == undefined) {

                    }
                    else if (data.data.img.RelativePosition) {
                        data.data.userImg = domain + data.data.img.url;

                    }
                    else {
                        data.data.userImg = data.data.img.url;

                    }

                    if (data.data.point != undefined) {
                        switch (data.data.point.level) {
                            case '0':
                                data.data.rank = 'חבר';
                                break;
                            case '1':
                                data.data.rank = 'פעיל';
                                break;
                            case '2':
                                data.data.rank = 'משפיע';
                                break;
                            case '3':
                                data.data.rank = 'מאסטר';
                                break;
                            case '4':
                                data.data.rank = 'אח';
                                break;
                        }
                    }
                    return data.data;
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

    $scope.givingScore = function () {
        console.log($scope.profile());
        console.log('giving score to ' + $scope.profile()._id + ' ' + $scope.profile().firstName);
        queryString = 'addPostActivity';
        request = {
            activity: {
                receiveUser: $stateParams.userId,
                type: 'userLike'
            }
        }
        classAjax.getdata('post', queryString, request)
        .then(function (data) {
            console.log(data);
        })
    }

    $scope.otherUsersActivity = [];

    $scope.setOtherUsersActivity = function () {
        queryString = 'getActivitiesByParams?receiveUserId=' + $stateParams.userId + '&orderBy=-timestamp';
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
                    $state.transitionTo('single-meme', { index: activity.post._id });
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
        $state.transitionTo('single-meme', { index: index });
    }

    $scope.like = function ($index) {


        var meme = $scope.posts()[$index];
        console.log(meme)

        if (meme.isLiked == true) {//UNLIKE!

            PostService.unLike(meme._id);
            meme.likesCount--;
            meme.isLiked = false;
            return;
        }
        else {//LIKE!

            PostService.sendLike(meme._id);
            meme.likesCount++;
            meme.isLiked = true;
            return;
        }
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
