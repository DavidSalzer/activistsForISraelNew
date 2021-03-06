socialGroupApp.controller('mainMenu', ['$rootScope', '$scope', '$state', 'classAjax', 'generalParameters', 'PostService', '$timeout', function ($rootScope, $scope, $state, classAjax, generalParameters, PostService, $timeout) {

    var exitFlag = false;
     
    generalParameters.setBackIcon(false);
    /* $scope.originUrl = window.location.origin + window.location.pathname + '#/'; */
    

    $scope.demandes = [
    {
        featureColor: '#878787',
        featureIcon: './img/profile_small.png',
        featureSendInClick: 'profile'
    },
    {
        featureColor: '#00BD9B',
        featureIcon: './img/sidebar-score-icon.png',
        featureSendInClick: 'points'
    },
    {
        featureColor: '#01A2D2',
        featureIcon: './img/sidebar-chat-icon.png',
        featureSendInClick: 'chat'
    },
    {
        featureColor: '#9D0B0F',
        featureIcon: './img/sidebar-talk-back-icon.png',
        featureSendInClick: 'talkback'
    }];
	
	request = {
        offset: 0,
        limit: 2,
    };

    PostService.loadMainFeatures(request)
    .then(function (data) {
        $timeout(function () {
            $scope.features = PostService.getMainFeatures();
        }
        , 0);
    })
    

    $scope.goToFromeDemand = function (frome) {
        userProfile = generalParameters.getUser;
        switch (frome) {
            case 'profile':
                if (userProfile().firstName != 'הצטרף לאפליקציה') {
                    $state.transitionTo('user-profile', { userId: userProfile()._id });
                }
                else {
                    $rootScope.$broadcast('showLoginPopup', { showLogin: true });
                    
                }
                break;
            case 'points':
                $state.transitionTo('points');
                break;
            case 'chat':
                $state.transitionTo('chat');
                break;
            case 'talkback':
                $state.transitionTo('talkback');
                break;
        }
    }
	
	$scope.goToFeature = function (featureUrl, postId) {
		
        if(featureUrl.indexOf('http')>-1){//external link? open by inapp browser!
			$scope.ref = window.open(featureUrl, '_blank', 'location='+(isAndroid?'yes':'no'));
		}
		else{//internal link? go to relevant page
		
			link = featureUrl.split(/\/([^.]+)$/);// split the state & post_ID
			$state.transitionTo(link[0], { postId: link[1]});
		}			
    }

    $scope.featureDetails = {
        featureName: 'mainMenu',
        featureLogo: "./img/sidebar-menu-icon.png",
        featureWhatsUpLogo: "./img/sgin_thankyou.png",
        featureColor: '#12426F',
        infoHaeder: "האחליקציה",
        infoMainText: 'ברוכים הבאים לאחליקציה!<br>הצטרפו אלינו ותוכלו<br>לצפות, לכתוב, לפרסם ולהגיב.<br>לחצו על האייקון משמאל<br>לצפייה בתפריט המלא',
        infoSubText: "עוד לא הצטרפת לאחליקציה?"

    };

    generalParameters.setFeature($scope.featureDetails);
	
	$scope.loadMore = function () {
        
		request.offset += request.limit;
        
		PostService.loadMainFeatures(request);
    }

    
    var dateObj = new Date();
    var timeNow = dateObj.getTime();
    var timeSubstruct = timeNow - (1000 * 60 * 60 * 24 * 14); //substruct 14 days from today- for use in likes and comments


    var requestNews = {
        startTimestamp: timeSubstruct, //tbd - two weeks back
        endTimestamp: '',
        offset: 0,
        limit: 7,
        orderBy: '-timestamp',
        postType: 'breakingnews',
        _parentID: ''
    };
    PostService.getPostsBatch(requestNews)
    .then(function (data) {
        $timeout(function () {
            $scope.news = PostService.getPosts();
            console.log($scope.news);
        }
        , 0);
    })

    $scope.readNews=function(newsId){
        $state.transitionTo('single-breakingnews', { postId: newsId });
    }
}])

