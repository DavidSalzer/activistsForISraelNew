socialGroupApp.controller('contact', ['$scope', '$rootScope', 'classAjax', 'PostService', 'generalParameters', function ($scope, $rootScope, classAjax, PostService, generalParameters) {




    //  $scope.posts = PostService.getPosts;
    $scope.showInput = false;
    $scope.isSiteHeader = true;
    
	$scope.links = {

        'FB': {
			'he':'https://www.facebook.com/NaftaliBennett',
			'en':'https://www.facebook.com/bennettnaftalienglish',
			'ru':'https://www.facebook.com/NaftaliBennettRussian',
			'ar':'https://www.facebook.com/NaftaliBennettArabic',
			'fr':'https://www.facebook.com/NaftaliBennettFrancais'
		},
		'Twitter':{
			'he':'https://twitter.com/naftalibennett',
			'en':'https://twitter.com/Naftali_Bennett',
			'ru':'https://twitter.com/NaftalyBennet',
			'ar':'https://twitter.com/BennetArabic',
			'fr':'https://twitter.com/naftali_fr'
		},
		'NewsLtr':{'he':'http://my-t.co.il/view/Cms.aspx?i=1022'}
	};

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
	
	 $scope.contact = function (channel, language) {
		alert('isAndroid: '+isAndroid);
        //alert($scope.links[channel][language]);
		$scope.ref = window.open($scope.links[channel][language], '_blank', 'location='+(isAndroid?'yes':'no'));
    }
}
]);
