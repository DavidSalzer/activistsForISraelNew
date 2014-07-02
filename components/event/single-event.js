socialGroupApp.controller('single-event', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {

    /*init variables*/
    $scope.showInput = false;
    $scope.currentPost = null;
    $scope.showPostTitle = true;
    $scope.singleEvent = true;
    $scope.showAuthorImg = false;
    $scope.currentPostType = 'event';
    $scope.showCommentDate = false;
    $scope.showCommentTitle = false;
    $scope.domain = domain;
    $scope.showSpiner = PostService.getSpiner;
    $scope.offset = 20;

    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/event.png",
        featureColor: '#006dbe',
        infoHaeder: "������",
        infoMainText: '���� ���� ��� ���� ������. ����� ����� �������� 250 ����� ������� ����� ����� ������. ������� ������ �"� ������� ������� �����. ���� ������ �� ����� �����, �� ����� ���� ������ �����. ���� �� ������ ����� ����� �����.',
        infoSubText: "����� ����� ������ �� ������ �������� ���������"
    };
    generalParameters.setFeature($scope.featureDetails);

    $scope.articleId = $stateParams.postId;
    console.log('postId: ' + $stateParams.postId);
    
    PostService.getPostById($scope.articleId);
    $scope.post = PostService.getSinglePost;

    $scope.comments = PostService.getPosts;

    $scope.authorClicked = function ($event) {
        
    };


   


} ]);
