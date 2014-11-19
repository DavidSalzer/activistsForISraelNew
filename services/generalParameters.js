socialGroupApp.factory('generalParameters', ['$rootScope', '$stateParams', '$q', 'classAjax', 'PostService', function ($rootScope, $stateParams, $q, classAjax, PostService) {
	
	//var ua = ua || navigator.userAgent;
	//var match = ua.match(/Android\s([0-9\.]*)/);
	//alert(match[1]);
	var is442 = false; //match[1].indexOf( '4.4.2' ) === 0? true : false;
			
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
        tooltip: { trigger: 'none' },
        enableInteractivity: false,
        legend: { position: 'none', alignment: 'start' },
        title: "",
        backgroundColor: { strokeWidth: 0 },
        backgroundColor: '#42484e',
        pieSliceBorderColor: '#42484e',
        height: 250,
        fontSize: 15,
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

            PostService.setUser(userDetails);
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
        },
		
		androidIs442: function () {	
		
			/* var deviceOS  = device.platform.toLowerCase();
			alert(deviceOS);
			
			var deviceOSVersion = device.version;  
			alert(deviceOSVersion);
	
			var is442 = false;
			if(deviceOS === 'android' && deviceOSVersion.indexOf( '4.4.2' ) === 0){is442 = true;}
			alert(is442)
			
			return is442; */
			//alert(is442)
			return is442;
		}, 
		
		fileTrasnfer: function (details, filePath) {	
			
			var options = new FileUploadOptions();
	
			var ft = new FileTransfer();
			
			function win(r) {
		
				alert("Code = " + r.responseCode+" Sent = " + r.bytesSent+" Response = " + r.response.data);

						
					var jsDataObject = JSON.parse(r.response);
					console.log(jsDataObject);
			}

			function fail(error) {
				alert("An error has occurred: Code = " + error.code);
			}

			var uploadUrl = domain ; //+ other url details
	
			ft.onprogress = function(progressEvent) {
				if (progressEvent.lengthComputable) {
					loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
				} 
				else {
					loadingStatus.increment();
				}
			};
	
			ft.upload(filePath, uploadUrl, win, fail, options);
		}
    }
}])
