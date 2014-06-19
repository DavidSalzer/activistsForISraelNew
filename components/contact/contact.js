socialGroupApp.controller('contact', ['$scope', 'classAjax', 'PostService', 'generalParameters', function ($scope, classAjax, PostService, generalParameters) {




    //  $scope.posts = PostService.getPosts;
    $scope.showInput = false;



    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/contact.png",
        featureColor: '#009933'
    };

    generalParameters.setFeature($scope.featureDetails);
    
    $scope.sendContact = function () {
        console.log($scope.name);
        console.log($scope.mail);    
        console.log($scope.text); 
        
        
        dataTransform = {type:'contact' , name: $scope.name, mail: $scope.mail, text:$scope.text};
            console.log(dataTransform);
            classAjax.getdata(dataTransform).then(function (data) {
                console.log("contact success: "+data);
               
            })   
        }
} 
]);
