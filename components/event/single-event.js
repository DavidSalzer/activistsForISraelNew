socialGroupApp.controller('single-event', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {

    /*init variables*/
    //$scope.showInput = false;
    //$scope.currentPost = null;
    //$scope.showPostTitle = true;
    $scope.singleEvent = true;
    $scope.showAuthorImg = false;
    //$scope.currentPostType = 'event';
    //$scope.showCommentDate = false;
    //$scope.showCommentTitle = false;
    $scope.domain = domain;
    $scope.showSpiner = PostService.getSpiner;
    $scope.offset = 20;

    /*init controller details*/
    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/calendar.png",
        featureColor: '#004a8e',
        infoHaeder: "מאמרים",
        infoMainText: 'כתבו מאמר בכל נושא שתבחרו. המאמר מוגבל למינימום 250 תווים ויפורסם בהתאם לכללי המערכת. המאמרים ידורגו ע"י הגולשים ויקודמו בהתאם. ניתן להעלות את המאמר כקובץ, או לכתוב אותו ישירות בעמוד. ניתן גם להוסיף תמונה מלווה למאמר.',
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };

    generalParameters.setFeature($scope.featureDetails);

    $scope.user = generalParameters.getUser();

    $scope.articleId = $stateParams.postId;
    console.log('postId: ' + $stateParams.postId);
    PostService.getPostById($scope.articleId);
    $scope.post = PostService.getSinglePost;

    $scope.editEvent = function ($event) {

        $state.transitionTo('write-post', { postType: "event", postId: $stateParams.postId });
    };

    $scope.call = function () {

        var tel = $scope.post().phone;
        window.location.href = 'tel:' + tel;
    };

    $scope.mail = function () {

        var email = $scope.post().email;
        var subject = "פועלים למען ישראל:" + $scope.post().title + " ב" + $scope.post().location;
        var body = "שלום " + $scope.post()._author.data.firstName + " " + $scope.post()._author.data.lastName;
        console.log(email, subject, body);

        window.location.href = "mailto:" + email + "?subject=" + subject + "&body=" + body;
    };

    $scope.participate = function () {

        var startDate = new Date($scope.post().DestinationTime); // beware: month 0 = january, 11 = december
        var endDate = new Date($scope.post().DestinationTime);
        var title = $scope.post().title;
        var location = $scope.post().location;
        var notes = $scope.post().content;
        var success = function (message) {
            navigator.notification.alert("האירוע נוסף ליומנך בהצלחה!", null, '', 'אשר'); //phonegap native notifications- messge,callback,title,button label
        };
        var error = function (message) {
            navigator.notification.alert("הוספת האירוע ליומן נכשלה. שגיאה: " + message + "אנא נסה שנית", null, '', 'אשר'); //phonegap native notifications- messge,callback,title,button label
        };
        console.log(startDate, endDate, title, location, notes)
        window.plugins.calendar.createEvent(title, location, notes, startDate, endDate, success, error); //call phonegap plugin

    };

    $scope.nav = function () {

        var location = $scope.post().location;
        //replace spaces with '+', replace ',' with "%2C"
        var addressString = location.replace(/ /g, '+').replace(/[ ]*,[ ]*|[ ]+/g, '%2C');

        window.location.href = "geo:0,0?q=" + addressString;

    };

} ]);
