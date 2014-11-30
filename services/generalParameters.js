socialGroupApp.factory('generalParameters', ['$rootScope', '$stateParams', '$q', 'classAjax', 'PostService', function ($rootScope, $stateParams, $q, classAjax, PostService) {

    var featureDetails = {

        featureName: null,
        featureLogo: null,
        //infoImg: './img/whatsup.png',
        featureColor: '#AB14E6',
        infoHaeder: "הפורום",
        infoMainText: "כתבו על כל נושא שמעניין אתכם. המשתמשים יוכלו לסמן 'אהבתי' או להגיב לדבריכם. מוגבל ל 140 תווים.",
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };


    var userDetails = {
        firstName: 'הצטרף לאפליקציה',
        userImg: './img/user.png'
    };

    var showLogin = false;

    var optionsPieChart = {
        tooltip: { trigger: 'focus', 'text': 'percentage' },
        enableInteractivity: true,
        legend: { position: 'none', alignment: 'start' },
        title: "",
        backgroundColor: { strokeWidth: 0 },
        backgroundColor: '#42484e',
        pieSliceBorderColor: '#42484e',
        height: 250,
        fontSize: 13,
        colors: ['#f6ba55', '#da4f00', '#006dbe', '#860004', '#013d43', '#004a8e', '#993c71', '#004a8e', '#8ec531', '#009933', '#565c63'],
        chartArea: { left: '10%', top: '10%', width: '80%', height: '80%' }

    };

    var optionsColumnChart = {
        enableInteractivity: false,
        vAxis: { gridlines: { count: 0} },
        bar: { groupWidth: "65%" },
        legend: { position: 'none' },
        title: "",
        //backgroundColor: {strokeWidth: 0},
        backgroundColor: '#d4deec',
        height: 250,
        //width:600,
        fontSize: 12,
        series: {
            0: {
                type: 'bars'
            }, 1: {
                type: 'line',
                color: '#000000',
                lineWidth: 0,
                pointSize: 0,
                visibleInLegend: false
            }
        },
        axisTitlesPosition: 'none',
        colors: ['#f6ba55', '#da4f00', '#006dbe', '#860004', '#013d43', '#004a8e', '#993c71', '#004a8e', '#8ec531', '#009933', '#565c63'],
        chartArea: { left: '25%', top: '10%', width: '50%', height: '80%' }

    };

    var backIcon = false;

    return {

        setFeature: function (fd) {
            
            featureDetails = fd;

            
        },

        getFeature: function () {
            return featureDetails;
        },

        getUser: function () {
            return userDetails;
        },

        setUser: function (user) {
            userDetails = user;
            
            if (userDetails.img == undefined) {
                
            }
            else if (userDetails.img.RelativePosition) {
                userDetails.userImg = domain + userDetails.img.url;
                
            }
            else {
                userDetails.userImg = userDetails.img.url;
                
            }

            if (userDetails.gender == 'male') {
                userDetails.gender = 'זכר';
            }
            else if (userDetails.gender == 'female') {
                userDetails.gender = 'נקבה';
            }
            else {
                userDetails.gender = 'זכר/נקבה';
            }

            if (userDetails.point != undefined) {
                switch (userDetails.point.level) {
                    case '0':
                        userDetails.rank = 'חבר';
                        break;
                    case '1':
                        userDetails.rank = 'פעיל';
                        break;
                    case '2':
                        userDetails.rank = 'משפיע';
                        break;
                    case '3':
                        userDetails.rank = 'מאסטר';
                        break;
                    case '4':
                        userDetails.rank = 'אח';
                        break;
                }
            }

            d = new Date();
            d1 = new Date(userDetails.registrationDate);
            userDetails.registrationTime = parseInt((d.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));

            PostService.setUser(userDetails);
            $rootScope.$broadcast('setUser',{userDetails:userDetails});
        },

        getBackIcon: function () {
            return backIcon;
        },

        setBackIcon: function (BI) {
            backIcon = BI;
            
        },

        getOptionsPieChart: function () {
            return optionsPieChart;
        },

        getOptionsColumnChart: function () {
            return optionsColumnChart;
        },

        getShowLogin: function () {
            return showLogin;
        },

        setShowLogin: function (state) {
            showLogin = state;
        }       
    }
} ])
