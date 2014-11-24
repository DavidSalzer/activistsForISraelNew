socialGroupApp.controller('breakingnews', ['$rootScope', '$stateParams', '$scope', 'classAjax', '$state', 'PostService', 'generalParameters', function ($rootScope, $stateParams, $scope, classAjax, $state, PostService, generalParameters) {

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/sidebar-flash-icon.png",
        featureWhatsUpLogo: "./img/sidebar-flash-icon.png",
        featureColor: '#00aeff',
        infoHaeder: "אירועים",
        infoMainText: 'לוח האירועים של האחליקציה. כאן תוכלו לראות את האירועים הקיימים ולפרסם אירועים/חוגי בית ושאר מפגשים שתרצו לשתף בהם את החברים',
        infoSubText: "יצירת תכנים באיזור זה מותנת בהרשמה לאחליקציה"
    };
      generalParameters.setFeature($scope.featureDetails);




}]);
