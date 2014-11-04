socialGroupApp.controller('contact', ['$scope', '$rootScope', 'classAjax', 'PostService', 'generalParameters', function ($scope, $rootScope, classAjax, PostService, generalParameters) {




    //  $scope.posts = PostService.getPosts;
    $scope.showInput = false;
    $scope.isSiteHeader = true;


    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/contact.png",
        featureColor: '#009933',
        infoMainText: "כאן תוכלו לפנות אלינו.",
        infoSubText: "עוד לא הצטרפת לאחליקציה?"
    };

    generalParameters.setFeature($scope.featureDetails);

    $scope.thankDetails = {

        featureColor: '#009933',
        thankText: 'פנייתך התקבלה וטופל בהקדם',
        btnText: 'חזרה לעמוד הראשי',
        headerText: 'צור קשר',
        featureState: 'main-menu'

    };

    $scope.sendContact = function () {
        console.log($scope.name);
        console.log($scope.mail);
        console.log($scope.text);

        $scope.postData = { post: {} };
        $scope.postData.post.postType = 'contact';
        $scope.postData.post.content = $scope.text;
        $scope.postData.post.name = $scope.name;
        $scope.postData.post.email = $scope.mail;
        $scope.postData.post.title = 'יצירת קשר';

        PostService.sendPost($scope.postData)

		.then(function (data) {

		    console.log(data);
		    generalParameters.setBackIcon(false);

		    //others - show thank page
		    $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
		});

        //dataTransform = { type: 'contact', name: $scope.name, mail: $scope.mail, text: $scope.text };
        //console.log(dataTransform);
        //classAjax.getdata(dataTransform).then(function (data) {
        //    console.log("contact success: " + data);

        //})
    }
}
]);
