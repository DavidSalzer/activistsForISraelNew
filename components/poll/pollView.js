﻿google.load('visualization', '1.0', { 'packages': ['corechart'] });
socialGroupApp.controller('pollView', ['$rootScope', '$stateParams', '$scope', '$state', '$http', 'PostService', 'generalParameters', 'classAjax', '$timeout', function ($rootScope, $stateParams, $scope, $state, $http, PostService, generalParameters, classAjax, $timeout) {

    $scope.domain = domain;
    $scope.currentPoll = $stateParams.postId;
    $scope.choosenOption = [];
    $scope.choosenCount = 0;
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/poll.png",
        featureColor: '#f55c06',
        infoHaeder: "סקרים",
        infoMainText: "בואו להשפיע!<br>כאן מופיעים סקרים בנושאים שונים.<br>ניתן להשתתף בסקר קיים<br>או להציע סקר חדש.",
        infoSubText: "ההצבעה באיזור זה מותנית בהצטרפות לאחליקציה"
    };
    generalParameters.setBackIcon(true);
    $scope.thankDetails = {
        featureColor: '#da4f00',
        thankText: 'הצבעתך התקבלה. המערכת תעבד את נתוני ההצבעה והתוצאות יפורסמו בהקדם. ',
        btnText: 'חזרה לעמוד הסקרים',
        headerText: 'תודה על השתתפותך',
        featureState: 'poll'
    };

    $scope.showVoteError = false;

    generalParameters.setFeature($scope.featureDetails);
    $scope.options = generalParameters.getOptionsPieChart();

    //$scope.polls = PostService.getPosts();
    //PostService.getPostById($scope.currentPoll);

    $scope.user = generalParameters.getUser();


    $scope.maxSelect = 1;
    $scope.minSelect = 1;

    //$scope.currentPollObj = $scope.polls[$scope.currentPoll];
    queryString = 'post/' + $scope.currentPoll;
    $scope.dataReturn = false;
    classAjax.getdata('get', queryString, {})
    .then(function (data) {
        $scope.currentPollObj = data.data;

        $scope.closedPoll = $scope.currentPollObj.poll.status == "inactive";

        for (var i in $scope.currentPollObj.activity) {
            if ($scope.currentPollObj.activity[i].type == 'vote') {
                $scope.currentPollObj.poll.status = "inactive";
                if ($scope.currentPollObj.poll.countVote < 10) {
                    //generalParameters.setBackIcon(false);
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


        $scope.legend = [];
        for (var i = 0; i < $scope.currentPollResults.length; i++) {
            $scope.legend.push({ title: $scope.currentPollResults[i].answer, color: $scope.options.colors[i], image: $scope.currentPollResults[i].imageUrl });
            $scope.choosenOption.push(false);
        }
        if ($scope.currentPollObj.poll.status == "inactive") {
            $scope.temp = [];
            for (var i = 0; i < $scope.currentPollResults.length; i++) {
                percent = (($scope.currentPollResults[i].count / $scope.currentPollObj.poll.countVote) * 100).toFixed(1);

                $scope.temp.push({ name: $scope.currentPollResults[i].answer, votes: parseInt(percent), color: $scope.options.colors[i], percent: percent + "%" });
            }
            $scope.currentPollResults = $scope.temp;
        }

        $scope.dataReturn = true;

        $timeout(function () {
            $scope.pollIsActive = $scope.currentPollObj.poll.status == "active";
        }
        , 0);

    })

    //$scope.pollIsActive = function () {
    //    if ($scope.currentPollObj != undefined) {
    //        return ($scope.currentPollObj.poll.status == "active");
    //    }
    //};


    $scope.addVote = function () {
        $scope.user = generalParameters.getUser();
        if ($scope.user.firstName == 'הצטרף לאפליקציה') {
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


            $scope.json = JSON.stringify({ votes: $scope.voteDetails });


            queryString = 'poll/vote/' + $scope.currentPollObj._id;

            //$http.post(domain + 'vote/', $scope.json)
            //.success(function (data) {
            $rootScope.$broadcast('showLoader', { showLoader: true });
            classAjax.getdata('post', queryString, $scope.json).then(function (data) {
                $rootScope.$broadcast('showLoader', { showLoader: false });
                if (data.status.statusCode == 0) {
                    $scope.showServerVoteError = false;
                    if ($scope.currentPollObj.poll.countVote >= 10) {
                        $scope.currentPollObj.poll.status = "inactive";
                        if ($scope.currentPollObj.poll.status == "inactive") {
                            $scope.temp = [];
                            for (var i = 0; i < $scope.currentPollResults.length; i++) {
                                percent = (($scope.currentPollResults[i].count / $scope.currentPollObj.poll.countVote) * 100).toFixed(1);

                                $scope.temp.push({ name: $scope.currentPollResults[i].answer, votes: $scope.currentPollResults[i].count, color: $scope.options.colors[i], percent: percent + "%" });
                            }
                            $scope.currentPollResults = $scope.temp;
                        }
                        $scope.thankDetails.featureState = 'poll-view';
                        $scope.thankDetails.featureStateParams = { postId: $scope.currentPollObj._id }
                        $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
                    }
                    else {
                        generalParameters.setBackIcon(false);
                        $scope.thankDetails.featureState = 'poll';
                        $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });

                    }
                }
                else {
                    $scope.showServerVoteError = true;
                    $scope.voteErrorMsg = errorMessages.generalError;
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


    }

    $scope.getIsSelected = function (index) {
        return ($scope.choosenOption[index]);

    }

} ])

