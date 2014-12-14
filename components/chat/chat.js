socialGroupApp.controller('chat', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {

    //$scope.showChatPage = true;
    var socket = io(domain, { 'forceNew': true });
    $scope.activeChatRoomId;
    $scope.activeChatRoomHost;
    PostService.chatConnect()
    .then(function (data) {
        if (data.data) {
            $scope.activeChatRoomHost = data.data.chatRoom.hostEmail;
            $scope.activeChatRoomId = data.data._id;
        }
        else {
            $state.transitionTo('chatPromo');
        }

        /*init controller details*/
        $scope.featureDetails = {
            featureName: null,
            featureLogo: "./img/sidebar-chat-icon.png",
            featureWhatsUpLogo: "./img/point-icon.png",
            featureColor: '#01a3d4',
            infoHaeder: "צ'אט זמין",
            infoMainText: 'בואו להתכתב! צאט חי עם אנשים מעניינים.',
            infoSubText: "יצירת תכנים באיזור זה מותנת בהרשמה לאחליקציה"
        };

        generalParameters.setFeature($scope.featureDetails);
        $scope.user = generalParameters.getUser();
        $scope.isHost = false;
        console.log($scope.user);
        if (($scope.user) && ($scope.user.email == $scope.activeChatRoomHost)) {
            $scope.isHost = true;
        }
        /*init controller data*/
        request = {
            startTimestamp: '',
            endTimestamp: '',
            offset: 0,
            limit: 15,
            orderBy: '-timestamp',
            postType: 'chatMessage',
            //userID: $scope.user._id,
            _parentID: $scope.activeChatRoomId//temp
        };
        PostService.getPostsBatch(request); //tell service to refresh posts
        $scope.posts = PostService.getPosts; //ask service for posts

        $scope.addResponse = function (myPostID) {
            generalParameters.setBackIcon(true);
            $state.transitionTo('write-post', { postType: "chatMessage", postId: myPostID });
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

        //load more post on scroll down
        $scope.loadMore = function () {
            //if not loading now
            if (!PostService.getLoadMoreNow()) {
                if ($scope.showendloader) {
                    return;
                }
                PostService.setLoadMoreNow(true);
                console.log('load more');
                request.offset += 15;
                post = PostService.getPosts();
                request.endTimestamp = post[0].timestamp;
                PostService.getPostsBatch(request);
            }
        }
      socket.on('addPost', function(msg){
		$('#messages').append($('<li>').text(msg.data.content));
	  });
	  socket.on('addResponse', function(msg){
		$('#messages').append($('<li>').text(msg.parent.data.content +' reply: '+ msg.childs.data.content));
	  });
	  socket.on('start', function(msg){
		$('#messages').append($('<li>').text(msg));
	  });
	  socket.on('stop', function(msg){
		$('#messages').append($('<li>').text(msg));
	  });
	  socket.on('disconnect', function(msg){
		$('#messages').append($('<li>').text(msg));
	  });
	  //{"_id" : ObjectId("546c721f4c9cba2832b8a9a2")}  <input id="addPost" type="submit" value="addPost">
	  socket.on('on', function(msg){
		$('#messages').append($('<li>').text(msg));
	  });
	  socket.on('off', function(){
		$('#messages').append('OFF');
	  });
	  socket.on('addPromoMessage', function(msg){
		$('#messages').append($('<li>').text(msg.content));
	  });
	  socket.on('getPosts', function(msg){
		$('#messages').append($('<li>').text(msg));
	  });
    });
} ]);