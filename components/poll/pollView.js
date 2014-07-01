google.load('visualization', '1.0', { 'packages': ['corechart'] });
socialGroupApp.controller('pollView', ['$rootScope', '$stateParams', '$scope', '$http', 'PostService', 'generalParameters', 'classAjax', function ($rootScope, $stateParams, $scope, $http, PostService, generalParameters, classAjax) {
    console.log($stateParams);
    $scope.currentPoll = $stateParams.pollIndex;
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

    generalParameters.setFeature($scope.featureDetails);
    $scope.options = generalParameters.getOptionsPieChart();
    console.log($scope.options);
    $scope.polls = PostService.getPosts();

    $scope.user = generalParameters.getUser();
    console.log($scope.user);

    $scope.maxSelect = 4;
    $scope.minSelect = 2;

    $scope.currentPollObj = $scope.polls[$scope.currentPoll];
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

    $scope.optionsForVote = $scope.currentPollObj.poll.options;
    $scope.currentPollResults = $scope.polls[$scope.currentPoll].poll.options;
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
            $scope.temp.push({ name: $scope.currentPollResults[i].answer, votes: $scope.currentPollResults[i].count, color: $scope.options.colors[i], percent: percent + "%" });
        }
        $scope.currentPollResults = $scope.temp;
    }
    console.log($scope.currentPollResults);
    console.log($scope.legend);

    $scope.pollIsActive = function () {
        console.log($scope.currentPollObj.status);
        return ($scope.currentPollObj.poll.status == "active");
    };


    $scope.addVote = function () {

        if ($scope.user.firstName == 'התחבר') {
            $rootScope.$broadcast('showInfoPopup', { showInfo: true });
            return;
        }

        if ($scope.choosenCount >= $scope.minSelect && $scope.choosenCount <= $scope.maxSelect) {
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
            //need server
            //$http.post(domain + 'vote/', $scope.json)
            //.success(function (data) {
            classAjax.getdata('post', queryString, $scope.json).then(function (data) {
                if ($scope.currentPollObj.poll.countVote >= 10) {
                    $scope.currentPollObj.poll.status = "inactive";
                }
                else {
                    generalParameters.setBackIcon(false);
                    $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
                    console.log(data);
                }
            });
        }


    }

    $scope.selectOption = function (voteTo) {
        if ($scope.choosenOption[voteTo]) {
            $scope.choosenOption[voteTo] = false;
            $scope.choosenCount--;
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

