socialGroupApp.controller('channel', ['$scope', '$http', 'generalParameters', '$timeout', function ($scope, $http, generalParameters, $timeout) {
    $scope.myyou = 'test';
    $scope.player = [];
    //$scope.list='';
    $scope.items = [];
    //$scope.viewCounts = [];
    $scope.active = {};
    $scope.loginYoutube = false;
    $scope.showSpiner = false;
    $scope.indexVideo = 0;
    $scope.loadMoreFlag = true;
    $scope.isSiteHeader = true;

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/sidebar-youtube-icon.png",
        featureWhatsUpLogo: "./img/sidebar-youtube-icon.png",
        featureColor: '#fa0001',
        //infoImg: './img/youtube_small.png', //unnecessary- to be cancaeld and united with feture logo
        infoHaeder: "ערוץ יוטיוב",
        infoMainText: "ערוץ היוטיוב של נפתלי בנט.",
        infoSubText: "עוד לא הצטרפת לאחליקציה?"
    };
    generalParameters.setFeature($scope.featureDetails);

    $scope.channelId = 'UC4x7LYSzgGH-TMKc9J8pwgQ';
    $scope.maxResults = 5;
    $scope.pageToken = '';
    $scope.key = 'AIzaSyCsysmNj_5dwzB4gxbCAHC9pCSiiezu2tE';
    $scope.order = 'date'; //Allowed values: [date, rating, relevance, title, videocount, viewcount]

    $scope.getVideos = function () {
        $scope.showSpiner = true;
        if ($scope.loadMoreFlag) {
            $scope.loadMoreFlag = false;
            $http({ method: 'GET', url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='
                + $scope.channelId + '&maxResults='
                + $scope.maxResults + '&pageToken='
                + $scope.pageToken + '&key='
                + $scope.key + '&order=' + $scope.order
            }).
            success(function (data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available

                //$scope.list = data;
                //$scope.pageToken = data.nextPageToken;
                //$scope.loadMoreFlag = true;


                //$scope.items.push.apply($scope.items, $scope.list.items);
                //$scope.getViewCountOfVideos($scope.items, $scope.indexVideo);


                ////if (!$scope.$$phase) {
                ////    $scope.$apply();
                ////}
                //$scope.showSpiner = false;

                $timeout(function () {
                    $scope.list = data;
                    $scope.pageToken = data.nextPageToken;
                    $scope.loadMoreFlag = true;


                    $scope.items.push.apply($scope.items, $scope.list.items);
                    $scope.getViewCountOfVideos($scope.items, $scope.indexVideo);

                    $scope.showSpiner = false;
                }, 0);
            }).
            error(function (data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        }
        else {
            setTimeout($scope.getVideos(), 500);
        }
    }

    $scope.getViewCountOfVideos = function (videosArr, index) {
        $http({ method: 'GET', url: 'https://www.googleapis.com/youtube/v3/videos?id=' + videosArr[index].id.videoId + '&key=' + $scope.key + '&part=statistics' }).
                    success(function (data, status, headers, config) {

                        $scope.laodyoutube(videosArr[index].id.videoId, index);

                        //$scope.viewCounts.push(data.items[0].statistics.viewCount);
                        if (data.items[0] && data.items[0].statistics) {
                            $scope.items[index].statistics = data.items[0].statistics;
                        }


                        if (index + 1 < videosArr.length) {
                            $scope.indexVideo++;
                            $scope.getViewCountOfVideos(videosArr, $scope.indexVideo);
                        }
                    }).
                    error(function (data, status, headers, config) {

                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
    }

    $scope.laodyoutube = function (vid, loc) {

        if (window.outerWidth < 900) {
            channelWidth = 300;
            channelHeight = 200;
        }
        else {
            channelWidth = 600;
            channelHeight = 400;
        }
        $scope.player[loc] = new YT.Player('player' + loc + '', {
            height: channelHeight,
            width: channelWidth,
            videoId: vid,
            //events: {
            //  'onReady': $scope.onPlayerReady,
            //  //'onStateChange': onPlayerStateChange
            //},
            playerVars: {
                //controls: 0,
                disablekb: 0
            }
        });

    }

    $scope.onPlayerReady = function (event) {
        event.target.playVideo();
    }



} ])
