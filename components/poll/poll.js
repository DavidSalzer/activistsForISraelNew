socialGroupApp.controller('poll', ['$rootScope', '$scope', '$http', '$state', 'PostService', 'generalParameters', function ($rootScope, $scope, $http, $state, PostService, generalParameters) {


    $scope.currentPoll = null;
    $scope.domain = domain + 'small/';
    $scope.showSpiner = PostService.getSpiner;
    $scope.showendloader = false;

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/sidebar-poll-icon.png",
        featureWhatsUpLogo: "./img/poll_info.png",
        featureColor: '#da4f00',
        featureTabColor: '#da4f',
        infoHaeder: "סקרים",
        infoMainText: "בואו להשפיע!<br>כאן מופיעים סקרים בנושאים שונים.<br>ניתן להשתתף בסקר קיים<br>או להציע סקר חדש.",
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאחליקציה"
    };
    generalParameters.setFeature($scope.featureDetails);
    generalParameters.setBackIcon(false); //tester
    $scope.user = generalParameters.getUser();

    var request = {

        startTimestamp: '',
        endTimestamp: '',
        offset: 0,
        limit: 20,
        orderBy: '-timestamp',
        postType: 'poll',
        userID: $scope.user._id,
        _parentID: '',
        pollStatus: 'active'
    };

    /*init controller data*/
    PostService.getPostsBatch(request); //tell service to refresh posts
    console.log("222222222222222222222222222222222222222");
    $scope.polls = PostService.getPosts; //ask service for polls

    $scope.userClicked = function (pollIndex) {
        console.log(pollIndex);
        $scope.currentPoll = pollIndex;
        console.log($scope.currentPoll);
        generalParameters.setBackIcon(true);
        $scope.posts = PostService.getPosts();
        $state.transitionTo('poll-view', { postId: $scope.posts[pollIndex]._id });
    };

    $scope.getPoll = function () {
        PostService.getPostsBatch(request);
    }

    $scope.getActivePoll = function () {
        request.endTimestamp = '';
        request.offset = 0;
        request.pollStatus = 'active';
        PostService.getPostsBatch(request);
        //$scope.polls = PostService.getPosts;
        //console.log($scope.polls);
    }

    $scope.getInActivePoll = function () {
        request.endTimestamp = '';
        request.offset = 0;
        request.pollStatus = 'inactive';
        PostService.getPostsBatch(request);
        //$scope.polls = PostService.getPosts;
        //console.log($scope.polls);
    }


    $scope.$on('EndLoadMore', function (event, args) {
        switch (args.showLoad) {
            case true:
                $scope.showendloader = false;
                break;
            case false:
                $scope.showendloader = true;
                break;
        }
    });


    $scope.loadMore = function () {
        if ($scope.showendloader) {
            return;
        }
        console.log('load more');
        request.offset += 20;
        post = PostService.getPosts();
        request.endTimestamp = post[0].timestamp;
        PostService.getPostsBatch(request);
    }

    $scope.SuggestPoll = function () {
        if (generalParameters.getUser().firstName == 'הצטרף לאפליקציה') {
            $rootScope.$broadcast('showInfoPopup', { showInfo: true });
        }
        else if (!$rootScope.isAdmin) {
            generalParameters.setBackIcon(true);
            $state.transitionTo('write-post', { postType: "poll", postId: 0 });
        }
        else {
            generalParameters.setBackIcon(true);
            $state.transitionTo('upload-poll', { postType: "poll", postId: 0 });
        }
    }



} ])
