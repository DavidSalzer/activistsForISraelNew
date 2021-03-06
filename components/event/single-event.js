socialGroupApp.controller('single-event', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', '$timeout', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters, $timeout) {
    $scope.showPartiPop = false;
    /*init variables*/
    //$scope.showInput = false;
    //$scope.currentPost = null;
    //$scope.showPostTitle = true;
    $scope.singleEvent = true;
    $scope.showAuthorImg = false;
    //$scope.currentPostType = 'event';
    //$scope.showCommentDate = false;
    //$scope.showCommentTitle = false;
    $scope.domain = domain + 'medium/';
    $scope.showSpiner = PostService.getSpiner;
    $scope.offset = 20;
    $scope.movePage = false;
    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/sidebar-event-icon.png",
        featureWhatsUpLogo: "./img/calendar_info.png",
        featureColor: '#004a8e',
        infoHaeder: "אירועים",
        infoMainText: 'פרסמו אירועים למען ישראל! לוח לפרסום ויצירת אירועים/חוגי בית/מפגשים בהם תרצו לשתף את החברים. יש לשמור על זכויות יוצרים',
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };

    generalParameters.setFeature($scope.featureDetails);
    generalParameters.setBackIcon(true);
    $scope.user = generalParameters.getUser();

    $scope.articleId = $stateParams.postId;
    
    PostService.getPostById($stateParams.postId)
    .then(function (data) {
        $timeout(function () {
            $scope.post = PostService.getSinglePost();
        }
        , 0);
    });

    $scope.editEvent = function ($event) {

        $state.transitionTo('write-post', { postType: "event", postId: $stateParams.postId });
    };

    $scope.call = function () {
        
        var tel = $scope.post.phone;
        window.location.href = 'tel:' + tel;
    };


    $scope.$on('ggg', function (event, args) {
        $scope.movePage = true;
    });

    $scope.mail = function () {

        var email = $scope.post.email;
        var subject = "פועלים למען ישראל:" + $scope.post.title + " ב" + $scope.post.location;
        var body = "שלום " + $scope.post._author.data.firstName + " " + $scope.post._author.data.lastName;
        console.log(email, subject, body);

        window.location.href = "mailto:" + email + "?subject=" + subject + "&body=" + body;
    };

    $scope.participate = function () {
        $scope.showPartiPop = true;
        //alert("לחצת על השתתף ");
        var startDate = new Date($scope.post.DestinationTime); // beware: month 0 = january, 11 = december
        var endDate = new Date($scope.post.DestinationTime+(1000*60*60));// add one hour to end time
        var title = $scope.post.title;
        var location = $scope.post.location;
        var notes = $scope.post.content;
        var success = function (message) {
            $scope.showPartiPop = true;
        };
        var error = function (message) {
            navigator.notification.alert("הוספת האירוע ליומן נכשלה. שגיאה: " + message + "אנא נסה שנית", null, '', 'אשר'); //phonegap native notifications- messge,callback,title,button label
        };
        //console.log(startDate, endDate, title, location, notes)
        window.plugins.calendar.createEvent(title, location, notes, startDate, endDate, success, error); //call phonegap plugin //need to uncomment - function needed.

    };

    $scope.closeEventPop = function () {
        $scope.showPartiPop = false;
    }

    $scope.nav = function () {

        var location = $scope.post.location;
        //replace spaces with '+', replace ',' with "%2C"
        var addressString = location.replace(/ /g, '+').replace(/[ ]*,[ ]*|[ ]+/g, '%2C');

        if (isAndroid) {
            window.location.href = "geo:0,0?q=" + addressString;
        }
        else {
            window.location.href = 'maps://maps.apple.com/?q=' + addressString;
        }

    };

} ]);
