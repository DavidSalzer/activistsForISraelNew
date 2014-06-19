socialGroupApp.controller('mainMenu', ['$scope', '$state', 'classAjax', 'generalParameters', function ($scope, $state, classAjax, generalParameters) {
    $scope.features = [
    {
        featureId: 2,
        featureUrl: 'talk-back',
        featureName: 'טוקבקים',
        featureLogo: './img/whatsup.png',
        featureImg: './img/image/kneset.jpg',
        title: 'בוער לכם להגיד משהו? זה המקום',
        text: 'עמוד מה בוער',
        postId: 5
    },
    {
        featureId: 1,
        featureUrl: 'channel',
        featureName: 'יוטיוב',
        featureLogo: './img/youtube.png',
        featureImg: './img/image/pic1.png',
        title: 'ערוץ היוטיוב של נפתלי בנט',
        text: 'לצפייה מהנייד',
        postId: 5
    },
    {
        featureId: 2,
        featureUrl: 'talk-back',
        featureName: 'טוקבקים',
        featureLogo: './img/whatsup.png',
        featureImg: './img/image/kneset.jpg',
        title: 'בוער לכם להגיד משהו? זה המקום',
        text: 'עמוד מה בוער',
        postId: 5
    },
    {
        featureId: 3,
        featureUrl: 'comments',
        featureName: 'מאמרים',
        featureLogo: './img/article.png',
        featureImg: './img/image/pic3.png',
        title: 'מאמרים בנושאים על סדר היום',
        text: 'עמוד מאמרים',
        postId: 5
    },
    {
        featureId: 3,
        featureUrl: 'facebookBennet/NaftaliBennett',
        featureName: 'facebook',
        featureLogo: './img/NaftaliBennett.png',
        featureImg: './img/image/pic4.png',
        title: 'ערוץ הפייסבוק של נפתלי בנט',
        text: 'הכנסו לקרוא',
        postId: 5
    }
    ,
    {
        featureId: 3,
        featureUrl: 'facebookPoalim/actionforisrael',
        featureName: 'facebook-poalim',
        featureLogo: './img/NaftaliBennett.png',
        featureImg: './img/image/pic5.png',
        title: 'ערוץ הפייסבוק של פועלים למען ישראל',
        text: 'הכנסו לקרוא',
        postId: 5
    }
    
    ];

    $scope.goToFeature = function (featureUrl, postId) {
        console.log('featureUrl: ' + featureUrl);
        $state.transitionTo(featureUrl, { postId: postId });
    }

    $scope.featureDetails = {
        featureName: null,
        featureLogo: "./img/poalim-logo.png",
        //infoImg: './img/whatsup.png',
        featureColor: '#AB14E6'
        
    };

    generalParameters.setFeature($scope.featureDetails);



} ])


