google.load('visualization', '1.0', { 'packages': ['corechart'] });
socialGroupApp.controller('pollView', ['$rootScope', '$stateParams', '$scope', '$state', '$http', 'PostService', 'generalParameters', 'classAjax', function ($rootScope, $stateParams, $scope, $state, $http, PostService, generalParameters, classAjax) {
    console.log($stateParams);
    $scope.currentPoll = $stateParams.postId;
    $scope.choosenOption = [];
    $scope.choosenCount = 0;
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/poll.png",
        featureColor: '#da4f00',
        infoHaeder: "משאל עם",
        infoMainText: "בואו להשפיע! כאן מופיעים סקרים שעל סדר היום. ניתן לשתף / או להציע שאלות לסקר. לרשומים בלבד",
        infoSubText: "ההצבעה באיזור זה מותנית בהצטרפות"
    };

    $scope.thankDetails = {
        featureColor: '#da4f00',
        thankText: 'הצבעתך התקבלה. המערכת תעבד את נתוני ההצבעה והתוצאות יפורסמו בהקדם. ',
        btnText: 'חזרה לעמוד הסקרים',
        headerText: 'סקר פעיל',
        featureState: 'poll'
    };

    $scope.showVoteError = false;

    generalParameters.setFeature($scope.featureDetails);
    $scope.options = generalParameters.getOptionsPieChart();
    console.log($scope.options);
    //$scope.polls = PostService.getPosts();
    PostService.getPostById($scope.currentPoll);

    $scope.user = generalParameters.getUser();
    console.log($scope.user);

    $scope.maxSelect = 1;
    $scope.minSelect = 1;

    //$scope.currentPollObj = $scope.polls[$scope.currentPoll];
    queryString = 'post/' + $scope.currentPoll;
    console.log(queryString);
    classAjax.getdata('get', queryString, {})
    .then(function (data) {
        $scope.currentPollObj = data.data;
        console.log($scope.currentPollObj);

        for (var i in $scope.currentPollObj.activity) {
            if ($scope.currentPollObj.activity[i].type == 'vote') {
                $scope.currentPollObj.poll.status = "inactive";
                if ($scope.currentPollObj.poll.countVote < 10) {
                    generalParameters.setBackIcon(false);
                    $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
                }
            }

        }

        if ($scope.currentPollObj.poll.maxSelect != undefined) {
            $scope.maxSelect = $scope.currentPollObj.poll.maxSelect;
        }
        if ($scope.currentPollObj.poll.minSelect != undefined) {
            $scope.minSelect = $scope.currentPollObj.poll.minSelect;
        }

        $scope.optionsForVote = $scope.currentPollObj.poll.options;
        $scope.currentPollResults = $scope.currentPollObj.poll.options;
        console.log($scope.currentPollResults);

        $scope.legend = [];
        for (var i = 0; i < $scope.currentPollResults.length; i++) {
            $scope.legend.push({ title: $scope.currentPollResults[i].answer, color: $scope.options.colors[i], image: $scope.currentPollResults[i].imageUrl });
            $scope.choosenOption.push(false);
        }
        if ($scope.currentPollObj.poll.status == "inactive") {
            $scope.temp = [];
            for (var i = 0; i < $scope.currentPollResults.length; i++) {
                percent = (($scope.currentPollResults[i].count / $scope.currentPollObj.poll.countVote) * 100).toFixed(1);
                console.log(percent);
                $scope.temp.push({ name: $scope.currentPollResults[i].answer, votes: parseInt(percent), color: $scope.options.colors[i], percent: percent + "%" });
            }
            $scope.currentPollResults = $scope.temp;
        }
        console.log($scope.currentPollResults);
        console.log($scope.legend);

    })

    $scope.pollIsActive = function () {
        if ($scope.currentPollObj != undefined) {
            return ($scope.currentPollObj.poll.status == "active");
        }
    };


    $scope.addVote = function () {
        $scope.user = generalParameters.getUser();
        if ($scope.user.firstName == 'התחבר') {
            $rootScope.$broadcast('showInfoPopup', { showInfo: true });
            return;
        }

        if ($scope.choosenCount >= $scope.minSelect && $scope.choosenCount <= $scope.maxSelect) {
            $scope.showVoteError = false;
            $scope.voteDetails = [];
            for (var i = 0; i < $scope.choosenOption.length; i++) {
                if ($scope.choosenOption[i]) {
                    $scope.voteDetails.push(i);
                }
            }

            console.log($scope.voteDetails);
            $scope.json = JSON.stringify({ votes: $scope.voteDetails });
            console.log($scope.json);

            queryString = 'poll/vote/' + $scope.currentPollObj._id;
            console.log(queryString);
            //$http.post(domain + 'vote/', $scope.json)
            //.success(function (data) {
            classAjax.getdata('post', queryString, $scope.json).then(function (data) {
                if ($scope.currentPollObj.poll.countVote >= 10) {
                    $scope.currentPollObj.poll.status = "inactive";
                    if ($scope.currentPollObj.poll.status == "inactive") {
                        $scope.temp = [];
                        for (var i = 0; i < $scope.currentPollResults.length; i++) {
                            percent = (($scope.currentPollResults[i].count / $scope.currentPollObj.poll.countVote) * 100).toFixed(1);
                            console.log(percent);
                            $scope.temp.push({ name: $scope.currentPollResults[i].answer, votes: $scope.currentPollResults[i].count, color: $scope.options.colors[i], percent: percent + "%" });
                        }
                        $scope.currentPollResults = $scope.temp;
                    }
                    $scope.thankDetails.featureState = 'poll-view/' + $scope.currentPollObj._id;
                    $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
                }
                else {
                    generalParameters.setBackIcon(false);
                    $scope.thankDetails.featureState = 'poll';
                    $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
                    console.log(data);
                }
            });
        }

        else {
            $scope.showVoteError = true;
        }


    }

    $scope.selectOption = function (voteTo) {
        if ($scope.choosenOption[voteTo]) {
            $scope.choosenOption[voteTo] = false;
            $scope.choosenCount--;
        }
        else if ($scope.maxSelect == 1) {
            for (var i in $scope.choosenOption) {
                $scope.choosenOption[i] = false;
            }
            $scope.choosenOption[voteTo] = true;
            $scope.choosenCount = 1;
        }
        else if ($scope.choosenCount < $scope.maxSelect) {
            $scope.choosenOption[voteTo] = true;
            $scope.choosenCount++;
        }

        console.log($scope.choosenOption);
        console.log('count: ' + $scope.choosenCount);
    }

    $scope.getIsSelected = function (index) {
        return ($scope.choosenOption[index]);

    }

} ])

