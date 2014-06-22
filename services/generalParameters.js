socialGroupApp.factory('generalParameters', ['$rootScope', '$stateParams', '$q', 'classAjax', function ($rootScope, $stateParams, $q, classAjax) {

    var featureDetails = {

        featureName: null,
        featureLogo: null,
        //infoImg: './img/whatsup.png',
        featureColor: '#AB14E6',
        infoHaeder: "פיצ'ר מה קורה",
        infoMainText: "כתבו על כל נושא שמעניין אתכם. המשתמשים יוכלו לסמן 'אהבתי' או להגיב לדבריכם. מוגבל ל 140 תווים.",
        infoSubText: "יצירת תכנים באיזור זה מותנית בהצטרפות לאפליקציה"
    };




    var userDetails = {
        firstName: 'התחבר',
        userImg: './img/user.png'
    };

    var showLogin = false;

    var optionsPieChart = {
			tooltip: { trigger: 'none' },
			enableInteractivity: false,
			legend: { position: 'none' , alignment:'start'},
			title: "",
			backgroundColor: {strokeWidth: 0},
			backgroundColor: '#42484e',
			pieSliceBorderColor:'#42484e',
			height:250,
			fontSize: 20,
			colors: ['#f6ba55', '#da4f00','#006dbe','#860004','#013d4','#004a8e','#993c7','#004a8e','#8ec531','#009933','#565c63'],
			chartArea:{left:'10%',top:'10%',width:'80%',height:'80%'}
			
		};
		
	var optionsColumnChart= {
			enableInteractivity: false,
			vAxis: {gridlines: {count: 0}},
			bar: {groupWidth: "65%"},
			legend: { position: 'none' },
			title: "",
			//backgroundColor: {strokeWidth: 0},
			backgroundColor: '#42484e',
			height:250,
			//width:600,
			fontSize: 12,
			series: {
			  0: {
				type: 'bars'
			  },1: {
				type: 'line',
				color: '#ffffff',
				lineWidth: 0,
				pointSize: 0,
				visibleInLegend: false
			  }
			  },
			axisTitlesPosition: 'none',
			colors: ['#f6ba55', '#da4f00','#006dbe','#860004','#013d4','#004a8e','#993c7','#004a8e','#8ec531','#009933','#565c63'],
			chartArea:{left:'25%',top:'10%',width:'50%',height:'80%'}
			
		};
	
	var backIcon = false;

    return {

        setFeature: function (fd) {
            console.log(featureDetails);
            featureDetails = fd;

            console.log(featureDetails);
        },

        getFeature: function () {
            return featureDetails;
        },

        getUser: function () {
            return userDetails;
        },

        setUser: function (user) {
            userDetails = user;
            console.log(userDetails);
            if (userDetails.img == undefined) {
                console.log(userDetails);
            }
            else if (userDetails.img.RelativePosition) {
                userDetails.userImg = domain + userDetails.img.url;
                console.log(userDetails);
            }
            else {
                userDetails.userImg = userDetails.img.url;
                console.log(userDetails);
            }
            
        },

        getBackIcon: function () {
            return backIcon;
        },

        setBackIcon: function (BI) {
            backIcon = BI;
            console.log(backIcon);
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
