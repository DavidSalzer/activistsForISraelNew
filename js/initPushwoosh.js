var pushNotification;

function stopPushwoosh() {
    //  alert('stop notification');
    //register for pushes
    pushNotification.unregisterDevice(
			function (status) {
			    var pushToken = status;
			    console.warn('push token: ' + pushToken);
			},
			function (status) {
			    console.warn(JSON.stringify(['failed to register ', status]));
			}
		);
}

function initPushwoosh() {

    //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
    if (isAndroid) {
        pushNotification.onDeviceReady({ projectid: "634600880816", appid: "050B2-F6787" });
    }
    if (isIOS||isIPad) {
        pushNotification.onDeviceReady({ pw_appid: "050B2-F6787" });
    }
    //register for pushes
    pushNotification.registerDevice(
        function (status) {
            var pushToken = status;
            //alert('success');
            console.warn('push token: ' + pushToken);
        },
        function (status) {
            //alert('error');
            console.warn(JSON.stringify(['failed to register ', status]));
        }
    );
}


document.addEventListener("deviceready", onDeviceReadyForPush, true);

function onDeviceReadyForPush() {
    pushNotification = window.plugins.pushNotification;
   // if (localStorage.notifications == undefined) { localStorage.notifications = 1;
     initPushwoosh(); 
   //  }
}