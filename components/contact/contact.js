socialGroupApp.controller('contact', ['$scope', '$rootScope', 'PostService', 'generalParameters', function ($scope, $rootScope, PostService, generalParameters) {

    $scope.showAll = false;
    $scope.showInput = false;
    $scope.isSiteHeader = true;

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/sidebar-contact-icon.png",
        featureWhatsUpLogo: "./img/contact_info.png",
        featureColor: '#009933',
        infoHaeder: "צור קשר",
        infoMainText: "כאן תוכלו לפנות אלינו.",
        infoSubText: "עוד לא הצטרפת לאחליקציה?"
    };

    generalParameters.setFeature($scope.featureDetails);

    $scope.thankDetails = {

        featureColor: '#009933',
        thankText: 'פנייתך התקבלה ותטופל בהקדם',
        btnText: 'חזרה לעמוד הראשי',
        headerText: 'צור קשר',
        featureState: 'main-menu'

    };

    $scope.links = {

        'FB': {
            'he': 'https://www.facebook.com/NaftaliBennett',
            'en': 'https://www.facebook.com/bennettnaftalienglish',
            'ru': 'https://www.facebook.com/NaftaliBennettRussian',
            'ar': 'https://www.facebook.com/NaftaliBennettArabic',
            'fr': 'https://www.facebook.com/NaftaliBennettFrancais'
        },

        'Twitter': {
            'he': 'https://twitter.com/naftalibennett',
            'en': 'https://twitter.com/Naftali_Bennett',
            'ru': 'https://twitter.com/NaftalyBennet',
            'ar': 'https://twitter.com/BennetArabic',
            'fr': 'https://twitter.com/naftali_fr'
        },

        'NewsLtr': { 'he': 'http://my-t.co.il/view/Cms.aspx?i=1022' }
    };

    $scope.showAll = function (e) {
        $scope.showAll = true;
        $scope.$apply();
        angular.element(event.target).remove();
    }


    $scope.sendContact = function () {

        //validate inputs
        $scope.showNameError = $scope.name == undefined || $scope.name == '';
        $scope.showEmailError = $scope.mail == undefined || $scope.mail == '';
        $scope.showTextError = $scope.text == undefined || $scope.text == '';

        if ($scope.showNameError || $scope.showTextError || $scope.showEmailError) {
            return;
        }
        $scope.showContactError = false;
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
        PostService.sendPost($scope.postData).then(function (data) {

            console.log(data);
            if (data.status.statusCode == 0) {
                generalParameters.setBackIcon(false);
                $rootScope.$broadcast('showThankPage', { thankDetails: $scope.thankDetails, showThankPage: true });
            }
            else {//contact error
                $scope.showContactError = true;
                $scope.ContactErrorMessage = "שליחת המסר נכשלה. אנא נסו שנית";
            }
        });
    }

    $scope.contact = function (channel, language) {

        $scope.ref = window.open($scope.links[channel][language], '_blank', 'location=' + (isAndroid ? 'yes' : 'no'));
    }

} ]);
