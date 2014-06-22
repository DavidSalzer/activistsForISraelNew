socialGroupApp.controller('mainMenu', ['$scope', '$state', 'classAjax', 'generalParameters', function ($scope, $state, classAjax, generalParameters) {
    $scope.features = [
    {
        featureId: 2,
        featureUrl: 'talk-back',
        featureName: 'מה בוער',
        featureLogo: './img/whatsup.png',
        featureImg: './img/image/kneset.jpg',
        title: 'בוער לכם להגיד משהו? זה המקום',
        text: 'טוקבק (בעברית: תגובית) הוא מנגנון לתגובות הגולשים באינטרנט. מנגנון הטוקבק מופעל באתרי חדשות, באתרי בלוגים ובאתרים נוספים, והוא מאפשר לגולשים להגיב על הנאמר בדף מסוים, כך שהתגובות מופיעות בהמשכו של הדף. . ',
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
    //{
    //    featureId: 2,
    //    featureUrl: 'poll',
    //    featureName: 'משאל עם',
    //    featureLogo: './img/poll.png',
    //    featureImg: './img/image/pic6.png',
    //    title: 'בואו להצביע בעמוד הסקרים שלנו',
    //    text: 'עמוד סקרים',
    //    postId: 5
    //},
    {
        featureId: 3,
        featureUrl: 'article',
        featureName: 'מאמרים',
        featureLogo: './img/article.png',
        featureImg: './img/image/pic3.png',
        title: 'מאמרים בנושאים על סדר היום',
        text: 'עמוד מאמרים',
        postId: 5
    },
    {
        featureId: 3,
        featureUrl: 'facebookBennet',
        featureName: 'פייסבוק נפתלי',
        featureLogo: './img/NaftaliBennett.png',
        featureImg: './img/image/pic4.png',
        title: 'ערוץ הפייסבוק של נפתלי בנט',
        text: 'הכנסו לקרוא',
        postId: 5
    }
    ,
    {
        featureId: 3,
        featureUrl: 'facebookPoalim',
        featureName: 'פייסבוק פועלים',
        featureLogo: './img/actionforisrael.png',
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


