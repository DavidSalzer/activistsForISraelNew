socialGroupApp.controller('adminCtrl', ['$rootScope', '$scope', '$location', '$state', '$http', 'classAjax', 'generalParameters', function ($rootScope, $scope, $location, $state, $http, classAjax, generalParameters) {

    $scope.uploadPoll = function (request) {
        queryString = 'post';
        classAjax.getData('post', queryString, request).then(function (data) {
            console.log(data);
        })
    }

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

/**** UI Router ****/
socialGroupApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/main-menu");

    $stateProvider
		.state("upload-poll", {
		    url: "/upload-poll/:postType/:postId",
		    views: {
		        "main": {
		            templateUrl: "./cmsCtrl/uploadPoll.html",
		            controller: "uploadPoll"
		        }
		    }
		})

})

socialGroupApp.controller('uploadPoll', ['$scope', '$rootScope', '$stateParams', 'PostService', 'generalParameters', '$state', '$window', '$filter', function ($scope, $rootScope, $stateParams, PostService, generalParameters, $state, $window, $filter) {

    /*init variables*/
    generalParameters.setBackIcon(true);

    $scope.imageMax = 1;
    $scope.toLargImage = false;
    $scope.imgFileText = 'צרף תמונה'
    $scope.isSiteHeader = true;
    $scope.timeDisplay = {};
    var colors = { 'article': '#006dbe', 'talkback': '#993ca7', 'poll': '#da4f00', 'event': '#004a8e' };
    $scope.isPostPending = false;

    $scope.parentPostType = $stateParams.postType;
    $scope.postType = $stateParams.postType;
    $scope.postId = $stateParams.postId;
    $scope.user = generalParameters.getUser();

    $scope.postData = {

        user: { _id: $scope.user._id },
        post: { _parentID: null, attachment: "", content: "" }

    };

    $scope.featureColor = colors[$scope.postType];



    $scope.headerText = 'העלאת סקר';

    $scope.pollType = '';

    $scope.postData.post.postType = 'poll';
    $scope.postData.post.title = '';
    $scope.postData.post.poll = {};

    $scope.voteOptions = [{ answer: '' }, { answer: ''}];
    $scope.postData.post.poll.options = $scope.voteOptions;
    $scope.postData.post.poll.minSelect = 1;
    $scope.postData.post.poll.maxSelect = 1;
    $scope.postData.post.poll.status = 'active';
    $scope.postData.post.poll.pollType = 'ColumnChart';

    $scope.thankDetails = {

        featureColor: colors[$scope.postType],
        thankText: 'הסקר עלה',
        btnText: 'חזרה לעמוד הסקרים',
        headerText: 'הסקר שלי',
        featureState: 'poll'

    };


    $scope.cleanDetails = function () {//event


        $scope.postData.post.title = '';
        $scope.postData.post.content = '';
        $scope.postData.post.poll = {};
        $scope.timeDisplay.date = '';
        $scope.timeDisplay.time = '';
        $scope.postData.post.location = '';
        $scope.postData.post.email = "";
        $scope.postData.post.phone = "";
        $scope.imgFileText = 'צרף תמונה';
        $scope.postImg = "";

    };

    $scope.addOption = function () {
        $scope.voteOptions.push({ answer: '' });
    }

    $scope.deleteOption = function (index) {
        console.log(index);
        if ($scope.voteOptions.length > 2) {
            console.log($scope.voteOptions);
            $scope.voteOptions.splice(index, 1);
            console.log($scope.voteOptions);
        }
    }

    $scope.sendPost = function () {
        if (!$scope.isPostPending) {

            if (!$scope.validateInputs()) { return; }

            switch ($scope.pollType) {
                case 'עמודות':
                    $scope.postData.post.poll.pollType = 'ColumnChart';
                    break;
                case 'עוגה':
                    $scope.postData.post.poll.pollType = 'PieChart';
                    break;
            }

            $scope.isPostPending = true;
            PostService.sendPost($scope.postData, $scope.fileObj, $scope.imgObj)

		.then(function (data) {

		    console.log(data);
		    generalParameters.setBackIcon(false);

		    if (data.status.statusCode == 0) {
		        //others - show thank page
		        $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
		        $scope.isPostPending = false;
		    }
		});
        }
    };

    $scope.editPost = function () {

        if (!$scope.validateInputs()) { return; }

        $scope.convertDate();

        PostService.updatePost($scope.postData, $scope.fileObj, $scope.imgObj)

		.then(function (data) {

		    console.log(data);
		    generalParameters.setBackIcon(false);

		    $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
		});

    };



    $scope.validateInputs = function () {

        var dateTest = new RegExp("^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]([0]?[1-9]|[1][0-2])[/]([0-9]{4}|[0-9]{2})$");
        var timeTest = new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3])[:][0-5][0-9]$");
        $scope.showTitleError = ($scope.postData.post.title == undefined || $scope.postData.post.title == '') && ($scope.postType == 'event' || $scope.postType == 'article');
        $scope.showDDMMYYError = ($scope.timeDisplay.date == undefined || $scope.timeDisplay.date == '' ||
		 dateTest.test($scope.timeDisplay.date) == false) && $scope.postType == 'event';
        $scope.showHHMMError = ($scope.timeDisplay.time == undefined || $scope.timeDisplay.time == '' || timeTest.test($scope.timeDisplay.time) == false) && $scope.postType == 'event';
        $scope.showLocationError = ($scope.postData.post.location == undefined || $scope.postData.post.location == '') && $scope.postType == 'event';

        return (!($scope.showTitleError || $scope.showDDMMYYError || $scope.showHHMMError || $scope.showLocationError || false));

    }


} ]);


