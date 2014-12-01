socialGroupApp.controller('contact', ['$scope', '$rootScope', 'PostService', 'generalParameters', function ($scope, $rootScope, PostService, generalParameters) {

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

    $scope.sendContact = function () {
		
		//validate inputs
		$scope.showNameError = $scope.name == undefined || $scope.name == '';
        $scope.showEmailError = $scope.mail == undefined || $scope.mail == '';
        $scope.showTextError = $scope.text == undefined || $scope.text == '';
        
		if ($scope.showNameError ||  $scope.showTextError || $scope.showEmailError) {
            return;
        }
		
		$scope.showNameError = false;
        $scope.showTextError = false;
		$scope.showEmailError = false;
		
		//create msg
        $scope.postData = { post: {} };
        $scope.postData.post.postType = 'contact';
        $scope.postData.post.content = $scope.text;
        $scope.postData.post.name = $scope.name;
        $scope.postData.post.email = $scope.mail;
        $scope.postData.post.title = 'יצירת קשר';
		
		//send msg
        PostService.sendPost($scope.postData)

		.then(function (data) {

		    console.log(data);
		    generalParameters.setBackIcon(false);

		    //others - show thank page
		    $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
		});
    }
	
	$scope.contact = function (channel, language) {
		
		$scope.ref = window.open($scope.links[channel][language], '_blank', 'location='+(isAndroid?'yes':'no'));
    }
	
}]);
